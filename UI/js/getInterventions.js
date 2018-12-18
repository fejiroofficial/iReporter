const defaultRecords = () => {
  localStorage.setItem('int-total', 0);
  localStorage.setItem('int-draft', 0);
  localStorage.setItem('int-investigation', 0);
  localStorage.setItem('int-resolved', 0);
  localStorage.setItem('int-rejected', 0);
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
  const url = 'https://ireporter-app.herokuapp.com/api/v1/interventions';
  const displayRecord = document.querySelector('div.admin-container');

  const load = (records) => {
    const total = records.length;
    let draftCount = 0;
    let investigationCount = 0;
    let resolvedCount = 0;
    let rejectedCount = 0;
    records.forEach((record) => {
      const interventionId = record.id;
      const interventionIcon = '../img/help-wanted.jpg';
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

      localStorage.setItem('int-total', total);
      localStorage.setItem('int-draft', draftCount);
      localStorage.setItem('int-investigation', investigationCount);
      localStorage.setItem('int-resolved', resolvedCount);
      localStorage.setItem('int-rejected', rejectedCount);

      const redFlagRecord = `
        <div class="case-file" id=${interventionId}>
        <div class="imanager-user-dp" style="background-image:url(${profileImage})"></div>
        <div class="intervention-icon"></div>
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
          <button class="detail-btn" accesskey=${location} title=${type},${location} id=${interventionId} onclick=btn(this)>here</button>
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
        document.getElementById('int-casee').style.display = 'none';
      } else {
        defaultRecords();
        document.getElementById('int-casee').style.display = 'block';
        document.getElementById('log-loader').style.display = 'none';
        document.getElementById('comment-parag').innerHTML = `*You have no intervention record
          until you create one`;
      }
    })
    .catch((err) => {
      throw Error(err);
    });
});
