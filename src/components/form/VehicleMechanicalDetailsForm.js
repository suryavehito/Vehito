import React, { Component, Fragment } from "react";
import "./VehicleDetailsForm.css";

class VehicleMechanicalDetailsForm extends Component {
  render() {
    return (
      <Fragment>
        <div className="container">
          <form action="">
            {/* <div className="row">
              <div className="col-40">
                <label className="labelText" htmlFor="engineNo">
                  Engine No
                </label>
              </div>
              <div className="col-60">
                <input
                  disabled={
                    this.props.details !== null && this.props.edit === false
                  }
                  value={
                    this.props.state !== null
                      ? this.props.state.engineNo
                      : this.props.details.engineNo
                  }
                  onChange={this.props.onChange}
                  className="inputField"
                  type="text"
                  id="engineNo"
                  name="engineNo"
                  placeholder="Engine Number"
                />
              </div>
            </div> */}
            <div className="row">
              <div className="col-40">
                <label className="labelText" htmlFor="transmission">
                  Transmisson
                </label>
              </div>
              <div className="col-60">
              <select
                  onChange={this.props.onChange}
                  disabled={
                    this.props.details !== null && this.props.edit === false
                  }
                  value={
                    this.props.state !== null
                      ? this.props.state.transmission
                      : this.props.details.transmission
                  }
                  className="select"
                  name="transmission"
                  id="transmission"
                  >
                  <option>Select</option>
                  <option>Manual</option>
                  <option>Automatic</option>
                </select>
                </div>
            </div>
          </form>
        </div>
      </Fragment>
    );
  }
}

export default VehicleMechanicalDetailsForm;
