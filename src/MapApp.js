import React from 'react';
import App from './App.js';
import './App.css';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import { map } from 'leaflet';
import L from 'leaflet';
import MapContainer from './MapContainer';

export const pointerIcon = new L.Icon({
  iconUrl: '../assets/galleon.svg',
  iconRetinaUrl: '../assets/galleon.svg',
  iconAnchor: [5, 55],
  popupAnchor: [10, -44],
  iconSize: [25, 55],
  shadowUrl: '../assets/galleon.svg',
  shadowSize: [68, 95],
  shadowAnchor: [20, 92],
})

class MapApp extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            hasLocation: {},
            setLocation: [],
            center: this.props.center,
            latlng: this.props.latlng
            }
    }

    // mapRef = React.createRef();

    state = {
        // The map instance to use during cleanup
        map: null
      };


      componentWillUnmount() {
        // Cleanup after the map to avoid memory leaks when this component exits the page
        this.state.map.dispose();
      }

    render() {

        return(
            <div>
 
            <Map center={this.props.center} 
                zoom={this.props.zoom}
                latlng={this.props.latlng}
            
            >
            <TileLayer url='https://1.base.maps.ls.hereapi.com/maptile/2.1/maptile/newest/reduced.day/{z}/{x}/{y}/512/png8?apiKey=heA-6tHpjc3ORm31QRdJjsjT6VXwmduSS2ogj5jCP8Y&ppi=320'/>
            <Marker position={this.props.center}>
            <Popup>
            {this.props.sighting.description} <br/> Yarr! Let's keep on the lookout for Toby Dick!
            </Popup>
            </Marker>
          
            </Map>
            
            </div>
        )
    }
}

export default MapApp;
