import React from 'react';

// mapbox imports
import mapboxgl from 'mapbox-gl/dist/mapbox-gl-csp';
// eslint-disable-next-line import/no-webpack-loader-syntax


// mapbox imports






class Map extends React.PureComponent {
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
        const map = new mapboxgl.Map({
          container: 'map-container', // container ID
          style: 'mapbox://styles/mapbox/streets-v11', // style URL
          center: [-74.5, 40], // starting position [lng, lat]
          zoom: 9 // starting zoom
      })
        map.on('move', () => {
            let h = map.getCenter();
            console.log(h.lat.toFixed(4))
            this.setState({
              lng: map.getCenter().lng.toFixed(4),
              lat: map.getCenter().lat.toFixed(4),
              zoom: map.getZoom().toFixed(2)
            });
        });

        let getRoute = ()=> {
            // make a directions request using cycling profile
            // an arbitrary start will always be the same
            // only the end or destination will change
            var end = [-73.9896416, 40.7410592];
            var start = [-73.8891016, 40.7410592];
            var url = 'https://api.mapbox.com/directions/v5/mapbox/cycling/' + start[0] + ',' + start[1] + ';' + end[0] + ',' + end[1] + '?steps=true&geometries=geojson&access_token=' + mapboxgl.accessToken;
            fetch(url).then(resp=>resp.json()).then(json=>{
                let data = json.routes[0];
                let route = data.geometry.coordinates;
                let geojson = {
                    type: 'Feature',
                    properties: {},
                    geometry: {
                        type: 'LineString',
                        coordinates: route
                    }
                }
                console.log(geojson)

    
                console.log('about to addsource')
            map.addSource('route', {
            'type': 'geojson',
            'data': {
            'type': 'Feature',
            'properties': {},
            'geometry': {
            'type': 'LineString',
            'coordinates': [
            [-122.483696, 37.833818],
            [-122.483482, 37.833174],
            [-122.483396, 37.8327],
            [-122.483568, 37.832056],
            [-122.48404, 37.831141],
            [-122.48404, 37.830497],
            [-122.483482, 37.82992],
            [-122.483568, 37.829548],
            [-122.48507, 37.829446],
            [-122.4861, 37.828802],
            [-122.486958, 37.82931],
            [-122.487001, 37.830802],
            [-122.487516, 37.831683],
            [-122.488031, 37.832158],
            [-122.488889, 37.832971],
            [-122.489876, 37.832632],
            [-122.490434, 37.832937],
            [-122.49125, 37.832429],
            [-122.491636, 37.832564],
            [-122.492237, 37.833378],
            [-122.493782, 37.833683]
            ]
            }
            }
            });
            console.log('done addsource')
            map.addLayer({
            'id': 'route',
            'type': 'line',
            'source': 'route',
            'layout': {
            'line-join': 'round',
            'line-cap': 'round'
            },
            'paint': {
            'line-color': '#888',
            'line-width': 8
            }
            });

            })
        }
       
// ___________________________________________________________________
      return (
      <div >
        <div className="sidebar">
          Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
        </div>
        {/* <div ref={this.mapContainer} className="map-container" /> */}
        <button onClick={getRoute}>CLICK ME </button>
        <button onClick={()=>console.log(map)}>CLICK ME 2 </button>
      </div>
      );
    }
}

export default Map;