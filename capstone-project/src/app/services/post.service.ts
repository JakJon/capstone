import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from '../models/post.interface';
import { Observable } from 'rxjs';
import { User } from '../models/user.interface';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  postsUrl = "https://localhost:5001/api/Post";
  userUrl = "https://localhost:5001/api/User";

  constructor(private http: HttpClient) { }

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.postsUrl);
  }

  createPost(post: Post): Observable<Post> {
    return this.http.post<Post>(this.postsUrl, post);
  }

  updatePost(id: number, post: Post): Observable<Post> {
    const putURL = `https://localhost:5001/api/Post/${id}`;
    return this.http.put<Post>(putURL, post);
  }

  deletePost(id: number): Observable<{}> {
    const deleteURL = `https://localhost:5001/api/Post/${id}`;
    return this.http.delete(deleteURL);
  }

  getSingularPost(id: number): Observable<Post> {
    const URL = `https://localhost:5001/api/Post/${id}`;
    return this.http.get<Post>(URL);
  }

  getUser(id: number): Observable<User> {
    const URL = `https://localhost:5001/api/User/${id}`;
    return this.http.get<User>(URL);
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.userUrl);
  }
}
