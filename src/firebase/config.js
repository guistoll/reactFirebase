import firebase from 'firebase'

const config = {
  	apiKey: "AIzaSyCsld8vuF6O9R3WUf7xWtS6ryXhfNfv_MQ",
  	authDomain: "reactmobileapp-b0180.firebaseapp.com",
  	databaseURL: "https://reactmobileapp-b0180.firebaseio.com",
  	storageBucket: "reactmobileapp-b0180.appspot.com",
  	messagingSenderId: "572374524616"
};

firebase.initializeApp(config);

export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();
export default firebase;