import * as React from "react";
import { DataGrid } from "@material-ui/data-grid";

const columns = [
  { field: "eventName", headerName: "Event Name", width: 170 },
  { field: "time", headerName: "Time", width: 170 },
  { field: "vehicle", headerName: "Vehicle", width: 150 },
  { field: "driver", headerName: "Driver", width: 130 },
  { field: "value", headerName: "Value", width: 175 },
  { field: "threshold", headerName: "Threshold", width: 165 },
  { field: "severity", headerName: "Severity", width: 165 },
  { field: "speed", headerName: "Speed", width: 130 },
  { field: "address", headerName: "Address", width: 200 },
  { field: "geofence", headerName: "Geofence", width: 165 },
];

const eventNames = ["Over Speeding", "Speeding", "External Battery Low"];
const drivers = ["Abc", "Xyz", "Mno", "Pqr"];
const values = ["109 Km/H", "19 Km/H", "119 Km/H", "87 Km/H", "95 Km/H"];
const threshold = ["56 Km/H", "69 Km/H", "29 Km/H", "70 Km/H"];
const severity = ["Advisory", "Warning", "Caution"];
const address = [
  "Kukatpally Hyderabad",
  "no 1, dalas street bangalore",
  "Gandhi Street Nellore",
];

export default function EventsDataTable(props) {
  const rows = [];
  props.vehicles.map((vehicle, index) =>
    rows.push({
      id: index,
      eventName: eventNames[Math.floor(Math.random() * eventNames.length)],
      time: vehicle.time,
      vehicle: vehicle.vid,
      driver: drivers[Math.floor(Math.random() * drivers.length)],
      value: values[Math.floor(Math.random() * values.length)],
      threshold: threshold[Math.floor(Math.random() * threshold.length)],
      severity: severity[Math.floor(Math.random() * severity.length)],
      speed: vehicle.speed,
      address: address[Math.floor(Math.random() * address.length)],
      geofence: vehicle.geofence,
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
