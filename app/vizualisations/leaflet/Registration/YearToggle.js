import React, { Component } from 'react';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import Paper from 'material-ui/Paper';
import Translate from 'react-translate-component';

class YearToggle extends Component {
    render() {
        return (
             <Paper zDepth={5}  className="munradio_all" >
                <h4 style={{marginLeft:"10px",marginBottom:"15px",fontWeight:"600",marginRight:"25px"}}>
                    {<Translate content="RegistrationMap.ElectionYear"/>}
                </h4> 
	            <RadioButtonGroup onChange={this.props.HandleYear}  name="Electionyear" defaultSelected="2011" style={{marginLeft:"10px"}} >
					<RadioButton
					labelStyle={{color:'black'}}
					value="2011"
					label={<Translate content="RegistrationMap._2011"/>}
					 style={{marginTop:"7px"}}
					 />
					<RadioButton
					labelStyle={{color:'black'}}
					value="2014"
					label={<Translate content="RegistrationMap.parlimantary"/>}				        
					style={{marginTop:"7px"}}
					/>
					
				</RadioButtonGroup>
             </Paper>
        );
    }
}

export default YearToggle;