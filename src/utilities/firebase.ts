import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "med-ease-00012256.firebaseapp.com",
  projectId: "med-ease-00012256",
  storageBucket: "med-ease-00012256.appspot.com",
  messagingSenderId: "345504319824",
  appId: "1:345504319824:web:6260fbf4a6dcc800580455",
  measurementId: "G-84CGY9FGHS",
};

initializeApp(firebaseConfig);
