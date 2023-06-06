import { initializeApp } from "firebase/app";
import {getFirestore}  from 'firebase/firebase';

const firebaseConfig = {
  apiKey: "AIzaSyBjQ0c8foCctSCkv7Wec0nS8cjTfrNYqwE",
  authDomain: "miniblog-84424.firebaseapp.com",
  projectId: "miniblog-84424",
  storageBucket: "miniblog-84424.appspot.com",
  messagingSenderId: "301656417467",
  appId: "1:301656417467:web:04be82ab9434bff8a3b59e"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app)

export { db }