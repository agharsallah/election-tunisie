import React, { Component } from 'react';
import Layout from './../shared_components/Layout.js'
import Card from './../shared_components/Card.js'
import Translate from 'react-translate-component';

class VizRoot extends Component {
    render() {
        const TBlankByDelegation = <Translate type="text" content="electiondata.TBlankByDelegation"/>
		const SBlankByDelegation = <Translate type="text" content="electiondata.SBlankByDelegation"/>
        const TballotState = <Translate type="text" content="electiondata.TballotState"/>
		const STballotState = <Translate type="text" content="electiondata.STballotState"/>
        const elecType = 'Parlimentary'
		const elecYear = '2014'
		const link = '/data/par14/'
        return (
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
						<h2 className="lefttitle" style={{  marginLeft:'1.3%'}}><Translate content="electiondata.invalidTitle"/> </h2>
						<Card position='col-md-4' title ={TballotState} subtitle={STballotState} imgsrc="img/All-Blank-ballots-by-delegation.png"  link="/viz/invalid" />					
						<Card position='col-md-4' title ={TballotState} subtitle={STballotState} imgsrc="img/All-Blank-ballots-by-delegation.png"  link="/viz/invalid"/>					
{/*						<Card position='col-md-4' title ={TBlankByDelegation} subtitle={SBlankByDelegation} imgsrc="img/Blank-ballots-by-delegation.png"   elecType={elecType} elecYear={elecYear} link={link} imageopacity="1"/>
*/}					</div>
            </div>
        );
    }
}

export default VizRoot;