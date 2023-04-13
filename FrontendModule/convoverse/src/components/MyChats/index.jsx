import { ChatState } from "../../context/ChatProvider";
import { useState, useEffect } from "react";
import axios from "axios";
import { Box, Button, useToast, Stack, Text, Avatar } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import Chatloading from "../Loading";
import { getSender } from "../config/ChatsLogic";
import GroupChatModal from "../miscellaneous/GroupChatModal";

const MyChats = () => {
  const [loggedUser, setLoggedUser] = useState();
  const { user, selectedChat, setSelectedChat, chats, setChats } = ChatState();

  const toast = useToast();

  const fetchChats = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get("/api/chat", config);
      console.log("My Chats", data);

      setChats(data);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to load the chats",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-left",
      });
    }
  };

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("user")));
    fetchChats();
  }, []);

  return (
    <Box
      display={{ base: selectedChat ? "none" : "flex", md: "flex" }}
      flexDirection="column"
      alignItems="center"
      p={3}
      bg={"white"}
      w={{ base: "100%", md: "30%" }}
      h={"100%"}
      borderRadius="lg"
      borderWidth="1px"
    >
      <Box
        pb={2}
        px={2}
        fontSize={{ base: "20px", md: "30px" }}
        display={"flex"}
        w="100%"
        justifyContent="space-between"
        alignItems="center"
        color="gray.600"
      >
        My Chats
        <GroupChatModal>
          <Button
            display={"flex"}
            fontSize={{ base: "16px", md: "10px", lg: "16px" }}
            rightIcon={<AddIcon />}
          >
            New Group Chat
          </Button>
        </GroupChatModal>
      </Box>
      <Box
        d="flex"
        flexDir="column"
        p={3}
        bg="#F8F8F8"
        w="100%"
        h="100%"
        borderRadius="lg"
        overflowY="hidden"
      >
        {chats ? (
          <Stack overflowY="scroll">
            {chats.map((chat) => (
              <Box
                onClick={() => setSelectedChat(chat)}
                cursor="pointer"
                bg={selectedChat === chat ? "#38B2AC" : "#E8E8E8"}
                color={selectedChat === chat ? "white" : "black"}
                px={3}
                py={2}
                borderRadius="lg"
                key={chat._id}
                display={"flex"}
                alignItems={"center"}
              >
                {chat.latestMessage && !chat.isGroupChat ? (
                  <Avatar
                    size={{ base: "sm", md: "sm" }}
                    cursor={"pointer"}
                    src={chat.latestMessage.sender.pic}
                    marginRight={2}
                  />
                ) : (
                  <Avatar
                    size={{ base: "sm", md: "sm" }}
                    cursor={"pointer"}
                    name={chat.chatName}
                    marginRight={2}
                  />
                )}
                <Box>
                  <Text>
                    {!chat.isGroupChat
                      ? getSender(loggedUser, chat.users)
                      : chat.chatName}
                  </Text>
                  {chat.latestMessage && (
                    <Text fontSize="xs">
                      <b>{chat.latestMessage.sender.name} : </b>
                      {chat.latestMessage.content.length > 50
                        ? chat.latestMessage.content.substring(0, 51) + "..."
                        : chat.latestMessage.content}
                    </Text>
                  )}{" "}
                </Box>
              </Box>
            ))}
          </Stack>
        ) : (
          <Chatloading />
        )}
      </Box>
    </Box>
  );
};

export default MyChats;
