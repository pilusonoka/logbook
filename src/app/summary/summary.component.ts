import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'lg-summary',
  template: `
    <p>
      summary works!

      <button mat-button (click)="requestView.emit('new-flight')">register new flight</button>
    </p>
  `,
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {

  constructor() { }

  @Output() requestView = new EventEmitter();

  ngOnInit() {
  }

}
