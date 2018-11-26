const display = document.getElementById('geo-dis');
function initialize() {
  const address = (document.getElementById('my-address'));
  const autocomplete = new google.maps.places.Autocomplete(address);
  autocomplete.setTypes(['geocode']);
  google.maps.event.addListener(autocomplete, 'place_changed', function () {
    var place = autocomplete.getPlace();
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
  let address = document.getElementById("my-address").value;
  geocoder.geocode({ 'address': address }, function (results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      document.getElementById('geo-dis').innerHTML =
       `<div>
            <div>Latitude: ${results[0].geometry.location.lat()}</div>
            <div>Longitude: ${results[0].geometry.location.lng()}</div>
       </div>
        `;
    }
    else {
      document.getElementById('geo-dis').innerHTML = `Geocode was not successful for the following reason: ${status}`
    }
  });
}
google.maps.event.addDomListener(window, 'load', initialize);
