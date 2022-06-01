import React, { Component, Fragment } from "react";

class VehicleType extends Component {
  render() {
    return (
      <Fragment>
        <div className="container">
          <form action="">
            <div className="row">
              <div className="col-40">
                <label className="labelText" htmlFor="assignDriver">
                  Assign Driver
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
                      ? this.props.state.assignedDriver
                      : this.props.details.assignedDriver
                  }
                  className="select"
                  name="assignedDriver"
                  id="assignedDriver"
                >
                  <option>Select</option>
                  <option>Ashok</option>
                  <option>Deepak</option>
                  <option>Ramana</option>
                  <option>Gokul</option>
                  <option>Raju</option>
                  <option>Mukesh</option>
                  <option>Divesh</option>
                  <option>Dinesh</option>
                  <option>Laxman</option>
                  <option>Gopal</option>
                </select>
              </div>
            </div>
          </form>
        </div>
      </Fragment>
    );
  }
}

export default VehicleType;
