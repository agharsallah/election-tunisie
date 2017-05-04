import React from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory,IndexRoute  } from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Home from './Home';
import VizRoot from './vizualisations/VizRoot';
import MunicipalitiesRoot from './local_election/MunicipalitiesRoot';
render((
    <MuiThemeProvider>
    <Router history={browserHistory}>
    <div>
        <Route  path="/" component={Home}/> 
        <Route path="/viz/:vizId" component={VizRoot}/>
        <Route path="/Municipalities/:municipalitymap" component={MunicipalitiesRoot}/>
        </div>
    </Router>
    </MuiThemeProvider>
    ),document.querySelector('#root'));