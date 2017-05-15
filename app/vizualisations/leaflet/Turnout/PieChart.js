import React, { Component } from 'react';

class PieChart extends Component {
    constructor(props){
        super(props);
    }
    
    componentDidMount() {
                    return<h4 >Hello tttt</h4>
                    console.log(this.ref.desc)
    }
    
    
    componentDidMount() {
        let Turnout,potentialVoters,SigningVoters,TurnoutTitle;
        if (this.props.ElectionYear=="2011") {
            !isNaN (this.props.Turnout11) ?TurnoutTitle=parseFloat(this.props.Turnout11)+' %':TurnoutTitle="does not exist";
            Turnout=parseFloat(this.props.Turnout11);
            potentialVoters=this.props.potentialVoters11;
            SigningVoters=this.props.SigningVoters11;
        }else{
            !isNaN (this.props.Turnout14) ?TurnoutTitle=parseFloat(this.props.Turnout14)+' %':TurnoutTitle="does not exist";
            Turnout=parseFloat(this.props.Turnout14);
            console.log(Turnout)
            potentialVoters=this.props.potentialVoters11;
            SigningVoters=this.props.SigningVoters14;
        }
         this.charts = new Highcharts["Chart"]('container',{
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
                    text: this.props.name +' ('+this.props.circname+' )<br/>'+ '<br/> '+TurnoutTitle,
                     margin: 10
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
                    name: 'Percentage',
                    data: [
                        {
                            name: 'Non Voters',
                            y: parseFloat(100-Turnout),
                            l:(((100-Turnout)*SigningVoters)/Turnout).toFixed(0),
                            sliced: true,
                            selected: true,
                        },
                        { name: 'Sign in Voters',l:SigningVoters, y: Turnout}
                    
                    
                    ]
                }]
            }
            );
             Highcharts.setOptions({
                colors: ['#ED561B','#50B432', '#DDDF00', '#24CBE5', '#64E572', '#FF9655', '#FFF263',      '#6AF9C4']
             });    

    }
    
    render() {

        return(<div className="two" id="container" ref='container' style={{height:"380px",width:'400px'}}>
        <h4 ref="desc">Hello</h4>
        </div>)
                    
    }
}

export default PieChart;