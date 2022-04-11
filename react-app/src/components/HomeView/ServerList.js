import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Box, Stack, Avatar, Container, Tooltip, Modal, Typography, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DiscordLogo from "./discord-logo.png";

const ServerList = (user) => {
  const [channels, setChannels] = useState([]);
	const [activeServer, setActiveServer] = useState("Home")
	const [open, setOpen] = useState(false)

	const handleOpen = () => setOpen(true)
	const handleClose = () => setOpen(false)

  const testServers = [
    { alt: "discord-logo", src: DiscordLogo, title: "Home" },
    { alt: "discord-logo1", src: DiscordLogo, title: "Test Server" },
    { alt: "discord-logo2", src: DiscordLogo, title: "New Server" },
  ];
  console.log(user.user.user);
  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "#2f3136",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography
						sx={{
							textAlign: "center"
						}}
					>
						Create New Server
					</Typography>
					<TextField></TextField>
        </Box>
      </Modal>
      <Box
        sx={{
          backgroundColor: "#202225",
          position: "absolute",
          width: "4vw",
          height: "100vh",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {testServers.map((server, i) => (
            <Tooltip key={i} title={server["title"]} placement="right">
              <Avatar
                alt={server["alt"]}
                src={server["src"]}
                sx={{
                  marginTop: ".5em",
                  cursor: "pointer",
                  width: "3em",
                  height: "3em",
                  ":hover": {
                    borderRadius: "10px",
                  },
                }}
                onClick={() => setActiveServer(server["title"])}
              />
            </Tooltip>
          ))}
          <Tooltip title="Add Server" placement="right">
            <Avatar
              alt={"Add Server"}
              sx={{
                marginTop: ".5em",
                backgroundColor: "#36393f",
                cursor: "pointer",
                width: "3em",
                height: "3em",
                ":hover": {
                  borderRadius: "10px",
                  backgroundColor: "#3ba55d",
                  color: "#36393f",
                },
              }}
              onClick={handleOpen}
            >
              <AddIcon
                sx={{
                  color: "#3ba55d",
                }}
              />
            </Avatar>
          </Tooltip>
        </Box>
      </Box>

      <Box
        sx={{
          backgroundColor: "#2f3136",
          position: "absolute",
          left: "4vw",
          width: "12.5vw",
          height: "100vh",
        }}
      >
        <h2 style={{ textAlign: "center" }}>{activeServer}</h2>
      </Box>
    </>
  );
};

export default ServerList;
