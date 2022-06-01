import * as React from "react";
import { DataGrid } from "@material-ui/data-grid";
import { Typography } from "@material-ui/core";

const columns = [
  { field: "vehicle", headerName: "Vehicle", width: 130 },
  {
    field: "utilizationScore",
    headerName: "Utilization score",
    width: 170,
    renderCell: (params) => (
      <Typography
        style={{
          borderLeft:
            params.value >= 100 && params.value < 200
              ? "5px solid yellow"
              : params.value >= 200 && params.value <= 300
              ? "5px solid lightblue"
              : params.value >= 301 && params.value <= 1000
              ? "5px solid orange"
              : "5px solid gray",
          paddingLeft: "15px",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          position: "relative",
          left: "-16px",
        }}
      >
        {params.value}
      </Typography>
    ),
  },
  {
    field: "distanceTravelled",
    headerName: "Distance traveled (Km)",
    width: 200,
    renderCell: (params) => (
      <Typography
        style={{
          borderLeft:
            params.value >= 100 && params.value < 200
              ? "5px solid green"
              : params.value >= 200 && params.value <= 300
              ? "5px solid lightpink"
              : params.value >= 301 && params.value <= 1000
              ? "5px solid brown"
              : "5px solid gray",
          paddingLeft: "15px",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          position: "relative",
          left: "-16px",
        }}
      >
        {params.value}
      </Typography>
    ),
  },
  {
    field: "disceplineScore",
    headerName: "Discepline score",
    width: 175,
    renderCell: (params) => (
      <Typography
        style={{
          borderLeft:
            params.value >= 0 && params.value < 0.25
              ? "5px solid brown"
              : params.value >= 0.26 && params.value <= 0.7
              ? "5px solid lightpink"
              : params.value >= 0.71 && params.value <= 1
              ? "5px solid orange"
              : "5px solid red",
          paddingLeft: "15px",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          position: "relative",
          left: "-16px",
        }}
      >
        {params.value}
      </Typography>
    ),
  },
  {
    field: "drivingTime",
    headerName: "Driving time(h)",
    width: 175,
    renderCell: (params) => (
      <Typography
        style={{
          borderLeft:
            params.value >= 100 && params.value < 150
              ? "5px solid skyblue"
              : params.value >= 151 && params.value <= 200
              ? "5px solid aquamarine"
              : params.value >= 201 && params.value <= 300
              ? "5px solid brown"
              : "5px solid lightgreen",
          paddingLeft: "15px",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          position: "relative",
          left: "-16px",
        }}
      >
        {params.value}
      </Typography>
    ),
  },
  {
    field: "drivingTimePercent",
    headerName: "Driving time percent",
    width: 200,
  },
  {
    field: "idleTime",
    headerName: "Idle time(h)",
    width: 170,
  },
  {
    field: "idleTimePercent",
    headerName: "Idle time percent",
    width: 170,
  },
];

const utilizationScore = [222.1, 324.5, 700, 123, 554, 90];
const distanceTravelled = [14, 24.5, 70, 12, 54, 90];
const disceplineScore = [0.1, 4.5, 0.4, 3.5, 4.1, 0.3];
const drivingTime = [222, 324, 70, 323, 546, 50];
const drivingTimePercent = [1.5, 1.6, 2, 3, 2.7, 0.6];
const idleTime = [0.1, 0.5, 0.65, 0.25, 1, 0.6];
const idleTimePercent = [5, 4.5, 1, 0.4, 4.7, 0.25];

export default function EfficiencyDataTable(props) {
  const rows = [];
  props.vehicles.map((vehicle, index) =>
    rows.push({
      id: index,
      vehicle: vehicle.vid,
      utilizationScore: utilizationScore[Math.floor(Math.random() * utilizationScore.length)],
      distanceTravelled: distanceTravelled[Math.floor(Math.random() * distanceTravelled.length)],
      disceplineScore: disceplineScore[Math.floor(Math.random() * disceplineScore.length)],
      drivingTime: drivingTime[Math.floor(Math.random() * drivingTime.length)],
      drivingTimePercent: drivingTimePercent[Math.floor(Math.random() * drivingTimePercent.length)],
      idleTime: idleTime[Math.floor(Math.random() * idleTime.length)],
      idleTimePercent: idleTimePercent[Math.floor(Math.random() * idleTimePercent.length)],
    })
  );

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        hideFooter={true}
        hideFooterPagination={true}
      />
    </div>
  );
}
