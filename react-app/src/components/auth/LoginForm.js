import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { login } from "../../store/session";

import { Box, Button, Container, TextField, Typography, InputLabel, Link } from "@mui/material";

import './LoginSignUp.css'

import QRCode from './frame.png'

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to="/app" />;
  }

  return (
    <>
      <div className="login-signup-background">
        <Box
          className="login-form-container"
          component={"form"}
          sx={{
            backgroundColor: "#36393F",
            width: "50vw",
            height: "60vh",
            display: "flex",
          }}
          noValidate
          autoComplete="off"
          onSubmit={onLogin}
        >
          <Container
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography variant="h3" sx={{ marginTop: "10%", overflow: "hidden", textAlign: 'center' }}>
              Welcome back!
            </Typography>
            <Typography variant="h6" color="#b7b9bc" sx={{ textAlign: 'center' }}>
              We're so excited to see you again!
            </Typography>
            <InputLabel
              htmlFor="outlined-required"
              sx={{
                color: "#b7b9bc",
                marginTop: "1em",
              }}
            >
              Email
            </InputLabel>
            <TextField
              required
              sx={{
                width: "100%",
                marginTop: "1em",
                backgroundColor: "#202225",
                borderRadius: ".25em",
                input: {
                  color: "#fbfbfb",
                },
              }}
              className="email-input-login"
              id="outlined-required"
              variant="standard"
              value={email}
              onChange={handleEmail}
            />
            <InputLabel
              htmlFor="outlined-required"
              sx={{
                color: "#b7b9bc",
                marginTop: "1em",
              }}
            >
              Password
            </InputLabel>
            <TextField
              type="password"
              required
              sx={{
                width: "100%",
                marginTop: "1em",
                backgroundColor: "#202225",
                borderRadius: ".25em",
                input: {
                  color: "#fbfbfb",
                },
              }}
              className="password-input-login"
              id="outlined-required"
              variant="standard"
              value={password}
              onChange={handlePassword}
            />

            <Button
              type="submit"
              sx={{
                width: "100%",
                marginTop: "4em",
                backgroundColor: "#5865f2",
                color: "#f6f7ff",
                ":hover": {
                  backgroundColor: "#5853f1",
                },
              }}
            >
              Login
            </Button>

            <Typography
              sx={{
                color: "#b7b9bc",
                marginTop: "1em",
              }}
            >
              Need an account?{" "}
              <Link
                href="/sign-up"
                sx={{
                  color: "#5865f2",
                  textDecoration: "none",
                }}
              >
                Register
              </Link>
            </Typography>
          </Container>
          <Container
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <img
              src={QRCode}
              alt="qr-code linkedIn"
              style={{
                margin: "10% auto 5% auto",
                borderRadius: ".25em",
              }}
            />
            <Typography
              sx={{
                textAlign: "center",
                color: "#fbfbfb",
              }}
            >
              Scan to visit my LinkedIn
            </Typography>
          </Container>
        </Box>
      </div>
    </>
  );
};

export default LoginForm;
