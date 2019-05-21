import { Component, OnInit } from '@angular/core';
import { Options } from 'ng5-slider';

@Component({
  selector: 'lg-new-flight',
  template: `
<form>
  <fieldset class="form-group">
    <div class="form-group">
      <label for="date">Date</label>
      <input type="date"
             class="form-control"
             id="date"
             placeholder="Date">
    </div>

    <div class="form-group">
      <label for="start_time">Start</label>
      <input type="time"
             class="form-control"
             id="start_time"
             placeholder="Start">
    </div>

    <div class="form-group">
      <label for="duration">Duration</label>
      <input type="time"
             class="form-control"
             id="duration"
             placeholder="Flight time">
    </div>
</fieldset>
<fieldset class="form-group">
  <div class="form-group">
    <label for="aircraft">Aircraft</label>
    <input type="text"
           class="form-control"
           id="aircraft"
           placeholder="Aircraft">
  </div>

  <div class="form-group">
    <label for="departure">Departure</label>
    <input type="text"
           class="form-control"
           id="departure"
           placeholder="Departure">
  </div>

  <div class="form-group">
    <label for="arrival">Arrival</label>
    <input type="text"
           class="form-control"
           id="arrival"
           placeholder="arrival">
  </div>

  <div class="form-group">
    <label for="flight_rule">Flight rule</label><br>
    <div class="btn-group col-6" role="group" aria-label="Basic example">
      <button type="button" class="btn btn-primary">VFR</button>
      <button type="button" class="btn btn-secondary">IFR</button>
    </div>
  </div>


  <div class="form-group">
    <label for="crew">Crew</label>
    <div class="form-check">
      <input class="form-check-input" type="checkbox" value="" id="defaultCheck1">
      <label class="form-check-label" for="defaultCheck1">
        Pilots name
      </label>
    </div>
  </div>

  <div class="form-group">
    <label for="takeoffs">Takeoffs</label>
    <ng5-slider [(value)]="value" [options]="options"></ng5-slider>
  </div>

  <div class="form-group">
    <label for="crosscountry">Crosscountry</label>
    <mat-slide-toggle (change)="toggleCrossCountry(e)"></mat-slide-toggle>
  </div>
</fieldset>
</form>

  // tags
  // photos?
  `,
  styleUrls: ['./new-flight.component.scss']
})
export class NewFlightComponent implements OnInit {

  value = 1;
  options: Options = {
    floor: 1,
    ceil: 15,
    showTicks: true
  };
  constructor() { }

  ngOnInit() {
  }

  toggleCrossCountry(e) {
    console.log(e);
  }

}
