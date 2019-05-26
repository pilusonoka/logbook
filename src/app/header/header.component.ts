import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'lg-header',
  template: `
  <mat-toolbar color="primary">
    <mat-toolbar-row>
      <span *ngIf="afAuth.user | async as user; else showLogin" class="pilotName">Pilot: {{user.displayName}} </span>
      <ng-template #showLogin>
        Pilot Logbook
      </ng-template>
      <span class="spacer"></span>
      <ng-container *ngIf="afAuth.user | async">   
        <mat-icon class="headerIcon">flight</mat-icon>
        <mat-icon class="headerIcon">face</mat-icon>
        <button mat-raised-button color="accent" class="logoutButton" (click)="logout()">
          <mat-icon >power_settings_new</mat-icon>
          <span class="logoutText">Logout</span>
        </button>
      </ng-container>
    </mat-toolbar-row>
  </mat-toolbar>
  `,
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(public afAuth: AngularFireAuth) { }

  ngOnInit() {
  }

  logout() {
    this.afAuth.auth.signOut();
  }
}
