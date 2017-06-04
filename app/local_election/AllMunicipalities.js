/*Maps of all Municipalities gathered : http://localhost:8080/municipalities/all*/
import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import {browserHistory} from 'react-router';
/*import gouvernorate_shape from "./data/gouvernorates_shape";
*///import municipalities_shape from "../../public/mun_data/municipalities_shape";
class AllMunicipalities extends Component{


	shouldComponentUpdate() {
		return false;
	}
/*--------------------------------------------------WHEN WE RECEIVE PROPS-------------------------------*/
	componentWillReceiveProps(nextProps) {
		var selectedetat=nextProps.value;
		this.mymap.remove()
		this.mymap = L.map(this.refs.map,{ zoomControl:false }).setView([35.00, 10.90], 7);

	L.tileLayer('https://api.mapbox.com/styles/v1/hunter-x/cixhpey8700q12pnwg584603g/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiaHVudGVyLXgiLCJhIjoiY2l2OXhqMHJrMDAxcDJ1cGd5YzM2bHlydSJ9.jJxP2PKCIUrgdIXjf-RzlA', {
   				maxZoom: 9,
				id: 'mapbox.streets',
				attribution:'http://bit.ly/2nkCQoy'
	}).addTo(this.mymap);
		

			function getColor(d) {
				switch(selectedetat){
					case 'old':
			        return d == "old"  ? '#808080' :
		                    'rgba(51, 51, 51, 0.1)';	 
			        break;
			        case 'new':
				        return (d == "new" || d =="new2015")  ? '#3aaf85' :
			                   'rgba(51, 51, 51, 0.1)';	
				        break;
			        case 'extended':
				        return d == "extended"  ? '#21759b' :
			                   'rgba(51, 51, 51, 0.1)';	
				        break;
			        default :
			        	return d == "old"  ? '#808080' :
					           (d == "new" || d =="new2015") ? '#3aaf85' :
					           d == "extended" ? '#21759b' :
					           'rgba(51, 51, 51, 0.1)';
				}

		}	
	    //--------style applied when mouse hover
		function highlightFeature(e) {
		    var layer = e.target;
		    layer.setStyle({
		        weight: 4,
		        color: 'white',
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
		
		//------------onEachfeature
		function onEachFeature_mun(feature, layer) {
		let mun_name = feature.properties.name_en;
       layer.bindTooltip(mun_name.charAt(0).toUpperCase()+ mun_name.slice(1),{ permanent: false})
					layer.on('click', function(e) {
				var map = e.target._map
				var link='/Municipalities/'+feature.properties.circ;
 				browserHistory.push(link);
        	});
		}
	
	var featuresLayer = new L.GeoJSON(g_districts, {
				style: style,
	}).addTo(this.mymap);
	
	var featuresLayer = new L.GeoJSON(g_mun_shapes, {
				style: stylemunicipality,
				onEachFeature:onEachFeature_mun
	}).addTo(this.mymap);


		function style(feature) {
			    return {
			        weight: 2,
			        color: 'black',
			        fillOpacity: 0
			    };
		}

		function stylemunicipality(feature) {
			    return {
		        fillColor: getColor(feature.properties.etat),
		        weight: 1,
		        opacity: 0.8,
		        color: 'black',
		        fillOpacity: 0.8
			    };
		}	




	}
	
	/*------------------------------------------WHAT FIRST LOADS IN THE MAP ---------------------------------------*/
	//-------this is where we're going to insert the map to the dom
	componentDidMount() {
	this.mymap = L.map(this.refs.map,{ zoomControl:false }).setView([35.00, 10.90], 7);
	L.tileLayer('https://api.mapbox.com/styles/v1/hunter-x/cixhpey8700q12pnwg584603g/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiaHVudGVyLXgiLCJhIjoiY2l2OXhqMHJrMDAxcDJ1cGd5YzM2bHlydSJ9.jJxP2PKCIUrgdIXjf-RzlA', {
   				maxZoom: 9,
				id: 'mapbox.streets',
				attribution:'http://bit.ly/2nkCQoy'
	}).addTo(this.mymap);
	
		var featuresLayer = new L.GeoJSON(g_districts, {
				style: style,
	}).addTo(this.mymap);
	var featuresLayer = new L.GeoJSON(g_mun_shapes, {
				style: stylemunicipality,
				onEachFeature:onEachFeature_mun
	}).addTo(this.mymap);
	
	function getColor(d) {
	    return d == "old"  ? '#808080' :
	           d == "new" ? '#3aaf85' :
	           d == "new2015" ? '#3aaf85' :
	           d == "extended" ? '#21759b' :
	                      'red';
	}

		function onEachFeature_mun(feature, layer) {
			let mun_name = feature.properties.name_en;
		layer.bindTooltip(mun_name.charAt(0).toUpperCase()+ mun_name.slice(1),{ permanent: false })
					layer.on('click', function(e) {
				var map = e.target._map
				var link='/Municipalities/'+feature.properties.circ;
 				browserHistory.push(link);
        	});
	}

	function style(feature) {
		    return {
			        weight: 3,
			        color: 'black',
			        fillOpacity: 0
		    };
	}	
	
	function stylemunicipality(feature) {
		    return {
		        fillColor: getColor(feature.properties.etat),
		        weight: 1,
		        opacity: 0.8,
		        color: 'black',
		        fillOpacity: 0.8
		    };
	}	
			function highlightFeature(e) {
		    var layer = e.target;
		    layer.setStyle({
		        weight: 4,
		        color: 'white',
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

	}//end component did mount
    
	render(){
		return(
			<div>
			<div id="mymap" ref="map" style ={{height:"550px",zIndex: "1"}} />
			</div>
		);
	}
};
export default AllMunicipalities
