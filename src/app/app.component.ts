import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchPosts();
  }

  onCreatePost(postData: { title: string; content: string }) {
    // Send Http request
    this.http.post('https://angular-udemy-course-f2b18-default-rtdb.firebaseio.com/posts.json', postData)
      .subscribe(response => {
        console.log(response);
    });
  }

  onFetchPosts() {
    // Send Http request
    this.fetchPosts();
  }

  onClearPosts() {
    // Send Http request
  }

  fetchPosts() {
    this.http.get('https://angular-udemy-course-f2b18-default-rtdb.firebaseio.com/posts.json')
      .subscribe(resp => {
        console.log(resp);
      });
  }
}
