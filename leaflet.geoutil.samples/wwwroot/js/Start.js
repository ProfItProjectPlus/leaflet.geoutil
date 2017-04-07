(function () {

    var moscow = new L.LatLng(55.7504, 37.62302); // geographical point (longitude and latitude)
    var map = L.map('map').setView(moscow, 13);
    L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '&copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors', minZoom: 3, maxZoom: 20 }).addTo(map);
    map.attributionControl.setPrefix(''); // Don't show the 'Powered by Leaflet' text. Attribution overload
   
})();