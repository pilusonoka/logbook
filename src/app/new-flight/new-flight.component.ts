import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'lg-new-flight',
  template: `
<form>
  <fieldset class="form-group">
    <div class="form-group row">
      <label for="date" class="col-3 col-form-label">Date</label>
      <div class="col-9">
        <input type="date" class="form-control" id="date" placeholder="Date">
      </div>
    </div>

    <div class="form-group row">
      <label for="start_time" class="col-3 col-form-label">Start at</label>
      <div class="col-9">
        <input type="time" class="form-control" id="start_time" placeholder="Start time">
      </div>
    </div>

    <div class="form-group row">
      <label for="duration" class="col-3 col-form-label">Duration</label>
      <div class="col-9">
        <input type="time" class="form-control" id="duration" placeholder="Duration">
      </div>
    </div>

</fieldset>
<fieldset class="form-group">
  <div class="form-group row">
    <label for="aircraft" class="col-3 col-form-label">Aircraft</label>
    <div class="col-9">
      <input type="text" class="form-control" id="duration" placeholder="Aircraft">
    </div>
  </div>

  <div class="form-group row">
    <label for="departure" class="col-3 col-form-label">Departure</label>
    <div class="col-9">
      <input type="text" class="form-control" id="departure" placeholder="Departure">
    </div>
  </div>

  <div class="form-group row">
    <label for="arrival" class="col-3 col-form-label">Arrival</label>
    <div class="col-9">
      <input type="text" class="form-control" id="arrival" placeholder="Arrival">
    </div>
  </div>

  <div class="form-group row">
    <label for="flight_rule" class="col-3 col-form-label">Flight rule</label><br>
    <div class="btn-group col-3" role="group" aria-label="Basic example">
      <button type="button" class="btn btn-primary">VFR</button>
      <button type="button" class="btn btn-light">IFR</button>
    </div>
  </div>

  <div class="form-group row">
    <label for="crew" class="col-3 col-form-label">Crew</label>
    <div class="form-check col-9">
      <input class="form-check-input" type="checkbox" checked id="defaultCheck1">
      <label class="form-check-label" for="defaultCheck1">
        Pilots name
      </label>
    </div>
  </div>

  <div class="form-group row">
    <label for="takeoffs" class="col-3 col-form-label">Takeoffs</label>
    <div class="btn-group col-2" role="group" aria-label="Basic example">
      <button type="button" class="btn btn-primary" (click)="value=value+1">
        <span class="material-icons">add</span>
      </button>
      <span class="btn">{{value}}</span>
      <button type="button" class="btn btn-primary" (click)="value=value-1">
        <i class="material-icons">remove</i>
      </button>
      <br>
      </div>
  </div>
  <div class="form-group row">
    <label for="crosscountry" class="col-3 col-form-label">Crosscountry</label>
    <div class="btn-group col-3" role="group" aria-label="Basic example">
      <button type="button" class="btn btn-light">Yes</button>
      <button type="button" class="btn btn-primary">No</button>
    </div>
  </div>
</fieldset>
</form>
  `,
  styleUrls: ['./new-flight.component.scss']
})
export class NewFlightComponent implements OnInit {

  value = 1;
  constructor() { }

  ngOnInit() {
  }

  toggleCrossCountry(e) {
    console.log(e);
  }

}
