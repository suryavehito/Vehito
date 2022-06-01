import React, { Component, Fragment } from "react";
import "./VehicleDetailsForm.css";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import SaveIcon from "@material-ui/icons/Save";
import UploadDocumentsModal from "../../components/modal/UploadDocsModal";
import CustomSnackbar from "../snackbar/CustomSnackbar";

class DriverDetailsForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      vehicleImage: "",
      open: false,
      openSnackbar: false,
      viewAllFields: false
    };
  }

  closeSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    this.setState({ openSnackbar: false });
  };

  uploadDocsBtnOnClickHandler = () => {
    this.setState({ open: true });
  };

  submitOnClickHandler = () => {
    this.setState({ open: false, openSnackbar: true });
  };

  closeModal = () => {
    this.setState({ open: false });
  };

  render() {
    return (
      <Fragment>
        <div className="container">
          <form action="">
            <div className="row">
              <div className="col-40">
                <label className="labelText" htmlFor="fName">
                  First Name
                </label>
              </div>
              <div className="col-60">
                <input
                  onChange={this.props.onChange}
                  className="inputField"
                  type="text"
                  id="fName"
                  name="fName"
                  placeholder="First Name"                  
                  disabled={!this.props.isEditable}
                  value={
                    this.props.state !== null
                      ? this.props.state.fName
                      : this.props.details.fName
                  }
                />
              </div>
            </div>
            <div className="row">
              <div className="col-40">
                <label className="labelText" htmlFor="lName">
                  Last Name
                </label>
              </div>
              <div className="col-60">
                <input
                  onChange={this.props.onChange}
                  className="inputField"
                  type="text"
                  id="lName"
                  name="lName"
                  placeholder="Last Name"                  
                  disabled={!this.props.isEditable}
                  value={
                    this.props.state !== null
                      ? this.props.state.lName
                      : this.props.details.lName
                  }
                />
              </div>
            </div>
            <div className="row">
              <div className="col-40">
                <label className="labelText" htmlFor="licenseNo">
                  License Number
                </label>
              </div>
              <div className="col-60">
                <input
                  onChange={this.props.onChange}
                  className="inputField"
                  type="text"
                  id="licenseNo"
                  name="licenseNo"
                  placeholder="License Number"
                  disabled={!this.props.isEditable}
                  value={
                    this.props.state !== null
                      ? this.props.state.licenseNo
                      : this.props.details.licenseNo
                  }
                />
              </div>
            </div>
            <div className="row">
              <div className="col-40">
                <label className="labelText" htmlFor="mobile">
                  Mobile
                </label>
              </div>
              <div className="col-60">
                <input
                  onChange={this.props.onChange}
                  className="inputField"
                  type="text"
                  id="mobile"
                  name="mobile"
                  placeholder="Mobile Number"
                  disabled={!this.props.isEditable}
                  value={
                    this.props.state !== null
                      ? this.props.state.mobile
                      : this.props.details.mobile
                  }
                />
              </div>
            </div>
            {!this.props.isEditable && <div className="row">
              <div className="col-40">
                <Link onClick={() => { this.setState({ viewAllFields: !this.state.viewAllFields }) }}>
                  {this.state.viewAllFields ? "Show Basic Info" : "View More Info"}
                </Link>
              </div>
            </div>}
            {(this.state.viewAllFields || this.props.isEditable) && <Fragment>
              <div className="row">
                <div className="col-40">
                  <label className="labelText" htmlFor="gender">
                    Gender
                  </label>
                </div>
                <div className="col-60">
                  <select className="select" onChange={this.props.onChange} disabled={!this.props.isEditable}
                    name="gender"
                    id="gender"
                    value={
                      this.props.state !== null
                        ? this.props.state.gender
                        : this.props.details.gender
                    }>
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
              <div className="row">
                <div className="col-40">
                  <label className="labelText" htmlFor="alternativeMobile">
                    Alternate Mobile
                  </label>
                </div>
                <div className="col-60">
                  <input
                    onChange={this.props.onChange}
                    className="inputField"
                    type="text"
                    id="alternativeMobile"
                    name="alternativeMobile"
                    placeholder="Alternate Mobile Number"
                    disabled={!this.props.isEditable}
                    value={
                      this.props.state !== null
                        ? this.props.state.alternativeMobile
                        : this.props.details.alternativeMobile
                    }
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-40">
                  <label className="labelText" htmlFor="IdType">
                    Id Type
                  </label>
                </div>
                <div className="col-60">
                  <select className="select" onChange={this.props.onChange} disabled={!this.props.isEditable}
                    name="idType"
                    id="idType"
                    value={
                      this.props.state !== null
                        ? this.props.state.idType
                        : this.props.details.idType
                    }>
                    <option value="">Select Id Type</option>
                    <option value="1">Voter ID</option>
                    <option value="2">Aadhar Card</option>
                    <option value="3">PAN Card</option>
                    <option value="4">Passport</option>
                  </select>
                </div>
              </div>
              <div className="row">
                <div className="col-40">
                  <label className="labelText" htmlFor="idNumber">
                    Id Number
                  </label>
                </div>
                <div className="col-60">
                  <input
                    onChange={this.props.onChange}
                    className="inputField"
                    type="text"
                    id="idNumber"
                    name="idNumber"
                    placeholder="Id Number"
                    disabled={!this.props.isEditable}
                    value={
                      this.props.state !== null
                        ? this.props.state.idNumber
                        : this.props.details.idNumber
                    }
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-40">
                  <label className="labelText" htmlFor="address">
                    Address
                  </label>
                </div>
                <div className="col-60">
                  <input
                    onChange={this.props.onChange}
                    className="inputField"
                    type="text"
                    id="address"
                    name="address"
                    placeholder="Address"
                    disabled={!this.props.isEditable}
                    value={
                      this.props.state !== null
                        ? this.props.state.address
                        : this.props.details.address
                    }
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-40">
                  <label className="labelText" htmlFor="pincode">
                    Pin Code
                  </label>
                </div>
                <div className="col-60">
                  <input
                    onChange={this.props.onChange}
                    className="inputField"
                    type="text"
                    id="pincdoe"
                    name="pincode"
                    placeholder="Pin Code"
                    disabled={!this.props.isEditable}
                    value={
                      this.props.state !== null
                        ? this.props.state.pincode
                        : this.props.details.pincode
                    }
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-40">
                  <label className="labelText" htmlFor="country">
                    Country
                  </label>
                </div>
                <div className="col-60">
                  <input
                    onChange={this.props.onChange}
                    className="inputField"
                    type="text"
                    id="country"
                    name="country"
                    placeholder="Country"
                    disabled={!this.props.isEditable}
                    value={
                      this.props.state !== null
                        ? this.props.state.country
                        : this.props.details.country
                    }
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-40">
                  <label className="labelText" htmlFor="birthDate">
                    Birth Date
                  </label>
                </div>
                <div className="col-60">
                  <input
                    onChange={this.props.onDateChange}
                    className="inputField"
                    type="date"
                    id="birthDate"
                    name="birthDate"
                    placeholder="Birth Date"
                    disabled={!this.props.isEditable}
                    value={
                      this.props.state && this.props.state.birthDate !== undefined &&
                      new Date(parseInt(this.props.state.birthDate)).toISOString().substring(0, 10)
                    }
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-40">
                  <label className="labelText" htmlFor="experience">
                    Experience
                  </label>
                </div>
                <div className="col-60">
                  <input
                    onChange={this.props.onChange}
                    className="inputField"
                    type="text"
                    id="experience"
                    name="experience"
                    placeholder="Experience"
                    disabled={!this.props.isEditable}
                    value={
                      this.props.state !== null
                        ? this.props.state.experience
                        : this.props.details.experience
                    }
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-40">
                  <label className="labelText" htmlFor="reference1">
                    Reference 1
                  </label>
                </div>
                <div className="col-60">
                  <input
                    onChange={this.props.onChange}
                    className="inputField"
                    type="text"
                    id="reference1"
                    name="reference1"
                    placeholder="Reference Name"
                    disabled={!this.props.isEditable}
                    value={
                      this.props.state !== null
                        ? this.props.state.reference1
                        : this.props.details.reference1
                    }
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-40">
                  <label className="labelText" htmlFor="ref1Mobile">
                    Reference 1 Mobile
                  </label>
                </div>
                <div className="col-60">
                  <input
                    onChange={this.props.onChange}
                    className="inputField"
                    type="text"
                    id="ref1Mobile"
                    name="ref1Mobile"
                    placeholder="Reference Mobile"
                    disabled={!this.props.isEditable}
                    value={
                      this.props.state !== null
                        ? this.props.state.ref1Mobile
                        : this.props.details.ref1Mobile
                    }
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-40">
                  <label className="labelText" htmlFor="reference2">
                    Reference 2
                  </label>
                </div>
                <div className="col-60">
                  <input
                    onChange={this.props.onChange}
                    className="inputField"
                    type="text"
                    id="reference2"
                    name="reference2"
                    placeholder="Reference Name"
                    disabled={!this.props.isEditable}
                    value={
                      this.props.state !== null
                        ? this.props.state.reference2
                        : this.props.details.reference2
                    }
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-40">
                  <label className="labelText" htmlFor="ref2Mobile">
                    Reference 2 Mobile
                  </label>
                </div>
                <div className="col-60">
                  <input
                    onChange={this.props.onChange}
                    className="inputField"
                    type="text"
                    id="ref2Mobile"
                    name="ref2Mobile"
                    placeholder="Reference Mobile"
                    disabled={!this.props.isEditable}
                    value={
                      this.props.state !== null
                        ? this.props.state.ref2Mobile
                        : this.props.details.ref2Mobile
                    }
                  />
                </div>
              </div>

            </Fragment>}

            {this.props.isEditable && <div
              style={{ textAlign: "left", marginTop: "1rem", display: "flex" }}
            >
              <Button
                onClick={this.uploadDocsBtnOnClickHandler}
                variant="contained"
                size="small"
                color="primary"
                component="span"
              >
                Upload Documents
              </Button>
            </div>}
            <Grid container style={{ margin: "1rem 0px" }}>

              {!this.props.isEditable && <Grid item xs={4}>
                <Link to="/#vehicle/myassets">
                  {"View documents"}
                </Link>
              </Grid>}
              <Grid item xs={this.props.isEditable ? 'auto' : 4}>
                <Link to="/#vehicle/mydrivers">
                  {"View All Driver Details"}
                </Link>
              </Grid>
              {!this.props.isEditable && <Grid item xs={4}>
                <Link to="/#vehicle/myassets">
                  {"Do it later"}
                </Link>
              </Grid>}
            </Grid>
            {/* <Grid container style={{ margin: "1rem 0px" }}>
              {this.props.tab === 4 ? (
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    size="large"
                    color="primary"
                    className={this.props.styles}
                    startIcon={<SaveIcon />}
                  >
                    Save
                  </Button>
                </Grid>
              ) : (
                ""
              )}
            </Grid> */}
          </form>
          {
            this.props.isEditable && <UploadDocumentsModal
              submitOnClickHandler={this.submitOnClickHandler}
              open={this.state.open}
              handleClose={this.closeModal}
            />
          }
          {/* <CustomSnackbar
            openSnackbar={this.state.openSnackbar}
            closeSnackbar={this.closeSnackbar}
            message={"Documents Uploaded!"}
          /> */}
        </div >
      </Fragment >
    );
  }
}

export default DriverDetailsForm;
