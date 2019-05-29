import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

@Component({
  selector: 'lg-login',
  template: `
    <p>Please login.</p>
    <button mat-raised-button color="accent" (click)="login()">Login with Google</button>
  `,
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(public afAuth: AngularFireAuth) {}

  login() {
    this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }

}
