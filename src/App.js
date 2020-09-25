import React from 'react';
import axios from 'axios';
// import ReactDOM from 'react-dom';
import './App.css';
// import index from './index';
// import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
// import MapContainer from './MapContainer';
// import { get } from 'ol/proj';
import { preventDefault } from 'ol/events/Event';
import { map } from 'leaflet';
// import Source from 'ol/source/Source';
// import DisplayMapClass from './DisplayMapClass';
import MapApp from './MapApp';

class App extends React.Component {
  constructor(props) {
    super();
      this.state = {
        sighting: {},
        latlng: [],
          lat: [],
          lng: [],
        hasLocation: false,
        center: [47.300000, -128.149139],
        zoom: 4
      }

      this.handleClickEvent = this.handleClickEvent.bind(this);
      this.abridgeLat = this.abridgeLat.bind(this);
      this.abridgeLng = this.abridgeLng.bind(this);
      
  }

  abridgeLat(lat) {
    return Number.parseFloat(lat).toFixed(6);
  }
  
  abridgeLng(lng) {
      return Number.parseFloat(lng).toFixed(6);
  };
  
  handleClickEvent(e) {
    preventDefault(e);
    
    let species = (e.target.id);

    axios.get(`http://hotline.whalemuseum.org/api.json?species=${species}&limit=1`)
    .then((res) => {
      const sighting = res.data[0];
      this.setState({ 
        sighting: sighting,
        lat: Number(this.abridgeLat(sighting.latitude)),
        lng: Number(this.abridgeLng(sighting.longitude)),
        hasLocation: true,
        zoom: 7
      })
      this.state.latlng = [];
      this.state.latlng.push(this.state.lat);
      this.state.latlng.push(this.state.lng);
      this.state.center = [];
      this.state.center.push(this.state.lat);
      this.state.center.push(this.state.lng);
      let center = this.state.center
      let zoom = 6
      this.setState({ center, zoom })
    }); 
  }

  render() {

    let lat = Number(this.abridgeLat(this.state.lat));
    let lng = Number(this.abridgeLng(this.state.lng));
    let latlng = this.state.latlng
    let description = this.state.sighting.description;
    let type = this.state.sighting.species;
    let hasLocation = this.state.hasLocation; 
    let center = (this.state.center);
    const placeholder = [22.444454, -111.000054];
    let zoom = this.state.zoom
    let sighting = this.state.sighting
    
    return (
      <div>
        <h1>Testing</h1>
        <h2>Latest Whale Sighting: {type} {description}</h2>
        <h3>{this.state.lat} {this.state.lng}</h3>
        <button onClick={this.handleClickEvent} id="humpback">Humpback</button> 
        <button onClick={this.handleClickEvent} id="orca">Orca</button> 
        <button onClick={this.handleClickEvent} id="gray whale">Gray Whale</button> 
   
        <MapApp
        center={center}
        zoom={zoom}
        lat={lat}
        lng={lng}
        latlng={latlng}
        hasLocation={hasLocation}
        sighting={sighting}
        />
      </div>
      );
    }
    };
export default App;
// <MapContainer 
// center={placeholder}
// zoom={zoom}
// latitude={latitude}
// longitude={longitude}
// hasprops={hasprops}
// />