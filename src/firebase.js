import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, FacebookAuthProvider, OAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB_Wo9IIwrlaOoBmsdtbnm2_OPMrPENHg8",
  authDomain: "prueba-89c20.firebaseapp.com",
  projectId: "prueba-89c20",
  storageBucket: "prueba-89c20.appspot.com",
  messagingSenderId: "170766382115",
  appId: "1:170766382115:web:7eed426d214a35e9e7ad96",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const facebookProvider = new FacebookAuthProvider();
export const appleProvider = new OAuthProvider("apple.com");