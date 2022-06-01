import React, { Fragment } from "react";
import "./CustomTabs.css";
import { Typography } from "@material-ui/core";
import { Chart } from "react-google-charts";
import EfficiencyDataTable from "../../components/reports/EfficiencyDataTable";
import Tooltip from "@material-ui/core/Tooltip";

const active = [11, 9, 5, 10];
const distance = [1195, 200.6, 123.7, 65];
const utilScore = [56, 34, 24, 76];
const disciplineScore = [87.3, 56, 93.5];
const drivingTime = [76.4, 65.7, 23.5, 86.8];
const netDrivingTime = [23, 56, 34, 78];
const idleTime = [8.5, 9.0, 2.5, 5.7];
const netIdleTime = [11.4, 6.5, 3.8];

function Efficiency(props) {
  return (
    <Fragment>
      <div className="efficiency-container">
        <div className="efficiency-header-div">
          <div className="efficiency-title efficiency-header-text">
            <Typography variant="body1">
              Trips - {props.selectedVehicleCategory}
            </Typography>
          </div>
          <div className="totalVehicleCount efficiency-header-text">
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
        <div className="efficiency-donut-chart-div">
          <div className="efficiency-chart-div">
            <Chart
              chartType="PieChart"
              width="100%"
              height="100%"
              data={[
                ["Status", "Percentage"],
                ["Moving", props.vehicleStatusPercent.running],
                ["Off", props.vehicleStatusPercent.stopped],
                ["Idle", props.vehicleStatusPercent.faulty],
              ]}
            />
          </div>
          <div className="efficiency-details-divs">
            <div className="efficiency-details-divs-row-one">
              <Tooltip placement="top" title="Total active vehicles">
                <div className="efficiency-details-div">
                  <div className="efficiency-details-list-text">
                    Active vehicles
                  </div>
                  <div>{active[Math.floor(Math.random() * active.length)]}</div>
                </div>
              </Tooltip>
              <Tooltip placement="top" title="Distance in killometers">
                <div className="efficiency-details-div">
                  <div className="efficiency-details-list-text">
                    Distance(Km)
                  </div>
                  <div>
                    {distance[Math.floor(Math.random() * distance.length)]}
                  </div>
                </div>
              </Tooltip>
              <Tooltip placement="top" title="Utilization score">
                <div className="efficiency-details-div">
                  <div className="efficiency-details-list-text">
                    Utilization score
                  </div>
                  <div>
                    {utilScore[Math.floor(Math.random() * utilScore.length)]}
                  </div>
                </div>
              </Tooltip>
              <Tooltip title="Discipline score" placement="top">
                <div className="efficiency-details-div">
                  <div className="efficiency-details-list-text">
                    Discipline score
                  </div>
                  <div>
                    {
                      disciplineScore[
                        Math.floor(Math.random() * disciplineScore.length)
                      ]
                    }
                  </div>
                </div>
              </Tooltip>
            </div>
            <div className="efficiency-details-divs-row-two">
              <Tooltip title="Driving time in hours" placement="top">
                <div className="efficiency-details-div">
                  <div className="efficiency-details-list-text">
                    Driving time(hr)
                  </div>
                  <div>
                    {
                      drivingTime[
                        Math.floor(Math.random() * drivingTime.length)
                      ]
                    }
                  </div>
                </div>
              </Tooltip>
              <Tooltip title="Net percent of driving time" placement="top">
                <div className="efficiency-details-div">
                  <div className="efficiency-details-list-text">
                    Net driving time(%)
                  </div>
                  <div>
                    {
                      netDrivingTime[
                        Math.floor(Math.random() * netDrivingTime.length)
                      ]
                    }
                  </div>
                </div>
              </Tooltip>
              <Tooltip placement="top" title="Idle time in hours">
                <div className="efficiency-details-div">
                  <div className="efficiency-details-list-text">
                    Idle time(hr)
                  </div>
                  <div>
                    {idleTime[Math.floor(Math.random() * idleTime.length)]}
                  </div>
                </div>
              </Tooltip>
              <Tooltip placement="top" title="Net percent of idle time">
                <div className="efficiency-details-div">
                  <div className="efficiency-details-list-text">
                    Net idle time(%)
                  </div>
                  <div>
                    {
                      netIdleTime[
                        Math.floor(Math.random() * netIdleTime.length)
                      ]
                    }
                  </div>
                </div>
              </Tooltip>
            </div>
          </div>
        </div>
        <div className="efficiency-details-data-table">
          <EfficiencyDataTable vehicles={props.vehicles} />
        </div>
      </div>
    </Fragment>
  );
}

export default Efficiency;
