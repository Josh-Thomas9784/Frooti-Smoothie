document.addEventListener("DOMContentLoaded", () => {
  
  const firebaseConfig = {
    apiKey: "AIzaSyBUYKfMSXTLUb_HtTQ27vMe7i5AT3QXOCY",
    authDomain: "dev-comp-79d01.firebaseapp.com",
    projectId: "dev-comp-79d01",
    storageBucket: "dev-comp-79d01.firebasestorage.app",
    messagingSenderId: "182420290038",
    appId: "1:182420290038:web:74d0518bc8e97e2cf66fd7",
    measurementId: "G-0M2BJ99VG9"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const auth = firebase.auth();
  
  const loginBtn = document.getElementById("loginBtn");
  const profileIcon = document.getElementById("profileIcon");
  const logo = document.getElementById("logo");
  const about = document.getElementById("about");
  const menu = document.getElementById("menu");
  const rewards = document.getElementById("rewards");

  const loginBtn2 = document.getElementById("loginBtn2");
  
  // Google Auth Provider
  const provider = new firebase.auth.GoogleAuthProvider();
  
  // Sign In
  loginBtn.addEventListener("click", () => {
    auth.signInWithPopup(provider).catch((error) => {
      console.error("Login Error:", error);
    });
  });

  // Listen for auth state changes
  auth.onAuthStateChanged((user) => {
    if (user) {
      loginBtn.style.display = "none";
      profileIcon.src = user.photoURL;
      profileIcon.title = user.displayName;
      profileIcon.style.display = "block";
    } 
  });

    // Sign In
  loginBtn.addEventListener("click", () => {
    auth.signInWithPopup(provider).catch((error) => {
      console.error("Login Error:", error);
    });
  });

  // Listen for auth state changes
  auth.onAuthStateChanged((user) => {
    if (user) {
      loginBtn.style.display = "none";
      profileIcon.src = user.photoURL;
      profileIcon.title = user.displayName;
      profileIcon.style.display = "block";
    } 
  });

  
  



  // Redirect to profile page on click
  profileIcon.addEventListener("click", () => {
    window.location.href = "reward.html"; 
  });
  
  // Redirection pages 
  menu.addEventListener("click", () => {
    window.location.href = "menu.html"; 
  });
  
  about.addEventListener("click", () => {
    window.location.href = "about.html"; 
  });
  
  rewards.addEventListener("click", () => {
    window.location.href = "reward.html"; 
  });
  
  logo.addEventListener("click", () => {
    window.location.href = "index.html"; 
  });
});

// Contact form submission handler with confirmation popup
document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.querySelector('.mini-contact-form');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const email = this.querySelector('input[type="email"]').value;
      const message = this.querySelector('textarea').value;
      
      // Here you would typically send this data to your server
      
      // Show confirmation popup
      showContactConfirmation(email);
      
      // Clear the form
      this.reset();
    });
  }
});

// Function to show contact form confirmation popup
function showContactConfirmation(email) {
  // Create popup overlay
  const overlay = document.createElement('div');
  overlay.className = 'contact-confirmation-overlay';
  
  // Create popup content
  const content = document.createElement('div');
  content.className = 'contact-confirmation-content';
  content.innerHTML = `
    <div class="confirmation-icon">
      <i class='bx bx-check-circle'></i>
    </div>
    <h3>Message Sent!</h3>
    <p>Thank you for reaching out. We'll get back to you at <strong>${email}</strong> soon.</p>
    <button id="confirmationCloseBtn">Close</button>
  `;
  
  overlay.appendChild(content);
  document.body.appendChild(overlay);
  
  // Add animation classes
  setTimeout(() => {
    overlay.classList.add('active');
    content.classList.add('active');
  }, 10);
  
  // Close button event listener
  document.getElementById('confirmationCloseBtn').addEventListener('click', function() {
    overlay.classList.remove('active');
    content.classList.remove('active');
    
    // Remove from DOM after animation completes
    setTimeout(() => {
      document.body.removeChild(overlay);
    }, 300);
  });
  
  // Close when clicking outside
  overlay.addEventListener('click', function(event) {
    if (event.target === overlay) {
      overlay.classList.remove('active');
      content.classList.remove('active');
      
      // Remove from DOM after animation completes
      setTimeout(() => {
        document.body.removeChild(overlay);
      }, 300);
    }
  });
}

