import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { StorageService } from '../services/storage.service';
import { ApplicationStateService } from '../services/application-state.service';
import { Time } from '@angular/common';

@Component({
  selector: 'lg-summary',
  template: `
    <div *ngIf="summary">
      <div>Time total: <span class="flightTime--total">{{summary.timeForever.hours}}h {{summary.timeForever.minutes}}min</span>... Wow!</div>
      <div>Time this month: <span class="flightTime--month">{{summary.timeForever.hours}}h {{summary.timeForever.minutes}}min</span>.</div>
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

  constructor(private storageService: StorageService,
              private applicationService: ApplicationStateService) { }

  @Output() requestView = new EventEmitter();

  ngOnInit() {
    this.pilot = this.applicationService.pilot;
    this.storageService
        .getFlightsSummary(this.pilot)
        .then(res => this.summary = res);
  }

}
