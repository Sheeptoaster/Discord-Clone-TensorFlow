import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { signUp } from "../../store/session";

import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  InputLabel,
  Link,
} from "@mui/material";

import "./LoginSignUp.css";

import QRCode from "./frame.png";

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
	const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("")
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

	console.log(user)

  const onSignUp = async (e) => {
    e.preventDefault();
		if (password.trim().length > 7) {
			if (password === confirmPassword) {
				const data = await dispatch(
					signUp(username, email, password)
					);
					if (data) {
						setErrors(data);
					}
				} else {
					setErrors(["Passwords must match."]);
				}
			} else {
				setErrors(["Please enter a valid password."])
			}
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

	const handleUsername = (e) => {
		setUsername(e.target.value)
	}

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

	const handleConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
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
            width: "30vw",
            height: "70vh",
          }}
          noValidate
          autoComplete="off"
          onSubmit={onSignUp}
        >
          <Container
            sx={{
							display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography
              variant="h3"
              sx={{
								marginTop: "10%",
                overflow: "hidden",
                textAlign: "center",
              }}
            >
              Create an account
            </Typography>
							<ul className="signup-form errors">
								{errors.map((error, ind) => (
									<li key={ind} style={{ textAlign: 'center' }}>{error}</li>
								))}
							</ul>
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
							name='email'
              value={email}
              onChange={handleEmail}
            />
            <InputLabel
              htmlFor="outlined-required"
              sx={{
                color: "#b7b9bc",
                marginTop: ".5em",
              }}
            >
              Username
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
              className="username-input-login"
              id="outlined-required"
              variant="standard"
							name='username'
              value={username}
              onChange={handleUsername}
            />
            <InputLabel
              htmlFor="outlined-required"
              sx={{
                color: "#b7b9bc",
                marginTop: ".5em",
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
							name='hashed_password'
              value={password}
              onChange={handlePassword}
            />
            <InputLabel
              htmlFor="outlined-required"
              sx={{
                color: "#b7b9bc",
                marginTop: ".5em",
              }}
            >
              Confirm Password
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
              value={confirmPassword}
              onChange={handleConfirmPassword}
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
              Sign Up
            </Button>

            <Typography
              sx={{
                color: "#b7b9bc",
                marginTop: "1em",
              }}
            >
              Already have an account?{" "}
              <Link
                href="/login"
                sx={{
                  color: "#5865f2",
                  textDecoration: "none",
                }}
              >
                Login Here
              </Link>
            </Typography>
          </Container>
        </Box>
      </div>
    </>
  );
};

export default SignUpForm;
