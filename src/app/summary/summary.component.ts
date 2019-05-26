import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'lg-summary',
  template: `
    <p>
      summary works!
    </p>
  `,
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
