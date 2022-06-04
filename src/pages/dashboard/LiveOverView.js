import React, { useEffect, useState } from "react";
import { Fragment } from "react";
import "./CustomTabs.css";
import DonutChart from "react-donut-chart";
import LiveOverViewDataTable from "../../components/reports/LiveOverViewDataTable";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import ErrorIcon from "@material-ui/icons/Error";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import { getLiveDataAsset } from "../../api/assets.api";

const useStyles = makeStyles((theme) => ({
  donutRow: {
    height: "15rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  summary: {
    fontSize: 16,
    fontWeight: 700,
    margin: "1rem",
  },
  labelAndValue: {
    display: "flex",
    margin: "1rem 0px",
  },
  label: {
    fontWeight: 500,
    fontSize: 14,
    width: "50%",
    display: "flex",
    alignItems: "center",
  },
  value: {
    fontWeight: 500,
    fontSize: 14,
    width: "50%",
    display: "flex",
    alignItems: "center",
  },
  checkIcon: {
    color: "green",
    marginRight: "0.15rem",
  },
  errorIcon: {
    color: "orange",
    marginRight: "0.15rem",
  },
}));

function LiveOverView(props) {
  const classes = useStyles();

  const [assetDetails, setAssetDetails] = useState(null);

  useEffect(() => {
    getAssetLiveDetails();
  }, []);

  const getAssetLiveDetails = () => {
    const getAssetLiveDetailsResponse = getLiveDataAsset(props?.assetId);
    getAssetLiveDetailsResponse.then((res) => {
      setAssetDetails(res);
    });
  };

  return (
    <Fragment>
      <Grid container>
        <Grid item xs={12}>
          <div className={classes.summary}>Summary</div>
          <Grid style={{ margin: "1rem" }} container>
            <Grid item lg={4}>
              <div className={classes.labelAndValue}>
                <div className={classes.label}>Registration Number</div>
                <div className={classes.value}>{assetDetails?.regNo ?? ""}</div>
              </div>
              <div className={classes.labelAndValue}>
                <div className={classes.label}>Vehicle Information</div>
                <div className={classes.value}>
                  {assetDetails?.assetName ?? ""}
                </div>
              </div>
              <div className={classes.labelAndValue}>
                <div className={classes.label}>Report Time</div>
                <div className={classes.value}>
                  {new Date(assetDetails?.dateTime * 1000).toUTCString()}
                </div>
              </div>
            </Grid>
            <Grid item lg={4}>
              <div className={classes.labelAndValue}>
                {/* <div className={classes.label}>Garage Name</div> */}
                <div className={classes.value}></div>
              </div>
            </Grid>
            <Grid item lg={4}></Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <div className={classes.summary}>Engine Check</div>
          <Grid style={{ margin: "1rem" }} container>
            <Grid item lg={4}>
              <div className={classes.labelAndValue}>
                <div className={classes.label}>Fuel Trim</div>
                <div className={classes.value}>
                  {assetDetails?.fuelTrim ? (
                    <>
                      <CheckCircleIcon className={classes.checkIcon} />
                      <span>Pass</span>
                    </>
                  ) : (
                    <>
                      <ErrorIcon className={classes.errorIcon} />
                      <span>Fail</span>
                    </>
                  )}
                </div>
              </div>
              <div className={classes.labelAndValue}>
                <div className={classes.label}>Computer Circuit</div>
                <div className={classes.value}>
                  {assetDetails?.computerCircuit ? (
                    <>
                      <CheckCircleIcon className={classes.checkIcon} />
                      <span>Pass</span>
                    </>
                  ) : (
                    <>
                      <ErrorIcon className={classes.errorIcon} />
                      <span>Fail</span>
                    </>
                  )}
                </div>
              </div>
              <div className={classes.labelAndValue}>
                <div className={classes.label}>Battery Voltage</div>
                <div className={classes.value}>
                  {assetDetails?.batteryVoltage !== "" ||
                  assetDetails?.batteryVoltage !== null ? (
                    <>
                      <CheckCircleIcon className={classes.checkIcon} />
                      <span>{assetDetails?.batteryVoltage}</span>
                    </>
                  ) : (
                    <>
                      <ErrorIcon className={classes.errorIcon} />
                      <span>Fail</span>
                    </>
                  )}
                </div>
              </div>
              <div className={classes.labelAndValue}>
                <div className={classes.label}>Coolant Temp</div>
                <div className={classes.value}>
                  {assetDetails?.coolantTemp ? (
                    <>
                      <CheckCircleIcon className={classes.checkIcon} />
                      <span>Pass</span>
                    </>
                  ) : (
                    <>
                      <ErrorIcon className={classes.errorIcon} />
                      <span>Fail</span>
                    </>
                  )}
                </div>
              </div>
            </Grid>
            <Grid item lg={4}>
              <div className={classes.labelAndValue}>
                <div className={classes.label}>Emission Control</div>
                <div className={classes.value}>
                  {assetDetails?.emissionControl ? (
                    <>
                      <CheckCircleIcon className={classes.checkIcon} />
                      <span>Pass</span>
                    </>
                  ) : (
                    <>
                      <ErrorIcon className={classes.errorIcon} />
                      <span>Fail</span>
                    </>
                  )}
                </div>
              </div>
              <div className={classes.labelAndValue}>
                <div className={classes.label}>Engine Load</div>
                <div className={classes.value}>
                  {assetDetails?.engineLoad ? (
                    <>
                      <CheckCircleIcon className={classes.checkIcon} />
                      <span>Pass</span>
                    </>
                  ) : (
                    <>
                      <ErrorIcon className={classes.errorIcon} />
                      <span>Fail</span>
                    </>
                  )}
                </div>
              </div>
              <div className={classes.labelAndValue}>
                <div className={classes.label}>Fuel And Air Mix</div>
                <div className={classes.value}>
                  {assetDetails?.fuelAndAirMix ? (
                    <>
                      <CheckCircleIcon className={classes.checkIcon} />
                      <span>Pass</span>
                    </>
                  ) : (
                    <>
                      <ErrorIcon className={classes.errorIcon} />
                      <span>Fail</span>
                    </>
                  )}
                </div>
              </div>
              <div className={classes.labelAndValue}>
                <div className={classes.label}>Fuel Pressure</div>
                <div className={classes.value}>
                  {assetDetails?.fuelPressure ? (
                    <>
                      <CheckCircleIcon className={classes.checkIcon} />
                      <span>Pass</span>
                    </>
                  ) : (
                    <>
                      <ErrorIcon className={classes.errorIcon} />
                      <span>Fail</span>
                    </>
                  )}
                </div>
              </div>
            </Grid>
            <Grid item lg={4}>
              <div className={classes.labelAndValue}>
                <div className={classes.label}>Ignition Module</div>
                <div className={classes.value}>
                  {assetDetails?.ignitionModule ? (
                    <>
                      <CheckCircleIcon className={classes.checkIcon} />
                      <span>Pass</span>
                    </>
                  ) : (
                    <>
                      <ErrorIcon className={classes.errorIcon} />
                      <span>Fail</span>
                    </>
                  )}
                </div>
              </div>
              <div className={classes.labelAndValue}>
                <div className={classes.label}>Injector Module</div>
                <div className={classes.value}>
                  {assetDetails?.injectorModule ? (
                    <>
                      <CheckCircleIcon className={classes.checkIcon} />
                      <span>Pass</span>
                    </>
                  ) : (
                    <>
                      <ErrorIcon className={classes.errorIcon} />
                      <span>Fail</span>
                    </>
                  )}
                </div>
              </div>
              <div className={classes.labelAndValue}>
                <div className={classes.label}>Intake AirTemp</div>
                <div className={classes.value}>
                  {assetDetails?.intakeAirTemp ? (
                    <>
                      <CheckCircleIcon className={classes.checkIcon} />
                      <span>Pass</span>
                    </>
                  ) : (
                    <>
                      <ErrorIcon className={classes.errorIcon} />
                      <span>Fail</span>
                    </>
                  )}
                </div>
              </div>
              <div className={classes.labelAndValue}>
                <div className={classes.label}>MAF</div>
                <div className={classes.value}>
                  {assetDetails?.maf ? (
                    <>
                      <CheckCircleIcon className={classes.checkIcon} />
                      <span>Pass</span>
                    </>
                  ) : (
                    <>
                      <ErrorIcon className={classes.errorIcon} />
                      <span>Fail</span>
                    </>
                  )}
                </div>
              </div>
            </Grid>
            <Grid item lg={4}>
              <div className={classes.labelAndValue}>
                <div className={classes.label}>RPM</div>
                <div className={classes.value}>
                  {assetDetails?.rpm ? (
                    <>
                      <CheckCircleIcon className={classes.checkIcon} />
                      <span>Pass</span>
                    </>
                  ) : (
                    <>
                      <ErrorIcon className={classes.errorIcon} />
                      <span>Fail</span>
                    </>
                  )}
                </div>
              </div>
              <div className={classes.labelAndValue}>
                <div className={classes.label}>Throttle Position</div>
                <div className={classes.value}>
                  {assetDetails?.throttlePosition ? (
                    <>
                      <CheckCircleIcon className={classes.checkIcon} />
                      <span>Pass</span>
                    </>
                  ) : (
                    <>
                      <ErrorIcon className={classes.errorIcon} />
                      <span>Fail</span>
                    </>
                  )}
                </div>
              </div>
              <div className={classes.labelAndValue}>
                <div className={classes.label}>Transmission</div>
                <div className={classes.value}>
                  {assetDetails?.transmission ? (
                    <>
                      <CheckCircleIcon className={classes.checkIcon} />
                      <span>Pass</span>
                    </>
                  ) : (
                    <>
                      <ErrorIcon className={classes.errorIcon} />
                      <span>Fail</span>
                    </>
                  )}
                </div>
              </div>
              <div className={classes.labelAndValue}>
                <div className={classes.label}>Vehicle Speed Idle</div>
                <div className={classes.value}>
                  {assetDetails?.vehicleSpeedIdle ? (
                    <>
                      <CheckCircleIcon className={classes.checkIcon} />
                      <span>Pass</span>
                    </>
                  ) : (
                    <>
                      <ErrorIcon className={classes.errorIcon} />
                      <span>Fail</span>
                    </>
                  )}
                </div>
              </div>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      {/* <div>
        <div className={classes.donutRow}>
          <DonutChart
            className="donut-chart-status"
            data={[
              {
                label: "Status - Running",
                value: props.vehicleStatusPercent.running,
              },
              {
                label: "Status - Stopped",
                value: props.vehicleStatusPercent.stopped,
              },
              {
                label: "Status - Faulty",
                value: props.vehicleStatusPercent.faulty,
              },
            ]}
            colors={["#ff5722", "#673ab7"]}
          />
        </div>
        <div className={classes.donutRow}>
          <DonutChart
            className="donut-chart-oddometer"
            data={[
              {
                label: "Oddometer(Km) 0-5k",
                value: props.vehicleOddometerPercent.belowFiveThousand,
              },
              {
                label: "Oddometer(Km) 5k-8k",
                value: props.vehicleOddometerPercent.belowEightThousand,
              },
              {
                label: "Oddometer(Km) 8k-10k",
                value: props.vehicleOddometerPercent.belowTenThousand,
              },
            ]}
            colors={["#8bc34a", "#ff5722", "#673ab7"]}
          />
          <DonutChart
            className="donut-chart-fuel"
            data={[
              {
                label: "Fuel 0-200",
                value: props.vehicleFuelPercent.belowTwoHundred,
              },
              {
                label: "Fuel 201-500",
                value: props.vehicleFuelPercent.belowFiveHundred,
              },
              {
                label: "Fuel 501-700",
                value: props.vehicleFuelPercent.belowSevenHundred,
              },
            ]}
            colors={["#673ab7", "#8bc34a", "#ff5722"]}
          />
        </div>
      </div> */}
      <div style={{ paddingLeft: "1rem" }}>
        {assetDetails !== null && <LiveOverViewDataTable data={assetDetails} />}
      </div>
    </Fragment>
  );
}

export default LiveOverView;
