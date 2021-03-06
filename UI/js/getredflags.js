const defaultRecords = () => {
  localStorage.setItem('red-total', 0);
  localStorage.setItem('red-draft', 0);
  localStorage.setItem('red-investigation', 0);
  localStorage.setItem('red-resolved', 0);
  localStorage.setItem('red-rejected', 0);
}

const btn = (record) => {
  const title = record.title;
  const info = title.split(',', 3);
  localStorage.removeItem('location');
  localStorage.setItem('id', record.id);
  localStorage.setItem('type', info[0]);
  localStorage.setItem('location', `${info[1]},${info[2]}`);
  window.location.assign('incident_record.html');
};


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
  const url = 'https://ireporter-app.herokuapp.com/api/v1/red-flags';
  const displayRecord = document.querySelector('div.admin-container');

  const load = (records) => {
    const total = records.length;
    let draftCount = 0;
    let investigationCount = 0;
    let resolvedCount = 0;
    let rejectedCount = 0;
    records.forEach((record) => {
      const redFlagId = record.id;
      const comment = record.comment;
      const type = record.type;
      const profileImage = record.profile_image;
      const status = record.status;
      const firstname = record.firstname;
      const lastname = record.lastname;
      const location = record.location;
      const date = record.createdon;
      let color = '';

      if (status === 'resolved') {
        resolvedCount += 1;
        color = 'green';
      } else if (status === 'rejected') {
        rejectedCount += 1;
        color = 'red';
      } else if (status === 'under-investigation') {
        investigationCount += 1;
        color = 'yellow';
      } else {
        color = 'gray';
        draftCount += 1;
      }

      localStorage.setItem('red-total', total);
      localStorage.setItem('red-draft', draftCount);
      localStorage.setItem('red-investigation', investigationCount);
      localStorage.setItem('red-resolved', resolvedCount);
      localStorage.setItem('red-rejected', rejectedCount);

      const redFlagRecord = `
      <div class="case-file">
      <div class="imanager-user-dp" style="background-image:url(${profileImage})"></div>
      <div class="red-flag-icon"></div>
      <div class="uploader uploader-name uploader-name-x">${firstname} ${lastname}</div>
      <div class="uploader-date">${date}</div>
      <div class="display-comment">
        <p>${comment}</p>
      </div>
      <div class="admin-status-ch">
        status:
        <div class="status-collect">${status}
        <div class="status-color-collect" style="background-color:${color}"></div>
        </div>
        <div class="moredetails">
          For more details click 
          <button class="detail-btn" accesskey=${location} title=${type},${location} id=${redFlagId} onclick=btn(this)>here</button>
        </div>
      </div>
    </div>`;
      displayRecord.innerHTML += redFlagRecord;
    });
  };

  document.getElementById('log-loader').style.display = 'block';
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
      const records = responseObject.data;
      if (records.length !== 0) {
        load(records);
        document.getElementById('casee').style.display = 'none';
      } else {
        defaultRecords();
        document.getElementById('casee').style.display = 'block';
        document.getElementById('log-loader').style.display = 'none';
        document.getElementById('comment-parag').innerHTML = `*You have no red-flag record
        until you create one`;
      }
    })
    .catch((err) => {
      throw Error(err);
    });
});
