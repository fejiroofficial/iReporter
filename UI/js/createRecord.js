const createBtn = document.getElementById('report-btn');

const loadErrors = (errors) => {
  errors.forEach((error) => {
    infoModal.style.display = 'block';
    infoModal.innerHTML += `
    <ul>
      <li>${error}</li>
    </ul>
    `;
  });
};

createBtn.addEventListener('click', (event) => {
  event.preventDefault();
  const infoModal = document.getElementById('geo-dis');
  const comment = document.getElementById('user-comment').value;
  const address = document.getElementById('pac-input').value;
  const select = document.getElementById('styledSelect');
  const incidentType = select.options[select.selectedIndex].value;
  const imageFile = document.getElementById('files').value;
  let url = '';

  infoModal.style.display = 'none';
  if (!comment) {
    infoModal.style.display = 'block';
    return infoModal.innerHTML = '*Please provide a comment';
  }
  
  if (comment.length > 255) {
    infoModal.style.display = 'block';
    return infoModal.innerHTML = '*Comment exceeds the maximum limit';
  }

  if (!address) {
    infoModal.style.display = 'block';
    return infoModal.innerHTML = '*Location has not been provided';
  }

  if (incidentType === 'red-flag') {
    url = 'https://ireporter-app.herokuapp.com/api/v1/red-flags'
  }
  else if (incidentType === 'intervention') {
    url = 'https://ireporter-app.herokuapp.com/api/v1/interventions'
  }

  const latitude = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(localStorage.getItem('latitude'));
    }, 5000);
  }); 

  const longitude = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(localStorage.getItem('longitude'));
    }, 5000);
  }); 

  const image = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(localStorage.getItem('imageUrl'));
    }, 5000);
  }); 

  createBtn.style.backgroundColor = '#20b2aa63';

  Promise.all([image, latitude, longitude])
  .then((values) => {
    const token = localStorage.getItem('jwtoken');

    fetch(url, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': token,
      },
      body: JSON.stringify({
        'comment': comment,
        'latitude': values[1],
        'longitude': values[2],
        'image': values[0],
      })
    })
      .then(response => response.json())
      .then((data) => {
        createBtn.style.backgroundColor = 'lightseagreen';
        if (data.message === 'Expired user authorization token') {
          window.location.assign('login.html');
        }
        
        if (data.success === 'true') {
          infoModal.style.display = 'block';
          infoModal.style.color = 'green';
          infoModal.innerHTML = data.data[0].message;
        } else if (data.errors) {
          const obj = data.errors;
          const errors = Object.values(obj);
          loadErrors(errors);
        } else {
          infoModal.style.display = 'block';
          infoModal.innerHTML = data.message;
        }
  
      })
      .catch((err) => {
        if (err) {
          infoModal.style.display = 'block';
          infoModal.innerHTML = 'Check your connection and try again.';
        }
      });
  });
});
