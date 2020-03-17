import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-post',
  template: `
  <div class="container">
    <mat-card>
      <div class="leftSide">
        <div class="vidContainer">
          <iframe class="song" width="300" height="100" [src]="songURL | urlSanitizer" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <div class="titleText">
          <h1>{{songName}}</h1>
          <h2>{{songArtist}}</h2>
        </div>
      </div>
      <mat-divider [vertical]="true"></mat-divider>
      <div class="rightSide">
        <div class="post-header">
          <p class="userText">Posted By: Jake Jones</p>
          <div class="post-buttons">
            <button mat-button color="warn" (click)="deletePost(id)">Delete</button>
            <button mat-button color="primary" (click)="editPost(id)">Edit</button>
          </div>
        </div>
          <h3 class="description">{{songDescription}}</h3>
      </div>
    </mat-card>
  </div>
  `,
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  @Input() id: number;
  @Input() songURL: string;
  @Input() songName: string;
  @Input() songArtist: string;
  @Input() songDescription: string;

  @Output() delete = new EventEmitter();

  constructor(private postService: PostService) { }

  ngOnInit(): void {
  }

  deletePost(id: number) {
    this.postService.deletePost(id).subscribe();
    this.delete.emit();
  }

  editPost(id: number) {

  }

}
