import React from 'react';

// mapbox imports
import mapboxgl from 'mapbox-gl/dist/mapbox-gl-csp';
// eslint-disable-next-line import/no-webpack-loader-syntax
import MapboxWorker from 'worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker';

// mapbox imports

mapboxgl.workerClass = MapboxWorker;
mapboxgl.accessToken = 'pk.eyJ1IjoiYXJ6eSIsImEiOiJja284d25iODAyNm1oMnJtYjVnZmllaG1zIn0.P8siHAbm84-8l4B0b723qg';

var map = new mapboxgl.Map({
  container: 'root',
  style: 'mapbox://styles/mapbox/streets-v10',
  center: [-122.662323, 45.523751], // starting position
  zoom: 12
});
// set the bounds of the map
var bounds = [[-123.069003, 45.395273], [-122.303707, 45.612333]];
map.setMaxBounds(bounds);

// initialize the map canvas to interact with later
var canvas = map.getCanvasContainer();

// an arbitrary start will always be the same
// only the end or destination will change
var start = [-122.662323, 45.523751];

// this is where the code for the next step will go
// create a function to make a directions request
function getRoute(end) {
    // make a directions request using cycling profile
    // an arbitrary start will always be the same
    // only the end or destination will change
    var start = [-122.662323, 45.523751];
    var url = 'https://api.mapbox.com/directions/v5/mapbox/cycling/' + start[0] + ',' + start[1] + ';' + end[0] + ',' + end[1] + '?steps=true&geometries=geojson&access_token=' + mapboxgl.accessToken;
  
    // make an XHR request https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest
    var req = new XMLHttpRequest();
    req.open('GET', url, true);
    req.onload = function() {
      var json = JSON.parse(req.response);
      var data = json.routes[0];
      var route = data.geometry.coordinates;
      var geojson = {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'LineString',
          coordinates: route
        }
      };
      // if the route already exists on the map, reset it using setData
      if (map.getSource('route')) {
        map.getSource('route').setData(geojson);
      } else { // otherwise, make a new request
        map.addLayer({
          id: 'route',
          type: 'line',
          source: {
            type: 'geojson',
            data: {
              type: 'Feature',
              properties: {},
              geometry: {
                type: 'LineString',
                coordinates: geojson
              }
            }
          },
          layout: {
            'line-join': 'round',
            'line-cap': 'round'
          },
          paint: {
            'line-color': '#3887be',
            'line-width': 5,
            'line-opacity': 0.75
          }
        });
      }
      // add turn instructions here at the end
    };
    req.send();
  }
  
  map.on('load', function() {
    // make an initial directions request that
    // starts and ends at the same location
    getRoute(start);
  
    // Add starting point to the map
    map.addLayer({
      id: 'point',
      type: 'circle',
      source: {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: [{
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'Point',
              coordinates: start
            }
          }
          ]
        }
      },
      paint: {
        'circle-radius': 10,
        'circle-color': '#3887be'
      }
    });
    // this is where the code from the next step will go
  });

class MapTrial extends React.PureComponent {
  constructor(props) {
      // in mapbox, long first, lat second
      super(props);
      this.state = {
        lng: -73.9896416,
        lat: 40.7410592,
        zoom: 12
      };
      this.mapContainer = React.createRef();
    }
    
    render() {
        
        
      const { lng, lat, zoom } = this.state;
      return (
      <div >
        <div className="sidebar">
          Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
        </div>
        <div ref={this.mapContainer} className="map-container" />
      </div>
      );
    }
}

export default MapTrial;

// if (map.getSource('route')) {
//     map.getSource('route').setData(geojson);
//   } else { // otherwise, make a new request
//     map.addLayer({
//       id: 'route',
//       type: 'line',
//       source: {
//         type: 'geojson',
//         data: {
//           type: 'Feature',
//           properties: {},
//           geometry: {
//             type: 'LineString',
//             coordinates: geojson
//           }
//         }
//       },
//       layout: {
//         'line-join': 'round',
//         'line-cap': 'round'
//       },
//       paint: {
//         'line-color': '#3887be',
//         'line-width': 5,
//         'line-opacity': 0.75
//       }
//     });
// }