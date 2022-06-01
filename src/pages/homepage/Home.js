import { Container } from "@material-ui/core";
import React, { Component } from "react";
import { Fragment } from "react";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import vehitoBanner from "../../assets/images/vehitoBanner.png";
import "./Home.css";

class Home extends Component {
  render() {
    return (
      <Fragment>
        <Header showButtons={true} />
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

export default Home;
