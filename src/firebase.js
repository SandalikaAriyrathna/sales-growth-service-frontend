// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCmDxvME9S8SA0zlwQ_VH2Uc3oAiq26eOk",
  authDomain: "e-commerce-promotions.firebaseapp.com",
  projectId: "e-commerce-promotions",
  storageBucket: "e-commerce-promotions.appspot.com",
  messagingSenderId: "970735681258",
  appId: "1:970735681258:web:9e863fd2888e14ba9ee193",
  measurementId: "G-H1W269WE8C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage(app);

export { storage };
