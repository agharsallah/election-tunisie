import React, { Component } from 'react';
import Layout from './../shared_components/Layout.js';
import Translate from 'react-translate-component';
import Mun_Radio_State from './../shared_components/Mun_Radio_State';
import Paper from 'material-ui/Paper';

import AllMunicipalities from './AllMunicipalities';
import MunicipalityMap from './MunicipalityMap';
class MunicipalitiesRoot extends Component {
    constructor(props){
		super(props);
				this.state={munstate:'all', arabicstyle:'hometitle', munMapTitle:'city'}
	}	
	changetomap(chosenRequest){
		var link='/Municipalities/'+chosenRequest;
 		browserHistory.push(link);
	}
	handleMunState (event){ 
        let value =event.target.value; 
        this.setState({munstate:value})
    };
    capitalizeFirstLetter(string) {
    	return string.charAt(0).toUpperCase() + string.slice(1);
	}
    render() {
        let city = this.props.params.municipalitymap;
        if (city=="Kébili"||city=="Tataouine")
			{var zoom = 8 }
		else if(city=="Monastir"||city=="BenArous"||city=="BenArous"||city=="Tunis"||city=="Manouba"){
			{var zoom = 10 }
		}
		else {var zoom = 9 }
      	switch (city){
            case 'all':
                return(
                    <div>
                    <Layout/>
                    <div id="blue">
                        <div className="container">
                            <div className="row centered">
                                {
                                this.state.munstate=="all"?<h4 ><Translate content="map.allcount"/></h4>:
                                this.state.munstate=="old"?<h4><Translate content="map.oldcount"/></h4>:
                                (this.state.munstate=="extended")?<h4  ><Translate content="map.extendedcount"/></h4>:
                                <h4  ><Translate content="map.newcount"/> </h4>
                                }  
                            </div>
                        </div>
                    </div>
                    <div  style={{position:"relative"}}>
                        
                        <Paper zDepth={5}  className="munradio_all"  style={{ left: "5%",top: "7%"}}  >
                            <Mun_Radio_State  handleMunState={this.handleMunState.bind(this)} />
                        </Paper>
                    <AllMunicipalities style={{position:"absolute",zIndex:"1"}} value={this.state.munstate}/>
                    </div>
                    </div>
                );
			break; 
			default:
                return(
                       <MunicipalityMap  style={{position:"absolute"}} value={this.state.munstate} munname={city} zoom={zoom}  />
                );
        }
               
    }
}

export default MunicipalitiesRoot;