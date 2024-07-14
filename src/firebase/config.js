import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAVdJmlDAHmfbooN4jd-4N1V9akRELuBC4",
  authDomain: "eshop-app-b1aa8.firebaseapp.com",
  projectId: "eshop-app-b1aa8",
  storageBucket: "eshop-app-b1aa8.appspot.com",
  messagingSenderId: "950081388636",
  appId: "1:950081388636:web:c00b88d3d65a01f68de699"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const provider = new GoogleAuthProvider();

export default app;