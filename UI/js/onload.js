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
  const statusBtn = document.getElementById('update-status');

  if (!token) {
    window.location.assign('login.html');
  }
  const jwtDecoded = parseJwt(token);
  if (jwtDecoded) {
    const {
      id,
      username,
      profileImage,
      isAdmin,
    } = jwtDecoded;

    if (isAdmin === true) {
      localStorage.setItem('access-code', 'xyz')
    } else {
      localStorage.removeItem('access-code');
    }

    localStorage.setItem('userId', id)
    const userdp = document.getElementById('user-dp');
    userdp.style.background = `url(${profileImage}) no-repeat center center`;
    userdp.style.backgroundSize = 'cover';
    document.getElementsByClassName('username')[0].innerHTML = username;
    document.getElementById('screen-small-name').innerHTML = `
    <i class="fa fa-user-circle-o" id="user-circle"></i>${username}
    `;
  }
};
