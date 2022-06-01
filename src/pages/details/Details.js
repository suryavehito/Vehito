import React, { Component, Fragment } from "react";
import Header from "../../components/header/Header";
import vehitoBanner from "../../assets/images/vehitoBanner.png";
import Footer from "../../components/footer/Footer";
import { Container } from "@material-ui/core";

class Details extends Component {
  render() {
    return (
      <Fragment>
        <Header showButtons={false} />
        <Container style={{ height: "77vh" }}>
          <div className="banner">
            <img className="banner-img" src={vehitoBanner} alt="banner" />
          </div>
        </Container>
        <Footer />
      </Fragment>
    );
  }
}

export default Details;
