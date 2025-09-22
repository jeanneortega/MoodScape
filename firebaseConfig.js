import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {
  initializeAuth,
  getAuth,
  getReactNativePersistence,
} from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyAXNuHbIpsQ-uX0fOKTbTme0hXpCwdsVJo",
  authDomain: "moodscape-79835.firebaseapp.com",
  projectId: "moodscape-79835",
  storageBucket: "moodscape-79835.firebasestorage.app",
  messagingSenderId: "810021430112",
  appId: "1:810021430112:web:eab30ed18fb10e8248b405",
};

const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
export const db = getFirestore(app);

// 🔑 initializeAuth only once (important for Expo hot reload)
let auth;
try {
  auth = getAuth(app);
} catch {
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage),
  });
}

export { auth };
export default app;
