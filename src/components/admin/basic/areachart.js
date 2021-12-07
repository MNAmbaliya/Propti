import React, { Component } from "react";
import Chart from "react-apexcharts";

class Areachart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      options: {
        chart: {
          id: "basic-bar",
          width: '100%'
        },
        xaxis: {
          categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth',
            width: 2,
            colors: ['#3A7AF8', '#838383']
        },
        fill: {
            type: 'gradient',
            gradient: {
                shadeIntensity: 1,
                opacityFrom: 0.7,
                opacityTo: 0.9,
                stops: [0, 90, 100],
            //     gradientToColors:['rgba(58, 122, 248, 0.8)']
            }
        }
      },
      series: [
        {
          name: "Amount",
          data: [10,50,100,50,10,70,150.250,100,30,10,20, 30]
        },
        {
            name: "% Change",
            data: [10,30,140,60,40,10,140.220,110,20,5,10, 30]
          }
      ]
    };
  }

  render() {
    return (
      <div className="app">
        <div className="row">
          <div className="mixed-chart">
            <Chart
              options={this.state.options}
              series={this.state.series}
              type="area"
              height="250"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Areachart;