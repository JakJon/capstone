import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-composition',
  template: `
    <mat-card>
      <h1>TESTING TESTING 123 TEST TEST</h1>
    </mat-card>

  `,
  styleUrls: ['./composition.component.scss']
})
export class CompositionComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
