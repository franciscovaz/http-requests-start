import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import { Post } from "./post.model";

@Injectable({ providedIn: 'root'})
export class PostService {

  constructor(private http: HttpClient){}

  createAndStorePost(title: string, content: string) {
    const postData: Post = {title, content};
  // Send Http request
  this.http.post<{name: string}>('https://angular-udemy-course-f2b18-default-rtdb.firebaseio.com/posts.json', postData)
  .subscribe(response => {
    console.log(response);
  });
  }

  fetchPosts() {
    return this.http.get<{[key: string] : Post}>('https://angular-udemy-course-f2b18-default-rtdb.firebaseio.com/posts.json')
    .pipe(
      map(responseData => {
      const postsArray: Post[] = [];
      for(const key in responseData) {
        if(responseData.hasOwnProperty(key)) {
          postsArray.push({ ... responseData[key], id: key});
        }
      }
      return postsArray;
    }))
  }
}
