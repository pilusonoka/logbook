import { Component, OnInit } from '@angular/core';
import 'jquery';
import 'bootstrap';
import 'hammerjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { ApplicationStateService } from './services/application-state.service';
import { Pilot } from './models/pilot';
import { StorageService } from './services/storage.service';

const views = ['login', 'summary', 'new-flight', 'report'];

@Component({
  selector: 'lg-root',
  template: `
   <lg-header></lg-header>` + 
   views.map(view => `
     <lg-${view} *ngIf="activeView === '${view}'"
                 (requestView)="onViewRequest($event)"></lg-${view}>`).join('')
   ,
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  activeView = 'login';
  constructor(public afAuth: AngularFireAuth,
              private applicationState: ApplicationStateService,
              private storageService: StorageService) {
    
  }

  onViewRequest(nextView) {
    if (views.includes(nextView)) {
      this.activeView = nextView;
    }
  }

  ngOnInit(): void {
    this.afAuth.authState.subscribe(user => {
      this.activeView = (!!user)? 'summary' : 'login';
      console.log(this.activeView);
      if(user) {
        const isFirstLogin = user.metadata.creationTime === user.metadata.lastSignInTime;
        console.log(user, 'isFirstLogin', isFirstLogin)
        if (isFirstLogin) {
          const pilot = Pilot.fromAuth(user);
          this.applicationState.pilot = pilot;
          this.storageService.registerUser(pilot);
        } else {
          this.storageService.getUserInfo(user.uid)
            .then(res => {
              console.log('bbebe', res)
              this.applicationState.pilot = res as Pilot;
              this.applicationState.pilot.aircrafts = ['TODO: aircrafts']
            });
        }
      }
    });
  }
}
