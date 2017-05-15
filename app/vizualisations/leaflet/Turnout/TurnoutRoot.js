import React, { Component } from 'react';
import TurnoutMap from './TurnoutMap'
import YearToggle from './YearToggle';
import AggregationToggle from './AggregationToggle';
import ColorBrew from './dynamic color/ColorBrew';

import Translate from 'react-translate-component';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

class TurnoutRoot extends Component {
    constructor(props){
        super(props);
                this.state={SelectedYear:"2011",AggToggle:"Dlg",sets:["#9ecae1", "#639eca", "#3072b1", "#084594"]} ;
    }
    HandleYear (event){this.setState({SelectedYear:event.target.value})};
    HandleAggregation (event){this.setState({AggToggle:event.target.value})};
    GetSelectedSets(e){this.setState({sets:e});}
    render() {
    
    return(
        <div style={{position:"relative"}}>
            <YearToggle HandleYear={this.HandleYear.bind(this)} />
            <ColorBrew GetSelectedSets={this.GetSelectedSets.bind(this)}/>
            {/*<AggregationToggle HandleAggregation={this.HandleYear.bind(this)} />*/}
             <TurnoutMap style={{position:"absolute"}} value={this.state.SelectedYear} AggToggle={this.state.AggToggle} GetSelectedSets={this.state.sets} />
        </div>
    )
        
    }
}

export default TurnoutRoot;