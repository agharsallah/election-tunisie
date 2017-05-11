/*radio button component to change map colors based on the state : new extended or old*/

import React, { Component } from 'react';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import Translate from 'react-translate-component';

const Mun_Radio_State = (props)=>{
	return(
			<div className={props.style}>
	            <RadioButtonGroup onChange={props.handleMunState}  name="etatmun" defaultSelected="all" style={{marginLeft:"10px"}} >
					<RadioButton
					labelStyle={{color:'black'}}
					value="all"
					label={<Translate content="radioComp.all"/>}
					 style={{marginTop:"7px"}}
					 />
					<RadioButton
					labelStyle={{color:'#808080'}}
					value="old"
					label={<Translate content="radioComp.old"/>}				        
					style={{marginTop:"7px"}}
					/>
					<RadioButton
					labelStyle={{color:'#21759b'}}
					value="extended"
					label={<Translate content="radioComp.extended"/>}
					style={{marginTop:"7px"}}
					/>
					<RadioButton
					labelStyle={{color:'#3aaf85'}}
					value="new"
					label={<Translate content="radioComp.new"/>}
					style={{marginTop:"7px"}}
					/>
				</RadioButtonGroup>
	        </div>	
	);
}
export default Mun_Radio_State