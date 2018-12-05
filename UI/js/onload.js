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
    const jwtDecoded = parseJwt(token);
    if (jwtDecoded) {
        console.log(jwtDecoded)
        const id = jwtDecoded.id;
        const firstname = jwtDecoded.firstname;
        const lastname = jwtDecoded.lastname;
        const othernames = jwtDecoded.othernames;
        const email = jwtDecoded.email;
        const telephone = jwtDecoded.telephone;
        const username = jwtDecoded.username;
        const defaultImage = jwtDecoded.profileImage;
        const isAdmin = jwtDecoded.isAdmin;
        const userdp = document.getElementById('user-dp');
        userdp.style.background = `url(${defaultImage}) no-repeat center center`;
        userdp.style.backgroundSize = 'contain';
        document.getElementsByClassName('account-circle-name')[0].innerHTML = username;
    }
};
