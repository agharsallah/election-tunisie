import React, { Component } from 'react';
import RegistrationMap from './RegistrationMap'
import YearToggle from './YearToggle';

import Translate from 'react-translate-component';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

class RegistrationRoot extends Component {
    constructor(props){
        super(props);
                this.state={SelectedYear:"2011"} ;
    }
    HandleYear (event){this.setState({SelectedYear:event.target.value})};
    render() {
    
    return(
        <div style={{position:"relative"}}>
            {/*<div className="munradio_all">
                <SelectField
                    floatingLabelText={<Translate content="RegistrationMap.ElectionYear"/>}
                    value={this.state.value}
                    onChange={this.handleChange.bind(this)}
                    style = {{width:"225px",marginLeft:"10px",float:"right"}}
                    floatingLabelStyle  ={{color:"#03a9f4",fontSize:"x-large",top:"30px"}}
                    labelStyle = {{color:"#ff5722",fontSize:"1.5vw"}}
                    iconStyle ={{fill:"#03a9f4",top:"10px",height:"65px",width:"40px"}}
                    >
                        <MenuItem value={"2011"} primaryText={<Translate content="RegistrationMap._2011"/>} />
                        <MenuItem value={"2014"} primaryText={<Translate content="RegistrationMap.parlimantary"/>} />
                </SelectField>
            </div>*/}
            <YearToggle HandleYear={this.HandleYear.bind(this)} />
             <RegistrationMap style={{position:"absolute"}} value={this.state.SelectedYear}/>
        </div>
    )
        
    }
}

export default RegistrationRoot;