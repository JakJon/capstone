import { Component, OnInit } from '@angular/core';
import { Post } from './models/post.interface';

@Component({
  selector: 'app-root',
  template: `
    <div class="mainContainer">
      <mat-toolbar>
          <div class="header">
              <i class="logo"></i>
              <h1 class="title">Sound Share</h1>
              <button *ngIf="!mobile" mat-button color="primary" (click)="createPost()">Create Post</button>
          </div>      
      </mat-toolbar>
      <button class="fab" *ngIf="mobile" mat-fab color="primary" (click)="createPost()">+</button>
      <app-composition 
        (cancel)="onCancel($event)"
        (newPost)="onCreatePost($event)"
        id="composition" 
        *ngIf="creatingPost">
      </app-composition>
      <app-post *ngFor="let p of postFeed"
          [songName]="p.song.songTitle" 
          [songArtist]="p.song.songArtist" 
          [songURL]="p.song.songUrl"
          songDescription="bobby" >
      </app-post>
      <app-post 
          songName="Stand Tall" 
          songArtist="Childish Gambino" 
          songURL="https://www.youtube.com/embed/WbsZnsr0lI4?autoplay=0&fs=0&iv_load_policy=3&showinfo=0&rel=0&cc_load_policy=0&start=292"
          songDescription="Long Description Example: incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.">
      </app-post>    
      <app-post 
          songName="Three Thirty" 
          songArtist="Reaper" 
          songURL="https://www.youtube.com/embed/BEKTloAExfs?autoplay=0&fs=0&iv_load_policy=3&showinfo=0&rel=0&cc_load_policy=0&start=165"
          songDescription="Nice Bass Solo">
      </app-post>
      <app-post songName="The Others" songArtist="RENDEZ-VOUS" songURL="https://www.youtube.com/embed/fe6YO4KNbJk?start=150" songDescription="Intense synth-rock build up" ></app-post>
      <app-post 
          songName="skip" 
          songArtist="Superparka" 
          songURL="https://www.youtube.com/embed/4N4j7dNB4q4?autoplay=0&fs=0&iv_load_policy=3&showinfo=0&rel=0&cc_load_policy=0&start=46&end=67"
          songDescription="This post has a specified end time.">
      </app-post>
    </div>
    `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'capstone-project';
  creatingPost: boolean = false;
  mobile: boolean;
  postFeed: Post[];

  constructor() {
    this.postFeed = [];
  }

  ngOnInit(): void {

    if (screen.width < 768) {
      this.mobile = true;
    } else {
      this.mobile = false;
    }
  }

  onCreatePost(post: Post) {
      this.postFeed.push(post);
      this.creatingPost = false;
  }

  onCancel(cancel: boolean) {
    if (cancel) {
      this.creatingPost = false;
    }
  }

  createPost() {
    this.creatingPost = true;
  }
}
