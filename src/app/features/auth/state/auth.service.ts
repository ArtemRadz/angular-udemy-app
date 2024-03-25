import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

import { finalize, tap } from 'rxjs';
import {
  SignRequest,
  SignUpResponse,
  SignInResponse,
} from 'src/app/shared/data-access/firebase/models/auth.model';
import { LoadingService } from 'src/app/shared/data-access/loading/loading.service';

import { environment } from 'src/environments/environment';
import { AuthStore } from './auth.store';
import { User } from './auth.model';

const ACCESS_TOKEN_KEY = 'accessToken';
const REFRESH_TOKEN_KEY = 'refreshToken';
const USER_KEY = 'user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly httpClient = inject(HttpClient);
  private readonly loadingService = inject(LoadingService);
  private readonly authStore = inject(AuthStore);

  signUp(formData: Omit<SignRequest, 'returnSecureToken'>) {
    this.loadingService.on();

    const requestBody: SignRequest = {
      email: formData.email,
      password: formData.password,
      returnSecureToken: true,
    };

    const queryParams = { key: environment.firebaseWebApiKey };

    return this.httpClient
      .post<SignUpResponse>(environment.signUpEndpoint, requestBody, {
        params: queryParams,
      })
      .pipe(
        finalize(() => this.loadingService.off()),
        tap(response => {
          this.handleSignUpResponse(response);
        })
      );
  }

  signIn(formData: Omit<SignRequest, 'returnSecureToken'>) {
    this.loadingService.on();

    const requestBody: SignRequest = {
      email: formData.email,
      password: formData.password,
      returnSecureToken: true,
    };

    const queryParams = { key: environment.firebaseWebApiKey };

    return this.httpClient
      .post<SignInResponse>(environment.signInEndpoint, requestBody, {
        params: queryParams,
      })
      .pipe(
        finalize(() => this.loadingService.off()),
        tap(response => {
          this.handleSignInResponse(response);
        })
      );
  }

  private handleSignUpResponse(response: SignUpResponse) {
    const expirationDate = new Date(
      new Date().getTime() + parseInt(response.expiresIn) * 1000
    );
    const user: User = {
      email: response.email,
      idToken: response.idToken,
      localId: response.localId,
      expirationDate: expirationDate,
    };

    this.authStore.user.set(user);
    this.authStore.accessToken.set(response.idToken);

    localStorage.setItem(ACCESS_TOKEN_KEY, response.idToken);
    localStorage.setItem(REFRESH_TOKEN_KEY, response.refreshToken);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  private handleSignInResponse(response: SignInResponse) {
    const expirationDate = new Date(
      new Date().getTime() + parseInt(response.expiresIn) * 1000
    );
    console.log(expirationDate);
    const user: User = {
      email: response.email,
      idToken: response.idToken,
      localId: response.localId,
      expirationDate: expirationDate,
    };

    this.authStore.user.set(user);
    this.authStore.accessToken.set(response.idToken);

    localStorage.setItem(ACCESS_TOKEN_KEY, response.idToken);
    localStorage.setItem(REFRESH_TOKEN_KEY, response.refreshToken);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }
}