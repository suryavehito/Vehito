import React, { Fragment } from "react";
import "./CustomTabs.css";
import { Typography } from "@material-ui/core";
import { Chart } from "react-google-charts";
import FuelDataTable from "../../components/reports/FuelDataTable";
import Tooltip from "@material-ui/core/Tooltip";

const fuelData = [11, 6, 8, 3, 4];
const distance = [1234, 453, 612, 98];
const fuelCost = [491.5, 23.4, 87.5];
const avgFuelCost = [0.12, 0.24, 0.5, 0.3];
const fuelConsumed = [435.8, 76.9, 12.6, 643.7];
const fuelConsumptionRatio = [0.2, 0.76, 0.4, 0.34];
const refuelAmount = [511.7, 900, 543.6, 234.6];
const fuelDrops = [0.1, 4, 0.34, 0.6];

function Fuel(props) {
  return (
    <Fragment>
      <div className="fuel-container">
        <div className="fuel-header-div">
          <div className="fuel-title fuel-header-text">
            <Typography variant="body1">
              Trips - {props.selectedVehicleCategory}
            </Typography>
          </div>
          <div className="totalVehicleCount fuel-header-text">
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
        <div className="fuel-donut-chart-div">
          <div className="fule-chart-div">
            <Chart
              chartType="PieChart"
              width="100%"
              height="100%"
              data={[
                ["Consumption", "Percentage"],
                ["Normal Consumption", props.fuelConsumption.normal],
                ["Idle Consumption", props.fuelConsumption.idle],
              ]}
            />
          </div>
          <div className="fuel-details-divs">
            <div className="fuel-details-divs-row-one">
              <Tooltip title="Total vehicles with fuel data" placement="top">
                <div className="fuel-details-div">
                  <div className="fuel-details-list-text">
                    Vehicle with fuel data
                  </div>
                  <div>
                    {fuelData[Math.floor(Math.random() * fuelData.length)]}
                  </div>
                </div>
              </Tooltip>
              <Tooltip title="Distance in killometers" placement="top">
                <div className="fuel-details-div">
                  <div className="fuel-details-list-text">Distance(Km)</div>
                  <div>
                    {distance[Math.floor(Math.random() * distance.length)]}
                  </div>
                </div>
              </Tooltip>
              <Tooltip title="Fuel cost in dollars" placement="top">
                <div className="fuel-details-div">
                  <div className="fuel-details-list-text">Fuel Cost($)</div>
                  <div>
                    {fuelCost[Math.floor(Math.random() * fuelCost.length)]}
                  </div>
                </div>
              </Tooltip>
              <Tooltip placement="top" title="Average fuel cost per Km">
                <div className="fuel-details-div">
                  <div className="fuel-details-list-text">
                    Avg fuel cost per Km
                  </div>
                  <div>
                    {
                      avgFuelCost[
                        Math.floor(Math.random() * avgFuelCost.length)
                      ]
                    }
                  </div>
                </div>
              </Tooltip>
            </div>
            <div className="fuel-details-divs-row-two">
              <Tooltip title="Fuel consumed in litres" placement="top">
                <div className="fuel-details-div">
                  <div className="fuel-details-list-text">
                    Fuel consumed(ltr)
                  </div>
                  <div>
                    {
                      fuelConsumed[
                        Math.floor(Math.random() * fuelConsumed.length)
                      ]
                    }
                  </div>
                </div>
              </Tooltip>
              <Tooltip
                placement="top"
                title="Fuel consumption ratio per killometer"
              >
                <div className="fuel-details-div">
                  <div className="fuel-details-list-text">
                    Fuel consumption ratio(ltr/Km)
                  </div>
                  <div>
                    {
                      fuelConsumptionRatio[
                        Math.floor(Math.random() * fuelConsumptionRatio.length)
                      ]
                    }
                  </div>
                </div>
              </Tooltip>
              <Tooltip title="Refuel amount per litre" placement="top">
                <div className="fuel-details-div">
                  <div className="fuel-details-list-text">
                    Refuel amount(ltr)
                  </div>
                  <div>
                    {
                      refuelAmount[
                        Math.floor(Math.random() * refuelAmount.length)
                      ]
                    }
                  </div>
                </div>
              </Tooltip>
              <Tooltip title="Fuel drops per litre" placement="top">
                <div className="fuel-details-div">
                  <div className="fuel-details-list-text">Fuel drops(ltr)</div>
                  <div>
                    {fuelDrops[Math.floor(Math.random() * fuelDrops.length)]}
                  </div>
                </div>
              </Tooltip>
            </div>
          </div>
        </div>
        <div className="fuel-details-data-table">
          <FuelDataTable vehicles={props.vehicles} />
        </div>
      </div>
    </Fragment>
  );
}

export default Fuel;
