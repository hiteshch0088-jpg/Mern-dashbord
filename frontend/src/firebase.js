// import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCenOQtSKE13vutlHMab0-B4ulpFNpon9s",
  authDomain: "mern-dashboard-8de38.firebaseapp.com",
  projectId: "mern-dashboard-8de38",
  storageBucket: "mern-dashboard-8de38.firebasestorage.app",
  messagingSenderId: "1033149964648",
  appId: "1:1033149964648:web:b7ba28c37f9781908b76dd",
  measurementId: "G-5FYWMM8CQ1"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);