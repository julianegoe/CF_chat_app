const firebase = require('firebase');
require('firebase/firestore');

if (!firebase.apps.length) {
	firebase.initializeApp({
		apiKey: 'AIzaSyBdzYEUB_CZgyask3dZACUXs9csz_ItYs0',
		authDomain: 'chattyapp-863cc.firebaseapp.com',
		projectId: 'chattyapp-863cc',
		storageBucket: 'chattyapp-863cc.appspot.com',
		messagingSenderId: '116642040466',
		appId: '1:116642040466:web:cb892ce032a1e052c0744b',
		measurementId: 'G-7H3EJSCR30',
	});
}

const db = firebase.firestore();
const auth = firebase.auth();

export { db, auth };
