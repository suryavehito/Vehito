import React, { Fragment } from "react";
import "./CustomTabs.css";
import { Typography } from "@material-ui/core";
import { Chart } from "react-google-charts";
import DriverBehaviourDataTable from "../../components/reports/DriverBehaviourDataTable";
import Tooltip from "@material-ui/core/Tooltip";

function DriverBehaviour(props) {
  return (
    <Fragment>
      <div className="driver-behaviour-container">
        <div className="driver-behaviour-header-div">
          <div className="driver-behaviour-title driver-behaviour-header-text">
            <Typography variant="body1">
              Trips - {props.selectedVehicleCategory}
            </Typography>
          </div>
          <div className="totalVehicleCount driver-behaviour-header-text">
            <Typography variant="body1">
              Total Selected Vehicles {props.vehicles.length}
            </Typography>
          </div>
        </div>
        <div className="summary-text">
          <Typography style={{ fontWeight: "bold" }} variant="body1">
            Summary
          </Typography>
        </div>
        <div className="vehicles-driver-behaviour-details">
          <Tooltip placement="top" title="Drving score">
            <div className="driver-behaviour-details">
              <div className="driver-behaviour-details-list-text">
                Driving Score
              </div>
              <div>82.8</div>
            </div>
          </Tooltip>
          <Tooltip placement="top" title="Total active vehicles">
            <div className="driver-behaviour-details">
              <div className="driver-behaviour-details-list-text">
                Active Vehicles
              </div>
              <div>{props.vehicleStatusPercent.totalRunningVehicles}</div>
            </div>
          </Tooltip>
          <Tooltip title="Driving duration in hours" placement="top">
            <div className="driver-behaviour-details">
              <div className="driver-behaviour-details-list-text">
                Driving duration(h)
              </div>
              <div>627.7</div>
            </div>
          </Tooltip>
          <Tooltip placement="top" title="Driver behaviour events per 100 Km">
            <div className="driver-behaviour-details">
              <div className="driver-behaviour-details-list-text">
                Driver behaviour events per 100 Km
              </div>
              <div>18.7</div>
            </div>
          </Tooltip>
          <Tooltip placement="top" title="Distance in killometers">
            <div className="driver-behaviour-details">
              <div className="driver-behaviour-details-list-text">
                Distance (Km)
              </div>
              <div>11965.1</div>
            </div>
          </Tooltip>
          <Tooltip placement="top" title="Total Trips">
            <div className="driver-behaviour-details">
              <div className="driver-behaviour-details-list-text">Trips</div>
              <div>1362</div>
            </div>
          </Tooltip>
        </div>
        <div className="chart-and-graph-div">
          <div className="donut-div">
            <Chart
              chartType="PieChart"
              width="100%"
              height="100%"
              data={[
                ["label", "value"],
                ["Speeding Advisory", 22],
                ["Speeding Warning", 32],
                ["Speeding Caution", 13],
                ["Accelrator", 33],
              ]}
            />
          </div>
          <div className="graph-div">
            <Chart
              width={"100%"}
              height={"100%"}
              chartType="Bar"
              data={[
                ["Date", "", "", ""],
                ["22/02/2021", 1000, 400, 200],
                ["24/02/2021", 1170, 460, 250],
                ["26/02/2021", 660, 1120, 300],
                ["28/02/2021", 1030, 540, 350],
              ]}
              options={{
                // Material design options
                chart: {
                  title: "No of events",
                },
              }}
              rootProps={{ "data-testid": "2" }}
            />
          </div>
        </div>
        <div className="driver-behaviour-details-data-table">
          <DriverBehaviourDataTable vehicles={props.vehicles} />
        </div>
      </div>
    </Fragment>
  );
}

export default DriverBehaviour;
