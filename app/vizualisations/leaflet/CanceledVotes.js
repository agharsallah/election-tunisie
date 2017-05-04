/* the blank - spoild - canceled aprt */
import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import Highchart from '../../shared_components/Highchart';
//import inexistant_delegation from'./data/inexistant_invalid_delegation_data'
//import existant_delegation from'./data/existant_invalid_delegation_data'
class CanceledVotes extends Component{
	//this will define whether the component should render or not 
	//this component should rerender only onetime

	shouldComponentUpdate() {
		return false;
	}
/*--------------------------------------------------WHEN WE RECEIVE PROPS-------------------------------*/
	componentWillReceiveProps(nextProps) {
		var parameter = nextProps.value;
		var stringGeojson = 'feature.properties.'+parameter ;
		this.mymap.remove()
		//console.log(parameter);
	
	this.mymap = L.map(this.refs.map).setView([35.00, 10.90], 7);
	L.tileLayer('https://api.mapbox.com/styles/v1/hunter-x/cixhpey8700q12pnwg584603g/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiaHVudGVyLXgiLCJhIjoiY2l2OXhqMHJrMDAxcDJ1cGd5YzM2bHlydSJ9.jJxP2PKCIUrgdIXjf-RzlA', {
   				maxZoom: 9,
				id: 'mapbox.streets'
	}).addTo(this.mymap);
	function getColor(d) {
	    return d > 10 ? 'black' :
	           d > 7  ? '#2c7fb8' :
	           d > 4  ? '#81D4FA' :
	           d > 1  ? '#B3E5FC' :
	           d == 'inexistant'? '#FFFFFF' :
	                      '#B2DFDB';
	}
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
	function resetHighlight(e) {
    	featuresLayer.resetStyle(e.target);
    	info.update();
	}
	function style(feature) {
	    return {
	        fillColor: getColor(feature.properties[parameter+"Percentage"]),
	        weight: 2,
	        opacity: 1,
	        color: 'white',
	        dashArray: '3',
	        fillOpacity: 1
	    };
	}	

	function onEachFeature(feature, layer) {
		console.log(feature.properties)
	    layer.bindPopup(feature.properties.NAME_EN +'</h4></br>'+feature.properties[parameter]+' '+parameter+' ballot'+'</br>'+feature.properties[parameter+"Percentage"]+'% '+parameter+' of total voters' );
		layer.on({
	        mouseover: highlightFeature,
	        mouseout: resetHighlight
	    });
	}
	//--------------ALL stripes Logic ------------
/*	 var bigStripes = new L.StripePattern({
            patternContentUnits: 'objectBoundingBox',
            patternUnits: 'objectBoundingBox',
            weight: 0.1,
            spaceWeight: 0.1,
            height: 0.2,
            angle: 45,
        });
        bigStripes.addTo(this.mymap);*/
		function styleinexistant(feature) {
			return {
				weight: 2,
				opacity: 1,
				color: 'white',
				fillOpacity: 1,
				fillPattern: "white"
			};
		}	
	//--------oneachfeaturefor inexistant
		function onEachFeatureinex(feature, layer) {
			layer.on({
				mouseover: highlightFeatureinex,
				mouseout: resetHighlightinex
			});
		}
		function resetHighlightinex(e) {
			featuresLayer2.resetStyle(e.target);
			infoinex.update();
		}
		function highlightFeatureinex(e) {
			var layer = e.target;
			layer.setStyle({
				weight: 3,
				color: '#666',
				fillOpacity: 1
			});
			infoinex.update(layer.feature.properties);
			if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
				layer.bringToFront();
			}
		}
		var infoinex = L.control();

		infoinex.onAdd = function (map) {
			this._div = L.DomUtil.create('div', 'infoinex'); // create a div with a class "info"
			this.update();
			return this._div;
		};
		infoinex.update = function (props) {
			this._div.innerHTML =  (props ?
				'<b>' + props.NAME_EN + ': inexistant data</b>' 
				: '');
		};
		infoinex.addTo(this.mymap);
	    var featuresLayer2 = new L.GeoJSON(g_inexistant_invalid_delegation, {
    		style: styleinexistant,
			onEachFeature:onEachFeatureinex
		}).addTo(this.mymap);	
    
	 //-----------Dynamic hover info
		var info = L.control();

		info.onAdd = function (map) {
		    this._div = L.DomUtil.create('div', 'infoLegend'); // create a div with a class "info"
		    this.update();
		    return this._div;
		};
    /*--custom legend on hover*/

