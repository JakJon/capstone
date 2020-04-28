import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Validators, FormControl } from '@angular/forms';
import { User } from '../models/user.interface';

@Component({
  selector: 'app-login',
  template: `
    <mat-card>
      <h2>Sign In</h2>
      <mat-form-field class="username-input">
        <mat-label>Username</mat-label>
        <input id="username" matInput [formControl]="usernameControl">
        <mat-error *ngIf="usernameControl.hasError('required')">
          Username is <strong>required</strong>
        </mat-error>
      </mat-form-field>
      <mat-form-field class="password-input">
        <mat-label>Password</mat-label>
        <input id="password" type="password" matInput [formControl]="passwordControl">
        <mat-error *ngIf="passwordControl.hasError('required')">
          Password is <strong>required</strong>
        </mat-error>
      </mat-form-field>
      <div class="buttons">
        <button [disabled]="!forumsFilled" mat-button color="primary" (click)="submit()">Submit</button>
        <button mat-button color="warn" (click)="cancel()">Cancel</button>
      </div>
    </mat-card>
  `,
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  public forumsFilled = false;

  @Input() users: User[];

  @Output() cancelLogin = new EventEmitter();
  @Output() submitLogin = new EventEmitter<String>();
  username: string;

  constructor() { }

  ngDoCheck(): void {
    this.forumsFilled = this.validateInputs();
  }

  submit() {
    if (this.validCredentials())
    {
      this.submitLogin.emit(this.username);
      document.cookie = this.username;
      console.log(document.cookie);
    } else {
      //TODO: handle this else case
    }
  }

  validCredentials(): boolean {
    this.username = (<HTMLInputElement>document.getElementById("username")).value;
    let success = false;    
    
    for (let user of this.users) {
      if (this.username === user.name) {
        success = true;
      }
    }

    return success;

  }

  cancel() {
    this.cancelLogin.emit();
  }

  //FORUM VALIDATION
  validateInputs(): boolean {
    if(!this.passwordControl.hasError('required') && !this.usernameControl.hasError('required')) {
      return true;
    }
    return false;
  }

  //Input Validators
  passwordControl = new FormControl('', [
    Validators.required,
  ]);
  usernameControl = new FormControl('', [
    Validators.required,
  ]);

}
