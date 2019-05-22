import { Component, OnInit } from '@angular/core';
import { ApplicationStateService } from '../application-state.service';
import { Flight, flightRules } from '../models/flight';
import { StringToHoursPipe } from '../pipes/stringToHours/stringToHours.pipe';

@Component({
  selector: 'lg-new-flight',
  template: `
<form #flightForm="ngForm" (ngSubmit)="saveFlight()">
  <fieldset class="form-group">
    <div class="form-group row">
      <label for="date" class="col-3 col-form-label">Date</label>
      <div class="col-9">
        <input type="date"
               required
               class="form-control" 
               name="date"
               [(ngModel)]="flight.date"
               placeholder="Date">
      </div>
    </div>

    <div class="form-group row">
      <label for="start_time" class="col-3 col-form-label">Start at</label>
      <div class="col-9">
        <input type="time"
               class="form-control"
               name="start_time"
               [ngModel]="flight.start_time | hours"
               (ngModelChange)="flight.start_time = stringToTime.transform($event)"
               placeholder="Start time">
      </div>
    </div>

    <div class="form-group row">
      <label for="duration" class="col-3 col-form-label">Duration</label>
      <div class="col-9">
        <input type="time"
               class="form-control"
               name="duration"
               [ngModel]="flight.duration | hours"
               (ngModelChange)="flight.duration = stringToTime.transform($event)"
               placeholder="Duration">
      </div>
    </div>

</fieldset>
<fieldset class="form-group">
  <div class="form-group row">
    <label for="aircraft" class="col-3 col-form-label">Aircraft</label>
    <div class="col-9">
      <input type="text"
             class="form-control"
             name="aircraft"
             [(ngModel)]="flight.aircraft"
             placeholder="Aircraft">
    </div>
  </div>

  <div class="form-group row">
    <label for="departure" class="col-3 col-form-label">Departure</label>
    <div class="col-9">
      <input type="text"
             class="form-control"
             name="departure"
             [(ngModel)]="flight.departure"
             placeholder="Departure">
    </div>
  </div>

  <div class="form-group row">
    <label for="arrival" class="col-3 col-form-label">Arrival</label>
    <div class="col-9">
      <input type="text"
             class="form-control"
             name="arrival"
             [(ngModel)]="flight.arrival"
             placeholder="Arrival">
    </div>
  </div>

  <div class="form-group row">
    <label for="flight_rule" class="col-3 col-form-label">Flight rule</label><br>
    <div class="btn-group col-3" role="group" aria-label="Basic example">
    <ng-container *ngFor="let rule of flightRules">
    <button type="button"
            class="btn"
            (click)="flight.flight_rule = rule"
            [ngClass]="{'btn-primary': flight.flight_rule === rule,
                        'btn-light': flight.flight_rule !== rule}">{{rule}}</button>
    </ng-container>
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
      <button type="button" class="btn btn-primary" (click)="flight.takeoffs=flight.takeoffs+1">
        <span class="material-icons">add</span>
      </button>
      <span class="btn">{{flight.takeoffs}}</span>
      <button type="button" class="btn btn-primary" (click)="flight.takeoffs=flight.takeoffs-1">
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
<button type="submit">submit</button>
</form>
  `,
  styleUrls: ['./new-flight.component.scss'],
  providers: [StringToHoursPipe]
})
export class NewFlightComponent implements OnInit {
  flight: Flight;
  flightRules: string[];

  constructor(private applicationState: ApplicationStateService, public stringToTime: StringToHoursPipe) { }

  ngOnInit() {
    this.flight = new Flight(this.applicationState.pilot);
    this.flightRules = flightRules;
    console.log(this.flight)
  }

  toggleCrossCountry(e) {
    console.log(e);
  }

  saveFlight() {
    console.log('TODO: save flight', this.flight)
  }

}
