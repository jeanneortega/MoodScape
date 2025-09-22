import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// ⬇️ use initializeAuth instead of getAuth
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyAXNuHbIpsQ-uX0fOKTbTme0hXpCwdsVJo",
  authDomain: "moodscape-79835.firebaseapp.com",
  projectId: "moodscape-79835",
  storageBucket: "moodscape-79835.firebasestorage.app",
  messagingSenderId: "810021430112",
  appId: "1:810021430112:web:eab30ed18fb10e8248b405",
};

// ✅ only initialize once (important for hot reload in Expo)
const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);

// Firestore stays the same
export const db = getFirestore(app);

// ✅ Proper React Native auth persistence with AsyncStorage
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
