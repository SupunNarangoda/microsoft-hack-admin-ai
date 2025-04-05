import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB9GekfdyBZA9Eo1UWbzrClTGSqHozv_Qs",
  authDomain: "ai-agent-hackathon-d3ec5.firebaseapp.com",
  projectId: "ai-agent-hackathon-d3ec5",
  storageBucket: "ai-agent-hackathon-d3ec5.firebasestorage.app",
  messagingSenderId: "958571470195",
  appId: "1:958571470195:web:66d2d33367b76534d9b906",
  measurementId: "G-DQNZWDJE7X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// const analytics = getAnalytics(app);