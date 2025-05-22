const firebaseConfig = {
  apiKey: "AIzaSyBUYKfMSXTLUb_HtTQ27vMe7i5AT3QXOCY",
  authDomain: "dev-comp-79d01.firebaseapp.com",
  projectId: "dev-comp-79d01",
  storageBucket: "dev-comp-79d01.firebasestorage.app",
  messagingSenderId: "182420290038",
  appId: "1:182420290038:web:74d0518bc8e97e2cf66fd7",
  measurementId: "G-0M2BJ99VG9"
};
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const logoutBtn = document.getElementById("logoutBtn");
const userInfo = document.getElementById("userInfo");

// Checks USER sign in
auth.onAuthStateChanged((user) => {
  if (user) {
    userInfo.innerHTML = `
      <p>Name: ${user.displayName}</p>
      <p>Email: ${user.email}</p>
      <img src="${user.photoURL}" width="100" style="border-radius: 50%;" />
    `;
  } else {
    // If no user is signed in, redirect to login page
    window.location.href = "index.html";
  }
});

// Log out
logoutBtn.addEventListener("click", () => {
  auth.signOut().then(() => {
    window.location.href = "index.html"; // Redirect to homepage
  });
});

