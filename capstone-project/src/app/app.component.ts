import { Component, OnInit } from '@angular/core';
import { Post } from './models/post.interface';
import { PostService } from './services/post.service';
import { User } from './models/user.interface';

@Component({
  selector: 'app-root',
  template: `
    <div class="mainContainer">
      <mat-toolbar>
        <div class="left">
          <button *ngIf="!signedIn && !showLoginWindow" mat-button color="primary" (click)="toggleLoginWindow()">Sign In</button>
          <div class="profile-section" (click)="showMyProfile()">
            <mat-icon *ngIf="signedIn" color="primary">face</mat-icon>
            <button mat-button color="primary" class="profile-button" *ngIf="signedIn">{{username}}</button>
          </div>
        </div>
        <div class="center">
            <i class="logo"></i>
            <h1 class="title">Sound Share</h1>
            <button *ngIf="!mobile && signedIn" mat-flat-button color="primary" (click)="createPost()">Create Post</button>
        </div>    
        <div class="right">
          <mat-icon (click)="toggleFilter()" color="primary">search</mat-icon>
          <button (click)="toggleFilter()" class="search-button" mat-button color="primary">Search</button>
          <button (click)="logout()" mat-button color="primary" *ngIf="signedIn">Sign Out</button>
        </div>  
      </mat-toolbar>
      <button class="fab" *ngIf="mobile && signedIn" mat-fab color="primary" (click)="createPost()">+</button>
      <app-login 
        *ngIf="showLoginWindow"
        [users]="userList"
        (cancelLogin)="onCancelLogin()"
        (submitLogin)="onSubmitLogin($event)">
      </app-login>
      <app-composition 
        (cancel)="onCancelComposition($event)"
        (newPost)="onCreatePost($event)"
        id="composition" 
        *ngIf="creatingPost">
      </app-composition>
      <app-filter 
      *ngIf="filtering"
      [selectedMatchType]="filteringMatchType"
      [selectedOption]="filteringType"
      (cancelFilter)="onCancelFilter()"
      (submitFilter)="onSubmitFilter($event)"
      (filterType)="saveFilterType($event)"
      (filterMatchType)="saveFilterMatchType($event)"
      >
      </app-filter>
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
  filtering: boolean = false;
  error = false;
  userList: User[] = [];
  currentPostFeed: Post[] = [];
  originalPostFeed: Post[] = [];
  username: string;
  profileName: String;
  filteringType = "Song Title";
  filteringMatchType = "Exact Match";

  constructor(private postService: PostService) {
  }

  ngOnInit(): void {
    if (document.cookie && document.cookie !== undefined && document.cookie !== "") {
      this.username = document.cookie;
      this.signedIn = true;
    } else {
      this.signedIn = false;
    }

    if (screen.width < 768) {
      this.mobile = true;
    } else {
      this.mobile = false;
    }

    this.loadPosts();
    this.loadUsers();
  }

  toggleLoginWindow(){
    this.showLoginWindow = !this.showLoginWindow;
  }

  loadUsers() {
    this.postService.getUsers()
    .subscribe(users => {
        this.userList = users;
        console.log(users);
      });
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

  toggleFilter() {
    this.filtering = !this.filtering;
  }

  showPosterProfile(user: string) {
    this.showProfile = true;
    this.profileName = user;
    this.currentPostFeed = [];

    for (let post of this.originalPostFeed)
    {
      if (post.user === user) {
        this.currentPostFeed.push(post);
      }  
    }
  }

  createFiler(type: string, term: string) {
    this.currentPostFeed = [];

    //TODO: Clean up this mess, probably should be in the api logic

    if (type === "Username") {
      if (this.filteringMatchType === "Exact Match") {
        for (let post of this.originalPostFeed)
        {
          if (post.user === term) {
            this.currentPostFeed.push(post);
          }  
        }
      } else if (this.filteringMatchType === "Contains") {
        for (let post of this.originalPostFeed)
        {
          if (post.user.includes(term)) {
            this.currentPostFeed.push(post);
          }  
        }
      }
    } else if (type === "Song Title") {
      if (this.filteringMatchType === "Exact Match") {
        for (let post of this.originalPostFeed)
        {
          if (post.songTitle === term) {
            this.currentPostFeed.push(post);
          }  
        }
      } else if (this.filteringMatchType === "Contains") {
        for (let post of this.originalPostFeed)
        {
          if (post.songTitle.includes(term)) {
            this.currentPostFeed.push(post);
          }  
        }
      }
    } else if (type === "Song Artist") {
      if (this.filteringMatchType === "Exact Match") {
        for (let post of this.originalPostFeed)
        {
          if (post.songArtist === term) {
            this.currentPostFeed.push(post);
          }  
        }
      } else if (this.filteringMatchType === "Contains") {
        for (let post of this.originalPostFeed)
        {
          if (post.songArtist.includes(term)) {
            this.currentPostFeed.push(post);
          }  
        }
      }
    }
  }

  logout() {
    this.signedIn = false;
    console.log(document.cookie += "; expires=Thu, 18 Dec 2000 12:00:00");
    document.cookie += "; expires=Thu, 18 Dec 2000 12:00:00";
    document.location.reload();
  }

  onCreatePost(post: Post) {
      this.currentPostFeed.unshift(post);
      this.creatingPost = false;
  }

  onDeletePost() {
    window.location.reload();
    //TODO: turn the service call into a asyn function and await the return
  }

  onCancelComposition(cancel: boolean) {
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
    this.currentPostFeed = this.originalPostFeed;
  }

  onCancelFilter() {
    this.filtering = false;
    this.currentPostFeed = this.originalPostFeed;
  }

  onSubmitLogin(credentials: string) {
    this.toggleLoginWindow();
    this.username = credentials;
    this.signedIn = true;
  }

  onSubmitFilter(filterTerm: string) {
    this.createFiler(this.filteringType, filterTerm)
  }

  createPost() {
    this.creatingPost = true;
  }

  saveFilterType(type: string) {
    this.filteringType = type;
  }

  saveFilterMatchType(matchType: string) {
    this.filteringMatchType = matchType;
  }
}
