import {
  HttpClient,
  HttpEventType,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';

import { catchError, map, Subject, tap, throwError } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Post } from './posts.model';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  error = new Subject<string>();

  constructor(private httpClient: HttpClient) {}

  getPosts() {
    return this.httpClient
      .get<{ [key: string]: Post }>(
        `${environment.firebaseEndpoint}/post.json`,
        {
          headers: new HttpHeaders({ 'custom-header': 'Hello' }),
          params: new HttpParams().set('print', 'pretty'),
        }
      )
      .pipe(
        map(res => {
          const postArray: Post[] = [];
          for (const key in res) {
            if (Object.prototype.hasOwnProperty.call(res, key)) {
              postArray.push({ ...res[key], id: key });
            }
          }

          return postArray;
        }),
        catchError(error => {
          console.dir(error);
          return throwError(() => new Error(error.error.error));
        })
      );
  }

  createPost(data: Post) {
    return this.httpClient.post<{ name: string }>(
      `${environment.firebaseEndpoint}/post.json`,
      data
    );
  }

  deletePosts() {
    return this.httpClient
      .delete(`${environment.firebaseEndpoint}/post.json`, {
        observe: 'events',
      })
      .pipe(
        tap(event => {
          console.dir(event);
          if (event.type === HttpEventType.Response) {
            console.log(event.body);
          }
        })
      );
  }
}
