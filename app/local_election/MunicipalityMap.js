/*Map of municipality shape diffrent for each municipality*/
import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import {browserHistory} from 'react-router';
/*The name of municipality shapefiles is defined in the index file*/
//import shapes from "./mun_shapes.js";
import Translate from 'react-translate-component';

class MunicipalityMap extends Component{
	//this will define whether the component should render or not 
	//this component should rerender only onetime

	shouldComponentUpdate() {
		return false;
	}
/*--------------------------------------------------WHEN WE RECEIVE PROPS-------------------------------*/
	componentWillReceiveProps(nextProps) {
        let governourate_name=nextProps.munname
		let selectedetat=nextProps.value;
		const  zoom = nextProps.zoom;
		this.mymap.remove()
		this.mymap = L.map(this.refs.map,{ zoomControl:false }).setView([35.50, 10.00], zoom);

		L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-v9/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiaHVudGVyLXgiLCJhIjoiY2l2OXhqMHJrMDAxcDJ1cGlA',
					{maxZoom:11,minZoom:6,dragging:false}
					).addTo(this.mymap);
		
	/*		this.mymap.dragging.disable();
			this.mymap.scrollWheelZoom.disable();
			this.mymap.keyboard.disable();
			this.mymap.doubleClickZoom.disable();
			this.mymap.boxZoom.disable();*/

			function getColor(d) {
				switch(selectedetat){
					case 'old':
			        return d == "old"  ? '#808080' :
		                    'rgba(51, 51, 51, 0.1)';	 
			        break;
			        case 'new':
				        return d == "new"  ? '#3aaf85' :
								d == "new2015"  ? '#3aaf85' :
			                   'rgba(51, 51, 51, 0.1)';	
				        break;
						
			        case 'extended':
				        return d == "extended"  ? '#21759b' :
			                   'rgba(51, 51, 51, 0.1)';	
				        break;
			        default :
			        	return d == "old"  ? '#808080' :
					           d == "new" ? '#3aaf85' :
							   d == "new2015" ? '#3aaf85' :
					           d == "extended" ? '#21759b' :
					           'rgba(51, 51, 51, 0.1)';
				}

		}	
	    //--------style applied when mouse hover
		function highlightFeature(e) {
		    var layer = e.target;
		    layer.setStyle({
		        weight: 5,
		        color: '#666',
		        fillOpacity: 1
		    });

		    info.update(layer.feature.properties);
		    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
		        layer.bringToFront();
		    }
		}

		//--------style applied when mouseout
		function resetHighlight(e) {
	    	featuresLayer.resetStyle(e.target);
	    	 info.update();
		}

		//--------Style of the map
		function style(feature) {
		    return {
		        fillColor: getColor(feature.properties.etat),
		        weight: 2,
		        opacity: 1,
		        color: 'white',
		        fillOpacity: 1
		    };
		}	
		
		//------------onEachfeature
		function onEachFeature(feature, layer) {
		//let mun_name = feature.properties.name_en;
		let mun_name = feature.properties.name_en;
       layer.bindTooltip(mun_name.charAt(0).toUpperCase()+ mun_name.slice(1),{ permanent: false })
		//layer.bindTooltip(mun_name,{ permanent: false,direction:"right",className:"tooltipnamear" })

		layer.on({
		        mouseover: highlightFeature,
		        mouseout: resetHighlight
		    });
		}
	    var featuresLayer = new L.GeoJSON(window[governourate_name], {
	    		style: style,
				onEachFeature:onEachFeature
			}).addTo(this.mymap);
	    var draggable = new L.Draggable(this.mymap);
	draggable.disable();
	   
	    var info = L.control();

			info.onAdd = function (map) {
			    this._div = L.DomUtil.create('div', 'mun_map_legend'); // create a div with a class "info"
			    this.update();
			    return this._div;
			};

		// -------method that we will use to update the control based on feature properties passed

		info.update = function (props) {
		    this._div.innerHTML = (props ?
		        '<h4 class="mapInfoText"><b>' + props.name_en + '</b> have : </h4></br><h4 class="mapInfoText">' + props.seats + ' seats</h4>'+ '</br><h4 class="mapInfoText">' + props.citizens + ' citizen</h4>'+ '</br><h4 class="mapInfoText">' + props.area + ' km² of area</h4>'
		        : 'Hover over a state');
		    };


			info.addTo(this.mymap);


	}
	
	/*------------------------------------------WHAT FIRST LOADS IN THE MAP ---------------------------------------*/
	//-------this is where we're going to insert the map to the dom
	componentDidMount() {
	//console.log(this.props.MunAreaHover)
	const { zoom } = this.props
	let governourate_name=this.props.munname
	
	this.mymap = L.map(this.refs.map,{ zoomControl:false }).setView([35.50, 10.00], zoom);
	
	var map = this.mymap ;
	map.createPane('labels');
	map.getPane('labels').style.zIndex = 650;

	L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-v9/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiaHVudGVyLXgiLCJhIjoiY2l2OXhqMHJrMDAxcDJ1cGlA',
				{maxZoom:11,minZoom:3,dragging:false,pane: 'labels'}
				).addTo(this.mymap);
	
