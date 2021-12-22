import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: 'AIzaSyDZ7ornhlSXCbdXjahj9CdoSvfSAtA3kj8',
    authDomain: 'tumblr2.firebaseapp.com',
    projectId: 'tumblr2',
    storageBucket: 'tumblr2.appspot.com',
    messagingSenderId: '307954550715',
    appId: '1:307954550715:web:e65ba116244b6353f7a69e',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
