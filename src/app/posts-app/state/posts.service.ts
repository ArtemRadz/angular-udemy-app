import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { catchError, map, Subject, throwError } from 'rxjs';

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
      .get<{ [key: string]: Post }>(`${environment.firebaseUrl}/post.json`)
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
      `${environment.firebaseUrl}/post.json`,
      data
    );
  }

  deletePosts() {
    return this.httpClient.delete(`${environment.firebaseUrl}/post.json`);
  }
}
