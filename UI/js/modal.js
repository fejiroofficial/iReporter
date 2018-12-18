const statusModal = document.getElementById('myModal');
const commentModal = document.getElementById('commentModal');
const locationModal = document.getElementById('locationModal');
const deleteModal = document.getElementById('deleteModal');

const statusBtn = document.getElementById('update-status-btn');
const commentBtn = document.getElementById('update-comment-btn');
const locationBtn = document.getElementById('update-location-btn');
const deleteBtn = document.getElementById('delete-btn');

const span = document.getElementsByClassName('close')[0];
const commentSpan = document.getElementsByClassName('close')[1];
const locationSpan = document.getElementsByClassName('close')[2];
const deleteSpan = document.getElementsByClassName('close')[3];
const messageStat = document.getElementsByClassName('messageDisplay')[0];
const messageDis = document.getElementsByClassName('messageDisplay')[1];
const messageDisLoc = document.getElementsByClassName('messageDisplay')[2];

function callStatusModal () {
  statusModal.style.display = 'block';
}

function callCommentModal () {
  commentModal.style.display = 'block';
}

function callLocationModal () {
  locationModal.style.display = 'block';
}

function callDeleteModal () {
  deleteModal.style.display = 'block';
}

function cancelStatusModal () {
  statusModal.style.display = 'none';
  messageStat.style.display = 'none';
}

function cancelCommentModal () {
  commentModal.style.display = 'none';
  messageDis.style.display = 'none';
}

function cancelLocationModal () {
  locationModal.style.display = 'none';
  messageDisLoc.style.display = 'none';
}

function cancelDeleteModal () {
  deleteModal.style.display = 'none';
}

window.onclick = (event) => {
  if (event.target == statusModal) {
    statusModal.style.display = 'none';
    messageStat.style.display = 'none';
  }
  if (event.target == commentModal) {
    commentModal.style.display = 'none';
    messageDis.style.display = 'none';
  }
  if (event.target == locationModal) {
    locationModal.style.display = 'none';
    messageDisLoc.style.display = 'none';
  }
  if (event.target == deleteModal) {
    deleteModal.style.display = 'none';
  }
};
