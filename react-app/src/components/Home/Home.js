import React, { useState, useEffect } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { useSelector } from 'react-redux';

import {
  AppBar,
  Toolbar,
  Typography,
  MenuItem,
  Container,
  Button,
} from "@mui/material";

import "./Home.css";

function Home() {
  const history = useHistory();
	const user = useSelector((state) => state.session.user);

	let btn;
	if (user) {
		<Redirect to="/app"/>
		btn = <Button onClick={() => history.push("/app")}>Open App</Button>;
	} else {
		btn = <Button onClick={() => history.push("/login")}>Login</Button>;
	}

  return (
    <>
      <AppBar position="relative" sx={{ backgroundColor: "blue" }}>
        <Container maxWidth="x1">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component={"div"}
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
              }}
            >
              Logo
            </Typography>

            <Container sx={{ display: "flex", justifyContent: "center" }}>
              <MenuItem>
                <Typography textAlign="center">About</Typography>
              </MenuItem>
              <MenuItem>
                <Typography textAlign="center">Features</Typography>
              </MenuItem>
              <MenuItem>
                <Typography textAlign="center">GitHub</Typography>
              </MenuItem>
            </Container>

						{btn}
          </Toolbar>
        </Container>
      </AppBar>

      <div className="splash-page-main-div-container">
        <div>
          <h1>IMAGINE A PLACE...</h1>
          <h4>
            ...where you can belong to a school club, a gaming group, or a
            worldwide art community. Where just you and a handful or friends can
            spend time together. A place that makes it easy to talk every day
            and hang out more often.
          </h4>
          <div className="splashpage-btn-container">
            <Button href="#middle" sx={{ color: "white" }}>
              Check It Out
            </Button>
            <Button href="#bottom" sx={{ color: "white" }}>
              Learn More About Our Chatbot
            </Button>
          </div>
        </div>
      </div>

      <div className="splash-page-2nd-div-container" id="middle">
        <div>
          <h1 style={{ color: "black" }}>
            Create an invite-only place where you belong
          </h1>
          <h4 style={{ color: "black" }}>
            Discord servers are organized into topic-based channels where you
            can collaborate, share, and just talk about your day without
            clogging up a group chat.
          </h4>
        </div>
      </div>

      <div className="splash-page-main-div-container" id="bottom">
        <div>
          <h1>Machine Learning</h1>
          <h4>
            Our bot has the capability to learn and interact with users in a
            dynamic and constantly evolving manner.
          </h4>
        </div>
      </div>
    </>
  );
}

export default Home;
