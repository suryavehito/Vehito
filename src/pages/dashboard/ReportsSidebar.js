import React from "react";
import { Fragment } from "react";
import {
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@material-ui/core";
import {
  faGasPump,
  faLifeRing,
  faPlayCircle,
  faSuitcase,
  faFan,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function ReportsSidebar(props) {
  return (
    <Fragment>
      <Grid
        item
        lg={2}
        style={{
          height: "42.85rem",
          borderRight: "1px solid gray",
          backgroundColor: "white",
        }}
      >
        <div>
          <p
            style={{
              marginTop: 0,
              fontSize: "medium",
              marginBottom: 0,
              paddingTop: "0.9rem",
              paddingLeft: "0.4rem",
            }}
          >
            Reports List
          </p>
          <List
            aria-label="vehical details"
            style={{ paddingRight: "0.35rem", paddingLeft: "0.35rem" }}
          >
            <ListItem
              button
              onClick={() => props.listItemClickHandler("liveOverView")}
            >
              <ListItemIcon style={{ minWidth: 25 }}>
                <FontAwesomeIcon icon={faPlayCircle} />
              </ListItemIcon>
              <ListItemText primary="Live Overview" />
            </ListItem>
            <Divider />
            <ListItem
              button
              onClick={() => props.listItemClickHandler("trips")}
            >
              <ListItemIcon style={{ minWidth: 25 }}>
                <FontAwesomeIcon icon={faSuitcase} />
              </ListItemIcon>
              <ListItemText primary="Trips" />
            </ListItem>
            <Divider />
            <ListItem
              button
              onClick={() => props.listItemClickHandler("driverBehaviour")}
            >
              <ListItemIcon style={{ minWidth: 25 }}>
                <FontAwesomeIcon icon={faLifeRing} />
              </ListItemIcon>
              <ListItemText primary="Driver behaviour" />
            </ListItem>
            <Divider />
            <ListItem button onClick={() => props.listItemClickHandler("fuel")}>
              <ListItemIcon style={{ minWidth: 25 }}>
                <FontAwesomeIcon icon={faGasPump} />
              </ListItemIcon>
              <ListItemText primary="Fuel" />
            </ListItem>
            <Divider />
            <ListItem
              button
              onClick={() => props.listItemClickHandler("efficiency")}
            >
              <ListItemIcon style={{ minWidth: 25 }}>
                <FontAwesomeIcon icon={faFan} />
              </ListItemIcon>
              <ListItemText primary="Efficiency" />
            </ListItem>
            <Divider />
            <ListItem
              button
              onClick={() => props.listItemClickHandler("engineImmobilizer")}
            >
              <ListItemIcon style={{ minWidth: 25 }}>
                <FontAwesomeIcon icon={faFan} />
              </ListItemIcon>
              <ListItemText primary="Engine Immobilizer" />
            </ListItem>
            <Divider />
            <ListItem
              button
              onClick={() => props.listItemClickHandler("tiltAndElevation")}
            >
              <ListItemIcon style={{ minWidth: 25 }}>
                <FontAwesomeIcon icon={faFan} />
              </ListItemIcon>
              <ListItemText primary="Tilt And Elevation" />
            </ListItem>
            <Divider />
            <ListItem
              button
              onClick={() =>
                props.listItemClickHandler("suddenAccelerationAndHarshBraking")
              }
            >
              <ListItemIcon style={{ minWidth: 25 }}>
                <FontAwesomeIcon icon={faFan} />
              </ListItemIcon>
              <ListItemText primary="Sudden Acceleration And Harsh Braking" />
            </ListItem>
          </List>
        </div>
      </Grid>
    </Fragment>
  );
}

export default ReportsSidebar;
