import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Post } from './post.model';
import { PostService } from './posts.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts: Post[ ] = [];
  isFetching: boolean = false;

  constructor(private postService: PostService) {}

  ngOnInit() {
    this.isFetching = true;
    this.postService.fetchPosts().subscribe(
      posts => {
        this.loadedPosts = posts;
        this.isFetching = false;
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
      }
    )
  }

  onClearPosts() {
    // Send Http request
  }

}
