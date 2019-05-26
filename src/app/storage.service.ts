import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Pilot } from './models/pilot';
import { Flight } from './models/flight';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private afAuth: AngularFireAuth,
              private db: AngularFirestore) {}

  registerUser(pilot: Pilot): Promise<any> {
    return this.db.collection('users')
               .doc(pilot.uid)
               .set({...pilot});
  }

  getUserInfo(uid: string): Promise<any> {
    return this.db.collection('users')
               .doc(uid).ref
               .get()
               .then(doc => doc.exists? doc.data() : null);
  }

  getAllFlights(pilot: Pilot): Flight[] {
    return null;
  }

  saveNewFlight(flight: Flight): Promise<any> {
    return this.db.collection('flights')
               .add({...flight})
  }
}
