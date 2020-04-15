import { Component, OnInit, DoCheck, Output, EventEmitter } from "@angular/core";
import { Validators, FormControl } from '@angular/forms';

@Component({
  selector: "app-filter",
  template: `
    <mat-card>
      <mat-radio-group class="radio-group" color="primary" [(ngModel)]="selectedOption">
        <mat-radio-button
          class="radio-button"
          *ngFor="let option of options"
          [value]="option"
        >
          {{ option }}
        </mat-radio-button>
      </mat-radio-group>

      <div class="search-phrase">
        <h3 *ngIf="searchTypeSelected">Search for posts with a <span class="search-type">{{selectedOption}}</span> that contains</h3>
        <h3 *ngIf="!searchTypeSelected">Choose a search type</h3>

        <mat-form-field class="search-input" *ngIf="searchTypeSelected">
          <input id="filter" matInput [formControl]="searchControl">
          <mat-error *ngIf="searchControl.hasError('required')">
            A search value is <strong>required</strong>
          </mat-error>
        </mat-form-field>
      </div>
      <div class="buttons">
        <button mat-button color="primary" (click)="filter()">Search</button>
        <button mat-button color="warn" (click)="cancel()">Cancel</button>
      </div>
    </mat-card>
  `,
  styleUrls: ["./filter.component.scss"],
})
export class FilterComponent implements OnInit {
  options: string[] = ["Song Title", "Song Artist", "Username"];
  filterTerm: string;
  selectedOption: string;
  searchTypeSelected = false;
  public checked = false;

  @Output() cancelFilter = new EventEmitter();
  @Output() submitFilter = new EventEmitter<String>();
  @Output() filterType = new EventEmitter<String>();

  constructor() {}

  ngOnInit(): void {}

  ngDoCheck(): void {
    if (this.selectedOption) {
      this.searchTypeSelected = true;
    }
  }

  filter() {
    if (this.validateInputs())
    {
      this.filterTerm = (<HTMLInputElement>document.getElementById("filter")).value;
      this.filterType.emit(this.selectedOption);
      this.submitFilter.emit(this.filterTerm);
    } else {
      //TODO: handle this else case
    }
  }

  cancel() {
    this.cancelFilter.emit();
  }
  
  //Input Validators
  searchControl = new FormControl('', [
    Validators.required,
  ]);
  
  //FORUM VALIDATION
  validateInputs(): boolean {
    if(!this.searchControl.hasError('required') && !this.searchControl.hasError('required')) {
      return true;
    }
    return false;
  }
}
