import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

//importing material-ui components
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActionArea from "@material-ui/core/CardActionArea";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import CardActions from "@material-ui/core/CardActions";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import { Avatar, Container, Grid } from "@material-ui/core";
import { getAllTrip } from "../../api/trip.api";

const styles = (theme) => ({
  tripDetailsCard: {
    height: '200px',
    maxHeight: '200px',
    marginTop: 15,
    marginBottom: 10,
    marginLeft: "auto",
    marginRight: "auto",
    paddingBottom: 15,
    cursor: "pointer",
    width: "100%"
  },
  actionsContainer: {
    display: "flex",
    alignItems: "center",
    padding: "0px 20px",
    marginTop: "1rem"
  },
  placeholderImage: {
    width: theme.spacing(17),
    height: theme.spacing(17),
    cursor: "pointer",
    "&:hover": {
      opacity: "0.5",
    },
    display: "flex",
    justifyContent: "center",
    color: "rgba(0, 0, 0, 0.54)"
  },
});

const Trips = (props) => {

  const [tripDetails, setTripDetails] = useState([]);

  const [cards, setCards] = useState(null);

  const [tags, setTags] = useState([])

  const [mounted, setMounted] = useState(false);

  const history = useHistory();

  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    setTimeout(() => { })
    getTripDetails();
    noOfColumns();
    setMounted(true)
    //when the window is resized calls the noOfColumns method
    window.addEventListener("resize", noOfColumns);
    return () => {
      window.removeEventListener("resize", noOfColumns);
    }
  }, []);

  const onTagsChange = (event, values) => {
    setTags(values);
  };

  const onSubmitBtnClickHandler = () => {
    let filteredTrips = [];

    if (filteredTrips.length === 0) {
      setTripDetails([]);
    } else {
      setTripDetails(filteredTrips);
    }

    handleClose();
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const addClick = () => {
    history.push("/trips/new");
  }

  //method updates the no columns according to the window size
  const noOfColumns = () => {
    if (window.innerWidth >= 320 && window.innerWidth <= 600) {
      setCards(1);
      return;
    }

    if (window.innerWidth >= 601 && window.innerWidth <= 1000) {
      setCards(2);
      return;
    }

    if (window.innerWidth >= 1001 && window.innerWidth <= 1270) {
      setCards(3)
      return;
    }

    if (window.innerWidth >= 1271 && window.innerWidth <= 1530) {
      setCards(4);
      return;
    }
    if (window.innerWidth >= 1530) {
      setCards(5)
      return;
    }
  };

  //fetches the restaurants from backend
  const getTripDetails = () => {
    const allTrips = getAllTrip();
    allTrips.then((response) => {
        setTripDetails(response || []);
      }).catch(() => {   
        setTripDetails([]);
      });
  };

  // redirects to trip details page with trip id
  const tripDetailsClick = (tripId) => {
    history.push("/trips/" + tripId);
  };

  const { classes } = props;

  return mounted === true ? (
    <div>
      <Header />
      <Grid container className={classes.actionsContainer} justify="flex-end">
        <Grid
          item
          lg={4}
          xs={12}
          style={{
            margin: "auto"
          }}
        >
          <input
            onChange={props.onChange}
            className="inputField"
            type="text"
            id="searchText"
            name="searchText"
            placeholder={`Search Trip`}
          />
        </Grid>
        <Grid
          item
          xs={"auto"}
          style={{
            marginRight: "1rem"
          }}
        >
          <Button
            type="submit"
            onClick={addClick}
            variant="contained"
            color="primary"
          >
            Add
          </Button>
        </Grid>
      </Grid >

      <Container style={{ minHeight: "77vh" }}>
        {tripDetails.length === 0 ? (
          <Typography variant="h6">No Trip Details Available.</Typography>
        ) : (
          <GridList cols={'cards'} cellHeight="auto">
            {tripDetails.map((tripDetails) => (
              <GridListTile key={"trip" + tripDetails.id}>
                <Card className={classes.tripDetailsCard}>
                  <CardActionArea>
                    <CardContent>
                      <div className="trip-title-div">
                        <Typography gutterBottom variant="h5" component="h2">
                          {tripDetails.startLocation} -> {tripDetails.endLocation}
                        </Typography>
                      </div>
                      <div className="trip-subtitle-div">
                        <Typography variant="subtitle1">
                          Registration No.: {tripDetails.regNo}
                        </Typography>
                      </div>
                      <div className="trip-subtitle-div">
                        <Typography variant="subtitle1">
                          Driver Name: {tripDetails.driverName}
                        </Typography>
                      </div>
                    </CardContent>
                    <CardActions>
                      <Button
                        component="div"
                        onClick={() => tripDetailsClick(tripDetails.tripId)}
                        size="small"
                        color="primary"
                      >
                        View More
                      </Button>
                    </CardActions>
                  </CardActionArea>
                </Card>
              </GridListTile>
            ))}
          </GridList>
        )}
      </Container>
      <Footer />
    </div >
  ) : (
    ""
  );
}

export default withStyles(styles)(Trips);
