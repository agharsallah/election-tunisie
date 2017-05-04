import React, { Component } from 'react';

class PieChart extends Component {
    componentDidMount() {
       this.chart = new Highcharts[this.props.type || "Chart"]('container',{
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
        text: 'Browser market shares. January, 2015 to May, 2015'
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
                format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                style: {
                    color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                },
                connectorColor: 'silver'
            }
        }
    },
    series: [{
        name: 'Brands',
        data: [
            { name: 'Microsoft', y: 56.33 },
            {
                name: 'Chrome',
                y: 24.03,
                sliced: true,
                selected: true
            },
            { name: 'Firefox', y: 10.38 },
            { name: 'Safari', y: 4.77 }, { name: 'Opera', y: 0.91 },
            { name: 'Proprietary or Undetectable', y: 0.2 }
        ]
    }]
}
        );    
        
    }
    
    render() {
        return<div id="container" ref='container' style={{height:"350px",width:'400px',backgroundColor:"green"}}/>
                    
    }
}

export default PieChart;