const parseJwt = (token) => {
  try {
    const base64HeaderUrl = token.split('.')[0];
    const base64Header = base64HeaderUrl.replace('-', '+').replace('_', '/');
    const headerData = JSON.parse(window.atob(base64Header));

    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    const dataJWT = JSON.parse(window.atob(base64));
    dataJWT.header = headerData;
    return dataJWT;
  } catch (err) {
    return false;
  }
}

/** this is a function that uploads user information when login is successful */

window.onload = () => {
  const token = localStorage.getItem('jwtoken');
  const redFlagTotal = localStorage.getItem('red-total');
  const redFlagDraft = localStorage.getItem('red-draft');
  const redFlagInvestigate = localStorage.getItem('red-investigation');
  const redFlagResolved = localStorage.getItem('red-resolved');
  const redFlagRejected = localStorage.getItem('red-rejected');

  const intTotal = localStorage.getItem('int-total');
  const intDraft = localStorage.getItem('int-draft');
  const intInvestigate = localStorage.getItem('int-investigation');
  const intResolved = localStorage.getItem('int-resolved');
  const intRejected = localStorage.getItem('int-rejected');

  if (!token) {
    window.location.assign('login.html');
  }
  const jwtDecoded = parseJwt(token);
  if (jwtDecoded) {
    const {
      firstname,
      lastname,
      othernames,
      email,
      telephone,
      username,
      profileImage,
      isAdmin,
    } = jwtDecoded;

    if (isAdmin === true) {
      localStorage.setItem('access-code', 'xyz')
    } else {
      localStorage.removeItem('access-code');
    }

    const userdp = document.getElementById('user-dp');
    userdp.style.background = `url(${profileImage}) no-repeat center center`;
    userdp.style.backgroundSize = 'cover';
    document.getElementsByClassName('username')[0].innerHTML = username;

    document.getElementsByClassName('username')[0].innerHTML = username;
    document.getElementById('screen-small-name').innerHTML = `
    <i class="fa fa-user-circle-o" id="user-circle"></i>${username}
    `;

    const bigProfileImg = document.getElementsByClassName('profile-img')[0];
    bigProfileImg.style.background = `url(${profileImage}) no-repeat center center`;
    bigProfileImg.style.backgroundSize = 'contain';

    document.getElementsByClassName('profile-name')[0].innerHTML = `${firstname} ${lastname} ${othernames}`;
    document.getElementsByClassName('profile-email')[0].innerHTML = email;
    document.getElementsByClassName('profile-telephone')[0].innerHTML = telephone;

    document.getElementsByClassName('inci-number-total')[0].innerHTML = redFlagTotal;
    document.getElementsByClassName('inci-number-draft')[0].innerHTML = redFlagDraft;
    document.getElementsByClassName('inci-number-investigate')[0].innerHTML = redFlagInvestigate;
    document.getElementsByClassName('inci-number-resolve')[0].innerHTML = redFlagResolved;
    document.getElementsByClassName('inci-number-reject')[0].innerHTML = redFlagRejected;

    document.getElementsByClassName('inci-number-total')[1].innerHTML = intTotal;
    document.getElementsByClassName('inci-number-draft')[1].innerHTML = intDraft;
    document.getElementsByClassName('inci-number-investigate')[1].innerHTML = intInvestigate;
    document.getElementsByClassName('inci-number-resolve')[1].innerHTML = intResolved;
    document.getElementsByClassName('inci-number-reject')[1].innerHTML = intRejected;
  }
};


const fileUpload = document.getElementById('uploader');
const imgPreview = document.getElementsByClassName('profile-img')[0];
const userdp = document.getElementById('user-dp');

fileUpload.addEventListener('change', (event) => {
  localStorage.removeItem('profileImageUrl');
  const file = event.target.files[0];
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'vgbqn9oe');
  imgPreview.style.background = 'url(https://res.cloudinary.com/fejiroofficial/image/upload/v1546585153/spin.gif) no-repeat center center';
  imgPreview.style.backgroundSize = 'auto';
  axios({
    url: 'https://api.cloudinary.com/v1_1/fejiroofficial/image/upload',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data: formData,
  })
    .then((response) => {
      localStorage.setItem('profileImageUrl', response.data.secure_url);
      imgPreview.style.background = `url(${response.data.secure_url}) no-repeat center center`;
      imgPreview.style.backgroundSize = 'cover';
      userdp.style.background = `url(${response.data.secure_url}) no-repeat center center`;
      userdp.style.backgroundSize = 'cover';
      
      const token = localStorage.getItem('jwtoken');
      const userId = localStorage.getItem('userId');
      fetch(`https://ireporter-app.herokuapp.com/api/v1/users/${userId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: token,
        },
        body: JSON.stringify({
          profileImage: response.data.secure_url,
        }),
      })
        .then(res => res.json())
        .then((data) => {
          if (data.success === 'true') {
            localStorage.setItem('jwtoken', data.token);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
});
