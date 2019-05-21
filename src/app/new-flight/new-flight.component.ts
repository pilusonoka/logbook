import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'lg-new-flight',
  template: `
  flight form

  date time start/time end or duration
  aircraft (default CSUOD)
  crew (default 1)
  departure  (default EVAD)
  arrival (dropdown)
  takeoffs (day/night -- number)
  flight rule (VFR default / IFR)
  tags
  cross country
  photos?
  `,
  styleUrls: ['./new-flight.component.scss']
})
export class NewFlightComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
