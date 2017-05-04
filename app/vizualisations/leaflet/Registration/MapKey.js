import React, { Component } from 'react';
const MapKey = (props)=>{
    const grades = props.grades;
    const getColor=props.getColor;

    return(
           <div className="infoLeg legend">
                <p style={{marginLeft:"10px"}}>Map Key</p>
                {grades.map(function(object, i){
                    const bg=getColor(object + 1)
                    return (
                            <div >
                                <i style={{background:bg}} ></i>
                                {(grades[i + 1] ? ('< ' + grades[i]): '+ '+grades[i]) }
                                <br/>
                            </div>
                        )
                })}
                <i style={{background:"#dddddd"}} ></i> {"inexistant"}
            </div>
    );
}
export default MapKey

{/*  
    {grades[i] + (grades[i + 1] ? ('-' + grades[i + 1]): '+') }
    }*/}