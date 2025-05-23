// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA9J6SdyNV5JArPI4qkjUzK4VNgoyvXQfs",
  authDomain: "college-project-loginpage-1.firebaseapp.com",
  projectId: "college-project-loginpage-1",
  storageBucket: "college-project-loginpage-1.firebasestorage.app",
  messagingSenderId: "494638581406",
  appId: "1:494638581406:web:e77b7307f4aaf4b6ec5d8f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;