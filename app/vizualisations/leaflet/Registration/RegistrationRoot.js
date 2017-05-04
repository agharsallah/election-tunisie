import React, { Component } from 'react';
import { Map, Popup, TileLayer, GeoJSON, FeatureGroup, Tooltip,LayersControl } from 'react-leaflet';
import Control from 'react-leaflet-control';
import MapKey from './MapKey.js';
import PieChart from './PieChart'
class RegistrationRoot extends Component {
    constructor(props){
        super(props);
        this.state={feature:""}
    }
    getColor(d) {
	    return d > 10000 ? '#000000' :
	           d > 5000  ? '#2c7fb8' :
	           d > 2500  ? '#81D4FA' :
	           d > 1000  ? '#B3E5FC' :
	           d == 'inexistant'? '#dddddd' :
	                      '#B2DFDB';
	}
    style(feature) {
	    return {
            fillColor: this.getColor(feature.properties.registred11),
	        weight: 1.5,
	        opacity: 1,
	        fillOpacity: 1,
            color:'white'
	    };
	}
    highlightFeature(e) {
	    var layer = e.target;
     this.setState({feature:layer.feature.properties.registred11});
    return layer.setStyle({
        weight: 3,
        color: '#666',
        dashArray: '',
        fillOpacity: 1
    });

	}
    resetFeature(e) {
	    var layer = e.target;
	    layer.setStyle({
	        weight: 2,
	    });
        this.setState({feature:""});
	}
    render() {
        const position = [35.055360, 10.99795];
        const grades = [1000, 2500, 5000, 10000 ];
        return (
            <div>
        <Map maxZoom={18} center={position} zoom={7} className="initialposition" style={{height:550,position:"relative",zIndex:0}}>
                    <TileLayer
                    url='https://api.mapbox.com/styles/v1/mapbox/streets-v10/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiaHVudGVyLXgiLCJhIjoiY2l2OXhqMHJrMDAxcDJ1cGd5YzM2bHlydSJ9.jJxP2PKCIUrgdIXjf-RzlA'
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    />
                    <GeoJSON data= {G_Pv_Parlimentary}   
                            style={this.style.bind(this)}    
                            onEachFeature={
                                (feature, layer) => {
                                    layer.bindPopup(feature.properties.NAME_EN);
                                    layer.on({mouseover: this.highlightFeature.bind(this)});
                                    layer.on({mouseout: this.resetFeature.bind(this)});
                                }
                            }
                    >
                        <Tooltip>
                            <span>{this.state.feature}</span>
                        </Tooltip>
                    </GeoJSON>
                    <Control position="topright" >
                       <PieChart/>
                    </Control>
                    <Control position="bottomright" >
                        <MapKey grades={grades} getColor={this.getColor} />
                    </Control>

                </Map>
                
            </div>
        );
    }
}

export default RegistrationRoot;