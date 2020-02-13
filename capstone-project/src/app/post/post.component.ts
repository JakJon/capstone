import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-post',
  template: `
    <mat-card>
      <div class="titleText">
        <h1>The Strokes</h1>
        <h2>At the door</h2>
      </div>
    </mat-card>
  `,
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
