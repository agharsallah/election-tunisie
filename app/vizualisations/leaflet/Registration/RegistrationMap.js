import React, { Component } from 'react';
import { Map, Popup, TileLayer, GeoJSON, FeatureGroup, Tooltip,LayersControl } from 'react-leaflet';
import Control from 'react-leaflet-control';
import MapKey from './MapKey.js';
import PieChart from './PieChart'
class RegistrationMap extends Component {
    constructor(props){
        super(props);
        this.state={registred:" ",potentialVoters:" ",name:" ",circname:" ",RegPer11:" ",destroy:false}
    }
    getColor(d) {
	    return d <= 40 ? '#000000' :
	           d < 50  ? '#2c7fb8' :
	           d < 60  ? '#81D4FA' :
	          isNaN(d) ? '#dddddd' :
	                      '#B2DFDB';
	}
    style(feature) {
        const RegPer11=((feature.properties.registred11*100)/(feature.properties.potentialVoters11));
        return {
            fillColor: this.getColor(RegPer11),
	        weight: 1.5,
	        opacity: 1,
	        fillOpacity: 1,
            color:'white'
	    };
	}
    highlightFeature(e) {
	    var layer = e.target;
        const property = layer.feature.properties;
        const RegPer11=((property.registred11*100)/(property.potentialVoters11));
        this.setState({RegPer11:RegPer11.toFixed(2),potentialVoters:property.potentialVoters11,registred:property.registred11,name:property.NAME_EN,circname:property.CIRC_Name,destroy:false});
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
        this.setState({registred:" ",potentialVoters:" ",circname:"",name:" ",RegPer11:" ",destroy:true});
	}
    render() {
        const position = [35.055360, 10.99795];
        const grades = [0,40, 50, 60 ];
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
                            <span>{this.state.name}</span>
                        </Tooltip>
                    </GeoJSON>
                    <Control position="topright" >
                       <PieChart name={this.state.name} circname={this.state.circname} registred={this.state.registred} potentialVoters={this.state.potentialVoters} RegPer11={this.state.RegPer11} destroy={this.state.destroy} />
                    </Control>
                    <Control position="bottomright" >
                        <MapKey grades={grades} getColor={this.getColor} />
                    </Control>

                </Map>
                
            </div>
        );
    }
}

export default RegistrationMap;