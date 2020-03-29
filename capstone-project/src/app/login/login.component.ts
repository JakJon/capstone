import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  template: `
    <mat-card>
      <h2>Sign In</h2>
      <mat-form-field class="username-input">
        <mat-label>Username</mat-label>
        <input id="song-description" matInput>
        <mat-error *ngIf="false">
          The song description is <strong>required</strong>
        </mat-error>
      </mat-form-field>
      <mat-form-field class="password-input">
        <mat-label>Password</mat-label>
        <input id="song-description" matInput>
        <mat-error *ngIf="false">
          The song description is <strong>required</strong>
        </mat-error>
      </mat-form-field>
      <div class="buttons">
        <button mat-button color="primary" (click)="submit()">Submit</button>
        <button mat-button color="warn" (click)="cancel()">Cancel</button>
      </div>
    </mat-card>
  `,
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  submit() {

  }

  cancel() {

  }

}
