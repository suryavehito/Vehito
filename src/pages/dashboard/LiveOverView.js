import React from "react";
import { Fragment } from "react";
import "./CustomTabs.css";
import DonutChart from "react-donut-chart";
import LiveOverViewDataTable from "../../components/reports/LiveOverViewDataTable";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  donutRow: {
    height: "15rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

function LiveOverView(props) {
  const classes = useStyles();
  return (
    <Fragment>
      <div>
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
      </div>
      <div style={{ paddingLeft: "1rem" }}>
        <LiveOverViewDataTable vehicles={props.vehicles} />
      </div>
    </Fragment>
  );
}

export default LiveOverView;
