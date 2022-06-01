import * as React from "react";
import { DataGrid } from "@material-ui/data-grid";
import { Typography } from "@material-ui/core";

const columns = [
  { field: "vehicle", headerName: "Vehicle", width: 130 },
  { field: "startTime", headerName: "Start time", width: 170 },
  { field: "endTime", headerName: "End time", width: 170 },
  { field: "startAddress", headerName: "Start address", width: 175 },
  { field: "endAddress", headerName: "End address", width: 175 },
  {
    field: "tripDuration",
    headerName: "Trip duration(h)",
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
    field: "idleTime",
    headerName: "Idle time(h)",
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

const startTime = ["02/06/2021 15:22", "05/04/2021 15:22", "02/03/2021 15:22", "02/03/2021 15:22", "02/03/2021 15:22"];
const endTime = ["02/06/2021 17:22", "05/04/2021 18:22", "02/03/2021 16:22", "02/03/2021 16:22"];
const startAddress = ["Kukatpally Hyderabad", "no 1, dalas street bangalore", "Gandhi Street Nellore"];
const endAddress = ["Ameerpet Hyderabad", "Kukatpally Hyderabad", "Gandhi Street Nellore"];
const tripDuration = [20.1, 10.4, 30.6, 9.9, 11];
const idleTime = [1, 3, 4, 5, 7, 9];

export default function TripsDataTable(props) {
  const rows = [];
  props.vehicles.map((vehicle, index) =>
    rows.push({
      id: index,
      vehicle: vehicle.vid,
      startTime: startTime[Math.floor(Math.random() * startTime.length)],
      endTime: endTime[Math.floor(Math.random() * endTime.length)],
      startAddress: startAddress[Math.floor(Math.random() * startAddress.length)],
      endAddress: endAddress[Math.floor(Math.random() * endAddress.length)],
      tripDuration: tripDuration[Math.floor(Math.random() * tripDuration.length)],
      idleTime:
        idleTime[Math.floor(Math.random() * idleTime.length)],
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
