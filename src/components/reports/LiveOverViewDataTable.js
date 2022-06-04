import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import styled from "styled-components";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  Paper,
  TableCell,
} from "@material-ui/core";

const useStyles = makeStyles({
  paper: {
    width: "150vw",
  },
});

const StyledTableCell = styled(TableCell)(({ theme }) => ({}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({}));

export default function FaultyCodeTable({ data }) {
  const classes = useStyles();

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
          relatedParts:
            obd.relatedParts === "NULL" || obd.relatedParts === "NULL "
              ? "Not Available"
              : obd.relatedParts,
          category: obd.category,
          symptoms:
            obd.symptoms === "NULL" || obd.symptoms === "NULL "
              ? "Not Available"
              : obd.symptoms,
          fixes:
            obd.fixes === "NULL" || obd.fixes === "NULL "
              ? "Not Available"
              : obd.fixes,
          causes:
            obd.causes === "NULL" || obd.causes === "NULL "
              ? "Not Available"
              : obd.causes,
        },
      ])
    );
  };

  const formattedSymptoms = rows
    .filter((item) => item?.code !== null)
    .map((row) => row.symptoms.split(":"));
  const formattedCauses = rows
    .filter((item) => item?.code !== null)
    .map((row) => row.causes.split(":"));
  const formattedFixes = rows
    .filter((item) => item?.code !== null)
    .map((row) => row.fixes.split(":"));
  const formattedRelatedParts = rows
    .filter((item) => item?.code !== null)
    .map((row) => row.relatedParts.split(":"));

  return (
    <Paper className={classes.paper}>
      <Table stickyHeader className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="left">Code</StyledTableCell>
            <StyledTableCell align="left">Description</StyledTableCell>
            <StyledTableCell align="left">Make</StyledTableCell>
            <StyledTableCell align="left">Related Parts</StyledTableCell>
            <StyledTableCell align="left">Category</StyledTableCell>
            <StyledTableCell align="left">Symptoms</StyledTableCell>
            <StyledTableCell align="left">Fixes</StyledTableCell>
            <StyledTableCell align="left">Causes</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows
            .filter((item) => item?.code !== null)
            .map((row, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell align="left">{row.code}</StyledTableCell>
                <StyledTableCell align="left">
                  {row.description}
                </StyledTableCell>
                <StyledTableCell align="left">{row.make}</StyledTableCell>
                <StyledTableCell align="left">
                  <ul>
                    {formattedRelatedParts[index].map((content) => (
                      <li key={content}>{content}</li>
                    ))}
                  </ul>
                </StyledTableCell>
                <StyledTableCell align="left">{row.category}</StyledTableCell>
                <StyledTableCell align="left">
                  <ul>
                    {formattedSymptoms[index].map((content) => (
                      <li key={content}>{content}</li>
                    ))}
                  </ul>
                </StyledTableCell>
                <StyledTableCell align="left">
                  <ul>
                    {formattedFixes[index].map((content) => (
                      <li key={content}>{content}</li>
                    ))}
                  </ul>
                </StyledTableCell>
                <StyledTableCell align="left">
                  <ul>
                    {formattedCauses[index].map((content) => (
                      <li key={content}>{content}</li>
                    ))}
                  </ul>
                </StyledTableCell>
              </StyledTableRow>
            ))}
        </TableBody>
      </Table>
    </Paper>
  );
}
