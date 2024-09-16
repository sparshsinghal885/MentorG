import conf from "../conf/conf";
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage'
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: conf.apiKey,
  authDomain: conf.authDomain,
  projectId: conf.projectId,
  storageBucket: conf.storageBucket,
  messagingSenderId: conf.messagingSenderId,
  appId: conf.appId,
  measurementId: conf.measurementId,
};


export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const fireDB = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { fireDB, auth, storage }