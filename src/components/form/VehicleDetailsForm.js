import React, { Component, Fragment } from "react";
import "./VehicleDetailsForm.css";

class VehicleDetailsForm extends Component {
  render() {
    return (
      <Fragment>
        <div className="container">
          <form action="">
            <div className="row">
              <div className="col-40">
                <label className="labelText" htmlFor="regNum">
                  Registration Number
                </label>
              </div>
              <div className="col-60">
                <input
                  disabled={
                    this.props.details !== null && this.props.edit === false
                  }
                  value={
                    this.props.state !== null
                      ? this.props.state.regNum
                      : this.props.details.regNum
                  }
                  onChange={this.props.onChange}
                  className="inputField"
                  type="text"
                  id="regNum"
                  name="regNum"
                  placeholder="Registration Number"
                />
              </div>
            </div>
            {/* <div className="row">
              <div className="col-40">
                <label className="labelText" htmlFor="">
                  Make
                </label>
              </div>
              <div className="col-60">
                <input
                  disabled={
                    this.props.details !== null && this.props.edit === false
                  }
                  value={
                    this.props.state !== null
                      ? this.props.state.make
                      : this.props.details.make
                  }
                  onChange={this.props.onChange}
                  className="inputField"
                  type="text"
                  id="make"
                  name="make"
                  placeholder="Make"
                />
              </div>
            </div>
            <div className="row">
              <div className="col-40">
                <label className="labelText" htmlFor="model">
                  Model
                </label>
              </div>
              <div className="col-60">
                <input
                  disabled={
                    this.props.details !== null && this.props.edit === false
                  }
                  value={
                    this.props.state !== null
                      ? this.props.state.model
                      : this.props.details.model
                  }
                  onChange={this.props.onChange}
                  className="inputField"
                  type="text"
                  id="model"
                  name="model"
                  placeholder="Modal"
                />
              </div>
            </div> */}
            <div className="row">
              <div className="col-40">
                <label className="labelText" htmlFor="engineNo">
                  Engine Number
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
            </div>
            <div className="row">
              <div className="col-40">
                <label className="labelText" htmlFor="odoStart">
                  Odometer Number
                </label>
              </div>
              <div className="col-60">
                <input
                  disabled={
                    this.props.details !== null && this.props.edit === false
                  }
                  value={
                    this.props.state !== null
                      ? this.props.state.odoStart
                      : this.props.details.odoStart
                  }
                  onChange={this.props.onChange}
                  className="inputField"
                  type="text"
                  id="odoStart"
                  name="odoStart"
                  placeholder="Odometer Number"
                />
              </div>
            </div>
            <div className="row">
              <div className="col-40">
                <label className="labelText" htmlFor="imei">
                  IMEI Number
                </label>
              </div>
              <div className="col-60">
                <input
                  disabled={
                    this.props.details !== null && this.props.edit === false
                  }
                  value={
                    this.props.state !== null
                      ? this.props.state.imei
                      : this.props.details.imei
                  }
                  onChange={this.props.onChange}
                  className="inputField"
                  type="text"
                  id="imei"
                  name="imei"
                  placeholder="IMEI Number"
                />
              </div>
            </div>
            <div className="row">
              <div className="col-40">
                <label className="labelText" htmlFor="imei">
                  Tank Capacity
                </label>
              </div>
              <div className="col-60">
                <input
                  disabled={
                    this.props.details !== null && this.props.edit === false
                  }
                  value={
                    this.props.state !== null
                      ? this.props.state.tankCapacity
                      : this.props.details.tankCapacity
                  }
                  onChange={this.props.onChange}
                  className="inputField"
                  type="number"
                  id="tankCapacity"
                  name="tankCapacity"
                  placeholder="0"
                />
              </div>
            </div>
          </form>
        </div>
      </Fragment>
    );
  }
}

export default VehicleDetailsForm;
