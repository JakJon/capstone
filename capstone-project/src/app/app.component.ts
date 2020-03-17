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
          [id]="p.id" 
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

  createPost() {
    this.creatingPost = true;
    console.log(this.postFeed);
  }
}
