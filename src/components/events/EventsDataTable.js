import * as React from "react";
import { useState, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";

const columns = [
  { field: "eventName", headerName: "Event Name", width: 170 },
  { field: "eventCode", headerName: "Event Code", width: 170 },
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
            eventCode: item?.eventCode,
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
