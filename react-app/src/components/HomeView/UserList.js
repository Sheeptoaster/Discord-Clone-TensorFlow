import React from "react";

import { Box, Avatar, Typography } from "@mui/material";

import ProfilePicture from "./profile-picture.jpg";

const UserList = (user) => {

	const owner = [
		{ profileImg: ProfilePicture, username: "Sheeptoaster", owner: true },
	]

  const users = [
    { profileImg: null, username: "Test User", owner: false },
  ];

  return (
    <>
      <Box
        sx={{
          display: "absolute",
          right: "10vw",
          backgroundColor: "#2f3136",
          width: "15vw",
          height: "100vh",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            textAlign: "center",
            color: "#96989d",
          }}
        >
          Server Owner - {owner.length}
        </Typography>
        {owner.map((user, i) => (
          <Box
            key={i}
            sx={{
              display: "flex",
              alignContent: "center",
              marginLeft: "1em",
            }}
          >
            <Avatar
              alt={user["username"]}
              src={user["profileImg"]}
              sx={{
                marginTop: ".5em",
                width: "1.75em",
                height: "1.75em",
                ":hover": {
                  borderRadius: "10px",
                },
              }}
            />
            <Typography
              sx={{
								fontSize: ".9em",
                margin: "auto 1em",
              }}
            >
              {user["username"]}
            </Typography>
          </Box>
        ))}
        <Typography
          variant="h6"
          sx={{
            textAlign: "center",
            color: "#96989d",
          }}
        >
          Users - {users.length}
        </Typography>
        {users.map((user, i) => (
          <Box
            key={i}
            sx={{
              display: "flex",
              alignContent: "center",
              marginLeft: "1em",
            }}
          >
            <Avatar
              alt={user["username"]}
              src={user["profileImg"]}
              sx={{
                marginTop: ".5em",
                width: "1.75em",
                height: "1.75em",
                ":hover": {
                  borderRadius: "10px",
                },
              }}
            />
            <Typography
              sx={{
								fontSize: ".9em",
                margin: "auto 1em",
              }}
            >
              {user["username"]}
            </Typography>
          </Box>
        ))}
      </Box>
    </>
  );
};

export default UserList;
