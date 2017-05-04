import React, { Component } from 'react';
import {render} from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Layout from './shared_components/Layout.js'

//setting language support
import counterpart  from 'counterpart';
import Translate    from 'react-translate-component';
counterpart.registerTranslations('en',require('./../locales/en'));
counterpart.registerTranslations('fr',require('./../locales/fr'));
counterpart.registerTranslations('ar',require('./../locales/ar'));

export default class App extends Component {
    constructor(props) {
      super(props);

    }

 render() {
    return (
      <div>
        <Layout/>
        	<div id="headerwrap">
            <div className="container">
              <div className="row centered">
                <div className="col-lg-8 col-lg-offset-2">
                <h1>We Bring the Data</h1>
                <h2>You Analyse it </h2>
                </div>
              </div>
            </div>
          </div>
          <div className="container w">
            <div className="row centered">
              <br/>
              <br/>
              <div className="col-lg-4">
                <i className="fa fa-bar-chart"></i>
                <h4>Data</h4>
                <p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even believable.</p>
              </div>

              <div className="col-lg-4">
                <i className="fa fa-map-marker"></i>
                <h4>Maps</h4>
                <p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even believable.</p>
              </div>

              <div className="col-lg-4">
                <i className="fa fa-university"></i>
                <h4>Local Election</h4>
                <p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even believable.</p>
              </div>
            </div>
            <br/>
            <br/>
          </div>
      </div>
    );
  }
}