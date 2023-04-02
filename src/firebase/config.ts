import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";
import {
  CACHE_SIZE_UNLIMITED,
  enableIndexedDbPersistence,
  getFirestore,
  initializeFirestore,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_APIKEY,
  authDomain: import.meta.env.VITE_AUTHDOMAIN,
  projectId: import.meta.env.VITE_PROJECTID,
  storageBucket: import.meta.env.VITE_STORAGEBUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGINGSENDERID,
  appId: import.meta.env.VITE_APPID,
  measurementId: import.meta.env.VITE_MEASUREMENTID,
};

const firebaseApp = initializeApp(firebaseConfig);
export const firestore = initializeFirestore(firebaseApp, {
  cacheSizeBytes: CACHE_SIZE_UNLIMITED,
});
enableIndexedDbPersistence(firestore);

export const auth = getAuth(firebaseApp);
