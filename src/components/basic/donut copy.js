import React, { Component } from "react";
import ReactApexChart from "react-apexcharts";
import axios from 'axios'

class Donut extends React.Component {

  
    constructor(props) {

      super(props);

      var completed = props.completedReport;
      this.pending = props.pandingReport;
      
     
      this.state = { 
      
        series: [ 3, 16],
        options: {
            chart: {
                type: 'donut',
            },
            plotOptions: {
              pie: {
                donut: {
                  size: '75%',
                }
              }
            },
            legend: {
              show: false
            },
            fill: {
                colors: ['#3A7AF8', 'rgba(29, 131, 255, 0.5)','rgba(29, 131, 255, 0.3)']
            },
            responsive: [{
                breakpoint: 780,
                options: {
                    legend: {
                        position: 'bottom'
                    }
                }
            }]
        },     
      };
    }

     
    render() {


      
      
      return (       
        <div id="chart" >
            <ReactApexChart options={this.state.options} series={this.state.series} type="donut" />
        </div>
      );
    }
  }

  export default Donut
