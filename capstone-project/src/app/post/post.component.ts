import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PostService } from '../services/post.service';
import { FormControl, Validators } from '@angular/forms';
import { Post } from '../models/post.interface';

@Component({
  selector: 'app-post',
  template: `
  <div class="container">
    <mat-card>
      <div class="leftSide">
        <div class="vidContainer">
          <iframe [id]="this.idString" class="song" width="300" height="100" [src]="songURL | urlSanitizer" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <div class="titleText">
          <button class="replay-button" *ngIf="!editMode" mat-icon-button color="primary" (click)="refreshFrame()">
            <mat-icon>refresh</mat-icon>
          </button>
          <h2 *ngIf="!editMode">{{songName}}</h2>
          <mat-form-field class="artist-title-input" *ngIf="editMode" class="song-info-input">
            <mat-label>Song Name</mat-label>
            <input id="song-title" matInput [placeholder]="this.songName" [formControl]="songNameControl">
            <mat-error *ngIf="songNameControl.hasError('required')">
              The song name is <strong>required</strong>
            </mat-error>
          </mat-form-field>
          <h3 *ngIf="!editMode">{{songArtist}}</h3>
          <mat-form-field class="artist-title-input" *ngIf="editMode" class="song-info-input">
            <mat-label>Song Artist</mat-label>
            <input id="song-artist" matInput [placeholder]="this.songArtist" [formControl]="songArtistControl">
            <mat-error *ngIf="songArtistControl.hasError('required')">
              The song Artist is <strong>required</strong>
            </mat-error>
          </mat-form-field>
        </div>
      </div>
      <mat-divider [vertical]="true"></mat-divider>
      <div class="rightSide">
        <div class="post-header">
          <p (click)="showPosterProfile()" class="user-name">{{user}}</p>
          <div class="post-buttons">
            <button *ngIf="!editMode && isUserPost" mat-button color="warn" (click)="deletePost(id)">Delete</button>
            <button *ngIf="!editMode && isUserPost" mat-button color="primary" (click)="editPost()">Edit</button>
            <button *ngIf="editMode" mat-button color="warn" (click)="editDone(false)">Cancel</button>
            <button [disabled]="!doneEditing" *ngIf="editMode" mat-button color="primary" (click)="editDone(true)">Done</button>
          </div>
        </div>
          <h3 *ngIf="!editMode" class="description">{{songDescription}}</h3>
          <mat-form-field class="description-input" *ngIf="editMode" class="song-info-input">
            <mat-label>Song description</mat-label>
            <textarea id="song-description" matInput [placeholder]="this.songDescription" [value]="this.songDescription" [formControl]="songDescriptionControl"></textarea>
            <mat-error *ngIf="songDescriptionControl.hasError('required')">
              The song description is <strong>required</strong>
            </mat-error>
          </mat-form-field>
      </div>
    </mat-card>
  </div>
  `,
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  @Input() id: number;
  @Input() user: string;
  @Input() username: string;
  @Input() songURL: string;
  @Input() songName: string;
  @Input() songArtist: string;
  @Input() songDescription: string;
  @Output() delete = new EventEmitter();
  @Output() showPostProfile = new EventEmitter<string>();

  public editMode = false;
  public doneEditing = false;
  public isUserPost = false;
  public idString: string;

  constructor(private postService: PostService) { }

  ngOnInit(): void {
    this.idString = this.id.toString();
  }

  ngDoCheck(): void {
    this.doneEditing = this.validateInputs();

    if (this.user === this.username){
      console.log("hit");
      this.isUserPost = true;
    }
  }

  showPosterProfile() {
    this.showPostProfile.emit(this.user);
  }

  deletePost(id: number) {
    this.postService.deletePost(id).subscribe();
    this.delete.emit();
  }

  editPost() {
    this.editMode = true;
  }

  editDone(makeChange: boolean) {
    if(makeChange){
    let updatedPost: Post = {
      id: this.id,
      user: this.user,
      songUrl: this.songURL,
      songArtist:  (<HTMLInputElement>document.getElementById("song-artist")).value,
      songTitle: (<HTMLInputElement>document.getElementById("song-title")).value,
      description: (<HTMLInputElement>document.getElementById("song-description")).value
    }
      this.postService.updatePost(updatedPost.id, updatedPost).subscribe();
      window.location.reload();
    }
    this.editMode = false;
  }

  refreshFrame(){
    // @ts-ignore
    document.getElementById(this.idString).src = document.getElementById(this.idString).src;
  }

  validateInputs(): boolean {
    if(!this.songArtistControl.hasError('required') && !this.songDescriptionControl.hasError('required')) {
      return true;
    }
    return false;
  }

  //Input Validators
  songNameControl = new FormControl('', [
    Validators.required,
  ]);
  songArtistControl = new FormControl('', [
    Validators.required,
  ]);
  songDescriptionControl = new FormControl('', [
    Validators.required,
  ]);

}
