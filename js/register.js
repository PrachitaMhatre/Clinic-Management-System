// Firebase setup
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
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
  .getElementById("registration-form")
  .addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm-password").value;

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      alert("Registration successful! You can now log in.");
      window.location.href = "login.html";
    } catch (error) {
      console.error("Error during registration:", error.message);
      alert(`Error: ${error.message}`);
    }
  });
