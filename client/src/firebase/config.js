
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyAT8xnkOfJVjvPHET3rX33XvG8C1W9o3Mw",
  authDomain: "reviewclub-f0bec.firebaseapp.com",
  projectId: "reviewclub-f0bec",
  storageBucket: "reviewclub-f0bec.appspot.com",
  messagingSenderId: "880074945477",
  appId: "1:880074945477:web:cffb10a630b422a9ed91ac"
};

const app = initializeApp(firebaseConfig);
export const imageDB = getStorage(app)