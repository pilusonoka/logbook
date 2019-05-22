import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment.prod';
import { LoginComponent } from './login/login.component';
import { NewFlightComponent } from './new-flight/new-flight.component';
import { HoursPipe } from './pipes/hours/hours.pipe';
import { StringToHoursPipe } from './pipes/stringToHours/stringToHours.pipe';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NewFlightComponent,
    HoursPipe,
    StringToHoursPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
