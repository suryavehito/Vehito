import React, { Fragment, useState, useEffect } from "react";
import "./CustomTabs.css";
import { Typography } from "@material-ui/core";
import { Chart } from "react-google-charts";
import TripsDataTable from "../../components/reports/TripsDataTable";
import Tooltip from "@material-ui/core/Tooltip";

function Trips(props) {
  const [noOfTrips, setNoOfTrips] = useState(null);

  useEffect(() => {
    let totalTrips = 0;
    props.vehicles.map(
      (vehicle, index) => (totalTrips = totalTrips + vehicle.trips.length)
    );
    setNoOfTrips(totalTrips);
  }, [props.vehicles]);

  return (
    <Fragment>
      <div className="trips-container">
        <div className="trips-header-div">
          <div className="trips-title trips-header-text">
            <Typography variant="body1">
              Trips - {props.selectedVehicleCategory}
            </Typography>
          </div>
          <div className="totalVehicleCount trips-header-text">
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
        <div className="vehicles-trips-details">
          <Tooltip title="Total no of trips" placement="top">
            <div className="trips-details">
              <div className="trips-details-list-text">No of trips</div>
              <div>{noOfTrips}</div>
            </div>
          </Tooltip>
          <Tooltip title="Total active vehicles" placement="top">
            <div className="trips-details">
              <div className="trips-details-list-text">Active Vehicles</div>
              <div>10</div>
            </div>
          </Tooltip>
          <Tooltip placement="top" title="Distace(Km)">
            <div className="trips-details">
              <div className="trips-details-list-text">Distance(Km)</div>
              <div>3446</div>
            </div>
          </Tooltip>
          <Tooltip placement="top" title="Avg distace of trip">
            <div className="trips-details">
              <div className="trips-details-list-text">Avg trip distance</div>
              <div>8.1</div>
            </div>
          </Tooltip>
          <Tooltip placement="top" title="Total duration">
            <div className="trips-details">
              <div className="trips-details-list-text">Total Duration(h)</div>
              <div>176.9</div>
            </div>
          </Tooltip>
          <Tooltip placement="top" title="Avg time of trips">
            <div className="trips-details">
              <div className="trips-details-list-text">
                Avg trip duration(h)
              </div>
              <div>0.9</div>
            </div>
          </Tooltip>
        </div>
        <div className="chart-and-graph-div">
          <div className="donut-div">
            <Chart
              width="100%"
              height="100%"
              chartType="PieChart"
              data={[
                ["Status", "Count"],
                ["Running", props.vehicleStatusPercent.running],
                ["Stopped", props.vehicleStatusPercent.stopped],
                ["Faulty", props.vehicleStatusPercent.faulty],
              ]}
            />
          </div>
          <div className="graph-div">
            <Chart
              width={"100%"}
              height={"100%"}
              chartType="AreaChart"
              data={[
                ["time", "Distance(Km)", "No of trips"],
                ["28.02", 900, 1000],
                ["01.03", 950, 1200],
                ["02.03", 930, 1100],
                ["05.06", 900, 1000],
              ]}
              options={{
                isStacked: true,
                height: 240,
                legend: { position: "top", maxLines: 3 },
                vAxis: {
                  minValue: 0,
                },
              }}
              rootProps={{ "data-testid": "3" }}
            />
          </div>
        </div>
        <div className="trips-details-data-table">
          <TripsDataTable vehicles={props.vehicles} />
        </div>
      </div>
    </Fragment>
  );
}

export default Trips;
