import React, { Fragment } from "react";
import Chart from "react-google-charts";
import "./CustomTabs.css";


function TiltAndElevation(props) {
  const rightTurnData = [
    [
      "Accelerometer",
      "Aggressive right turn recorded using y -axis of accelerometer"
    ],
    [1, 37.8],
    [2, 30.9],
    [3, 25.4],
    [4, 11.7],
    [5, 11.9],
    [6, 8.8],
    [7, 7.6],
    [8, 12.3],
    [9, 16.9],
    [10, 12.8],
    [11, 5.3],
    [12, 6.6],
    [13, 4.8],
    [14, 4.2],
  ];

  const leftTurnData = [
    [
      "Accelerometer",
      "Aggressive left turn recorded using y -axis of accelerometer"
    ],
    [1, 0.8],
    [2, -3.9],
    [3, -4.4],
    [4, -30.7],
    [5, -61.9],
    [5.5, -61.9],
    [6, -101.0],
    [7, 15.6],
    [8, -12.3],
    [9, -56.9],
    [9.2, -56.9],
    [9.4, -65.9],
    [9.6, -80.9],
    [9.8, -90.9],
    [10, -94.5],
    [10.2, -101.9],
    [10.4, -106.8],
    [10.6, -100.9],
    [10.8, -90.8],
    [11, -80.3],
    [11.2, -70.9],
    [11.4, -60.8],
    [11.6, -100.9],
    [11.8, -90.8],
    [12, -6.6],
    [13, -4.8],
    [14, -4.2],
  ];

  const rightTurnOptions = {
    title: "Tilt And Elevation (Aggressive right turn recorded using y -axis of accelerometer)",
    hAxis: {
      title: "Acceleration (m/s2)",
    },
    vAxis: {
      title: "Accelerometer",
    },
    legend: "none"
  };

  const leftTurnOptions = {
    title: "Tilt And Elevation (Aggressive left turn recorded using y -axis of accelerometer)",
    hAxis: {
      title: "Acceleration (m/s2)",
    },
    vAxis: {
      title: "Accelerometer",
    },
    legend: "none"
  };
  return (
    <Fragment>
      <div className="tilt-and-elevation-container">
        <Chart
          chartType="LineChart"
          width="100%"
          height="400px"
          data={rightTurnData}
          options={rightTurnOptions}
        />
      </div>
      <div className="tilt-and-elevation-container">
        <Chart
          chartType="LineChart"
          width="100%"
          height="400px"
          data={leftTurnData}
          options={leftTurnOptions}
        />
      </div>
    </Fragment>
  )
}


export default TiltAndElevation;