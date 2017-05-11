import React, { Component } from 'react';
import { Map, Popup, TileLayer, GeoJSON, FeatureGroup, Tooltip,LayersControl } from 'react-leaflet';
import Control from 'react-leaflet-control';
import MapKey from './MapKey.js';
import PieChart from './PieChart'
const { BaseLayer, Overlay } = LayersControl;

class RegistrationMap extends Component {
    constructor(props){
        super(props);
        this.state={GeoLayer:G_Pv_Parlimentary,ElectionYear:"2011",registred11:"",registred14:"",potentialVoters11:"",potentialVoters14:"",name:"",circname:"",RegPer11:"",RegPer14:"",destroy:true}
    }
    componentWillUnmount() {
        
    }
    
    componentWillReceiveProps(nextProps) {
        this.setState({ElectionYear:nextProps.value});
        if (nextProps.AggToggle=="delegation") {
            this.setState({GeoLayer:G_Pv_Parlimentary});
        }else if (nextProps.AggToggle=="district"){
            this.setState({GeoLayer:G_Pv_Parlimentary});
        }
    }
    
    getColor(d,c1) {
        if      (d > 60)      {return (c1[3]); }
        else if (d > 50)      {return (c1[2]);}
        else if (d>40)        {return (c1[1]);}
        else if (isNaN(d))    {return ('white')}
        else                  {return (c1[0]);}
	    
	}
    style(feature) {
        const RegPer11=((feature.properties.registred11*100)/(feature.properties.potentialVoters11));
        const RegPer14=((feature.properties.registred14*100)/(feature.properties.potentialVoters14));
        let RegistrationPercentage;
        (this.state.ElectionYear=="2011") ? (RegistrationPercentage = RegPer11) : (RegistrationPercentage = RegPer14)       
        return {
            fillColor: this.getColor(RegistrationPercentage,this.props.GetSelectedSets),
	        weight: 0.5,
		    opacity: 1,
            dashArray: '0',
		    color: 'white',
		    fillOpacity: 0.8
	    };
	}
    styleDistricts(feature) {
        return {
	        weight: 3,
			color: 'grey',
			fillOpacity: 0
	    };
	}
    highlightFeature(e) {
	    var layer = e.target;
        const property = layer.feature.properties;
        const RegPer11=((property.registred11*100)/(property.potentialVoters11));
        const RegPer14=((property.registred14*100)/(property.potentialVoters14));
    this.setState({RegPer11:RegPer11.toFixed(2),
                RegPer14:RegPer14.toFixed(2),
                potentialVoters11:property.potentialVoters11,
                potentialVoters14:property.potentialVoters14,
                registred11:property.registred11,
                registred14:property.registred14,
                name:property.NAME_EN,
                circname:property.CIRC_Name,
                destroy:false});
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
        this.setState({destroy:true});
	}
    render() {
        const position = [35.055360, 10.99795];
        const grades = [0,40, 50, 60 ];
        const GeoLayer = this.state.GeoLayer;
        return (
        <Map maxZoom={18} center={position} zoom={7} className="initialposition" style={{height:550,position:"relative",zIndex:0}}>
                    <GeoJSON data= {g_districts}  
                    style={this.styleDistricts.bind(this)}  
                    onEachFeature={
                        (feature, layer) => {
                            layer.bindTooltip(feature.properties.NAME_EN,{ permanent: true,className:"tooltipnamear",direction:"center" })
                        }    
                    }
                    />
                    <GeoJSON data= {GeoLayer}  
                            style={this.style.bind(this)}    
                            onEachFeature={
                                (feature, layer) => {
                                    layer.bindPopup(feature.properties.NAME_EN);
                                    layer.on({mouseover: this.highlightFeature.bind(this)});
                                    layer.on({mouseout: this.resetFeature.bind(this)});
                                }
                            }
                    >
                        {/*<Tooltip>
                            <span>{this.state.name}</span>
                        </Tooltip>*/}
                    </GeoJSON>
                    
                    <div className="two-elm-container">
                    
                     <Control position="topright"  >
                       {(this.state.destroy==false)?<PieChart ElectionYear={this.state.ElectionYear} name={this.state.name} circname={this.state.circname} registred14={this.state.registred14} registred11={this.state.registred11} potentialVoters14={this.state.potentialVoters14} potentialVoters11={this.state.potentialVoters11} RegPer11={this.state.RegPer11} RegPer14={this.state.RegPer14} destroy={this.state.destroy} />:<div></div>}
                    </Control>
                     
                    <LayersControl position="topright" className="one">
                        <BaseLayer checked name="OpenStreetMap.BlackAndWhite">
                                <TileLayer
                                attribution="Leaflet"
                                url="https://api.mapbox.com/styles/v1/hunter-x/cixhpey8700q12pnwg584603g/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiaHVudGVyLXgiLCJhIjoiY2l2OXhqMHJrMDAxcDJ1cGd5YzM2bHlydSJ9.jJxP2PKCIUrgdIXjf-RzlA"
                                />
                        </BaseLayer>
                        <BaseLayer  name="OpenStreetMap.Mapnik">
                            <TileLayer
                                attribution="Leaflet"
                            url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
                            />
                        </BaseLayer>
                    </LayersControl>

                </div>

                    <Control position="bottomright" >
                            <MapKey grades={grades} getColor={this.getColor} selectedSet={this.props.GetSelectedSets} />
                    </Control>
        </Map>
        );
    }
}

export default RegistrationMap;