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
          data: [5,50,150,50,10,70,150.250,140,30,10,20, 30]
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
        <div className="row admin-card conversion-cart">
          <div className="d-flex w-100 justify-content-between align-items-center px-4 py-2">
            <p className="my-0 app-text text-primary cart-text">Conversion Tracker</p>
            <select id="unit" name="unit" className="px-3 py-1 border rounded cart-conversion-dropdown">
              <option value="Today">Today</option>
              <option value="Yesterday">Yesterday</option>
            </select>
          </div>
          <div className="mixed-chart conver-tracker-cart">
            <Chart
              options={this.state.options}
              series={this.state.series}
              type="area"
              height="300"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Areachart;