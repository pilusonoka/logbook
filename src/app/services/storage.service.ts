import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Pilot } from '../models/pilot';
import { Flight } from '../models/flight';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private afAuth: AngularFireAuth,
              private db: AngularFirestore,
              private http: HttpClient) {}

  registerUser(pilot: Pilot): Promise<any> {
    return this.db.collection('users')
               .doc(pilot.uid)
               .set({...pilot});
  }

  getUserInfo(uid: string): Promise<any> {
    return this.db.collection('users')
               .doc(uid)
               .ref
               .get()
               .then(doc => doc.exists? doc.data() : null);
  }

  getAllFlights(pilot: Pilot): Promise<Flight[]> {
    return this.db.collection('flights')
               .ref
               .where('pilotId', '==', pilot.uid)
               .orderBy('date', 'desc')
               .get()
               .then((res) => {
                  const flights: Flight[] = [];
                  res.forEach(doc => {
                    if (doc.exists) {
                     const flightDTO = doc.data();
                     const flight = Object.assign({}, flightDTO, {date: flightDTO.date.toDate()}) as Flight;
                     flights.push(flight);
                    }
                  });
                  return flights;
               });
  }

  getFlightsSummary(pilot: Pilot): Promise<any> {
    return this.http.get(
        `https://us-central1-logbook-44600.cloudfunctions.net/getFlights?uid=${pilot.uid}`
    ).toPromise();
  } 

  saveNewFlight(flight: Flight): Promise<any> {
    return this.db.collection('flights')
               .add({...flight})
  }
}
