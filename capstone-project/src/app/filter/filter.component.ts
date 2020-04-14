import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-filter",
  template: `
    <mat-card>
      <div class="filter-options">
        <mat-radio-group class="radio-group">
          <mat-radio-button
            class="radio-button"
            *ngFor="let option of options"
            [value]="option"
          >
            {{ option }}
          </mat-radio-button>
        </mat-radio-group>
        <div class="checkboxes">
          <mat-checkbox [(ngModel)]="checked">User</mat-checkbox>
          <mat-checkbox [(ngModel)]="checked">Title</mat-checkbox>
          <mat-checkbox [(ngModel)]="checked">Artist</mat-checkbox>
        </div>
      </div>
      <mat-divider [vertical]="true"></mat-divider>
      <h1>Your filter goes here</h1>
      <button mat-button color="primary" (click)="filter()">
        Apply Filter
      </button>
    </mat-card>
  `,
  styleUrls: ["./filter.component.scss"],
})
export class FilterComponent implements OnInit {
  options: string[] = ["Show", "Hide"];
  public checked = false;

  constructor() {}

  ngOnInit(): void {}

  filter() {
    console.log("YOU A WEENEER");
  }
}
