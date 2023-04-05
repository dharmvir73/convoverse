import axios from "axios";
import { useEffect, useState } from "react";
import { ChatState } from "../../context/ChatProvider";
import { Box, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import SideDrawer from "../../components/miscellaneous/SideDrawer";

const Chats = () => {
  const { user } = ChatState();

  console.log(user);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="" style={{ width: "100%" }}>
      {user && <SideDrawer />}
      <Box>
        {/* {user && <MyChats />} */}
        {/* {user && <ChatBox />} */}
      </Box>
    </div>
  );
};

export default Chats;
