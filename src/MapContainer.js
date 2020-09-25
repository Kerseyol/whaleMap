import React from 'react';
import App from './App';
import './App.css';
// import DisplayMapClass from './DisplayMapClass';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import { map } from 'leaflet';

class MapContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        hasprops: {},
        setLocation: [],
        center: this.props.center
        }
    }
    

    geoUpdater() {
        this.state.center.splice(0, 1, this.state.setLocation[0])
        this.state.center.splice(1, 1, this.state.setLocation[1])
    }
        

    componentDidUpdate() {
        this.state.setLocation = [this.props.latitude, this.props.longitude];
        let setLocation = this.state.setLocation
        this.geoUpdater()
        console.log(this.state.setLocation[0])
        // map.flyTo([`{this.state.center}`])
        console.log(this.state.center)
    }

    render() {

        const hereTileUrl = 'https://1.base.maps.ls.hereapi.com/maptile/2.1/maptile/newest/reduced.day/{z}/{x}/{y}/512/png8?apiKey=heA-6tHpjc3ORm31QRdJjsjT6VXwmduSS2ogj5jCP8Y&ppi=320';
  
        // let setLocation = {centerLocation}
        let hasprops = this.props.hasprops;

        // function centerLocation() {
        //     if (hasprops = true) {
        //         console.log('hello')
        //     } else {
        //         console.log('goodbye');
        //     }
        // } 

            let selectedCoordinates = [(this.props.latitude), (this.props.longitude)]

        return(
            <div className="mapContainer">
            <Map
                center={this.state.center}
                // center={this.centerLocation}
                zoom={this.props.zoom}
            >
                <TileLayer
                    attribution="&copy; HERE 2020"
                    url={hereTileUrl}
                />
                <Marker position={this.state.center} />
            </Map>
            </div>
        )
    }
}

export default MapContainer;