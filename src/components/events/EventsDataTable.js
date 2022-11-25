import * as React from "react";
import { useState, useEffect } from "react";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
} from "@mui/x-data-grid";
import { cloneDeep, map } from "lodash";
import { getLocation } from "../../utils/getLocation";

const columns = [
  { field: "eventName", headerName: "Event Name", width: 250 },
  { field: "date", headerName: "Date", width: 175 },
  { field: "time", headerName: "Time", width: 175 },
  { field: "eventLocation", headerName: "Event Location", width: 350 },
  { field: "value", headerName: "Value", width: 175 },
];

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}

export default function EventsDataTable({ eventDetails }) {
  const [rows, setRows] = useState([]);
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(0);
  const [firstRowManipulated, setFirstRowManipulated] = useState(false);

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
            eventName: item?.eventName.replaceAll("_", " "),
            date: event.time.split(" ")[0],
            time: event.time.split(" ")[1],
            eventLocation: event.location,
            value: item?.value,
          },
        ])
      );
    });
  };

  const onPagenationChange = (data) => {
    setCurrentPage(data.page);
  };

  const convertlatLongFormat = (str) => {
    let splitArray = str.split(",");
    return map(splitArray, (item) => item.slice(0, item.length - 2));
  };

  const setLocationAddressString = () => {
    const clonedRows = cloneDeep(rows);
    if (!!clonedRows.length) {
      const startIndex = pageSize * currentPage;
      const endIndex = startIndex + (pageSize - 1);
      for (let index = startIndex; index <= endIndex; index++) {
        const item = clonedRows[index];
        if (!item.eventLocation) {
          const laglong = convertlatLongFormat(item.eventLocationLatLong);
          const locationResponse = getLocation(laglong[0], laglong[1]);
          locationResponse.then((res) => {
            item.eventLocation = res;
          });
        }
      }
      setTimeout(() => {
        setRows(clonedRows);
      }, 2000);
    }
  };

  useEffect(() => {
    if (rows.length > 0 && currentPage != 0) {
      // setLocationAddressString();
    }
  }, [currentPage]);

  useEffect(() => {
    if (rows.length > 0 && !firstRowManipulated && currentPage === 0) {
      setFirstRowManipulated(true);
      // setLocationAddressString();
    }
  }, [rows]);

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        components={{
          Toolbar: CustomToolbar,
        }}
        pagination
        pageSize={pageSize}
        onPageChange={(event) => onPagenationChange(event)}
        rowCount={rows.length}
      />
    </div>
  );
}
