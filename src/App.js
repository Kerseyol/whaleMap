import React from 'react';
import axios from 'axios';
import './App.css';
import { preventDefault } from 'ol/events/Event';
import MapApp from './MapApp';
import { shipIcon, humpbackIcon, orcaIcon, graywhaleIcon, dolphinIcon, pacificdolphinIcon, harborporpoiseIcon, harborsealIcon, northernsealIcon, seaotterIcon } from './icons';


class App extends React.Component {
  constructor(props) {
    super();
      this.state = {
        sighting: {},
        latlng: [],
          lat: [],
          lng: [],
          species: {},
        hasLocation: false,
        center: [47.300000, -128.149139],
        zoom: 4,
        icon: shipIcon
      }
      this.popup = React.createRef();
      this.handleClickEvent = this.handleClickEvent.bind(this);
      this.abridgeLat = this.abridgeLat.bind(this);
      this.abridgeLng = this.abridgeLng.bind(this);
      this.setIcon = this.setIcon.bind(this);
      this.scrollMap = this.scrollMap.bind(this);
      this.scrollBack = this.scrollBack.bind(this);
    }

  abridgeLat(lat) {
    return Number.parseFloat(lat).toFixed(6);
  }
  
  abridgeLng(lng) {
      return Number.parseFloat(lng).toFixed(6);
  };

  closePopup(){
    this.popup.current.leafletElement.options.leaflet.map.closePopup();
}

  scrollMap() {
    document.getElementById('mapdiv').scrollTop = 0
  }

  scrollBack() {
    var buttonsTop = document.getElementById("buttonsID");
    buttonsTop.scrollIntoView({behavior: "smooth", block: "center", inline: "nearest"});
  }

  setIcon() {
    if( this.state.species === 'humpback' ) {
        this.state.icon = humpbackIcon
    } else if( this.state.species === 'orca' ) {
        this.state.icon = orcaIcon
    } else if(this.state.species === 'gray whale') {
      this.state.icon = graywhaleIcon
    } else if (this.state.species === 'atlantic white-sided dolphin'){
      this.state.icon = dolphinIcon
    } else if(this.state.species === 'pacific white-sided dolphin'){
      this.state.icon = pacificdolphinIcon
    } else if(this.state.species === 'harbor porpoise') {
      this.state.icon = harborporpoiseIcon
    } else if(this.state.species === 'harbor seal') {
      this.state.icon = harborsealIcon
    } else if(this.state.species === "northern elephant seal") {
      this.state.icon = northernsealIcon
    } else if(this.state.species === 'sea otter') {
      this.state.icon = seaotterIcon
    } else {
      this.state.icon = shipIcon
    }
  }

  handleClickEvent(e) {
    preventDefault(e);
    let species = (e.target.id);
    axios.get(`//hotline.whalemuseum.org/api.json?species=${species}&limit=1`)
    .then((res) => {
      const sighting = res.data[0];
      this.setState({ 
        sighting: sighting,
        lat: Number(this.abridgeLat(sighting.latitude)),
        lng: Number(this.abridgeLng(sighting.longitude)),
        hasLocation: true,
        zoom: 10,
        species: species,
      })
      this.state.latlng = [];
      this.state.latlng.push(this.state.lat);
      this.state.latlng.push(this.state.lng);
      this.state.center = [];
      this.state.center.push(this.state.lat);
      this.state.center.push(this.state.lng);
      let center = this.state.center
      let zoom = this.state.zoom
      this.setIcon();
      this.setState({ center, zoom, species });
      var mapElement = document.getElementById("mapdiv");
      mapElement.scrollIntoView({behavior: "smooth", block: "center", inline: "nearest"});
    }); 
  }

