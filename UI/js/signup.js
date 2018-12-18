const signupForm = document.forms['signupForm'];
const fname = document.getElementById('sign-first');
const lname = document.getElementById('sign-last');
const uname = document.getElementById('sign-user');
const othername = document.getElementById('sign-other');
const mailSign = document.getElementById('log-email');
const tel = document.getElementById('sign-tel');
const passSign = document.getElementById('log-password');
const logModal = document.getElementById('log-info');

/** this is a function that tests for email input using regex*/
const testEmail = (email) => {
  const emailregex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  return emailregex.test(email);
};

/**
 * This method adds an event listener to the signup form button
 *
 * @method
 * @name addEventListener
 * @param {string} click browser event.
 * @param {function} function  the function to run when the event occurs
 * @returns {Object} data returned from the server
 */

signupForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const firstName = fname.value;
  const lastName = lname.value;
  const email = mailSign.value;
  const telephone = tel.value;
  const username = uname.value;
  const password = passSign.value;
  const othernames = othername.value; 

  if (!firstName || !lastName || !password || !email || !username) {
    logModal.style.display = 'block';
    return document.getElementById('modal-info').innerHTML = 'None of the fields can be empty';
  }

  if (!testEmail(email)) {
    logModal.style.display = "block";
    return document.getElementById('modal-info').innerHTML = 'Your Email is invalid!';
  }
  document.getElementById('log-loader').style.display = 'block';
  fetch('https://ireporter-app.herokuapp.com/api/v1/auth/signup', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({
      "firstname": firstName,
      "lastname": lastName,
      "othernames": othernames,
      "username": username,
      "email": email,
      "telephone": telephone,
      "password": password,
    })
  })
    .then(response => response.json())
    .then((data) => {
      console.log(data);
      document.getElementById('log-loader').style.display = 'none';
      logModal.style.display = "block";
      document.getElementById('modal-info').innerHTML = data.message;
      if (data.success === 'true') {
        localStorage.setItem('jwtoken', data.token);
        window.location.assign('home.html');
      }
    })
    .catch((err) => {
      console.log(err);
      if (err) {
        document.getElementById('log-loader').style.display = 'none';
        logModal.style.display = 'block';
        return document.getElementById('modal-info').innerHTML = 'Check your connection and try again.';
      }
    });
});

const loginSpan = document.getElementsByClassName('cancel-log')[0];
loginSpan.onclick = () => {
  logModal.style.display = 'none';
};