/*	    this.mymap.dragging.disable();
	    this.mymap.scrollWheelZoom.disable();
	    this.mymap.keyboard.disable();
	    this.mymap.doubleClickZoom.disable();
		this.mymap.boxZoom.disable();*/

		function getColor(d) {
	    return d == "old"  ? '#808080' :
	           d == "new" ? '#3aaf85' :
	           d == "new2015" ? '#3aaf85' :
	           d == "extended" ? '#21759b' :
	                      'red';
	}	
    //--------style applied when mouse hover
	function highlightFeature(e) {
	    var layer = e.target;
	    layer.setStyle({
	        weight: 5,
	        color: '#666',
	        dashArray: '',
	        fillOpacity: 1
	    });

	    info.update(layer.feature.properties);
	    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
	        layer.bringToFront();
	    }
	}

	//--------style applied when mouseout
	function resetHighlight(e) {
    	featuresLayer.resetStyle(e.target);
    	 info.update();
	}
	function clickfeature(e) {
		var layer = e.target;
		var map = layer._map
		//console.log(layer)
		var point = new L.Tooltip();
        point.setLatLng(layer.getBounds().getCenter());
        //console.log(point)
		map.fitBounds(point._latlng);
	}
	//--------Style of the map
	function style(feature) {
	    return {
	        fillColor: getColor(feature.properties.etat),
	        weight: 2,
	        opacity: 1,
	        color: 'white',
	        fillOpacity: 1
	    };
	}	
	
	//------------onEachfeature


	function onEachFeature(feature, layer) {
		let mun_name = feature.properties.name_en;
		layer.on('click', function(e) {
				var map = e.target._map
				/*map.fitBounds(layer.getBounds(),{animate:true});*/
					var link='/Municipality/'+mun_name;
					if (mun_name=="tabarka") {
						browserHistory.push(link);
					}
        });
        layer.bindTooltip(mun_name.charAt(0).toUpperCase()+ mun_name.slice(1),{ permanent: false })	    
		layer.on({
	        mouseover: highlightFeature,
	        mouseout: resetHighlight,
	    });
	}
        var featuresLayer = new L.GeoJSON(window[governourate_name], {
    		style: style,
			onEachFeature:onEachFeature
		}).addTo(this.mymap);
    	var info = L.control();
		info.onAdd = function (map) {
		    this._div = L.DomUtil.create('div', 'mun_map_legend'); // create a div with a class "info"
		    this.update();
		    return this._div;
		};

	// -------method that we will use to update the control based on feature properties passed
		info.update = function (props) {
		    this._div.innerHTML =  (props ?
		        '<h4 class="mapInfoText"><b>' + props.name_en + '</b> have : </h4></br><h4 class="mapInfoText">' + props.seats + ' seats</h4>'+ '</br><h4 class="mapInfoText">' + props.citizens + ' citizen</h4>'+ '</br><h4 class="mapInfoText" >' + props.area + ' km² of area</h4>'
		        : 'Hover over a municipality');
		    };

		info.addTo(this.mymap);
	}//end component did mount

	render(){
		return(
			<div>
			<div id="mymap" ref="map" style ={{height:'550',overflow:"hidden"}} />
			</div>
		);
	}
};

export default MunicipalityMap