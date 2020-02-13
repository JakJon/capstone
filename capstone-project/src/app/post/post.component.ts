import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-post',
  template: `
  <div class="container">
    <mat-card>

      <div class="topRow">
        <div class="titleText">
          <h1>Three Thirty</h1>
          <h2>Reaper</h2>
        </div>
      </div>
      <div class="bottomRow">
        <p class="userText">Posted By: Jake Jones</p>
        <div class="songControls">
          <iframe class="song" width="100" height="75px" src="https://www.youtube.com/embed/BEKTloAExfs?start=162" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
          <mat-slider min="1" max="100" step="1" value="1"></mat-slider>
        </div>
      </div>

    </mat-card>
  </div>
  `,
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
