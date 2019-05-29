import { Component, OnInit } from '@angular/core';
import { ApplicationStateService } from '../services/application-state.service';
import { StorageService } from '../services/storage.service';
import { Flight, flightRules } from '../models/flight';
import { Pilot } from '../models/pilot';

@Component({
  selector: 'lg-report',
  template: `
  <table mat-table [dataSource]="flights" class="mat-elevation-z8">
    <ng-container matColumnDef="date">
      <th mat-header-cell *matHeaderCellDef> Date </th>
      <td mat-cell *matCellDef="let element"> {{element.date | date}} </td>
    </ng-container>

    <ng-container matColumnDef="aircraft">
      <th mat-header-cell *matHeaderCellDef> Aircraft </th>
      <td mat-cell *matCellDef="let element"> {{element.aircraft}} </td>
    </ng-container>

    <ng-container matColumnDef="duration">
      <th mat-header-cell *matHeaderCellDef> Duration </th>
      <td mat-cell *matCellDef="let element"> {{element.duration | hours}} </td>
    </ng-container>

    <ng-container matColumnDef="actions">
      <th mat-header-cell *matHeaderCellDef> </th>
      <td mat-cell *matCellDef="let element">
        <mat-icon class="headerIcon" *ngIf="!element.removeCounter" (click)="removeFlight(element)">delete</mat-icon>
        <mat-icon class="headerIcon" *ngIf="element.removeCounter" (click)="restore(element)">restore_from_trash</mat-icon>
      </td>
    </ng-container>

    <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
    <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
  </table>
  `,
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {
  flights: Flight[];
  pilot: Pilot;
  displayedColumns: string[];
  dataSource: Flight[];

  constructor(
    private applicationState: ApplicationStateService,
    private storageService: StorageService) { }

  ngOnInit() {
    this.pilot = this.applicationState.pilot;
    this.storageService
        .getAllFlights(this.pilot)
        .then(res => this.flights = res)
        .then(res => {
          this.displayedColumns = ['date', 'aircraft', 'duration', 'actions'];
          this.dataSource = this.flights;
        });
  }

  removeFlight(element: Flight) {
    element.removeCounter = 7;
  }

}
