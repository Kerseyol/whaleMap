import React from 'react';
import App from './App.js';
import './App.css';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import { map } from 'leaflet';
import MapContainer from './MapContainer';

class DisplayMapClass extends React.Component {
    constructor(props) {
        super(props);

        this.attempt = this.attempt.bind(this);

    }

  mapRef = React.createRef();

  state = {
    // The map instance to use during cleanup
    map: null
  };

  attempt() {
    map.flyTo([40.737, -73.923], 8)
  }



  componentDidMount() {
    console.log("this is a thing")
    
    const H = window.H;
    const platform = new H.service.Platform({
        apikey: "heA-6tHpjc3ORm31QRdJjsjT6VXwmduSS2ogj5jCP8Y"
    });

    const defaultLayers = platform.createDefaultLayers();

    // Create an instance of the map
    const map = new H.Map(
      this.mapRef.current,
      defaultLayers.vector.normal.map,
      {
          center: { lat: 50, lng: 5 },
          zoom: 4,
          pixelRatio: window.devicePixelRatio || 1
        }
        );

    let map = L.map('map').setView([51.505, -0.09], 13);

    L.tileLayer('https://1.base.maps.ls.hereapi.com/maptile/2.1/maptile/newest/reduced.day/{z}/{x}/{y}/512/png8?apiKey=heA-6tHpjc3ORm31QRdJjsjT6VXwmduSS2ogj5jCP8Y&ppi=320', {
    attribution: 'HERE maps 2020',
    maxZoom: 18,
    tileSize: 512,
    zoomOffset: -1,
}).addTo(map);
    
          // MapEvents enables the event system
    // Behavior implements default interactions for pan/zoom (also on mobile touch environments)
    // This variable is unused and is present for explanatory purposes
    const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

    // Create the default UI components to allow the user to interact with them
    // This variable is unused
    const ui = H.ui.UI.createDefault(map, defaultLayers);

    this.setState({ map });

    
  }

  componentWillUnmount() {
    // Cleanup after the map to avoid memory leaks when this component exits the page
    this.state.map.dispose();
  }

  render() {
      
    return (
        <div className="mapApp">
        <button onClick={this.attempt}>Try Me!</button>
      <div ref={this.mapRef} style={{ height: "500px" }} />
      </div>
    );
  }
}



export default DisplayMapClass;