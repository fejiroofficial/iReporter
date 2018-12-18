const updateStatusBtn = document.getElementsByClassName('modal-btn')[0];
const updateCommentBtn = document.getElementsByClassName('modal-btn')[1];
const updateLocationBtn = document.getElementsByClassName('modal-btn')[2];
const deleteRecordBtn = document.getElementsByClassName('modal-btn')[3];
const incidentType = localStorage.getItem('type');
const incidentId = localStorage.getItem('id');
const userComment = document.getElementById('user-comment');
const incidentLocation = document.getElementById('my-address');
const messageDisplayStatus = document.getElementsByClassName('messageDisplay')[0];
const messageDisplay = document.getElementsByClassName('messageDisplay')[1];
const messageDisplayLocation = document.getElementsByClassName('messageDisplay')[2];
const underOption = document.getElementById('underIn');
const resolveOption = document.getElementById('resolve');
const rejectOption = document.getElementById('reject');


const redirectAfterDelete = (type) => {
  if (type === 'red-flag') {
    window.location.assign('redFlag.html');
  } else if (type === 'intervention')
    window.location.assign('interventions.html');
};

function codeAddress() {
  const geocoder = new google.maps.Geocoder();
  const address = incidentLocation.value;
  geocoder.geocode({ 'address': address }, (results, status) => {
    if (status == google.maps.GeocoderStatus.OK) {
      localStorage.setItem('latitude', results[0].geometry.location.lat());
      localStorage.setItem('longitude', results[0].geometry.location.lng());
    } else {
      document.getElementById('geo-dis').innerHTML = `*Geocode was not successful for the following reason: ${status}`
    }
  });
}

updateCommentBtn.addEventListener('click', (event) => {
  event.preventDefault();
  let url = '';
  const comment = userComment.value;
  const token = localStorage.getItem('jwtoken');

  if (incidentType === 'red-flag') {
    url = `https://ireporter-app.herokuapp.com/api/v1/red-flags/${incidentId}/comment`;
  }
  else if (incidentType === 'intervention') {
    url = `https://ireporter-app.herokuapp.com/api/v1/interventions/${incidentId}/comment`;
  }

  if (!comment) {
    messageDisplay.style.display = 'block';
    return messageDisplay.innerHTML = '*Please provide a comment';
  }

  if (comment.length > 255) {
    messageDisplay.style.display = 'block';
    return messageDisplay.innerHTML = '*Comment exceeds the maximum limit';
  }

  updateCommentBtn.style.backgroundColor = '#20b2aa63';
  fetch(url, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': token,
    },
    body: JSON.stringify({
      'comment': comment,
    })
  })
    .then(response => response.json())
    .then((responseObject) => {
      if (responseObject.message === 'Expired user authorization token') {
        window.location.assign('login.html');
      }

      updateCommentBtn.style.backgroundColor = 'lightseagreen';
      const recordFound = responseObject.data;

      if (responseObject.status === 200) {
        messageDisplay.style.display = 'block';
        messageDisplay.innerHTML = recordFound[0].message;
        document.getElementById('record-comment-input').innerHTML = recordFound[0].updated.comment;
        document.getElementById('commentModal').style.display = 'none';
      } else if (responseObject.status === 403) {
        messageDisplay.style.display = 'block';
        messageDisplay.innerHTML = responseObject.message;
      }
    })
    .catch((err) => {
      console.log(err);
    });
});


updateStatusBtn.addEventListener('click', (event) => {
  event.preventDefault();
  let status = '';
  let url = '';
  const token = localStorage.getItem('jwtoken');
  if (underOption.checked) {
    status = underOption.value;
  } else if (resolveOption.checked) {
    status = resolveOption.value;
  } else if (rejectOption.checked) {
    status = rejectOption.value;
  }

  if (incidentType === 'red-flag') {
    url = `https://ireporter-app.herokuapp.com/api/v1/red-flags/${incidentId}/status`;
  }
  else if (incidentType === 'intervention') {
    url = `https://ireporter-app.herokuapp.com/api/v1/interventions/${incidentId}/status`;
  }

  if (!status) {
    messageDisplayStatus.style.display = 'block';
    return messageDisplayStatus.innerHTML = '*Status has not been provided';
  }

  updateStatusBtn.style.backgroundColor = '#20b2aa63';
  fetch(url, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': token,
    },
    body: JSON.stringify({
      'status': status,
    }),
  })
    .then(response => response.json())
    .then((responseObject) => {
      if (responseObject.message === 'Expired user authorization token') {
        window.location.assign('login.html');
      }

      updateStatusBtn.style.backgroundColor = 'lightseagreen';
      const recordFound = responseObject.data;
      if (responseObject.status === 200) {
        messageDisplayStatus.style.display = 'block';
        messageDisplayStatus.innerHTML = recordFound[0].message;
        document.getElementById('record-status-input').innerHTML = recordFound[0].updated.status;
      }
    })
    .catch((err) => {
      console.log(err);
    });

});


updateLocationBtn.addEventListener('click', (event) => {
  event.preventDefault();
  const location = incidentLocation.value;
  let url = '';

  if (!location) {
    messageDisplayLocation.style.display = 'block';
    return messageDisplayLocation.innerHTML = '*Please provide a location';
  }

  if (incidentType === 'red-flag') {
    url = `https://ireporter-app.herokuapp.com/api/v1/red-flags/${incidentId}/location`;
  } else if (incidentType === 'intervention') {
    url = `https://ireporter-app.herokuapp.com/api/v1/interventions/${incidentId}/location`;
  }

  const codeAdd = codeAddress();

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

  updateLocationBtn.style.backgroundColor = '#20b2aa63';

  Promise.all([codeAdd, latitude, longitude])
    .then((values) => {

      const token = localStorage.getItem('jwtoken');

      fetch(url, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': token,
        },
        body: JSON.stringify({
          latitude: values[1],
          longitude: values[2],
        }),
      })
        .then(response => response.json())
        .then((responseObject) => {
          if (responseObject.message === 'Expired user authorization token') {
            window.location.assign('login.html');
          }

          updateLocationBtn.style.backgroundColor = 'lightseagreen';
          const recordFound = responseObject.data;
          
          if (responseObject.status === 200) {
            const longLat = `${values[1]},${values[2]}`;
            localStorage.setItem('location', longLat);
            messageDisplayLocation.style.display = 'block';
            messageDisplayLocation.innerHTML = recordFound[0].message;
            window.location.assign('incident_record.html');
          } else if (responseObject.status === 403) {
            messageDisplayLocation.style.display = 'block';
            messageDisplayLocation.innerHTML = responseObject.message;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    });
});

deleteRecordBtn.addEventListener('click', (event) => {
  event.preventDefault();
  const token = localStorage.getItem('jwtoken');
  let url = '';

  if (incidentType === 'red-flag') {
    url = `https://ireporter-app.herokuapp.com/api/v1/red-flags/${incidentId}`;
  } else if (incidentType === 'intervention') {
    url = `https://ireporter-app.herokuapp.com/api/v1/interventions/${incidentId}`;
  }

  deleteRecordBtn.style.backgroundColor = '#ce7a7a;';
  fetch(url, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': token,
    },
  })
    .then(response => response.json())
    .then((responseObject) => {
      if (responseObject.message === 'Expired user authorization token') {
        window.location.assign('login.html');
      }

      deleteRecordBtn.style.backgroundColor = 'red';
      if (responseObject.status === 200) {
        const recordType = responseObject.data[0].removed.type;
        redirectAfterDelete(recordType);
      }
    })
    .catch((err) => {
      console.log(err);
    });

});
