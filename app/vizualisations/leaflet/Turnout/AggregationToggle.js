import React, { Component } from 'react';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import Paper from 'material-ui/Paper';
import Translate from 'react-translate-component';

class AggregationToggle extends Component {
    render() {
        return (
             <Paper zDepth={5}  className="munradio_all" style={{ left: "5%",top: "33%"}} >
                <h4 style={{marginLeft:"10px",marginBottom:"15px",fontWeight:"600",marginRight:"25px",width:"220px"}}>
                    {<Translate content="RegistrationMap.Agreggation"/>}
                </h4> 
	            <RadioButtonGroup onChange={this.props.HandleAggregation}  name="Agreggation" defaultSelected="delegation" style={{marginLeft:"10px"}} >
					<RadioButton
					labelStyle={{color:'black'}}
					value="delegation"
					label={<Translate content="RegistrationMap.Delegation"/>}
					 style={{marginTop:"7px"}}
					 />
					<RadioButton
					labelStyle={{color:'black'}}
					value="district"
					label={<Translate content="RegistrationMap.District"/>}				        
					style={{marginTop:"7px"}}
					/>
					<RadioButton
					labelStyle={{color:'black'}}
					value="VC"
					label={<Translate content="RegistrationMap.VC"/>}				        
					style={{marginTop:"7px"}}
					/>
				</RadioButtonGroup>
             </Paper>
        );
    }
}

export default AggregationToggle;