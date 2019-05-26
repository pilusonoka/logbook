import { Component, OnInit } from '@angular/core';
import 'jquery';
import 'bootstrap';
import 'hammerjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { ApplicationStateService } from './services/application-state.service';
import { Pilot } from './models/pilot';
import { StorageService } from './services/storage.service';

@Component({
  selector: 'lg-root',
  template: `
   <lg-header></lg-header>
   <lg-login *ngIf="showLogin"></lg-login>
   <lg-new-flight *ngIf="false"></lg-new-flight>
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  showLogin = true;
  constructor(public afAuth: AngularFireAuth,
              private applicationState: ApplicationStateService,
              private storageService: StorageService) {
    
  }

  ngOnInit(): void {
    this.afAuth.authState.subscribe(user => {
      this.showLogin = !user;
      if(user) {
        const isFirstLogin = user.metadata.creationTime === user.metadata.lastSignInTime;
        console.log(user, 'isFirstLogin', isFirstLogin)
        if (isFirstLogin) {
          const pilot = Pilot.fromAuth(user);
          this.applicationState.pilot = pilot;
          this.storageService.registerUser(pilot);
        } else {
          this.storageService.getUserInfo(user.uid)
            .then(res => this.applicationState.pilot);
        }
      }
    });
  }
}
