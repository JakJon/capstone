import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Post } from '../models/post.interface';

@Component({
  selector: 'app-composition',
  template: `
  <mat-card>
    <div class="controls">
      <div class="song-info">
        <mat-form-field class="input-form">
          <mat-label>Song Artist</mat-label>
          <input id="artist" matInput placeholder="Ex. The Strokes">
        </mat-form-field>
        <mat-form-field class="input-form">
          <mat-label>Song Title</mat-label>
          <input id="title" matInput placeholder="Ex. Bohemian Rhapsody">  
        </mat-form-field>
        <mat-form-field class="input-form">
          <mat-label>YoutTube URL</mat-label>
          <input id="url" matInput placeholder="Ex. www.youtube.com/4N4j7dNB4q4">
        </mat-form-field>
      </div>
      <div class="right-side">
        <div class="timing">
          <mat-checkbox class="example-margin" [(ngModel)]="checked">Start / End Times</mat-checkbox>
          <mat-form-field *ngIf="checked" class="timing-info">
            <mat-label>Start at?</mat-label>
            <input id="start" matInput placeholder="Ex. 40">
            <mat-hint align="start"><strong>In Seconds</strong></mat-hint>
            <mat-hint align="end">0:35 = 35</mat-hint>
          </mat-form-field>
          <mat-form-field *ngIf="checked" class="timing-info">
            <mat-label>End at?</mat-label>
            <input id="end" matInput placeholder="Ex. 102">
            <mat-hint align="start"><strong>In Seconds</strong></mat-hint>
            <mat-hint align="end">2:00 = 120</mat-hint>
          </mat-form-field>  
        </div>
        <div class="buttons">
          <button mat-button color="warn" (click)="cancelPost()">Cancel</button>
          <button mat-button color="primary" (click)="createPost()">Create Post</button>
        </div>
        </div>
      </div>        
  </mat-card>
  `,
  
  styleUrls: ['./composition.component.scss']
})
export class CompositionComponent implements OnInit {
  public checked = false;
  public post : Post;
  public inputStartTime? : number;
  public inputEndTime? : number; 
  public inputUrl? : string; 

  @Output() cancel = new EventEmitter<boolean>();
  @Output() newPost = new EventEmitter<Post>();

  constructor() { }

  ngOnInit(): void {
    
  }

  cancelPost() {
    this.cancel.emit(true);
  }

  createPost() {
    if(+(<HTMLInputElement>document.getElementById("start")).value){
      this.inputStartTime = +(<HTMLInputElement>document.getElementById("start")).value;
    }
    if(+(<HTMLInputElement>document.getElementById("end")).value){
      this.inputEndTime = +(<HTMLInputElement>document.getElementById("end")).value;
    }
    this.inputUrl = (<HTMLInputElement>document.getElementById("url")).value;

    //TODO: use not hardcoded values here 
    this.post = {
    user : "Jake Jones",
    likes: 0,
    song: {
      songArtist : (<HTMLInputElement>document.getElementById("artist")).value,
      songTitle : (<HTMLInputElement>document.getElementById("title")).value,
      songUrl : this.formatURL(this.inputUrl, this.inputStartTime, this.inputEndTime)
      }
    }
    console.log(this.post);
    this.newPost.emit(this.post);
  }

  
  formatURL(url: string, start?: number, end?: number): string {
    let u: string;
    if (url && start && end) {
    u = `https://www.youtube.com/embed/${url}?autoplay=0&fs=0&iv_load_policy=3&showinfo=0&rel=0&cc_load_policy=0&start=${start}&end=${end}`
    } else if (url && start) {
    u = `https://www.youtube.com/embed/${url}?autoplay=0&fs=0&iv_load_policy=3&showinfo=0&rel=0&cc_load_policy=0&start=${start}`  
    } else {
    u = `https://www.youtube.com/embed/${url}?autoplay=0&fs=0&iv_load_policy=3&showinfo=0&rel=0&cc_load_policy=0`  
    }
    return u;
  }
}
