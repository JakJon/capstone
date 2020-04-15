import { Component, OnInit, DoCheck, Output, EventEmitter, Input } from "@angular/core";
import { Validators, FormControl } from '@angular/forms';

@Component({
  selector: "app-filter",
  template: `
    <mat-card>
      <div class="radio-buttons">
        <div>
        <mat-radio-group class="radio-group" color="primary" [(ngModel)]="selectedOption">
          <mat-radio-button
            class="radio-button"
            *ngFor="let option of options"
            [value]="option"
          >
            {{ option }}
          </mat-radio-button>
        </mat-radio-group>
        </div>
        <div>
        <mat-radio-group class="radio-group" color="primary" [(ngModel)]="selectedMatchType">
          <mat-radio-button
            class="radio-button"
            *ngFor="let matchType of matchTypes"
            [value]="matchType"
          >
            {{ matchType }}
          </mat-radio-button>
        </mat-radio-group>
        </div>
      </div>

      <div class="search-phrase">
        <h3 >Search for posts with {{prefaceWord}} <span class="search-type">{{selectedOption}}</span>{{matchTypePhrase}}</h3>

        <mat-form-field class="search-input">
          <input id="filter" matInput value="bob" [formControl]="searchControl">
          <mat-error *ngIf="searchControl.hasError('required')">
            A search value is <strong>required</strong>
          </mat-error>
        </mat-form-field>
      </div>
      <div class="buttons">
        <button mat-button color="primary" [disabled]="!validateInputs()" (click)="filter()">Search</button>
        <button mat-button color="warn" (click)="cancel()">Cancel</button>
      </div>
    </mat-card>
  `,
  styleUrls: ["./filter.component.scss"],
})
export class FilterComponent implements OnInit {
  options: string[] = ["Song Title", "Song Artist", "Username"];
  matchTypes: string[] = ["Exact Match", "Contains"];
  matchTypePhrase: string;
  filterTerm: string;

  @Input() selectedMatchType: string;
  @Input() selectedOption: string;

  @Output() cancelFilter = new EventEmitter();
  @Output() submitFilter = new EventEmitter<String>();
  @Output() filterType = new EventEmitter<String>();
  @Output() filterMatchType = new EventEmitter<String>();
  prefaceWord: string;

  constructor() {}

  ngOnInit(): void {}

  ngDoCheck(): void {
    if (this.selectedMatchType === "Exact Match")
    {
      this.prefaceWord = "the";
      this.matchTypePhrase = ":";
    } else if (this.selectedMatchType === "Contains") {
      this.prefaceWord = "a";
      this.matchTypePhrase = " that contains:";
    }
  }

  filter() {
    if (this.validateInputs())
    {
      this.filterTerm = (<HTMLInputElement>document.getElementById("filter")).value;
      this.filterType.emit(this.selectedOption);
      this.filterMatchType.emit(this.selectedMatchType);
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
