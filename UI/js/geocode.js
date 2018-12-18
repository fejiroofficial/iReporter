function initialize() {
  const input = (document.getElementById('my-address'));
  const autocomplete = new google.maps.places.Autocomplete(input);
  autocomplete.setTypes(['geocode']);
  google.maps.event.addListener(autocomplete, 'place_changed', () => {
    const place = autocomplete.getPlace();
    if (!place.geometry) {
      return;
    }

    let address = '';
    if (place.address_components) {
      address = [
        (place.address_components[0] && place.address_components[0].short_name || ''),
        (place.address_components[1] && place.address_components[1].short_name || ''),
        (place.address_components[2] && place.address_components[2].short_name || '')
      ].join(' ');
    }
  });
}
function codeAddress() {
  geocoder = new google.maps.Geocoder();
  let address = document.getElementById('my-address').value;
  geocoder.geocode({ 'address': address }, (results, status) => {
    if (status == google.maps.GeocoderStatus.OK) {
      localStorage.setItem('latitude', results[0].geometry.location.lat());
      localStorage.setItem('longitude', results[0].geometry.location.lng());
    }
    else {
      document.getElementById('geo-dis').innerHTML = `Geocode was not successful for the following reason: ${status}`
    }
  });
}
google.maps.event.addDomListener(window, 'load', initialize);

const input = document.getElementById('my-address');

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
