import React from 'react';
import './App.css';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import { transformWithProjections } from 'ol/proj';

class MapApp extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            hasLocation: {},
            setLocation: [],
            center: this.props.center,
            species: this.props.species,
            blurb: ""
            }
        this.popupCheck = this.popupCheck.bind(this);
        
    }

    state = {
        // The map instance to use during cleanup
        map: null
    };

    popupCheck() {
        if(this.props.hasLocation === false) {
            this.state.blurb = "Yarr, this be placeholder text until you select a button!"
        } else if(this.props.hasLocation === true) {
            this.state.blurb = ""
        }  else if(this.props.sighting.description === "Imported by The Whale Museum.") {
            this.state.blurb = "Yarr, nothing special was described to the hotline for this sighting."
      }
    }

    componentWillUnmount() {
        // Cleanup after the map to avoid memory leaks when this component exits the page
        this.state.map.dispose();
    }

    render() {
        this.popupCheck();
        if (this.props.sighting.description === "Imported by The Whale Museum.") {
        this.state.blurb = "Yarr, nothing special was described to the hotline for this sighting. "
        
    }
    return(
        <div>
            <Map center={this.props.center} 
            zoom={this.props.zoom}
            latlng={this.props.latlng}
            >
            <TileLayer url='https://1.base.maps.ls.hereapi.com/maptile/2.1/maptile/newest/reduced.day/{z}/{x}/{y}/512/png8?apiKey=heA-6tHpjc3ORm31QRdJjsjT6VXwmduSS2ogj5jCP8Y&ppi=320'/>
            <Marker position={this.props.center} icon={this.props.icon} closeButton={true}>
                <Popup>
                <div className="popup">
                <p>
                `Captain's Log,<br />
                While steering my ship through the waters of the Pacific Northwest...
                <br />
                {this.state.blurb}
                {this.props.sighting.description} 
                <br />Warm Regards,<br /><br />
                <span>Captain Ahab VII</span>
                </p>
                </div>
                </Popup>
            </Marker>
            </Map>
        </div>
        )
    }
}

export default MapApp;
