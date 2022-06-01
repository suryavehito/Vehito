import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { Container } from "@material-ui/core";

export default function Footer() {
  return (
    <AppBar
      style={{ width: "100%", backgroundColor: "dimgray", marginTop: "0.5rem" }}
      position="static"
    >
      <Container maxWidth="lg">
        <Toolbar style={{ justifyContent: "center" }}>
          <Typography variant="body1" color="inherit">
            © 2021 Vehito Controller
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
