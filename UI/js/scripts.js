/* Open when someone clicks on the span element */
function openNav() {
  document.getElementById("myNav").style.width = "100%";
}

/* Close when someone clicks on the "x" symbol inside the overlay */
function closeNav() {
  document.getElementById("myNav").style.width = "0%";
}

/* navigate to login page */
function goLogin() {
  window.location.assign('login.html');
}

/* navigate to sign up page */
function goSignup() {
  window.location.assign('signup.html');
}

/* navigate to home page */
function goHome() {
  window.location.assign('home.html');
}

/* navigate to profile page */
function goProfile() {
  window.location.assign('profile.html');
}

/* navigate to profile page */
function goReport() {
  window.location.assign('report.html');
}

function logOut() {
  localStorage.removeItem('jwtoken');
  window.location.assign('index.html');
}