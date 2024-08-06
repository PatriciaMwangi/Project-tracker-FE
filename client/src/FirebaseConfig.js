import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAZPa-L_shJ7rmBVZK72ffN1dgP6pYu5E0",
  authDomain: "project-tracker-b728a.firebaseapp.com",
  projectId: "project-tracker-b728a",
  storageBucket: "project-tracker-b728a.appspot.com",
  messagingSenderId: "160751407450",
  appId: "1:160751407450:web:644d65210173e080602363",
  measurementId: "G-4BBMK8H16Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const googleProvider = new GoogleAuthProvider();
const analytics = getAnalytics(app);

export { auth, googleProvider, analytics };
export default app;