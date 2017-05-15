import React, { Component } from 'react';

class Bubble extends Component {
    constructor(props){
        super(props);
        this.state=({data:null})
    }
    
    componentWillMount() {
        var obj={};
        var tab=[]
        for (var i = 0; i <40; i++) {
            var element = G_BubbleData[i];
            obj.x=parseInt((element.activePer11).toFixed(2))
            obj.y=parseInt(element.illetracy)
            obj.z=parseInt(element.potentialVoters14)
            obj.name=(element.CIRC_Name)
            obj.dlg_name=(element.NAME_EN)
            tab.push(obj)
            obj = {};
        }
        this.setState({data:tab});
    }
    
    componentDidMount() {
        console.log(this.state.data)
                this.chart =new Highcharts["Chart"]('container', {

    chart: {
        type: 'bubble',
        plotBorderWidth: 1,
        zoomType: 'xy'
    },

    legend: {
        enabled: false
    },

    title: {
        text: 'Election and Socio'
    },

    subtitle: {
        text: 'Source: <a href="http://www.euromonitor.com/">INS</a> and <a href="https://data.oecd.org/">ISIE</a>'
    },

    xAxis: {
        gridLineWidth: 1,
        title: {
            text: 'Registration'
        },
        labels: {
            format: '{value} %'
        },
/*        plotLines: [    {
            color: 'black',
            dashStyle: 'dot',
            width: 2,
            value: 65,
            label: {
                rotation: 0,
                y: 15,
                style: {
                    fontStyle: 'italic'
                },
                text: 'Safe fat intake 65g/day'
            },
            zIndex: 3
        }]*/
    },

    yAxis: {
        startOnTick: false,
        endOnTick: false,
        title: {
            text: 'Internet Use'
        },
        
        labels: {
            format: '{value}'
        },
        maxPadding: 0.2,
/*        plotLines: [{
            color: 'black',
            dashStyle: 'dot',
            width: 2,
            value: 50,
            label: {
                align: 'right',
                style: {
                    fontStyle: 'italic'
                },
                text: 'Safe sugar intake 50g/day',
                x: -10
            },
            zIndex: 3
        }]*/
    },

    tooltip: {
        useHTML: true,
        headerFormat: '<table>',
        pointFormat: '<tr><th colspan="2"><h3>{point.dlg_name}</h3></th></tr>' +
            '<tr><th>registration percentage:</th><td>{point.x}%</td></tr>' +
            '<tr><th>Internet Use:</th><td>{point.y}</td></tr>' +
            '<tr><th>Population (20 -> +60):</th><td>{point.z}</td></tr>',
        footerFormat: '</table>',
        followPointer: true
    },

    plotOptions: {
        bubble: {
            minSize: 1,
            maxSize: 30
        },
        series: {
            dataLabels: {
                enabled: true,
                format: '{point.name}'
            }
        }
    },

    series: [{
        data: this.state.data
    }]

});
        
    }
    

 
    
    render() {

        return(<div id="container" ref='container' style={{height:"550px",width:'100%'}}/>
        
        )
                    
    }
}

export default Bubble;