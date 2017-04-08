(function () {

    var map = L.map('map').fitBounds([[81, -168], [45, 19]]);
    L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '&copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors', minZoom: 3, maxZoom: 20 }).addTo(map);
    map.attributionControl.setPrefix(''); // Don't show the 'Powered by Leaflet' text. Attribution overload
  

    // Minify geo data
    L.GeoUtil.geoJsonMinify(CentralFederalDistrict);
    L.GeoUtil.geoJsonMinify(NorthwesternFederalDistrict);
    L.GeoUtil.geoJsonMinify(SouthFederalDistrict);
    L.GeoUtil.geoJsonMinify(NorthCaucasusFederalDistrict);
    L.GeoUtil.geoJsonMinify(VolgaFederalDistrict);
    L.GeoUtil.geoJsonMinify(UralFederalDistrict);
    L.GeoUtil.geoJsonMinify(SiberianFederalDistrict);
    L.GeoUtil.geoJsonMinify(FarEasternFederalDistrict);


    var geojsonMarkerOptions = {
        radius: 4,
        fillColor: "#ff7800",
        color: "#000",
        weight: 1,
        opacity: 1,
        fillOpacity: 0.8
    };

    var geoDataLayer = L.geoJSON(CentralFederalDistrict, {
        style: function (feature) {
            switch (feature.properties.ref) {
                case 'ЦФО': return { "fillColor": "#FFFF80", weight: 1, opacity: 1, fillOpacity: 0.4 };
                case 'СЗФО': return { "fillColor": "#62D2C5", weight: 1, opacity: 1, fillOpacity: 0.4 };
                case 'ЮФО': return { "fillColor": "#FC8B8B", weight: 1, opacity: 1, fillOpacity: 0.4 };
                case 'СКФО': return { "fillColor": "#AA6CA6", weight: 1, opacity: 1, fillOpacity: 0.4 };
                case 'ПФО': return { "fillColor": "#37CE04", weight: 1, opacity: 1, fillOpacity: 0.4 };
                case 'ПФО': return { "fillColor": "#37CE04", weight: 1, opacity: 1, fillOpacity: 0.4 };
                case 'УФО': return { "fillColor": "#C7CB8F", weight: 1, opacity: 1, fillOpacity: 0.9 };
                case 'СФО': return { "fillColor": "#01BEE7", weight: 1, opacity: 1, fillOpacity: 0.9 };
                case 'ДФО': return { "fillColor": "#FECE2C", weight: 1, opacity: 1, fillOpacity: 0.4 };
            }
        },
        pointToLayer: function (feature, latlng) {
            return L.circleMarker(latlng, geojsonMarkerOptions);
        }
    }).addTo(map);

    geoDataLayer.addData(NorthwesternFederalDistrict);
    geoDataLayer.addData(SouthFederalDistrict);
    geoDataLayer.addData(NorthCaucasusFederalDistrict);
    geoDataLayer.addData(VolgaFederalDistrict);
    geoDataLayer.addData(UralFederalDistrict);
    geoDataLayer.addData(SiberianFederalDistrict);
    geoDataLayer.addData(FarEasternFederalDistrict);

    
    geoDataLayer.on('click', function onGeoDataLayerClick(e) {
        alert("You clicked the onMyLayerClick at " + e.latlng + " -> " + e.layer.feature.properties.name);
    });
})();