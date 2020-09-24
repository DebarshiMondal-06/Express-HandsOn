/* eslint-disable */
const locations = JSON.parse(document.getElementById('map').dataset.locations);
console.log(locations);


mapboxgl.accessToken = 'pk.eyJ1IjoiZGViYXJzaGktbW9uZGFsIiwiYSI6ImNrZmc2em55YzAydGwzM3A5ajZpdXZiMTcifQ.AZMzMD-SMUdjU1DPvn5vZg';
if (!mapboxgl.supported()) {
    alert('Your browser does not support Mapbox GL');
} else {
    var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v9',
        center: [-74.5, 40],
        zoom: 4
    });
}



