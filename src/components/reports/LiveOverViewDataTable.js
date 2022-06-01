import * as React from "react";
import { DataGrid } from "@material-ui/data-grid";
import { Typography } from "@material-ui/core";

const columns = [
  { field: "unitName", headerName: "Unit name", width: 130 },
  { field: "assetType", headerName: "Asset type", width: 130 },
  { field: "assetModel", headerName: "Asset model", width: 150 },
  {
    field: "status",
    headerName: "Status",
    width: 130,
    renderCell: (params) => (
      <Typography
        style={{
          borderLeft:
            params.value === "Running"
              ? "5px solid green"
              : params.value === "Stopped"
              ? "5px solid red"
              : "5px solid orange",
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
  { field: "statusTime", headerName: "Time in status(h)", width: 175 },
  { field: "oddometer", headerName: "Oddometer (km)", width: 165 },
  { field: "batteryVoltage", headerName: "Battery voltage", width: 165 },
  { field: "fuel", headerName: "Fuel", width: 130 },
  { field: "fuelCapacity", headerName: "Fuel capacity", width: 165 },
];

const assetModel = ["Maruti Swift", "Tata Indica", "Alto", "Honda"];
const assetType = ["Car", "Truck", "Jeep", "Van"];
const timeInStatus = [20.1, 10.4, 30.6, 9.9, 11];
const fuelCapacity = [100, 130, 99, 46, 250]

export default function LiveOverViewDataTable(props) {
  const rows = [];
  props.vehicles.map((vehicle, index) =>
    rows.push({
      id: index,
      unitName: vehicle.vid,
      assetType: assetType[Math.floor(Math.random() * assetType.length)],
      assetModel: assetModel[Math.floor(Math.random() * assetModel.length)],
      status: vehicle.status,
      statusTime: timeInStatus[Math.floor(Math.random() * timeInStatus.length)],
      oddometer: vehicle.oddometer,
      batteryVoltage: vehicle.batteryVoltage,
      fuel: vehicle.fuel,
      fuelCapacity: fuelCapacity[Math.floor(Math.random() * fuelCapacity.length)],
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
