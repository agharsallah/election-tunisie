import React, { Component } from 'react';
const SmallTitle = (props)=>{
    return(
        <div id="blue">
            <div className="container">
                 <div className="row centered">
                <h4> {props.title}</h4>
                 </div>
            </div>
        </div>
    );
}
export default SmallTitle