    		info.update = function (props) {
		    this._div.innerHTML = (props ?<Highchart /> : '');
		    if (props) {
		    			var percentage = parameter+'Percentage' // create a variable to match the prtoperty in the geojson
					    console.log(percentage)
					    var cnt = 2; // Count of the array should be here
						var pntr = 0;
					   	return(Highcharts.chart(this._div, {
			        chart: {
			            type: 'bar'
			        },
			        title: {
			            text: parameter+' votes in '+ props.NAME_EN
			        },
			        labels: {
			             overflow: 'justify'
			        },
			        plotOptions: {
			            bar: {
			                dataLabels: {
			                    enabled: true,
			                    formatter:function() 
								{
			                        pntr++;
									var pcnt = (this.y);
			                        if(pntr !== cnt)
			                        {
			                            return  props[parameter] +' '+parameter +' ballot which represents '+props[percentage]+'%';
			                        }else{
			                            return props.SigningVoters ;
			                        }
								}
			                }
			            }
			        },
			        legend: {
			            layout: 'vertical',
			            align: 'right',
			            verticalAlign: 'top',
			            x: -40,
			            y: 80,
			            floating: true,
			            borderWidth: 1,
			            backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
			            shadow: true
			        },
			        xAxis: {
			            categories: ['Votes']
			        },
			        yAxis: {
			            title: {
			                text: 'Percentage'
			            }
			        },
			        series: [{
			            name: parameter,
			            data: [props[parameter]]
			        }, {
			            name: 'Total',
			            data: [props.SigningVoters]
			        }],
			        credits: false
			    })
			)
			}

		};
		info.addTo(this.mymap);

    var featuresLayer = new L.GeoJSON(g_existant_invalid_delegation, {
    		style: style,
			onEachFeature:onEachFeature
		}).addTo(this.mymap);

/*       var searchControl = new L.Control.Search({
    	layer:featuresLayer,
		propertyName: 'NAME_EN',
		circleLocation: false,
		moveToLocation: function(latlng, title, map) {
			//map.fitBounds( latlng.layer.getBounds() );
			var zoom = map.getBoundsZoom(latlng.layer.getBounds());
  			map.setView(latlng, zoom); // access the zoom
		}
	});
	searchControl.on('search:locationfound', function(e) {
		if(e.layer._popup)
			e.layer.openPopup();
	})
	this.mymap.addControl( searchControl );  //inizialize search control*/
    
    //Legend control feature;
    var legend = L.control({position: 'bottomright'});
		legend.onAdd = function (map) {

	    var div = L.DomUtil.create('div', 'infoLeg legend'),
	        grades = [0, 1, 4, 7, 10],
	        labels = [];

	    div.innerHTML +="<p>"+parameter+' ballots</p>'
	    // loop through our canceled intervals and generate a label with a colored square for each interval
	    for (var i = 0; i < grades.length; i++) {
	        div.innerHTML +=
	            '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
				 (grades[i + 1] ? grades[i]+'% &ndash; ' + grades[i + 1]+ ' % <br>' : '+'+grades[i]+'%');
	    }

	    return div;
	};

