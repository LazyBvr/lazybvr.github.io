function geolocate(map) {
    if (!navigator.geolocation) {
        alert('Geolocation not supported.');
        return;
    }
    navigator.geolocation.getCurrentPosition(
        p => map.setCenter({ lat: p.coords.latitude, lng: p.coords.longitude }),
        () => alert('Geolocation failed.')
    );
}

function geocode(platform, map, search) {
    platform.getGeocodingService().geocode(
        { searchText: search, jsonattributes: 1 },
        result => {
            let found = result.response.view[0].result;
            if (found.length == 0) {
                alert('No matches found.');
                return;
            }

            let pos = found[0].location.displayPosition;
            map.setCenter({ lat: pos.latitude, lng: pos.longitude });
            map.setZoom(17);
        },
        () => alert('Geocoding failed.')
    );
}

const platform = new H.service.Platform({
    apikey: 'J2_5ux3pq-xo63QXCXWIVllPVf8lXt4Nrr6ufozuyTA',
    useCIT: true,
    useHTTPS: true
});

const defaultLayers = platform.createDefaultLayers();
const map = new H.Map(document.getElementById('map'), defaultLayers.vector.normal.map);
map.addLayer(defaultLayers.vector.normal.traffic);

const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));
const ui = H.ui.UI.createDefault(map, defaultLayers);

const buttonGeolocate = document.getElementById('buttonGeolocate');
const buttonAddress = document.getElementById('buttonAddress');
const addressField = document.getElementById('address');

buttonGeolocate.addEventListener('click', () => geolocate(map));
buttonAddress.addEventListener('click', () => geocode(platform, map, addressField.value));