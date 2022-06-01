import React, { Component, Fragment } from "react";
import "./VehicleDetailsForm.css";

class VehicleInsuranceDetailsForm extends Component {
  render() {
    return (
      <Fragment>
        <div className="container">
          <form action="">
            <div className="row">
              <div className="col-40">
                <label className="labelText" htmlFor="insuranceComp">
                  Insurance Company
                </label>
              </div>
              <div className="col-60">
                <input
                  disabled={
                    this.props.details !== null && this.props.edit === false
                  }
                  value={
                    this.props.state !== null
                      ? this.props.state.insuranceComp
                      : this.props.details.insuranceComp
                  }
                  onChange={this.props.onChange}
                  className="inputField"
                  type="text"
                  placeholder="Insurance Company"
                  id="insuranceComp"
                  name="insuranceComp"
                />
              </div>
            </div>
            <div className="row">
              <div className="col-40">
                <label className="labelText" htmlFor="insuranceExp">
                  End Date
                </label>
              </div>
              <div className="col-60">
                <input
                  disabled={
                    this.props.details !== null && this.props.edit === false
                  }
                  value={
                    this.props.state !== null
                      ? this.props.state.insuranceExp
                      : this.props.details.insuranceExp
                  }
                  onChange={this.props.onChange}
                  className="inputField date-input"
                  type={
                    this.props.details === null || this.props.edit
                      ? "date"
                      : "text"
                  }
                  id="insuranceExp"
                  name="insuranceExp"
                />
              </div>
            </div>
          </form>
        </div>
      </Fragment>
    );
  }
}

export default VehicleInsuranceDetailsForm;
