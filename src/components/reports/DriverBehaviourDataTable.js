import * as React from "react";
import { DataGrid } from "@material-ui/data-grid";
import { Typography } from "@material-ui/core";

const columns = [
  { field: "vehicle", headerName: "Vehicle", width: 130 },
  { field: "drivingScore", headerName: "Driving Score", width: 170 },
  {
    field: "distanceTravelled",
    headerName: "Distance traveled (Km)",
    width: 200,
  },
  { field: "drivingTime", headerName: "Driving time (h)", width: 175 },
  { field: "trips", headerName: "Trips", width: 175 },
  {
    field: "totalSpeedingEvent",
    headerName: "Total speeding events",
    width: 170,
    renderCell: (params) => (
      <Typography
        style={{
          borderLeft: "5px solid red",
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
    field: "avgSpeedingEvents",
    headerName: "Avg speeding events",
    width: 130,
    renderCell: (params) => (
      <Typography
        style={{
          borderLeft: "5px solid green",
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
];

const drivingScore = [89.6, 90, 66, 47.8, 100];
const distanceTravelled = [300, 476.9, 455, 1045, 89];
const drivingTime = [64, 24, 28.7, 44];
const totalSpeedingEvent = [1, 2, 3];
const avgSpeedingEvents = [0.2, 0.5, 0.45];

export default function DriverBehaviourDataTable(props) {
  const rows = [];
  props.vehicles.map((vehicle, index) =>
    rows.push({
      id: index,
      vehicle: vehicle.vid,
      drivingScore: drivingScore[Math.floor(Math.random() * drivingScore.length)],
      distanceTravelled: distanceTravelled[Math.floor(Math.random() * distanceTravelled.length)],
      drivingTime: drivingTime[Math.floor(Math.random() * drivingTime.length)],
      trips: vehicle.trips.length,
      totalSpeedingEvent: totalSpeedingEvent[Math.floor(Math.random() * totalSpeedingEvent.length)],
      avgSpeedingEvents: avgSpeedingEvents[Math.floor(Math.random() * avgSpeedingEvents.length)]
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
