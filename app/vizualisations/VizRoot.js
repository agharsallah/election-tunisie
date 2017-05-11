import React, { Component } from 'react';
import Layout from './../shared_components/Layout.js'
import Card from './../shared_components/Card.js'
import Translate from 'react-translate-component';

import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';

import InvalidVotes from './leaflet/InvalidVotes';
import CanceledVotes from './leaflet/CanceledVotes';
import RegistrationRoot from './leaflet/Registration/RegistrationRoot';
import RegistrationSocioRoot from './Bubble/Registration/RegistrationSocioRoot';
class VizRoot extends Component {
    constructor(props) {
        super(props);
        this.state={value:"canceled"} ;
    }
    handleChange (event, index, value){this.setState({value})};
    render() {
        const TBlankByDelegation = <Translate type="text" content="electiondata.TBlankByDelegation"/>;
		const SBlankByDelegation = <Translate type="text" content="electiondata.SBlankByDelegation"/>;
        const TballotState = <Translate type="text" content="electiondata.TballotState"/>;
		const STballotState = <Translate type="text" content="electiondata.STballotState"/>;
        const TRegistration = <Translate type="text" content="electiondata.TRegistration"/>;
		const SRegistration = <Translate type="text" content="electiondata.SRegistration"/>;
		const link = '/viz/';
        const  viz = this.props.params.vizId;
        const invalidTranslation= "map."+this.state.value;

           switch (viz){
            case 'all':
                return(
                    <div>
                        <Layout/>
                        <div id="blue">
                                <div className="container">
                                    <div className="row centered">
                                    <h4> Various Vizualizations (delegation level)</h4>
                                    </div>
                                </div>
                            </div>
                        <div className='col-md-12' >
                        </div>
                        <div className='col-md-12' >
                                 <h2 className="lefttitle" style={{  marginLeft:'5%'}}><Translate content="electiondata.invalidTitle"/> </h2>
                                <Card position='col-md-4' title ={TballotState} subtitle={STballotState} imgsrc="invalid.png"  link={link} class="blog-card"  tag={["Elections","Parlimantary","",""]}/>					
                                <Card position='col-md-4' title ={TBlankByDelegation} subtitle={SBlankByDelegation} imgsrc="canceled.png"  link={link} class="blog-card alt" tag={["Elections","Parlimantary","",""]}/>					
                                <hr className="divider" />
                        </div>

                        <div className='col-md-12' >
                            <h2 className="lefttitle" style={{  marginLeft:'5%'}}><Translate content="electiondata.RegistrationTitle"/> </h2>
                            <Card position='col-md-4' title ={TRegistration} subtitle={SRegistration} imgsrc="registration.png"  link={link} class="blog-card" tag={["Elections","Parlimantary","NCA2011",""]}/>
                        </div>

                    </div>
                );
			    break; 
            case 'canceled':
                return(
                    <div>
                        <Layout/>
                        <div id="blue">
                            <div className="container">
                                <div className="row centered">
                                    <h4><Translate content={invalidTranslation}/></h4>
                                </div>
                            </div>
                        </div>
                        <div style={{position:"relative"}}>
                        <div className="munradio_all">
                            <SelectField
                                floatingLabelText={<Translate content="map.chooseParameter"/>}
                                value={this.state.value}
                                onChange={this.handleChange.bind(this)}
                                style = {{width:"200px",marginLeft:"10px",float:"right"}}
                                floatingLabelStyle  ={{color:"#03a9f4",fontSize:"x-large",top:"25px"}}
                                labelStyle = {{color:"#ff5722",fontSize:"xx-large"}}
                                iconStyle ={{fill:"#03a9f4",top:"10px",height:"47px",width:"65px"}}
                                >
                                    <MenuItem value={"canceled"} primaryText={<Translate content="map.canceledv"/>} />
                                    <MenuItem value={"blank"} primaryText={<Translate content="map.blankv"/>} />
                                    <MenuItem value={"spoiled"} primaryText={<Translate content="map.spoiledv"/>} />
                            </SelectField>
                        </div>
                            <CanceledVotes style={{position:"absolute"}} value={this.state.value}/>
                        </div>
                    </div>
                )
                break; 
             case 'invalid':
                return(
                    <div>
                        <Layout/>
                       <div id="blue">
                            <div className="container">
                                <div className="row centered">
                                    <h4><Translate content="map.invalid_title"/></h4>
                                </div>
                            </div>
                        </div>
                        <InvalidVotes/>
                    </div>
                )
                break; 
            case 'registration':
                return(
                    <div>
                        <Layout/>
                       <div id="blue">
                            <div className="container">
                                <div className="row centered">
                                    <h4><Translate content="map.registration_title"/></h4>
                                </div>
                            </div>
                        </div>
                        <RegistrationRoot/>
                    </div>
                )
                break;
                case 'bubble':
                    return(
                        <div>
                            <Layout/>
                        <div id="blue">
                                <div className="container">
                                    <div className="row centered">
                                        <h4>bubble</h4>
                                    </div>
                                </div>
                            </div>
                            <RegistrationSocioRoot/>
                        </div>
                    )
                    break; 
			default:
                console.log('err');
        }

    }
}

export default VizRoot;