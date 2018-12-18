function codeAddress() {
  const geocoder = new google.maps.Geocoder();
  const address = document.getElementById('pac-input').value;
  geocoder.geocode({ 'address': address }, (results, status) => {
    if (status == google.maps.GeocoderStatus.OK) {
      localStorage.setItem('latitude', results[0].geometry.location.lat());
      localStorage.setItem('longitude', results[0].geometry.location.lng()); 
    } else {
      document.getElementById('geo-dis').innerHTML = `*Geocode was not successful for the following reason: ${status}`
    }
  });
}

const input = document.getElementById('pac-input');

input.addEventListener('keyup', (event) => {
  event.preventDefault();
  if (event.keyCode === 13) {
    localStorage.removeItem('latitude');
    localStorage.removeItem('longitude');
    codeAddress();
  }
});

input.addEventListener('blur', (event) => {
  event.preventDefault();
  localStorage.removeItem('latitude');
  localStorage.removeItem('longitude');
  codeAddress();
});

