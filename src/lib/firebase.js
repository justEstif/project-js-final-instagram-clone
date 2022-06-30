import { initializeApp } from "firebase/app";
import { getFirestore, FieldValue } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const config = {
  apiKey: process.env.REACT_APP_FIREBASE_INSTAGRAM_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_INSTAGRAM_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_INSTAGRAM_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_INSTAGRAM_STORAGE_BUCKET,
  messagingSenderId:
    process.env.REACT_APP_FIREBASE_INSTAGRAM_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_INSTAGRAM_APP_ID,
};
const firebase = initializeApp(config);
const db = getFirestore(firebase);
const auth = getAuth(firebase);

export { FieldValue, firebase };
