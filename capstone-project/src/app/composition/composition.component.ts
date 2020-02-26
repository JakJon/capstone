import { Component, OnInit, DoCheck, EventEmitter, Output } from '@angular/core';
import { Post } from '../models/post.interface';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-composition',
  template: `
  <mat-card>
    <div class="controls">
      <div class="song-info">
        <mat-form-field class="song-info-input">
          <mat-label>Song Artist</mat-label>
          <input id="artist" matInput [formControl]="songArtistControl" placeholder="Ex. The Strokes">
          <mat-error *ngIf="songArtistControl.hasError('required')">
            The song artist is <strong>required</strong>
          </mat-error>
        </mat-form-field>
        <mat-form-field class="song-info-input">
          <mat-label>Song Title</mat-label>
          <input id="title" matInput [formControl]="songTitleControl" placeholder="Ex. Bohemian Rhapsody">
          <mat-error *ngIf="songTitleControl.hasError('required')">
            The song title is <strong>required</strong>
          </mat-error>  
        </mat-form-field>
        <mat-form-field class="song-info-input">
          <mat-label>YoutTube URL</mat-label>
          <input id="url" matInput [formControl]="songURLControl" placeholder="Ex. https://www.youtube.com/watch?v=oB128k-OySk">
          <mat-error *ngIf="songURLControl.hasError('required')">
          The YoutTube URL is <strong>required</strong>
          </mat-error>  
        </mat-form-field>
      </div>
      <div class="description">
        <mat-form-field class="description-input">
          <mat-label>Description</mat-label>
          <textarea id="description" matInput [formControl]="songDescriptionControl" placeholder="Describe your post, what you like about it, or just write whatevers on your mind at the moment."></textarea>
          <mat-error *ngIf="songDescriptionControl.hasError('required')">
          A song description is <strong>required</strong>
          </mat-error>  
        </mat-form-field>
      </div>
      <div class="timing-container">
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
          <button [disabled]="!validInputs" mat-button color="primary" (click)="createPost()">Create Post</button>
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
  public soon : number = 12;
  public inputStartTime? : number;
  public inputEndTime? : number; 
  public inputUrl? : string; 
  public validInputs = false;

  @Output() cancel = new EventEmitter<boolean>();
  @Output() newPost = new EventEmitter<Post>();

  constructor() { }

  ngOnInit(): void {
    
  }

  ngDoCheck(): void {
    this.validInputs = this.validateInputs();
  }

  cancelPost() {
    this.cancel.emit(true);
  }

  createPost() {
    if(this.checked){
      if(+(<HTMLInputElement>document.getElementById("start")).value && +(<HTMLInputElement>document.getElementById("end")).value){
        this.inputStartTime = +(<HTMLInputElement>document.getElementById("start")).value;
        this.inputEndTime = +(<HTMLInputElement>document.getElementById("end")).value;
      } else if (+(<HTMLInputElement>document.getElementById("start")).value) {
        this.inputStartTime = +(<HTMLInputElement>document.getElementById("start")).value;
      } else if (+(<HTMLInputElement>document.getElementById("end")).value) {
        this.inputEndTime = +(<HTMLInputElement>document.getElementById("end")).value;
      }
    }

    this.inputUrl = (<HTMLInputElement>document.getElementById("url")).value;

    this.post = {
    user : "Jake Jones",
    description: (<HTMLInputElement>document.getElementById("description")).value,
    likes: 0,
    song: {
      songArtist : (<HTMLInputElement>document.getElementById("artist")).value,
      songTitle : (<HTMLInputElement>document.getElementById("title")).value,
      songUrl : this.formatURL(this.inputUrl, this.inputStartTime, this.inputEndTime)
      }
    }
    this.newPost.emit(this.post);
  }

  
  formatURL(url: string, start?: number, end?: number): string {

    let formattedURL = url.substring(32);
    console.log(formattedURL);

    let u: string;
    if (url && start && end) {
    u = `https://www.youtube.com/embed/${formattedURL}?autoplay=0&fs=0&iv_load_policy=3&showinfo=0&rel=0&cc_load_policy=0&start=${start}&end=${end}`
    } else if (url && start) {
    u = `https://www.youtube.com/embed/${formattedURL}?autoplay=0&fs=0&iv_load_policy=3&showinfo=0&rel=0&cc_load_policy=0&start=${start}`  
    } else if (url && end) {
    u = `https://www.youtube.com/embed/${formattedURL}?autoplay=0&fs=0&iv_load_policy=3&showinfo=0&rel=0&cc_load_policy=0&end=${end}`  
    } else {
    u = `https://www.youtube.com/embed/${formattedURL}?autoplay=0&fs=0&iv_load_policy=3&showinfo=0&rel=0&cc_load_policy=0`  
    }
    return u;
  }

  validateInputs(): boolean {
    if(!this.songArtistControl.hasError('required') && !this.songTitleControl.hasError('required') && !this.songURLControl.hasError('required') && !this.songDescriptionControl.hasError('required')) {
      return true;
    }
    return false;
  }

  //Input Validators
  songArtistControl = new FormControl('', [
    Validators.required,
  ]);
  songTitleControl = new FormControl('', [
    Validators.required,
  ]);
  songURLControl = new FormControl('', [
    Validators.required,
  ]);
  songDescriptionControl = new FormControl('', [
    Validators.required,
  ]);
}
