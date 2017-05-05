import React, { Component } from 'react';

class PieChart extends Component {
    constructor(props){
        super(props);
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.destroy==false){
         this.chart = new Highcharts[this.props.type || "Chart"]('container',{
                credits: {
                    enabled: false
                },
                chart: {
                            backgroundColor: {
                        linearGradient: [0, 0, 500, 500],
                        stops: [
                            [0, 'rgb(255, 255, 255)'],
                            [1, 'rgb(200, 200, 255)']
                        ]
                    },
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false,
                    type: 'pie'
                },
                title: {
                    text: nextProps.name +' ('+nextProps.circname+' )'
                },
                tooltip: {
                    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        dataLabels: {
                            enabled: true,
                            format: '{point.percentage:.1f} % <br/><br/> <br/> {point.l} Person',
                            distance: -50
                        },
                        showInLegend: true
                    }
                },
                series: [{
                    name: 'Brands',
                    data: [
                        {
                            name: 'Registered',
                            y: parseInt(nextProps.RegPer11),
                            l:nextProps.registred,
                            sliced: true,
                            selected: true
                        },
                        { name: 'Eligible non registered Voters',l:nextProps.potentialVoters, y: parseInt(100-nextProps.RegPer11)}
                    
                    
                    ]
                }]
            }
            );    
        }else{

        }
    }
 
    
    render() {
        return<div id="container" ref='container' style={{height:"380px",width:'400px'}}/>
                    
    }
}

export default PieChart;