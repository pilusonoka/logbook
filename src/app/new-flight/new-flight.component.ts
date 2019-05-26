import { Component, OnInit } from '@angular/core';
import { ApplicationStateService } from '../services/application-state.service';
import { Flight, flightRules } from '../models/flight';
import { StringToHoursPipe } from '../pipes/stringToHours/stringToHours.pipe';
import { AngularFirestore } from '@angular/fire/firestore';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'lg-new-flight',
  template: `
  <div class="example-container">
  <mat-form-field>
    <input matInput
           type="text"
           [matDatepicker]="myDatepicker"
           [(ngModel)]="flight.date"
           name="date">
    <mat-datepicker-toggle matSuffix [for]="myDatepicker"></mat-datepicker-toggle>
    <mat-datepicker #myDatepicker></mat-datepicker>
  </mat-form-field>

  <mat-form-field>
    <input matInput
           type="time"
           name="start_time"
           [ngModel]="flight.startTime | hours"
           (ngModelChange)="flight.startTime = stringToTime.transform($event)"
           placeholder="Start time">
  </mat-form-field>



  <mat-form-field>
    <input matInput
           type="time"
           autofocus
           name="duration"
           [ngModel]="flight.duration | hours"
           (ngModelChange)="flight.duration = stringToTime.transform($event)"
           placeholder="Duration">
  </mat-form-field>

  <mat-form-field>
    <input matInput
           type="text"
           name="aircraft"
           [(ngModel)]="flight.aircraft"
           placeholder="Aircraft">
  </mat-form-field>

  <mat-form-field>
    <input matInput
           type="text"
           name="departure"
           [(ngModel)]="flight.departure"
           placeholder="Departure">
  </mat-form-field>
  
  <mat-form-field>
    <input matInput
           type="text"
           name="arrival"
           [(ngModel)]="flight.arrival"
           placeholder="Arrival">
  </mat-form-field>
  <mat-form-field floatPlaceholder="always" class="mat-form-field--no-underline">
    <input matInput placeholder="Flight rule" disabled >
    <mat-radio-group [(ngModel)]="flight.rule">
      <mat-radio-button *ngFor="let rule of flightRules"
                        [value]="rule"
                        [checked]="rule === flight.rule">{{rule}}</mat-radio-button>
    </mat-radio-group>
  </mat-form-field>

  <mat-form-field>
    <input matInput placeholder="Crew" disabled >
    <mat-checkbox class="example-margin" [checked]="true">{{flight.crew[0].name}}</mat-checkbox><br>
  </mat-form-field>

  <mat-form-field>
  <input matInput placeholder="Takeoffs" disabled >
  <br>
  <mat-slider [(ngModel)]="flight.takeoffs"
              thumbLabel
              class="takeoffs"
              [displayWith]="formatLabel"
              tickInterval="4"
              min="1"
              max="20"></mat-slider>
  </mat-form-field>

  <mat-form-field floatPlaceholder="always" class="mat-form-field--no-underline">
    <input matInput placeholder="Crosscountry" disabled >
    <mat-radio-group [(ngModel)]="flight.crosscountry">
      <mat-radio-button *ngFor="let opt of [true, false]"
                        [checked]="flight.crosscountry === opt"
                        [value]="opt" >{{opt? 'Yes' : 'No'}}</mat-radio-button>
    </mat-radio-group>
  </mat-form-field>
<button type="submit" (click)="saveFlight()">submit</button>
</div>
  `,
  styleUrls: ['./new-flight.component.scss'],
  providers: [StringToHoursPipe]
})
export class NewFlightComponent implements OnInit {
  flight: Flight;
  flightRules: string[];

  constructor(private applicationState: ApplicationStateService,
              private storageService: StorageService,
              public stringToTime: StringToHoursPipe,
              private db: AngularFirestore) { }

  ngOnInit() {
    this.flight = new Flight(this.applicationState.pilot);
    this.flightRules = flightRules;
  }

  saveFlight() {
    this.storageService.saveNewFlight(this.flight);
  }

}
