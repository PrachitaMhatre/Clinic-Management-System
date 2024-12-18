// Firebase setup
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBDSTdsg2WCnMCspCvuQqSM_gVixXiA5jE",
  authDomain: "prachita-clinic.firebaseapp.com",
  projectId: "prachita-clinic",
  storageBucket: "prachita-clinic.firebasestorage.app",
  messagingSenderId: "23838715286",
  appId: "1:23838715286:web:936be35a22fceeee4841b7",
  measurementId: "G-SDD5RZGDQ9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Form submission handler
document
  .getElementById("login-form")
  .addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      alert("Login successful! Redirecting...");
      window.location.href = "dashboard.html"; // Replace with your dashboard page
    } catch (error) {
      console.error("Login error:", error.message);
      alert(`Error: ${error.message}`);
    }
  });
