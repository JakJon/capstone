import { Component, OnInit } from '@angular/core';
import { Post } from './models/post.interface';
import { PostService } from './services/post.service';

@Component({
  selector: 'app-root',
  template: `
    <div class="mainContainer">
      <mat-toolbar>
        <div (click)="showMyProfile()" class="left">
          <mat-icon *ngIf="signedIn" color="primary">face</mat-icon>
          <button mat-button color="primary" class="profile-button" *ngIf="signedIn">{{username}}</button>
        </div>
        <div class="center">
            <i class="logo"></i>
            <h1 class="title">Sound Share</h1>
            <button *ngIf="!mobile && signedIn" mat-button color="primary" (click)="createPost()">Create Post</button>
            <button *ngIf="!signedIn && !showLoginWindow" mat-button color="primary" (click)="toggleLoginWindow()">Sign In</button>
        </div>    
        <div class="right">
          <button (click)="logout()" mat-button color="primary" *ngIf="signedIn">Sign Out</button>
        </div>  
      </mat-toolbar>
      <button class="fab" *ngIf="mobile && signedIn" mat-fab color="primary" (click)="createPost()">+</button>
      <app-login 
        *ngIf="showLoginWindow"
        (cancelLogin)="onCancelLogin()"
        (submitLogin)="onSubmitLogin($event)">
      </app-login>
      <app-composition 
        (cancel)="onCancel($event)"
        (newPost)="onCreatePost($event)"
        id="composition" 
        *ngIf="creatingPost">
      </app-composition>
      <app-profile
        *ngIf="showProfile"
        [username]="profileName"
        (closeProfile)="onCloseProfile()"
        >
      </app-profile> 
      <app-post *ngFor="let p of currentPostFeed"
        [id]="p.id" 
        [user]="p.user"
        [songName]="p.songTitle" 
        [songArtist]="p.songArtist" 
        [songURL]="p.songUrl"
        [songDescription]="p.description"
        [username]="this.username" 
        (delete)="onDeletePost()"
        (showPostProfile)="showPosterProfile($event)"
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
  showProfile = false;
  showLoginWindow = false;
  error = false;
  currentPostFeed: Post[] = [];
  originalPostFeed: Post[] = [];
  username: string;
  profileName: String;
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
        this.currentPostFeed = posts;
        this.originalPostFeed = posts;
        });
  }

  showMyProfile(){
    this.showProfile = true;
    this.profileName = this.username;
    this.currentPostFeed = [];

    for (let p of this.originalPostFeed)
    {
      if (p.user === this.username) {
        this.currentPostFeed.push(p);
      }  
    }
    
  }

  showPosterProfile(u: string) {
    this.showProfile = true;
    this.profileName = u;
    this.currentPostFeed = [];

    for (let p of this.originalPostFeed)
    {
      if (p.user === u) {
        this.currentPostFeed.push(p);
      }  
    }
  }

  logout() {
    document.location.reload();

    //TODO: Do this when cahcing user session
    // this.signedIn = false;
    // this.username = "";
  }

  onCreatePost(post: Post) {
      this.currentPostFeed.unshift(post);
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

  onCloseProfile() {
    this.showProfile = false;
    this.currentPostFeed = this.originalPostFeed;
  }

  onCancelLogin() {
    this.toggleLoginWindow();
  }

  onSubmitLogin(credentials: string) {
    this.toggleLoginWindow();
    this.username = credentials;
    this.signedIn = true;
  }

  createPost() {
    this.creatingPost = true;
  }
}
