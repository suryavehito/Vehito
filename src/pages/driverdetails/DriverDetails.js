import React, { Component, Fragment } from "react";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import { Container } from "@material-ui/core";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import CustomModal from "../../components/modal/CustomModal";
import CustomSnackbar from "../../components/snackbar/CustomSnackbar";

const columns = [
  { id: "fName", label: "First Name", minWidth: "auto" },
  { id: "lName", label: "Last Name", minWidth: "auto" },
  { id: "licenseNum", label: "License Number", minWidth: "auto" },
  { id: "edit", label: "Edit", minWidth: "auto" },
  { id: "delete", label: "Delete", minWidth: "auto" },
];

function createData(id, fName, lName, licenseNum) {
  return { id, fName, lName, licenseNum };
}

const rows = [
  createData(0, "John", "Joseph", 1324171354),
  createData(1, "Alice", "Bob", 1403500365),
  createData(2, "Gokul", "Prasad", 6048397311),
  createData(3, "Hello", "World", 3271674340),
  createData(4, "Paul", "Raj", 3760210300),
  createData(5, "Hanok", "Sunder", 2547540010),
  createData(6, "Raj", "Prakash", 8301920034),
  createData(7, "Jai", "Paul", 4857000987),
  createData(8, "John", "Wesly", 1265776915),
  createData(9, "Naveen", "Kumar", 1263170008),
  createData(10, "Deepak", "Nithi", 6702200045),
  createData(11, "Saran", "Raj", 6754575778),
  createData(12, "Prashanth", "Pradeep", 1467937449),
  createData(13, "Pranab", "Singh", 2009624178),
  createData(14, "Karthik", "Raja", 2101471256),
];

const styles = (theme) => ({
  root: {
    width: "100%",
    margin: "4rem 0px",
  },
  container: {
    maxHeight: "100%",
  },
});

class DriverDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      rowsPerPage: 10,
      open: false,
      openSnackbar: false,
    };
  }

  handleClose = () => {
    this.setState({ open: false });
  };

  handleChangePage = (event, newPage) => {
    this.setState({ page: newPage });
  };

  handleChangeRowsPerPage = (event) => {
    this.setState({ rowsPerPage: event.target.value, page: 0 });
  };

  onEditBtnClickHandler = (id) => {
    this.props.history.push("/#view/driver/details/" + id);
  };

  onDeleteBtnClickHandler = () => {
    this.setState({ open: true });
  };

  yesBtnClickHandler = () => {
    this.setState({ open: false, openSnackbar: true });
  };

  closeSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    this.setState({ openSnackbar: false });
  };

  render() {
    const { classes } = this.props;

    return (
      <Fragment>
        <Header />
        <Container>
          <Paper className={classes.root}>
            <TableContainer className={classes.container}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={{ minWidth: column.minWidth }}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows
                    .slice(
                      this.state.page * this.state.rowsPerPage,
                      this.state.page * this.state.rowsPerPage +
                        this.state.rowsPerPage
                    )
                    .map((row) => {
                      return (
                        <TableRow
                          hover
                          role="button"
                          tabIndex={-1}
                          key={row.id}
                        >
                          {columns.map((column) => {
                            const value = row[column.id];
                            return (
                              <TableCell key={column.id} align={column.align}>
                                {value}
                                {column.id === "edit" ? (
                                  <Tooltip title="Edit">
                                    <IconButton
                                      onClick={() =>
                                        this.onEditBtnClickHandler(row.id)
                                      }
                                      color="primary"
                                      aria-label="edit"
                                    >
                                      <EditIcon />
                                    </IconButton>
                                  </Tooltip>
                                ) : (
                                  ""
                                )}
                                {column.id === "delete" ? (
                                  <Tooltip title="Delete">
                                    <IconButton
                                      onClick={this.onDeleteBtnClickHandler}
                                      color="secondary"
                                      aria-label="delete"
                                    >
                                      <DeleteIcon />
                                    </IconButton>
                                  </Tooltip>
                                ) : (
                                  ""
                                )}
                              </TableCell>
                            );
                          })}
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={rows.length}
              rowsPerPage={this.state.rowsPerPage}
              page={this.state.page}
              onChangePage={this.handleChangePage}
              onChangeRowsPerPage={this.handleChangeRowsPerPage}
            />
          </Paper>
        </Container>
        <CustomModal
          message={"Are You sure Do you want to delete it ?"}
          open={this.state.open}
          handleClose={this.handleClose}
          yesBtnClick={this.yesBtnClickHandler}
          noBtnClick={this.handleClose}
        />
        <CustomSnackbar
          openSnackbar={this.state.openSnackbar}
          closeSnackbar={this.closeSnackbar}
          message={"Deleted Successfully!"}
        />
        <Footer />
      </Fragment>
    );
  }
}

export default withStyles(styles)(DriverDetails);
