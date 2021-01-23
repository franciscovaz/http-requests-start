import { Component, OnDestroy, OnInit } from '@angular/core';
import { Post } from './post.model';
import { PostService } from './posts.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  loadedPosts: Post[ ] = [];
  isFetching: boolean = false;
  error = null;
  private errorSub: Subscription;

  constructor(private postService: PostService) {}

  ngOnInit() {
    this.errorSub = this.postService.error.subscribe(errorMessage => {
      this.error = errorMessage;
    })


    this.isFetching = true;
    this.postService.fetchPosts().subscribe(
      posts => {
        this.loadedPosts = posts;
        this.isFetching = false;
      },
      error => {
        this.isFetching = false;
        this.error = error.message;
      }
    )
  }

  onCreatePost(postData: Post) {
    this.postService.createAndStorePost(postData.title, postData.content);
  }

  onFetchPosts() {
    // Send Http request
    this.isFetching = true;
    this.postService.fetchPosts().subscribe(
      posts => {
        this.loadedPosts = posts;
        this.isFetching = false;
      },
      error => {
        this.isFetching = false;
        this.error = error.message;
      }
    )
  }

  onClearPosts() {
    // Send Http request
    this.postService.deletePosts().subscribe(() => {
      this.loadedPosts = [];
    })
  }

  onHandleError() {
    this.error = null;
  }

  ngOnDestroy() {
    this.errorSub.unsubscribe();
  }

}
