/**
*
* A Leaflet Plugin For minify coordinates to draw from geoJson
* by ProfItProject 
* Github Repo: https://github.com/ProfItProjectPlus/leaflet.geoutil
*
*/
(function () {
    'use strict';

   function GeoUtil() {
        this.version = '0.0.1'
    };

    var options = {
        roundMul: 20,
        offsetLat: 0
    };

    GeoUtil.prototype.setOptions = function (opt) {
        if (typeof opt === 'object') {
            if (typeof opt.roundMul === 'number') {
                options.roundMul = opt.roundMul;
            }
            if (typeof opt.offsetLat === 'number') {
                options.offsetLat = opt.offsetLat;
            }
        }
    };

    GeoUtil.prototype.geoJsonMinify = function (geojson) {
        for (var i = 0; i < geojson.features.length; i++) {
            var geometry = geojson.features[i].geometry;

            if (!geometry) {
                geometry = null;
                continue;
            }

            switch (geometry.type) {
                case 'Point':
                    geometry.coordinates = this.pointMinify(geometry.coordinates);
                    break;
                case 'LineString':
                    geometry.coordinates = this.coordinatesMinify(geometry.coordinates);
                    break;
                case 'MultiLineString':
                case 'Polygon':
                    geometry.coordinates[0] = this.coordinatesMinify(geometry.coordinates[0]);
                    break;
                case 'MultiPolygon':
                    for (var j = 0; j < geometry.coordinates.length; j++) {
                        geometry.coordinates[j][0] = this.coordinatesMinify(geometry.coordinates[j][0]);
                    }
                    break;
            }
        }
        return geojson;
    };


    function offsetLat(lat) {
        var result;
        if (lat >= 0)
            result = lat - options.offsetLat;
        else
            result = lat + 360 - options.offsetLat;
        return result;
    }

    GeoUtil.prototype.pointMinify = function (point) {
        var lat, lng;
        lat = point[0];
        lng = point[1];

        lat = Math.round(lat * options.roundMul) / options.roundMul;
        lng = Math.round(lng * options.roundMul) / options.roundMul;
        lat = offsetLat(lat);
        return [lat, lng];
    }

    GeoUtil.prototype.coordinatesMinify = function (coords) {
        var result = [];
        var point, ppoint, j = 0;
        for (var i = 0, icount = coords.length; i < icount; i++) {
            point = this.pointMinify(coords[i]);
            if (j == 0) {
                ppoint = point;
                result.push(point);
                j++;
            }
            else {
                if (ppoint[0] == point[0] && ppoint[1] == point[1]) {
                }
                else {
                    ppoint = point;
                    result.push(point);
                }
            }
        }
        return result;
    };

    // Export Node module
    if (typeof module === 'object' && typeof module.exports === 'object') {
        module.exports = GeoUtil;
    }

    var L = window.L || {};
    // Inject functionality into Leaflet
    L.GeoUtil = new GeoUtil();
})();