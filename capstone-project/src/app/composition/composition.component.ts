import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-composition',
  template: `
  <mat-card>
    <div class="controls">
      <div class="song-info">
        <mat-form-field class="input-form">
          <mat-label>Song Artist</mat-label>
          <input matInput placeholder="Ex. The Strokes">
        </mat-form-field>
        <mat-form-field class="input-form">
          <mat-label>Song Title</mat-label>
          <input matInput placeholder="Ex. Bohemian Rhapsody">  
        </mat-form-field>
        <mat-form-field class="input-form">
          <mat-label>YoutTube URL</mat-label>
          <input matInput placeholder="Ex. www.youtube.com/4N4j7dNB4q4">
        </mat-form-field>
      </div>
      <div class="right-side">
        <div class="timing">
          <mat-checkbox class="example-margin" [(ngModel)]="checked">Start / End Times</mat-checkbox>
          <mat-form-field *ngIf="checked" class="timing-info">
            <mat-label>Start at? (In Seconds)</mat-label>
            <input matInput placeholder="131">
          </mat-form-field>
          <mat-form-field *ngIf="checked" class="timing-info">
            <mat-label>End at?</mat-label>
            <input matInput placeholder="155">
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
  checked = false;

  @Output() cancel = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
    
  }

  cancelPost() {
    this.cancel.emit(true);
  }

  createPost() {

  }

}
