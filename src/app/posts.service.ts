import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { Post } from "./post.model";

@Injectable({ providedIn: 'root'})
export class PostService {
  error = new Subject<string>();

  constructor(private http: HttpClient){}

  createAndStorePost(title: string, content: string) {
    const postData: Post = {title, content};
    // Send Http request
    this.http.post<{name: string}>('https://angular-udemy-course-f2b18-default-rtdb.firebaseio.com/posts.json', postData)
    .subscribe(response => {
      console.log(response);
    },
    error => {
      this.error.next(error.message);
    }

    );
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
    }),
    catchError(errorResp => {
      // Podemos querer enviar info para o analytics por exemplo
      // lancamos o erro para do outro lado o subscribe o apanhar
      return throwError(errorResp);
    })

    )
  }

  deletePosts() {
    return this.http.delete('https://angular-udemy-course-f2b18-default-rtdb.firebaseio.com/posts.json');
  }
}
