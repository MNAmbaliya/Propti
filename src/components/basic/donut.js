import React, { useState  } from "react";
import ReactApexChart from "react-apexcharts";
import axios from 'axios'

export default function Donut(props) {

  console.log("props");
  console.log(props);
  const [series ,setSeries] = React.useState([props.completedReport, props.pandingReport]);
  console.log(series);
  const [option ,setOption] = React.useState({
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
  });

  return (
    <div id="chart" >
          <ReactApexChart options={option} series={[props.completedReport, props.pandingReport]} type="donut" />
      </div>
  )
}
  