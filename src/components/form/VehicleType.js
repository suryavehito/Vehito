import React, { Component, Fragment } from "react";

class VehicleType extends Component {
  render() {
    return (
      <Fragment>
        <div className="container">
          <form action="">
            <div className="row">
              <div className="col-40">
                <label className="labelText" htmlFor="assetType">
                  Select Vehicle Type
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
                      ? this.props.state.assetType
                      : this.props.details.assetType
                  }
                  className="select"
                  name="assetType"
                  id="assetType"
                >
                  <option>Select</option>
                  <option>Passenger</option>
                  <option>LCV</option>
                  <option>HCV</option>
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
