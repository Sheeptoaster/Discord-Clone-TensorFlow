import React, { useEffect, useState } from "react";
// #32353b Message Highlight Color
import ServerList from './ServerList'
import MessageContainer from "./MessageContainer";
import UserList from "./UserList";
import { Box } from "@mui/material"

import "./UserPage.css"

import io from "socket.io-client";

// let endPoint = "localhost:5000";
// let socket = io.connect(endPoint);

const UserPage = (user) => {
  return (
    <>
			<Box
				sx={{
					display: 'flex'
				}}
			>
				<ServerList user={user} />
				<MessageContainer user={user} />
				<UserList user={user} />
			</Box>
    </>
  );
};

export default UserPage;
