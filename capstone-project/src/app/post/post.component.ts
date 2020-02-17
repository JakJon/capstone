import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-post',
  template: `
  <div class="container">
    <mat-card>
      <div class="leftSide">
        <div class="titleText">
          <h1>{{songName}}</h1>
          <h2>{{songArtist}}</h2>
        </div>
          <div class="songControls">
            <iframe class="song" width="300" height="75px" [src]="songURL | urlSanitizer" frameborder="0" end=170 allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
          </div>
      </div>
      <mat-divider [vertical]="true"></mat-divider>
      <div class="rightSide">
        <p class="userText">Posted By: Jake Jones</p>
        <h3 class="description">{{songDescription}}</h3>
      </div>
    </mat-card>
  </div>
  `,
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  @Input() songURL: string;
  @Input() songName: string;
  @Input() songArtist: string;
  @Input() songDescription: string;

  constructor() { }

  ngOnInit(): void {
  }

}