  render() {

    let lat = Number(this.abridgeLat(this.state.lat));
    let lng = Number(this.abridgeLng(this.state.lng));
    let latlng = this.state.latlng;
    let hasLocation = this.state.hasLocation; 
    let center = (this.state.center);
    let zoom = this.state.zoom
    let sighting = this.state.sighting
    let species = this.state.species
    let icon = this.state.icon

    return (
      <div className="main">
      <div className="titleBox">
      <div className="title">
        <h1>Avast, Ye Mateys! Here be a Whale Sighting App!</h1>
        </div>
        </div>
        <div className="explanationContainer">
        <div className="ship">
        
        </div>
        <div className="explanation">
        <h2>Instructions:</h2><br/>
        <h3>By selecting one of the buttons below, a call to the <span>Whale Hotline API</span> returns the most recent sighting of the selected species. <br /> This is then cross-referenced with the <span>HERE Map API</span> using the <span>React-Leaflet API.</span><br />
        Then, click the icon on the map for a description of the sighting as reported to the <span>Whale Hotline!</span></h3>
        </div>
        </div>
          <nav className="buttons" id="buttonsID">
            <div className="buttonBox">
            <button className="humpbackButton" onClick={this.handleClickEvent} id="humpback" />
            <h2>Humpback</h2> 
            </div>
            <div className="buttonBox">
            <button className="orcaButton" onClick={this.handleClickEvent} id="orca" />
            <h2>Orca</h2> 
            </div>
            <div className="buttonBox">
            <button className="grayWhaleButton" onClick={this.handleClickEvent} id="gray whale" />
            <h2>Gray Whale</h2> 
            </div>
            <div className="buttonBox">
            <button className="awsdButton" onClick={this.handleClickEvent} id="atlantic white-sided dolphin" /> 
            <h2>Atlantic White-Sided Dolphin</h2>
            </div>
            <div className="buttonBox">
            <button className="pwsdButton" onClick={this.handleClickEvent} id="pacific white-sided dolphin" />
            <h2>Pacific White-Sided Dolphin</h2> 
            </div>
            <div className="buttonBox">
            <button className="harborPorpoiseButton" onClick={this.handleClickEvent} id="harbor porpoise" /> 
            <h2>Harbor Porpoise</h2>
            </div>
            <div className="buttonBox">
            <button className="harborSealButton" onClick={this.handleClickEvent} id="harbor seal" />
            <h2>Harbor Seal</h2> 
            </div>
            <div className="buttonBox">
            <button className="nesButton" onClick={this.handleClickEvent} id="northern elephant seal" />
            <h2>Northern Elephant Seal</h2> 
            </div>
            <div className="buttonBox">
            <button className="seaOtterButton" onClick={this.handleClickEvent} id="sea otter" />
            <h2>Sea Otter</h2>
            </div>
            </nav>
            <div className="mapdiv" id="mapdiv">
            <MapApp
            center={center}
            zoom={zoom}
            lat={lat}
            lng={lng}
            latlng={latlng}
            hasLocation={hasLocation}
            sighting={sighting}
            species={species}
            icon={icon}
            />
            </div>
            <button onClick={this.scrollBack} id="scrollBackButton">Back to Buttons</button>
            <div className="thanksContainer">
              <div className="thanks">
              <p className="whaleThanks">Much thanks for the use of <span>The Whale Hotline API</span>,     documentation and site available at <a href="https://hotline.whalemuseum.org">hotline.whalemuseum.    org</a></p>
             <p className="HEREthanks">Additionally, much thanks for the use of <span>HERE maps API</span>,    available at <a href="https://developer.here.com/">https://developer.here.com/</a></p>
              <p className="leafletThanks">Finally, additional thanks to the <span>React Leaflet API</span> for     aiding in the use of the HERE maps API, availble at <a href="https://react-leaflet.js.org/">https://react-leaflet.js.org/</a></p>
              <p className="portfolioLink">Also, here is a link to <a href="http://www.oliverkersey.com">My Portfolio!</a></p>
              </div>
            </div>
          </div>
        );
      }
    };
export default App;