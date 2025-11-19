import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAYLrQEdizud3l-oLUHGw9DLVrqvMuavqI",
  authDomain: "my-react-app-aafe0.firebaseapp.com",
  projectId: "my-react-app-aafe0",
  storageBucket: "my-react-app-aafe0.firebasestorage.app",
  messagingSenderId: "7792297778",
  appId: "1:7792297778:web:51910c361b418233a4b92b",
  measurementId: "G-58XB9ZZDLK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export default app;