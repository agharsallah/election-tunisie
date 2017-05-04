/*All-Blank-ballots-by-delegation- All the Invalid*/
import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import Highchart from '../../shared_components/Highchart';
//import inexistant_delegation from'./data/inexistant_invalid_delegation_data'
//import existant_delegation from'./data/existant_invalid_delegation_data'
class InvalidVotes extends Component{
	//this will define whether the component should render or not 
	//this component should rerender only onetime

	shouldComponentUpdate() {
		return false;
	}
	
	/*------------------------------------------WHAT FIRST LOADS IN THE MAP ---------------------------------------*/
	//-------this is where we're going to insert the map to the dom
	componentDidMount() {
	this.mymap = L.map(this.refs.map).setView([35.00, 10.90], 7);
	L.tileLayer('https://api.mapbox.com/styles/v1/hunter-x/cixhpey8700q12pnwg584603g/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiaHVudGVyLXgiLCJhIjoiY2l2OXhqMHJrMDAxcDJ1cGd5YzM2bHlydSJ9.jJxP2PKCIUrgdIXjf-RzlA', {
   				maxZoom: 9,
				id: 'mapbox.streets'
	}).addTo(this.mymap);

	function getColor(d) {
	    return d > 10 ? '#000000' :
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
		 var invalidPercentage = feature.properties.canceledPercentage + feature.properties.blankPercentage ;
		 if ( isNaN(invalidPercentage)) {invalidPercentage="inexistant"}
	    return {
	        fillColor: getColor(invalidPercentage),
	        weight: 2,
	        opacity: 1,
	        color: 'white',
	        fillOpacity: 1
	    };
	}

	//------------onEachfeature
	function onEachFeature(feature, layer) {
		let invalidPercentage = (feature.properties.canceledPercentage + feature.properties.blankPercentage + feature.properties.spoiledPercentage);
		invalidPercentage=Number(invalidPercentage).toFixed(2);
		let invalid = feature.properties.canceled + feature.properties.blank + feature.properties.spoiled ;
		layer.bindPopup(feature.properties.NAME_EN +'</h4></br>'+invalid+' invalid (blank-spoiled-canceled) ballot'+'</br>'+invalidPercentage+'% invalid of total voters' );
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
            spaceWeight: 1,
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

	// -------method that we will use to update the control based on feature properties passed

		info.update = function (props) {
		    this._div.innerHTML =  (props ?
		        '<b>' + props.NAME_EN + '</b><br />' + props.canceled + ' invalid Ballot'+
 				<Highchart />
		        : '');
		    if (props) {
		    var cnt = 2; // Count of the array should be here
			var pntr = 0;
		   	return(Highcharts.chart(this._div, {
        chart: {
            type: 'bar'
        },
        title: {
            text: 'Votes Overview in '+ props.NAME_EN
        },
        labels: {
             overflow: 'justify'
        },
		colors: [
            '#2c7fb8','#000'
            ],
        plotOptions: {
            bar: {
                dataLabels: {
					style: {
						color: '#525151',
						fontWeight: 'bold',
						fontSize:'14px',
						fontStyle:'Helvetica'
					},
                    enabled: true,
                    formatter:function() 
					{
                        pntr++;
                        let invalid =  props.canceled + props.blank  ;
                        let invalidPercentage = (props.canceledPercentage + props.blankPercentage ).toFixed(2) ;
                        switch(pntr){

                        	case 1 :
                        	return invalid +' invalid ballot:  '+invalidPercentage+'%';
                        	break;
                        	case 2:
                        	return props.SigningVoters
                        }

					}
                }
            }
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'top',
            x: -80,
            y: 60,
            height:200,
            floating: true,
            borderWidth: 1,
            backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
            shadow: true
        },
        xAxis: {
            categories: ['Invalid Votes']
        },
        yAxis: {
            title: {
                text: 'value'
            }
        },
        series: [
        {	name: 'invalid',
            data: [props.canceled+props.blank]
        },
        {
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

	    div.innerHTML +='<p>invalid ballots Percentage </p>'
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

export default InvalidVotes