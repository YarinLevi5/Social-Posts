import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Post } from './post';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private posts: Post[] = []
  private postsUpdated = new Subject<Post[]>()
  constructor(private http: HttpClient) { }

  getPosts() {
    this.http.get<Post[]>('http://localhost:3000/api/posts').subscribe(postData => {
      this.posts = postData
      this.postsUpdated.next([...this.posts])
    })
  }

  getPostUpdatedListener() {
    return this.postsUpdated.asObservable()
  }

  addPost(title: string, content: string) {
    const post: Post = { title, content }
    this.http.post('http://localhost:3000/api/posts', post).subscribe((responseData) => {
      this.posts.push(post)
      this.postsUpdated.next([...this.posts])
    })
  }
}
