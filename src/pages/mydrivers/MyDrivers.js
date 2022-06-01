import React, { useState, useEffect } from "react";
import { driverDetailsData } from "../../common/data/Data";
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
import CustomFilterMenu from "../../components/menu/CustomFilterMenu";
import { Avatar, Container, Grid } from "@material-ui/core";
import { getAllDriver } from "../../api/driver.api";

const styles = (theme) => ({
  driverDetailsCard: {
    height: 340,
    maxHeight: 340,
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

const MyDrivers = (props) => {

  const [driverDetails, setDriverDetails] = useState([]);

  const [cards, setCards] = useState(null);

  const [tags, setTags] = useState([])

  const [mounted, setMounted] = useState(false);

  const history = useHistory();

  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    setTimeout(() => { })
    getDriverDetails();
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
    let filteredDrivers = [];

    driverDetailsData.forEach((driver) => {
      for (let index = 0; index < tags.length; index++) {
        if (driver.driverType === tags[index].title) {
          filteredDrivers.push(driver);
        }
      }
    });

    if (filteredDrivers.length === 0) {
      setDriverDetails(driverDetailsData);
    } else {
      setDriverDetails(filteredDrivers);
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
    history.push("/driver/mydrivers/new");
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
  const getDriverDetails = () => {
    const allDrivers = getAllDriver();
    allDrivers.then((response) => {
        setDriverDetails(response || []);
      }).catch(() => {   
        setDriverDetails([]);
      });
  };

  // redirects to driver details page with driver id
  const driverDetailsClick = (driverId) => {
    history.push("/driver/mydrivers/" + driverId);
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
            placeholder={`Search Driver`}
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
        {driverDetails.length === 0 ? (
          <Typography variant="h6">No Driver Details Available.</Typography>
        ) : (
          <GridList cols={cards} cellHeight="auto">
            {driverDetails.map((driverDetails) => (
              <GridListTile key={"driver" + driverDetails.id}>
                <Card className={classes.driverDetailsCard}>
                  <CardActionArea>
                    {driverDetails.driverImage ? <CardMedia
                      component="img"
                      height={160}
                      image={driverDetails.driverImage}
                      title={driverDetails.fullName}
                    /> : <div className="avatarDiv">
                      <Avatar
                        alt="driver_image"
                        className={classes.placeholderImage}
                      />
                    </div>}
                    <CardContent>
                      <div className="driver-title-div">
                        <Typography gutterBottom variant="h5" component="h2">
                          {driverDetails.fullName}
                        </Typography>
                      </div>
                      <div className="driver-subtitle-div">
                        <Typography variant="subtitle1">
                          License Number: {driverDetails.licenseNo}
                        </Typography>
                      </div>
                      <div className="driver-subtitle-div">
                        <Typography variant="subtitle1">
                          Full Name: {driverDetails.fName + driverDetails.lName}
                        </Typography>
                      </div>
                    </CardContent>
                    <CardActions>
                      <Button
                        component="div"
                        onClick={() => driverDetailsClick(driverDetails.driverId)}
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

export default withStyles(styles)(MyDrivers);
