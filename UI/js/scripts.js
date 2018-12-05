var slideIndex = 1;
showDivs(slideIndex);

function plusDivs(n) {
  showDivs(slideIndex += n);
}

function showDivs(n) {
  var i;
  var x = document.getElementsByClassName("mySlides");
  if (n > x.length) { slideIndex = 1 }
  if (n < 1) { slideIndex = x.length }
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
}
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