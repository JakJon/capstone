import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-profile',
  template: `
    <mat-card>
      <h3>{{username}}</h3>
      <div>
        <p>Bacon ipsum dolor amet mollit veniam est duis, velit buffalo pork loin ribeye sirloin pork chop filet mignon tempor chicken nisi non. Qui adipisicing drumstick hamburger culpa doner shoulder shank consectetur brisket cupim dolore cupidatat aute ullamco. Incididunt laboris irure kielbasa anim tri-tip consectetur ut commodo eu flank t-bone short ribs qui. Pork venison landjaeger, pig eu tempor esse doner flank duis mollit.</p>
      </div>
      <button mat-button color="warn" (click)="close()">Close</button>
    </mat-card>
  `,
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  @Input() username: string;
  @Output() closeProfile = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  close() {
    this.closeProfile.emit();
  }

}
