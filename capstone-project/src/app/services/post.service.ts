import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from '../models/post.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  postUrl = "https://localhost:5001/api/Post/1";
  postsUrl = "https://localhost:5001/api/Post";

  constructor(private http: HttpClient) { }

  getPost(): Observable<Post> {
    return this.http.get<Post>(this.postUrl);
  }

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.postsUrl);
  }

}
