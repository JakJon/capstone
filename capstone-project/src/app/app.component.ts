import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div class="mainContainer">
      <mat-toolbar>
          <div class="header">
              <i class="logo"></i>
              <h1 class="title">Sound Share</h1>
              <button mat-button color="primary" (click)="createPost()">Create Post</button>
          </div>      
      </mat-toolbar>
      <app-composition *ngIf="creatingPost"></app-composition>    
      <app-post 
          songName="Three Thirty" 
          songArtist="Reaper" 
          songURL="https://www.youtube.com/embed/BEKTloAExfs?autoplay=0&fs=0&iv_load_policy=3&showinfo=0&rel=0&cc_load_policy=0&start=165&end=175"
          songDescription="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua">
      </app-post>
      <app-post songName="The Others" songArtist="RENDEZ-VOUS" songURL="https://www.youtube.com/embed/fe6YO4KNbJk?start=160" songDescription="Example of a post without a designated end time." ></app-post>
      <app-post 
          songName="skip" 
          songArtist="Superparka" 
          songURL="https://www.youtube.com/embed/4N4j7dNB4q4?autoplay=0&fs=0&iv_load_policy=3&showinfo=0&rel=0&cc_load_policy=0&start=46&end=67"
          songDescription="Long Desc Example: incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.">
      </app-post>
      <app-post 
          songName="Stand Tall" 
          songArtist="Childish Gambino" 
          songURL="https://www.youtube.com/embed/WbsZnsr0lI4?autoplay=0&fs=0&iv_load_policy=3&showinfo=0&rel=0&cc_load_policy=0&start=293"
          songDescription=":)">
      </app-post>
    </div>`,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'capstone-project';
  creatingPost: boolean = false;

  createPost() {
    this.creatingPost = true;    
  }
}
