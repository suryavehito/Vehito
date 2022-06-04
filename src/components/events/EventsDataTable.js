import * as React from "react";
import { useState, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import { getLocation } from "../../utils/getLocation";

const columns = [
  { field: "eventName", headerName: "Event Name", width: 170 },
  { field: "date", headerName: "Date", width: 175 },
  { field: "time", headerName: "Time", width: 175 },
  { field: "eventLocation", headerName: "Event Location", width: 175 },
  { field: "value", headerName: "Value", width: 175 },
];

export default function EventsDataTable({ eventDetails }) {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    if (rows?.length === 0 && eventDetails?.length > 0) {
      setData();
    }
  }, [eventDetails, rows]);

  const setData = () => {
    eventDetails?.map((event, index) => {
      event?.eventDetailList.map((item, i) =>
        setRows((state) => [
          ...state,
          {
            id: `${event?.dateTime}_${index}_${i}`,
            eventName: item?.eventName,
            date: event.time.split(" ")[0],
            time: event.time.split(" ")[1],
            eventLocation: event.location,
            value: item?.value,
          },
        ])
      );
    });
  };

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
