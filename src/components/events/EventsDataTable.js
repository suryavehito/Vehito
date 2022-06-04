import styled from "styled-components";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  Paper,
  TableCell,
} from "@material-ui/core";
import React from "react";
import PropTypes from "prop-types";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";
import IconButton from "@material-ui/core/IconButton";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import LastPageIcon from "@material-ui/icons/LastPage";

const useStyles = makeStyles({
  paper: {
    minWidth: 800,
  },
});

const useStyles1 = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
}));

function TablePaginationActions(props) {
  const classes = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = (event) => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({}));

export default function EventsDataTable({ eventDetails }) {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const [rows, setRows] = React.useState([]);

  React.useEffect(() => {
    if (rows?.length === 0 && eventDetails?.length > 0) {
      setData();
    }
  }, [eventDetails, rows]);

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

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

  return (
    <Paper className={classes.paper}>
      <Table stickyHeader className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <StyledTableCell className={classes.twentyFivePercent} align="left">
              Event Name
            </StyledTableCell>
            <StyledTableCell className={classes.tenPercent} align="left">
              Date
            </StyledTableCell>
            <StyledTableCell className={classes.tenPercent} align="left">
              Time
            </StyledTableCell>
            <StyledTableCell className={classes.twentyFivePercent} align="left">
              Event Location
            </StyledTableCell>
            <StyledTableCell className={classes.tenPercent} align="left">
              Value
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows
            .slice(page * rowsPerPage, (page + 1) * rowsPerPage)
            .map((row, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell
                  className={classes.twentyFivePercent}
                  align="left"
                >
                  {row.eventName}
                </StyledTableCell>
                <StyledTableCell className={classes.tenPercent} align="left">
                  {row.date}
                </StyledTableCell>
                <StyledTableCell className={classes.tenPercent} align="left">
                  {row.time}
                </StyledTableCell>
                <StyledTableCell
                  className={classes.twentyFivePercent}
                  align="left"
                >
                  {row.eventLocation}
                </StyledTableCell>
                <StyledTableCell className={classes.tenPercent} align="left">
                  {row.value}
                </StyledTableCell>
              </StyledTableRow>
            ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[]}
              colSpan={3}
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: { "aria-label": "rows per page" },
                native: true,
              }}
              onChangePage={handleChangePage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </Paper>
  );
}
