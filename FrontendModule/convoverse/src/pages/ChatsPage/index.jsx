import axios from "axios";
import { useEffect, useState } from "react";
import { ChatState } from "../../context/ChatProvider";
import { Box, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import SideDrawer from "../../components/miscellaneous/SideDrawer";
import MyChats from "../../components/MyChats";
import ChatBox from "../../components/ChatBox";

const Chats = () => {
  const { user } = ChatState();

  const [fetchAgain, setFetchAgain] = useState(false);

  return (
    <div style={{ width: "100%" }}>
      {user && <SideDrawer />}
      <Box p={2} h={"93vh"} display="flex" justifyContent="space-between">
        {user && (
          <MyChats fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        )}
        {user && (
          <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        )}
      </Box>
    </div>
  );
};

export default Chats;
