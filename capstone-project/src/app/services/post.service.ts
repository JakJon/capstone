import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from '../models/post.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  apiUrl = "https://localhost:5001/api/Post/1";

  constructor(private http: HttpClient) { }

  getPosts(): Observable<Post> {
    return this.http.get<Post>(this.apiUrl);
  }

}
