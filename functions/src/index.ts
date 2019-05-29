import * as functions from 'firebase-functions';
import * as  admin from 'firebase-admin';
import { QuerySnapshot, Timestamp } from '@google-cloud/firestore';
import { FlightDTO } from './flight-dto';
admin.initializeApp(functions.config().firebase);

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
export const helloWorld = functions.https.onRequest((request, response) => {
 response.send("Hello from Firebase!");
});

interface Duration {
  hours: number;
  minutes: number;
}

function normalizeDuration(duration: Duration) {
  const normalized = {hours: duration.hours, minutes: 0};
  normalized.hours += parseInt((duration.minutes / 60).toString())
  normalized.minutes = duration.minutes % 60;
  return normalized;
}

function isDateFromThisMonth(date: Timestamp) {
  const flightDate = date.toDate();
  const now = new Date();
  console.log('dates', now, flightDate);
  const isSameMonth = now.getMonth() === flightDate.getMonth();
  const isSameYear = now.getFullYear() === flightDate.getFullYear();
  return isSameYear && isSameMonth;
}

export const flights = functions.https.onRequest((request, response) => {
  const uid = 'tBumbpf5RYRhQWyWonlmyZ77Rza2';
  var db = admin.firestore();
  db.collection('flights')
    .where('pilotId', '==', uid)
    .get()
    .then((querySnapshot: QuerySnapshot) => {
      response.set('Access-Control-Allow-Origin', '*');
      if (querySnapshot.empty) {
        response.statusCode = 404;
        response.send();
      } else {
        const res: {
          timeForever: Duration,
          timeThisMonth: Duration,
          timePerAircraft: {[key in string]: Duration}
        } = {
          timeForever: {hours: 0, minutes: 0},
          timeThisMonth: {hours: 0, minutes: 0},
          timePerAircraft: {}
        }
        
        querySnapshot.docs.forEach(document => {
          if (document.exists) {
            const flight = document.data() as FlightDTO;

            res.timeForever.hours += flight.duration.hours;
            res.timeForever.minutes += flight.duration.minutes;

            if (!res.timePerAircraft[flight.aircraft]) {
              res.timePerAircraft[flight.aircraft] = {hours: 0, minutes: 0}
            }
            res.timePerAircraft[flight.aircraft].hours += flight.duration.hours;
            res.timePerAircraft[flight.aircraft].minutes += flight.duration.minutes;

            if (isDateFromThisMonth(flight.date)) {
              res.timeThisMonth.hours += flight.duration.hours;
              res.timeThisMonth.minutes += flight.duration.minutes;
            }
          }
        });
        res.timeForever = normalizeDuration(res.timeForever);
        res.timeThisMonth = normalizeDuration(res.timeThisMonth);
        Object.keys(res.timePerAircraft).forEach(aircraft => {
          res.timePerAircraft[aircraft] = normalizeDuration(res.timePerAircraft[aircraft]);
        });
        
        response.send(JSON.stringify(res));
      }
    });
 });


 export const getFlights = functions.https.onRequest((request, response) => {
  const uid = request.param('uid');
  var db = admin.firestore();
  db.collection('flights')
    .where('pilotId', '==', uid)
    .get()
    .then((querySnapshot: QuerySnapshot) => {
      response.set('Access-Control-Allow-Origin', '*');
      response.set('Content-Type', 'application/json');
      if (querySnapshot.empty) {
        response.statusCode = 404;
        response.send();
      } else {
        const res: {
          timeForever: Duration,
          timeThisMonth: Duration,
          timePerAircraft: {[key in string]: Duration}
        } = {
          timeForever: {hours: 0, minutes: 0},
          timeThisMonth: {hours: 0, minutes: 0},
          timePerAircraft: {}
        }
        
        querySnapshot.docs.forEach(document => {
          if (document.exists) {
            const flight = document.data() as FlightDTO;

            res.timeForever.hours += flight.duration.hours;
            res.timeForever.minutes += flight.duration.minutes;

            if (!res.timePerAircraft[flight.aircraft]) {
              res.timePerAircraft[flight.aircraft] = {hours: 0, minutes: 0}
            }
            res.timePerAircraft[flight.aircraft].hours += flight.duration.hours;
            res.timePerAircraft[flight.aircraft].minutes += flight.duration.minutes;

            if (isDateFromThisMonth(flight.date)) {
              res.timeThisMonth.hours += flight.duration.hours;
              res.timeThisMonth.minutes += flight.duration.minutes;
            }
          }
        });
        res.timeForever = normalizeDuration(res.timeForever);
        res.timeThisMonth = normalizeDuration(res.timeThisMonth);
        Object.keys(res.timePerAircraft).forEach(aircraft => {
          res.timePerAircraft[aircraft] = normalizeDuration(res.timePerAircraft[aircraft]);
        });
        
        response.send(JSON.stringify(res));
      }
    });
 });
