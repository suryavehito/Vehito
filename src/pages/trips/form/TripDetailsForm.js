import { Button, makeStyles, TextField } from "@material-ui/core";
import moment from "moment";
import React, { Fragment, useEffect, useState } from "react";
import { getAllAsset } from "../../../api/assets.api";
import { getAllDriver } from "../../../api/driver.api";
import { getActiveTripsByAssetId } from "../../../api/trip.api";
import "./TripDetailsForm.css";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    width: "100%",
  },
}));

const TripDetailsForm = (props) => {
  const [assets, setAssets] = useState({});
  const [drivers, setDrivers] = useState([]);
  const status = [
    { key: 1, value: "NEW" },
    { key: 2, value: "STARTED" },
    { key: 3, value: "IN-PROGRESS" },
    { key: 4, value: "COMPLETED" },
    { key: 5, value: "CANCELLED" },
  ];

  useEffect(() => {
    const allDrivers = getAllDriver();
    allDrivers
      .then((response) => {
        setDrivers(response || []);
      })
      .catch(() => {
        setDrivers([]);
      });

    const allAssets = getAllAsset();
    allAssets
      .then((response) => {
        const tmpAsset = {};
        response.forEach((res) => {
          tmpAsset[res.assetId] = res;
        });
        setAssets(tmpAsset);
      })
      .catch(() => {
        setAssets({});
      });
  }, []);

  useEffect(() => {
    props?.setSelectedAsset(props.state.assetId);
  }, [props.state.assetId]);

  const onAssetChange = (event) => {
    props.onAssetChange(assets[event.target.value]);
    props?.setSelectedAsset(assets[event.target.value]);
  };

  const classes = useStyles();
  return (
    <Fragment>
      <div className="container">
        <form action="">
          <div className="row">
            <div className="col-40">
              <label className="labelText" htmlFor="driverName">
                Driver
              </label>
            </div>
            <div className="col-60">
              <select
                onChange={props.onChange}
                value={props.state.driverName}
                className="select"
                name="driverName"
                id="driverName"
                disabled={!props.isNew}
              >
                <option>Select</option>
                {drivers.map((driver) => (
                  <option value={`${driver.fName} ${driver.lName}`}>
                    {driver.fName} {driver.lName}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="row">
            <div className="col-40">
              <label className="labelText" htmlFor="assetName">
                Asset
              </label>
            </div>
            <div className="col-60">
              <select
                onChange={onAssetChange}
                value={props?.selectedAsset}
                className="select"
                name="assetName"
                id="assetName"
                disabled={!props.isNew}
              >
                <option>Select</option>
                {Object.keys(assets).map((key) => (
                  <option
                    value={key}
                  >{`${assets[key].make} - ${assets[key].model}`}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="row">
            <div className="col-40">
              <label className="labelText" htmlFor="startLocation">
                Start Location
              </label>
            </div>
            <div className="col-60">
              <input
                onChange={props.onChange}
                className="inputField"
                type="text"
                id="startLocation"
                name="startLocation"
                placeholder="Start Location"
                value={props.state.startLocation}
                disabled={!props.isNew}
              />
            </div>
          </div>
          {props.state.startLocation &&
            props.state.endLocation &&
            (props.state.breakPoints || []).map((breakpoint, index) => {
              return (
                <div className="row">
                  <div className="col-40">
                    <label className="labelText" htmlFor="startLocation">
                      Breakpoint {index + 1}
                    </label>
                  </div>
                  <div className={props.isNew ? "col-50" : "col-60"}>
                    <input
                      onChange={props.onBreakPointChange(index)}
                      className="inputField"
                      type="text"
                      id="startLocation"
                      name="startLocation"
                      placeholder="Breakpoint"
                      value={breakpoint}
                      disabled={!props.isNew}
                    />
                  </div>
                  {props.isNew && (
                    <div className="col-10">
                      <Button
                        variant="contained"
                        size="large"
                        color="secondary"
                        onClick={props.removeBreakPoint(index)}
                      >
                        Remove
                      </Button>
                    </div>
                  )}
                </div>
              );
            })}
          {props.isNew && props.state.startLocation && props.state.endLocation && (
            <div className="row">
              <div className="col-40"></div>
              <div className="col-60">
                <Button
                  variant="contained"
                  size="large"
                  style={{ backgroundColor: "lightblue" }}
                  onClick={props.addBreakPoint}
                >
                  Add Break Point
                </Button>
              </div>
            </div>
          )}
          <div className="row">
            <div className="col-40">
              <label className="labelText" htmlFor="endLocation">
                End Location
              </label>
            </div>
            <div className="col-60">
              <input
                onChange={props.onChange}
                className="inputField"
                type="text"
                id="endLocation"
                name="endLocation"
                placeholder="End Location"
                value={props.state.endLocation}
                disabled={!props.isNew}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-40">
              <label className="labelText" htmlFor="regNo">
                Registration Number
              </label>
            </div>
            <div className="col-60">
              <input
                className="inputField"
                type="text"
                id="regNo"
                name="regNo"
                placeholder="Registration No."
                value={props.state.regNo}
                disabled={true}
              />
            </div>
          </div>
          {!props.isNew && (
            <>
              <div className="row">
                <div className="col-40">
                  <label className="labelText" htmlFor="status">
                    Status
                  </label>
                </div>
                <div className="col-60">
                  <select
                    onChange={props.onChange}
                    value={props.state.status}
                    className="select"
                    name="status"
                    id="status"
                    disabled={!props.isEditMode}
                  >
                    <option>Select</option>
                    {status.map((asset) => (
                      <option value={`${asset.key}`}>{asset.value}</option>
                    ))}
                  </select>
                </div>
              </div>
              {props?.state?.status === "2" && (
                <div className="row">
                  <div className="col-40">
                    <label className="labelText" htmlFor="fuelStart">
                      Fuel Start Level
                    </label>
                  </div>
                  <div className="col-60">
                    <input
                      onChange={props.onChange}
                      className="inputField"
                      type="text"
                      id="fuelStart"
                      name="fuelStart"
                      placeholder="Fuel Start Level"
                      value={props.state.fuelStart}
                      disabled={!props.isEditMode}
                    />
                  </div>
                </div>
              )}
              {props.state.status >= 2 && props.state.status <= 4 && (
                <div className="row">
                  <div className="col-40">
                    <label className="labelText" htmlFor="status">
                      Start Date & Time
                    </label>
                  </div>
                  <div className="col-60">
                    <TextField
                      id="startTime"
                      name="startTime"
                      variant="outlined"
                      type="datetime-local"
                      className={classes.textField}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      disabled={props.state.status == 4 || !props.isEditMode}
                      onChange={props.onStartDateChange}
                      value={
                        typeof props?.state?.startTime === "number"
                          ? `${new Date(
                              props?.state?.startTime
                            )?.getFullYear()}-${
                              new Date(props?.state?.startTime)?.getMonth() <
                                10 && "0"
                            }${new Date(
                              props?.state?.startTime
                            )?.getMonth()}-${new Date(
                              props?.state?.startTime
                            )?.getDate()}T${new Date(
                              props?.state?.startTime
                            )?.getHours()}:${new Date(
                              props?.state?.startTime
                            )?.getMinutes()}`
                          : props?.state?.startTime
                      }
                    />
                  </div>
                </div>
              )}
              {props.state.status == 4 && (
                <div className="row">
                  <div className="col-40">
                    <label className="labelText" htmlFor="status">
                      End Date & Time
                    </label>
                  </div>
                  <div className="col-60">
                    <TextField
                      id="endTime"
                      name="endTime"
                      variant="outlined"
                      type="datetime-local"
                      className={classes.textField}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      onChange={props.onDateChange}
                      value={
                        typeof props?.state?.endDate === "number"
                          ? `${new Date(
                              props?.state?.endDate
                            )?.getFullYear()}-${
                              new Date(props?.state?.endDate)?.getMonth() <
                                10 && "0"
                            }${new Date(
                              props?.state?.endDate
                            )?.getMonth()}-${new Date(
                              props?.state?.endDate
                            )?.getDate()}T${new Date(
                              props?.state?.endDate
                            )?.getHours()}:${new Date(
                              props?.state?.endDate
                            )?.getMinutes()}`
                          : props?.state?.endDate
                      }
                    />
                  </div>
                </div>
              )}
            </>
          )}
        </form>
      </div>
    </Fragment>
  );
};

export default TripDetailsForm;
