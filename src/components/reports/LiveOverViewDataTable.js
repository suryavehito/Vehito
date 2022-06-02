import * as React from "react";
import { DataGrid } from "@material-ui/data-grid";
import { Typography } from "@material-ui/core";

const columns = [
  { field: "code", headerName: "Code", width: 130 },
  { field: "description", headerName: "Description", width: 130 },
  { field: "make", headerName: "Make", width: 150 },
  // {
  //   field: "status",
  //   headerName: "Status",
  //   width: 130,
  //   renderCell: (params) => (
  //     <Typography
  //       style={{
  //         borderLeft:
  //           params.value === "Running"
  //             ? "5px solid green"
  //             : params.value === "Stopped"
  //             ? "5px solid red"
  //             : "5px solid orange",
  //         paddingLeft: "15px",
  //         width: "100%",
  //         height: "100%",
  //         display: "flex",
  //         alignItems: "center",
  //         position: "relative",
  //         left: "-16px",
  //       }}
  //     >
  //       {params.value}
  //     </Typography>
  //   ),
  // },
  { field: "relatedParts", headerName: "Related Parts", width: 175 },
  { field: "category", headerName: "Category", width: 175 },
  { field: "symptoms", headerName: "Symptoms", width: 175 },
  { field: "fixes", headerName: "Fixes", width: 175 },
  { field: "causes", headerName: "Causes", width: 175 },
];

const assetModel = ["Maruti Swift", "Tata Indica", "Alto", "Honda"];
const assetType = ["Car", "Truck", "Jeep", "Van"];
const timeInStatus = [20.1, 10.4, 30.6, 9.9, 11];
const fuelCapacity = [100, 130, 99, 46, 250];

export default function LiveOverViewDataTable({ data }) {
  const [rows, setRows] = React.useState([]);

  React.useEffect(() => {
    if (data !== null && data?.obdCodes.length > 0 && rows.length === 0) {
      setData();
    }
  }, [data, rows]);

  const setData = () => {
    data.obdCodes.map((obd, i) =>
      setRows((state) => [
        ...state,
        {
          id: `${obd.code}_${i}`,
          code: obd.code,
          description: obd.description,
          make: obd.make,
          relatedParts: obd.relatedParts,
          category: obd.category,
          symptoms: obd.symptoms,
          fixes: obd.fixes,
          causes: obd.causes,
        },
      ])
    );
  };

  console.log(rows);

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows.filter((item) => item?.code !== null)}
        columns={columns}
        hideFooter={true}
        hideFooterPagination={true}
      />
    </div>
  );
}
