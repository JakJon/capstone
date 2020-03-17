import { Injectable, Host } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from '../models/post.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  singularPostUrl = "https://localhost:5001/api/Post/1";
  postsUrl = "https://localhost:5001/api/Post";

  constructor(private http: HttpClient) { }

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.postsUrl);
  }

  createPost(post: Post): Observable<Host> {
    return this.http.post<Post>(this.postsUrl, post);
  }
  
  getPost(): Observable<Post> {
    return this.http.get<Post>(this.singularPostUrl);
  }
}
