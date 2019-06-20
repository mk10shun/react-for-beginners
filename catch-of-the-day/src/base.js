import Rebase from 're-base';
import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyDaIwHe0195yzLWDP2-Ep86bFNUe3140BY",
  authDomain: "catch-of-the-day-3-a084c.firebaseapp.com",
  databaseURL: "https://catch-of-the-day-3-a084c.firebaseio.com",
});

const base = Rebase.createClass(firebaseApp.database());

// this is a named export
export { firebaseApp };

//this is a default export
export default base;
