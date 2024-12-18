// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBDSTdsg2WCnMCspCvuQqSM_gVixXiA5jE",
  authDomain: "prachita-clinic.firebaseapp.com",
  projectId: "prachita-clinic",
  storageBucket: "prachita-clinic.firebasestorage.app",
  messagingSenderId: "23838715286",
  appId: "1:23838715286:web:936be35a22fceeee4841b7",
  measurementId: "G-SDD5RZGDQ9",
};
firebase.initializeApp(firebaseConfig);

// Authentication
const auth = firebase.auth();

// Sign up function
function signUp(email, password) {
  auth
    .createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      console.log("User signed up:", userCredential.user);
      // Redirect to appropriate dashboard
    })
    .catch((error) => {
      console.error("Error signing up:", error.message);
      alert(`Error: ${error.message}`);
    });
}

// Sign in function
function signIn(email, password) {
  auth
    .signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      console.log("User signed in:", userCredential.user);
      // Redirect to appropriate dashboard
    })
    .catch((error) => {
      console.error("Error signing in:", error.message);
      alert(`Error: ${error.message}`);
    });
}

// Log out function
function logOut() {
  auth
    .signOut()
    .then(() => {
      console.log("User signed out");
      // Redirect to home
    })
    .catch((error) => {
      console.error("Error signing out:", error.message);
    });
}

// Real-time database
const db = firebase.database();

// Function to add a new patient
function addPatient() {
  const name = document.getElementById("name").value;
  const age = document.getElementById("age").value;
  const gender = document.querySelector('input[name="gender"]:checked').value;
  const contact = document.getElementById("contact").value;
  const address = document.getElementById("address").value;

  if (!name || !age || !contact || !address) {
    alert("All fields are required");
    return;
  }

  const newPatientRef = db.ref("patients").push();
  newPatientRef
    .set({
      name,
      age,
      gender,
      contact,
      address,
    })
    .then(() => {
      console.log("Patient added");
      loadPatients();
    })
    .catch((error) => {
      console.error("Error adding patient:", error.message);
    });
}

// Function to load patients from the database
function loadPatients() {
  const patientList = document.getElementById("patient-list");
  patientList.innerHTML = "";

  db.ref("patients").once("value", (snapshot) => {
    snapshot.forEach((childSnapshot) => {
      const patient = childSnapshot.val();
      const li = document.createElement("li");
      li.classList.add("details");
      li.innerHTML = `
              Name: ${patient.name} <br>
              Age: ${patient.age} <br>
              Gender: ${patient.gender} <br>
              Contact: ${patient.contact} <br>
              Address: ${patient.address}
          `;
      patientList.appendChild(li);
    });
  });
}

// Function to add a new appointment
function addAppointment() {
  const patientId = document.getElementById("patient-id").value;
  const appointmentTime = document.getElementById("appointment-time").value;

  if (!patientId || !appointmentTime) {
    alert("All fields are required");
    return;
  }

  const newAppointmentRef = db.ref("appointments").push();
  newAppointmentRef
    .set({
      patientId,
      appointmentTime,
    })
    .then(() => {
      console.log("Appointment added");
      loadAppointments();
    })
    .catch((error) => {
      console.error("Error adding appointment:", error.message);
    });
}

// Function to load appointments from the database
function loadAppointments() {
  const appointmentList = document.getElementById("appointment-list");
  appointmentList.innerHTML = "";

  db.ref("appointments").once("value", (snapshot) => {
    snapshot.forEach((childSnapshot) => {
      const appointment = childSnapshot.val();
      const li = document.createElement("li");
      li.classList.add("details");
      li.innerHTML = `
              Patient ID: ${appointment.patientId} <br>
              Appointment Time: ${appointment.appointmentTime}
          `;
      appointmentList.appendChild(li);
    });
  });
}

// Function to get appointment details
function getAppointmentDetails() {
  const appointmentId = document.getElementById("appointment-id").value;

  if (!appointmentId) {
    alert("Appointment ID is required");
    return;
  }

  db.ref("appointments")
    .child(appointmentId)
    .once("value", (snapshot) => {
      if (snapshot.exists()) {
        const appointment = snapshot.val();
        const li = document.createElement("li");
        li.classList.add("details");
        li.innerHTML = `
              Patient ID: ${appointment.patientId} <br>
              Appointment Time: ${appointment.appointmentTime}
          `;
        document.getElementById("appointment-history").appendChild(li);
      } else {
        alert("Appointment not found");
      }
    });
}

loadPatients();
loadAppointments();