	legend.addTo(this.mymap);
	}
	
	/*------------------------------------------WHAT FIRST LOADS IN THE MAP ---------------------------------------*/
	//-------this is where we're going to insert the map to the dom
	componentDidMount() {
	this.mymap = L.map(this.refs.map).setView([35.00, 10.90], 7);
	 /*var stripes = new L.StripePattern(); stripes.addTo(this.mymap); */

	L.tileLayer('https://api.mapbox.com/styles/v1/hunter-x/cixhpey8700q12pnwg584603g/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiaHVudGVyLXgiLCJhIjoiY2l2OXhqMHJrMDAxcDJ1cGd5YzM2bHlydSJ9.jJxP2PKCIUrgdIXjf-RzlA', {
   				maxZoom: 9,
				id: 'mapbox.streets'
	}).addTo(this.mymap);


	function getColor(d) {
	    return d > 10 ? 'black' :
	           d > 7  ? '#2c7fb8' :
	           d > 4  ? '#81D4FA' :
	           d > 1  ? '#B3E5FC' :
	           d == 'inexistant'? '#FFFFFF' :
	                      '#B2DFDB';
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
		console.log("ccccccccccccc")
    	 info.update();
	}

	//--------Style of the map
	function style(feature) {
	    return {
	        fillColor: getColor(feature.properties.canceledPercentage),
	        weight: 2,
	        opacity: 1,
	        color: 'white',
	        dashArray: '3',
	        fillOpacity: 1
	    };
	}	
	
	//------------onEachfeature
	function onEachFeature(feature, layer) {
		layer.bindPopup(feature.properties.NAME_EN +'</h4></br>'+feature.properties.canceled+' canceled ballot'+'</br>'+feature.properties.canceledPercentage+'% canceled of total voters' );
	    layer.on({
	        mouseover: highlightFeature,
	        mouseout: resetHighlight
	    });
	}
    var featuresLayer = new L.GeoJSON(g_existant_invalid_delegation, {
    		style: style,
			onEachFeature:onEachFeature
		}).addTo(this.mymap);
    
    //-------------search feature
/*    var searchControl = new L.Control.Search({
    	layer:featuresLayer,
		propertyName: 'NAME_EN',
		circleLocation: false,
		moveToLocation: function(latlng, title, map) {
			//map.fitBounds( latlng.layer.getBounds() );
			var zoom = map.getBoundsZoom(latlng.layer.getBounds());
  			map.setView(latlng, zoom); // access the zoom
		}
	});
	searchControl.on('search:locationfound', function(e) {
		if(e.layer._popup)
			e.layer.openPopup();
	})
	this.mymap.addControl( searchControl );  //inizialize search control*/
    //--------------ALL stripes Logic ------------
/*	 var bigStripes = new L.StripePattern({
            patternContentUnits: 'objectBoundingBox',
            patternUnits: 'objectBoundingBox',
            weight: 0.1,
            spaceWeight: 0.1,
            height: 0.2,
            angle: 45,
        });
        bigStripes.addTo(this.mymap)*/;
		function styleinexistant(feature) {
			return {
				weight: 2,
				opacity: 1,
				color: 'white',
				fillOpacity: 1,
				fillPattern: "white"
			};
		}	
	//--------oneachfeaturefor inexistant
		function onEachFeatureinex(feature, layer) {
			layer.on({
				mouseover: highlightFeatureinex,
				mouseout: resetHighlightinex
			});
		}
		function resetHighlightinex(e) {
			featuresLayer2.resetStyle(e.target);
			infoinex.update();
		}
		function highlightFeatureinex(e) {
			var layer = e.target;
			layer.setStyle({
				weight: 3,
				color: '#666',
				fillOpacity: 1
			});
			infoinex.update(layer.feature.properties);
			if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
				layer.bringToFront();
			}
		}
		var infoinex = L.control();

		infoinex.onAdd = function (map) {
			this._div = L.DomUtil.create('div', 'infoinex'); // create a div with a class "info"
			this.update();
			return this._div;
		};
		infoinex.update = function (props) {
			this._div.innerHTML =  (props ?
				'<b>' + props.NAME_EN + ': inexistant data</b>' 
				: '');
		};
		infoinex.addTo(this.mymap);
	    var featuresLayer2 = new L.GeoJSON(g_inexistant_invalid_delegation, {
    		style: styleinexistant,
			onEachFeature:onEachFeatureinex
		}).addTo(this.mymap);	
    
    //-----------Dynamic hover info
		var info = L.control();

		info.onAdd = function (map) {
		    this._div = L.DomUtil.create('div', 'infoLegend'); // create a div with a class "info"
		    this.update();
		    return this._div;
		};

	// -------method that we will use to update the control based on feature properties passed

		info.update = function (props) {
		    this._div.innerHTML = (props ?<Highchart /> : '');
		    if (props) {
		    var cnt = 2; // Count of the array should be here
			var pntr = 0;
		   	return(Highcharts.chart(this._div, {
        chart: {
            type: 'bar'
        },
        title: {
            text: 'canceled votes in '+ props.NAME_EN
        },
        labels: {
             overflow: 'justify'
        },
        plotOptions: {
            bar: {
                dataLabels: {
                    enabled: true,
                    formatter:function() 
					{
                        pntr++;
						var pcnt = (this.y);
                        if(pntr !== cnt)
                        {
                            return  props.canceled +' canceled ballot which represents '+props.canceledPercentage+'%';
                        }else{
                            return props.SigningVoters ;
                        }
					}
                }
            }
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'top',
            x: -40,
            y: 80,
            floating: true,
            borderWidth: 1,
            backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
            shadow: true
        },
        xAxis: {
            categories: ['Votes']
        },
        yAxis: {
            title: {
                text: 'number'
            }
        },
        series: [{
            name: 'canceled',
            data: [props.canceled]
        }, {
            name: 'Total',
            data: [props.SigningVoters]
        }],
        credits: false
    })
)
}

		};

		info.addTo(this.mymap);

    //----------Legend control feature;
    var legend = L.control({position: 'bottomright'});
		legend.onAdd = function (map) {

	    var div = L.DomUtil.create('div', 'infoLeg legend'),
	        grades = [0, 1, 4, 7, 10],
	        labels = [];

	    div.innerHTML +='<p>Canceled ballots Percentage </p>'
	    // loop through our canceled intervals and generate a label with a colored square for each interval
	    for (var i = 0; i < grades.length; i++) {
	        div.innerHTML +=
	            '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +

				 (grades[i + 1] ? grades[i]+'% &ndash; ' + grades[i + 1]+ ' % <br>' : '+'+grades[i]+'%');
	    }

	    return div;
	};

	legend.addTo(this.mymap);
	
	}//end component did mount
	render(){
		return(
			<div>
			<div id="mymap" ref="map" style ={{height:'520px',zIndex: "1"}} />
			</div> 
		);
	}
};

export default CanceledVotes