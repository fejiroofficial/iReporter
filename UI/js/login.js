const signinForm = document.forms['sign-in-form'];
const mailLog = document.getElementById('log-email');
const passLog = document.getElementById('log-password');
const logModal = document.getElementById('log-info');

/**
 * This method adds an event listener to the signup form
 *
 * @method
 * @name addEventListener
 * @param {string} click browser event.
 * @param {function} function  the function to run when the event occurs
 * @returns {Object} data returned from the server
 */

signinForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const email = mailLog.value;
  const password = passLog.value;
  logModal.style.display = 'none';
  if (!email || !password) {
    logModal.style.display = 'block';
    return document.getElementById('modal-info').innerHTML = 'None of the fields can be empty';
  }
  
  document.getElementById('log-loader').style.display = 'block';
  fetch('https://ireporter-app.herokuapp.com/api/v1/auth/login', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({
      'email': email,
      'password': password,
    })
  })
    .then(response => response.json())
    .then((data) => {
      document.getElementById('log-loader').style.display = 'none';
      logModal.style.display = 'block';
      document.getElementById('modal-info').innerHTML = data.message;
      if (data.success === 'true') {
        localStorage.setItem('jwtoken', data.token);
        window.location.assign('home.html');
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
