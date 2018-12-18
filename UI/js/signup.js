const signupForm = document.forms['signupForm'];
const fname = document.getElementById('sign-first');
const lname = document.getElementById('sign-last');
const uname = document.getElementById('sign-user');
const othername = document.getElementById('sign-other');
const mailSign = document.getElementById('log-email');
const tel = document.getElementById('sign-tel');
const passSign = document.getElementById('log-password');
const logModal = document.getElementById('log-info');

const loadErrors = (errors) => {
  errors.forEach((error) => {
    logModal.style.display = 'block';
    document.getElementById('modal-info').innerHTML += `
    <ul>
      <li>${error}</li>
    </ul>
    `;
  });
};

/** this is a function that tests for email input using regex*/
const testEmail = (email) => {
  const emailregex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  return emailregex.test(email);
};

/**
 * This method adds an event listener to the signup form
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
  logModal.style.display = 'none';

  if (!firstName || !lastName || !password || !email || !username) {
    logModal.style.display = 'block';
    return document.getElementById('modal-info').innerHTML = 'None of the fields can be empty';
  }

  if (email.includes('@') && !testEmail(email)) {
    logModal.style.display = 'block';
    return document.getElementById('modal-info').innerHTML = 'Your Email is invalid!';
  }

  document.getElementById('log-loader').style.display = 'block';
  fetch('https://ireporter-app.herokuapp.com/api/v1/auth/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({
      'firstname': firstName,
      'lastname': lastName,
      'othernames': othernames,
      'username': username,
      'email': email,
      'telephone': telephone,
      'password': password,
    })
  })
    .then(response => response.json())
    .then((data) => {
      document.getElementById('log-loader').style.display = 'none';
      if (data.success === 'true') {
        localStorage.setItem('jwtoken', data.token);
        window.location.assign('home.html');
      } else if (data.errors) {
        const obj = data.errors;
        const errors = Object.values(obj);
        loadErrors(errors);
      } else {
        logModal.style.display = 'block';
        document.getElementById('modal-info').innerHTML = data.message;
      }
    })
    .catch((err) => {
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
