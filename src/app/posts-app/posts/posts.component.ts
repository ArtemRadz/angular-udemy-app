import { NgFor, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';

import { Post } from '../state/posts.model';
import { PostsService } from '../state/posts.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
  standalone: true,
  imports: [FormsModule, NgIf, NgFor],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostsComponent implements OnInit, OnDestroy {
  loadedPosts: Post[] = [];
  isLoading = false;
  error = '';
  private errorSub!: Subscription;

  constructor(
    private readonly postsService: PostsService,
    private readonly cf: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.fetchPosts();
    this.errorSub = this.postsService.error.subscribe(errorMsg => {
      this.error = errorMsg;
      this.cf.markForCheck();
    });
  }

  ngOnDestroy() {
    this.errorSub.unsubscribe();
  }

  onCreatePost(postData: Post) {
    this.postsService.createPost(postData).subscribe({
      next: () => {
        this.fetchPosts();
      },
      error: error => {
        this.postsService.error.next(error.error.error);
      },
    });
  }

  onFetchPosts() {
    this.fetchPosts();
  }

  onClearPosts() {
    this.postsService.deletePosts().subscribe({
      next: () => {
        this.loadedPosts = [];
        this.cf.markForCheck();
      },
      error: error => {
        this.postsService.error.next(error.error.error);
      },
    });
  }

  onHandleError() {
    this.error = '';
  }

  private fetchPosts() {
    this.isLoading = true;
    this.postsService.getPosts().subscribe({
      next: posts => {
        this.isLoading = false;
        this.loadedPosts = posts;
        this.cf.markForCheck();
      },
      error: error => {
        console.dir(error.message);
        this.isLoading = false;
        this.postsService.error.next(error.message);
      },
    });
  }
}
