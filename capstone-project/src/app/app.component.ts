import { Component, OnInit } from '@angular/core';
import { Post } from './models/post.interface';
import { PostService } from './services/post.service';

@Component({
  selector: 'app-root',
  template: `
    <div class="mainContainer">
      <mat-toolbar>
          <div class="header">
              <i class="logo"></i>
              <h1 class="title">Sound Share</h1>
              <button *ngIf="!mobile && signedIn" mat-button color="primary" (click)="createPost()">Create Post</button>
              <button *ngIf="!signedIn && !showLoginWindow" mat-button color="primary" (click)="toggleLoginWindow()">Sign In</button>
          </div>      
      </mat-toolbar>
      <button class="fab" *ngIf="mobile && signedIn" mat-fab color="primary" (click)="createPost()">+</button>
      <app-login 
        *ngIf="showLoginWindow"
        (cancelLogin)="onCancelLogin()">
      </app-login>
      <app-composition 
        (cancel)="onCancel($event)"
        (newPost)="onCreatePost($event)"
        id="composition" 
        *ngIf="creatingPost">
      </app-composition>
      <app-post *ngFor="let p of postFeed"
          [id]="p.id" 
          [user]="p.user"
          [songName]="p.songTitle" 
          [songArtist]="p.songArtist" 
          [songURL]="p.songUrl"
          [songDescription]="p.description" 
          (delete)="onDeletePost()"
          >
      </app-post>
    </div>
    `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'capstone-project';
  creatingPost: boolean = false;
  mobile: boolean;
  signedIn = false;
  showLoginWindow = false;
  error = false;
  postFeed: Post[] = [];
  constructor(private postService: PostService) {
  }

  ngOnInit(): void {
    if (screen.width < 768) {
      this.mobile = true;
    } else {
      this.mobile = false;
    }

    this.loadPosts();
  }

  toggleLoginWindow(){
    this.showLoginWindow = !this.showLoginWindow;
  }

  loadPosts() {
    this.postService.getPosts()
      .subscribe(posts => {
        this.postFeed = posts
        });
  }

  onCreatePost(post: Post) {
      this.postFeed.unshift(post);
      this.creatingPost = false;
  }

  onDeletePost() {
    window.location.reload();
  }

  onCancel(cancel: boolean) {
    if (cancel) {
      this.creatingPost = false;
    }
  }

  onCancelLogin() {
    this.toggleLoginWindow();
  }

  createPost() {
    this.creatingPost = true;
  }
}
