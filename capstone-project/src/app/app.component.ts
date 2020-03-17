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
          [songName]="p.songTitle" 
          [songArtist]="p.songArtist" 
          [songURL]="p.songUrl"
          [songDescription]="p.description" >
      </app-post>
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

  loadPosts() {
    this.postService.getPosts()
      .subscribe(post => {
        this.postFeed.push(post);
        });
    
    
    // this.postService.getPosts()
    //   .subscribe((data: Post) => this.postFeed.push({
    //     songArtist: data['SongArtist'],
    //     songTitle: data['SongTitle'],
    //     songUrl: data['SongUrl'],
    //     user: data['User'],
    //     description: data['Description']
    //   }))
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
    console.log(this.postFeed);
  }
}
