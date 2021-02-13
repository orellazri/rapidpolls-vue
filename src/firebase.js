import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
	apiKey: "AIzaSyBOE9dD3Kc1rxfeBHE2o2MVjnxJSiPZDjA",
	authDomain: "rapidpolls-c09f3.firebaseapp.com",
	projectId: "rapidpolls-c09f3",
	storageBucket: "rapidpolls-c09f3.appspot.com",
	messagingSenderId: "1062914163494",
	appId: "1:1062914163494:web:c215cda4057acc599e77e7"
};

firebase.initializeApp(firebaseConfig);

export default firebase;