const btn = (record) => {
  const title = record.title;
  const info = title.split(',', 3);
  localStorage.removeItem('location');
  localStorage.setItem('id', record.id);
  localStorage.setItem('type', info[0]);
  localStorage.setItem('location', `${info[1]},${info[2]}`);
  window.location.assign('incident_record.html');
};

function initMap() {
  const map = new google.maps.Map(document.getElementById('record-map-input'), {
    zoom: 13,
    center: { lat: 6.465422, lng: 3.406448 },
  });
  const geocoder = new google.maps.Geocoder;
  const infowindow = new google.maps.InfoWindow;

  geocodeLatLng(geocoder, map, infowindow);
}

function geocodeLatLng (geocoder, map, infowindow) {
  const input = localStorage.getItem('location');
  const latlngStr = input.split(',', 2);
  const latlng = { lat: parseFloat(latlngStr[0]), lng: parseFloat(latlngStr[1]) };
  geocoder.geocode({ 'location': latlng }, (results, status) => {
    if (status === 'OK') {
      if (results[0]) {
        map.setZoom(11);
        const marker = new google.maps.Marker({
          position: latlng,
          map,
        });
        infowindow.setContent(results[0].formatted_address);
        infowindow.open(map, marker);
      } else {
        window.alert('No results found');
      }
    } else {
      window.alert('Geocoder failed due to: ' + status);
    }
  });
}

/**
 * This method adds an event listener to the window object
 *
 * @method
 * @name addEventListener
 * @param {string} load browser event.
 * @param {function}  function  the function to run when the event occurs
 * @returns {Object} data returned from the server
 */

window.addEventListener('load', (event) => {
  event.preventDefault();
  const token = localStorage.getItem('jwtoken');
  let url = '';
  const displayRecord = document.querySelector('div.in-container');
  const textArea = document.getElementById('user-comment');

  const load = (record) => {
    const comment = record.comment;
    const type = record.type;
    const userPhoto = record.profile_image;
    let displayEvidence = '';
    const photoEvidence = record.image_url;
    const noEvidence = 'https://res.cloudinary.com/fejiroofficial/image/upload/v1546267148/J0Ik.gif';
    const status = record.status;
    const firstname = record.firstname;
    const lastname = record.lastname;
    const telephone = record.telephone;
    const email = record.email;
    const date = record.createdon;
    let statusBtnDisplay = '';
    let btnDisplay = '';
    const accessKey = localStorage.getItem('access-code');

    if ( accessKey && accessKey == 'xyz') {
      statusBtnDisplay = 'block';
      btnDisplay = 'none';
    }


    if (photoEvidence === '' || photoEvidence === null) {
      displayEvidence = noEvidence;
    } else {
      displayEvidence = photoEvidence;
    }

    const recordHTML = `
      <div class="profile-div-inline">
      <div class="profile-page-dp" id="user-prof-dp" style="background-image:url(${userPhoto})"></div>
    </div>
    <div class="record-table">
      <div class="record-type">
        Name:
        <div id="record-type-input">${firstname} ${lastname}</div>
      </div>
      <div class="table-seperator"></div>
      <div class="record-type">
        Email:
        <div id="record-type-input">${email}</div>
      </div>
      <div class="table-seperator"></div>
      <div class="record-type">
        Phone Number:
        <div id="record-type-input">${telephone}</div>
      </div>
      <div class="table-seperator"></div>
      <div class="record-type">
        Type:
        <div id="record-type-input">${type}</div>
      </div>
      <div class="table-seperator"></div>

      <div class="record-type">
        Date:
        <div id="record-type-input">${date}</div>
      </div>
      <div class="table-seperator"></div>

      <div class="record-type">
        Status:
        <div id="record-status-input">${status}</div>
        <button class="update-btn" id="update-status-btn" onclick="callStatusModal()" style="display:${statusBtnDisplay}">Edit</button>
      </div>
      <div class="table-seperator"></div>

      <div class="record-comment">
        Comment:
        <div id="record-comment-input">
          ${comment}
        </div>
        <button class="update-btn update-comment-btn" id="update-comment-btn" onclick='callCommentModal()' style="display:${btnDisplay}">Edit</button>
      </div>
      <div class="table-seperator"></div>

      <div class="record-comment">
        Photo Evidence:
        <div id="record-photo-input" style="background-image:url(${displayEvidence})"></div>
      </div>
      <div class="table-seperator"></div>

      <div class="record-comment">
        Location:
        <div id="record-map-input"></div>
        <button class="update-btn update-comment-btn" id="update-location-btn" onclick='callLocationModal()' style="display:${btnDisplay}">Edit</button>
      </div>
      <div class="table-seperator"></div>

      <div class="record-delete" style="display:${btnDisplay}">
        A record deleted cannot be retrieved
        <button class="delete-btn" id="delete-btn" onclick='callDeleteModal()'>Delete Record</button>
      </div>
    </div>
      `;
    displayRecord.innerHTML = recordHTML;
    textArea.innerHTML = comment;
  };

  const incidentType = localStorage.getItem('type');
  const id = localStorage.getItem('id');

  if (incidentType === 'red-flag') {
    url = `https://ireporter-app.herokuapp.com/api/v1/red-flags/${id}`;
  } else if (incidentType === 'intervention') {
    url = `https://ireporter-app.herokuapp.com/api/v1/interventions/${id}`;
  }

  fetch(url, {
    method: 'get',
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
      
      const recordFound = responseObject.data;
      load(recordFound);
      initMap();
    })
    .catch((err) => {
      console.log(err);
    });
});
