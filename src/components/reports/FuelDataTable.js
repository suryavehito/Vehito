import * as React from "react";
import { DataGrid } from "@material-ui/data-grid";
import { Typography } from "@material-ui/core";

const columns = [
  { field: "vehicle", headerName: "Vehicle", width: 130 },
  {
    field: "fuelConsumption",
    headerName: "Fuel consumption",
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
    field: "fuelConsumptionRate",
    headerName: "Fuel consumption rate",
    width: 200,
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
    field: "fuelCost",
    headerName: "Fuel cost($)",
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
    field: "fuelCostRate",
    headerName: "Fuel cost rate(Tot. Fuel cost/Tot. Distance)",
    width: 350,
  },
];

const fuelConsumption = [222.2, 111.5, 123.4, 23.5, 98.6];
const distanceTravelled = [67, 55.6, 23, 45];
const fuelConsumptionRate = [1, 0.6, 4, 0.25, 2, 8];
const fuelCost = [300, 214, 65, 33, 87];
const fuelCostRate = [2, 1.6, 1.1, 0.6];

export default function FuelDataTable(props) {
  const rows = [];
  props.vehicles.map((vehicle, index) =>
    rows.push({
      id: index,
      vehicle: vehicle.vid,
      fuelConsumption: fuelConsumption[Math.floor(Math.random() * fuelConsumption.length)],
      distanceTravelled: distanceTravelled[Math.floor(Math.random() * distanceTravelled.length)],
      fuelConsumptionRate: fuelConsumptionRate[Math.floor(Math.random() * fuelConsumptionRate.length)],
      fuelCost: fuelCost[Math.floor(Math.random() * fuelCost.length)],
      fuelCostRate: fuelCostRate[Math.floor(Math.random() * fuelCostRate.length)],
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
