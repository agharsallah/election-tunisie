import React, { Component } from 'react';
import RegistrationMap from './RegistrationMap'

import Translate from 'react-translate-component';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

class RegistrationRoot extends Component {
    constructor(props){
        super(props);
                this.state={value:"canceled"} ;
    }
    handleChange (event, index, value){this.setState({value})};
 
    render() {
    
    return(
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

             <RegistrationMap style={{position:"absolute"}} value={this.state.value}/>
        </div>
    )
        
    }
}

export default RegistrationRoot;