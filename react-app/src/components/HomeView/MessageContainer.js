import React, { useState } from "react"

import { Box } from "@mui/material"

const MessageContainer = (user) => {

	const [messages, setMessages] = useState([
    `Hello and Welcome`,
  ]);
  const [message, setMessage] = useState("");

	return (
    <>
      <Box
        sx={{
          display: "absolute",
          left: "16.5vw",
          backgroundColor: "#36393f",
          width: "85vw",
          height: "100vh",
        }}
      ></Box>
    </>
  );
}


export default MessageContainer
