import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { StorageService } from '../services/storage.service';
import { ApplicationStateService } from '../services/application-state.service';
import { Time } from '@angular/common';

@Component({
  selector: 'lg-summary',
  template: `
    <div *ngIf="summary">
      <div class="item">Time total: <span class="flightTime flightTime--total">{{summary.timeForever.hours}}h {{summary.timeForever.minutes}}min</span>... Wow!</div>
      <div class="item">Time this month: <span class="flightTime flightTime--month">{{summary.timeForever.hours}}h {{summary.timeForever.minutes}}min</span>.</div>
      <div class="item" *ngFor="let aircraft of Object.keys(summary.timePerAircraft)">
        Total for <span class="aircraft">{{aircraft}}</span>: <span class="flightTime flightTime--aircraft">{{summary.timePerAircraft[aircraft].hours}}h {{summary.timePerAircraft[aircraft].minutes}}min</span>
      </div>
      <button color="accent"
              mat-raised-button 
              (click)="requestView.emit('new-flight')">
        <mat-icon >flight_takeoff</mat-icon>
        <span class="New">New Flight!</span>
      </button>
    </div>
  `,
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {
  pilot;
  summary: {
    timeForever: Time;
    timeThisMonth: Time;
    timePerAircraft: {[key in string]: Time}
  };
  Object;

  constructor(private storageService: StorageService,
              private applicationService: ApplicationStateService) { }

  @Output() requestView = new EventEmitter();

  ngOnInit() {
    this.Object = Object;
    this.pilot = this.applicationService.pilot;
    this.storageService
        .getFlightsSummary(this.pilot)
        .then(res => this.summary = res);
  }

}
