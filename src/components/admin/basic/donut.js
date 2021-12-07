import React, { Component } from "react";
import ReactApexChart from "react-apexcharts";

class Donut extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
      
        series: [1540, 943, 5490],
        options: {
            labels: ['Strata Report', 'Building & Pest Ins.', 'Valuation'],
            plotOptions: {
                pie: {
                  donut: {
                    size: '75%'
                  }
                }
            },
            chart: {
                type: 'donut',
            },
            fill: {
                colors: ['#3A7AF8', 'rgba(29, 131, 255, 0.5)','rgba(29, 131, 255, 0.3)']
            },
            legend: {
                position: 'bottom',
                markers: {
                    width: 12,
                    height: 12,
                    strokeWidth: 0,
                    strokeColor: '#fff',
                    fillColors: ['#3A7AF8', 'rgba(29, 131, 255, 0.5)','rgba(29, 131, 255, 0.3)'],
                    radius: 12,
                    customHTML: undefined,
                    onClick: undefined,
                    offsetX: 0,
                    offsetY: 0
                }
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
        <div id="chart">
            <ReactApexChart options={this.state.options} series={this.state.series} type="donut" />
        </div>
      );
    }
  }

  export default Donut
