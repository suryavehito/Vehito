import React, { useState, useEffect } from "react";
import { vehicleDetailsData } from "../../common/data/Data";
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
import { Container, Grid } from "@material-ui/core";
import { getAllAsset } from "../../api/assets.api";
import DriveEtaIcon from "@material-ui/icons/DriveEta";

const styles = (theme) => ({
  vehicleDetailsCard: {
    width: 300,
    maxWidth: 300,
    height: 340,
    maxHeight: 340,
    marginTop: 15,
    marginBottom: 10,
    marginLeft: "auto",
    marginRight: "auto",
    paddingBottom: 15,
    cursor: "pointer",
  },
  actionsContainer: {
    display: "flex",
    alignItems: "center",
    padding: "0px 20px",
    marginTop: "1rem",
  },
});

const MyAssets = (props) => {
  const [vehicleDetails, setVehicalDetails] = useState([]);

  const [cards, setCards] = useState(null);

  const [tags, setTags] = useState([]);

  const [mounted, setMounted] = useState(false);

  const history = useHistory();

  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    setTimeout(() => {});
    getVehicleDetails();
    noOfColumns();
    setMounted(true);
    //when the window is resized calls the noOfColumns method
    window.addEventListener("resize", noOfColumns);
    return () => {
      window.removeEventListener("resize", noOfColumns);
    };
  }, []);

  const onTagsChange = (event, values) => {
    setTags(values);
  };

  const onSubmitBtnClickHandler = () => {
    let filteredVehicles = [];

    vehicleDetailsData.forEach((vehicle) => {
      for (let index = 0; index < tags.length; index++) {
        if (vehicle.vehicleType === tags[index].title) {
          filteredVehicles.push(vehicle);
        }
      }
    });

    if (filteredVehicles.length === 0) {
      setVehicalDetails(vehicleDetailsData);
    } else {
      setVehicalDetails(filteredVehicles);
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
    history.push("/vehicle/myassets/new");
  };

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
      setCards(3);
      return;
    }

    if (window.innerWidth >= 1271 && window.innerWidth <= 1530) {
      setCards(4);
      return;
    }
    if (window.innerWidth >= 1530) {
      setCards(5);
      return;
    }
  };

  //fetches the restaurants from backend
  const getVehicleDetails = () => {
    const allAssets = getAllAsset();
    allAssets
      .then((response) => {
        setVehicalDetails(response || []);
      })
      .catch(() => {
        setVehicalDetails([]);
      });
  };

  // redirects to vehicle details page with vehicle id
  const vehicleDetailsClick = (vehicleId) => {
    history.push("/vehicle/myassets/" + vehicleId);
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
            margin: "auto",
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
            marginRight: "1rem",
          }}
        >
          <CustomFilterMenu
            value={tags}
            anchorEl={anchorEl}
            handleClick={handleClick}
            handleClose={handleClose}
            onSubmitBtnClickHandler={onSubmitBtnClickHandler}
            onTagsChange={onTagsChange}
            searchItem="Assets"
          />
        </Grid>
        <Grid
          item
          xs={"auto"}
          style={{
            marginRight: "1rem",
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
      </Grid>
      <Container style={{ minHeight: "77vh" }}>
        {vehicleDetails.length === 0 ? (
          <Typography variant="h6">No Vehicle Details Available.</Typography>
        ) : (
          <GridList cols={cards} cellHeight="auto">
            {vehicleDetails.map((vehicleDetails) => (
              <GridListTile key={"vehicle" + vehicleDetails.assetId}>
                <Card className={classes.vehicleDetailsCard}>
                  <CardActionArea>
                    {vehicleDetails.imgUrl1 ||
                    vehicleDetails.imgUrl2 ||
                    vehicleDetails.imgUrl3 ? (
                      <CardMedia
                        component="img"
                        height={160}
                        image={
                          vehicleDetails.imgUrl1 ||
                          vehicleDetails.imgUrl2 ||
                          vehicleDetails.imgUrl3
                        }
                        title={vehicleDetails.model}
                      />
                    ) : (
                      <CardMedia
                        component={DriveEtaIcon}
                        style={{
                          height: "160px",
                          width: "100%",
                        }}
                      />
                    )}
                    <CardContent>
                      <div className="vehicle-title-div">
                        <Typography gutterBottom variant="h5" component="h2">
                          {vehicleDetails.model}
                        </Typography>
                      </div>
                      <div className="vehicle-subtitle-div">
                        <Typography variant="subtitle1">
                          Make: {vehicleDetails.make}
                        </Typography>
                      </div>
                      <div className="vehicle-modal-div">
                        <div className="modal-div">
                          <Typography variant="body1">
                            Registraion Number: {vehicleDetails.regNum}
                          </Typography>
                        </div>
                      </div>
                    </CardContent>
                    <CardActions>
                      <Button
                        component="div"
                        onClick={() =>
                          vehicleDetailsClick(vehicleDetails.assetId)
                        }
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
    </div>
  ) : (
    ""
  );
};

export default withStyles(styles)(MyAssets);
