import React, { Component } from 'react';

class PieChart extends Component {
    constructor(props){
        super(props);
    }
    componentWillReceiveProps(nextProps) {
        let RegistrationPercentage,Rgistred,PotentialVoters11;
        if (nextProps.ElectionYear=="2011") {
            RegistrationPercentage=parseInt(nextProps.RegPer11);
            Rgistred=nextProps.registred11;
            PotentialVoters11=nextProps.potentialVoters11;
        }else{
            RegistrationPercentage=parseInt(nextProps.RegPer14);
            Rgistred=nextProps.registred14;
            PotentialVoters11=nextProps.potentialVoters14;
        }
        if (nextProps.destroy==false){
         this.chart = new Highcharts["Chart"]('container',{
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
                            y: RegistrationPercentage,
                            l:Rgistred,
                            sliced: true,
                            selected: true
                        },
                        { name: 'Eligible non registered Voters',l:PotentialVoters11, y: parseInt(100-RegistrationPercentage)}
                    
                    
                    ]
                }]
            }
            );    
        }else{
            this.chart.destroy();
        }
    }
 
    
    render() {
        return<div id="container" ref='container' style={{height:"380px",width:'400px'}}/>
                    
    }
}

export default PieChart;