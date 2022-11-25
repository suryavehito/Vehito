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
                  <option>SCV</option>
                  <option>ILCV</option>
                  <option>MHCV</option>
                </select>
              </div>
            </div>
            <div className="row">
              <div className="col-40">
                <label className="labelText" htmlFor="assetType">
                  Select Make
                </label>
              </div>
              <div className="col-60">
                <select
                  onChange={this.props.onChange}
                  disabled={
                    (this.props.details !== null &&
                      this.props.edit === false) ||
                    this.props?.state?.assetType === ""
                  }
                  value={
                    this.props.state !== null
                      ? this.props.state.make
                      : this.props.details.make
                  }
                  className="select"
                  name="make"
                  id="make"
                >
                  <option>Select</option>
                  {this.props?.makeDetails !== null &&
                    this.props?.makeDetails?.map((make) => (
                      <option key={make}>{make.split("-").join(" ")}</option>
                    ))}
                </select>
              </div>
            </div>
            <div className="row">
              <div className="col-40">
                <label className="labelText" htmlFor="assetType">
                  Select Model
                </label>
              </div>
              <div className="col-60">
                <select
                  onChange={this.props.onChange}
                  disabled={
                    (this.props.details !== null &&
                      this.props.edit === false) ||
                    this.props?.state?.make === ""
                  }
                  value={
                    this.props.state !== null
                      ? this.props.state.model
                      : this.props.details.model
                  }
                  className="select"
                  name="model"
                  id="model"
                >
                  <option>Select</option>
                  {this.props?.modelFinalDetails !== null &&
                    this.props?.modelFinalDetails?.map((model) => (
                      <option key={model}>{model}</option>
                    ))}
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
