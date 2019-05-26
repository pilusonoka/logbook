import * as functions from 'firebase-functions';
import * as  admin from 'firebase-admin';
import { QuerySnapshot } from '@google-cloud/firestore';
admin.initializeApp(functions.config().firebase);

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
export const helloWorld = functions.https.onRequest((request, response) => {
 response.send("Hello from Firebase!");
});

export const flights = functions.https.onRequest((request, response) => {
  const uid = request.body['uid'];
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
        const flights: any[] = [];
        querySnapshot.docs.forEach(document => {
          if (document.exists) {
            flights.push(document.data())
          }
        });
        response.send(JSON.stringify(flights));
      }
    });
 });