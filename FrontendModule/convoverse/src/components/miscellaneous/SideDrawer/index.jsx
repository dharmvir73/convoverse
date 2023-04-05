import {
  Box,
  Button,
  Menu,
  MenuButton,
  Text,
  Tooltip,
  Avatar,
  MenuList,
  MenuItem,
  MenuDivider,
} from "@chakra-ui/react";
import { BellIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { ChatState } from "../../../context/ChatProvider";
import { useNavigate } from "react-router-dom";
import ProfileModal from "../ProfileModal";

const SideDrawer = () => {
  const [search, setSearch] = useState();
  const [searchResult, setSearchResult] = useState();
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState();
  const { user } = ChatState();

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <>
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
        bg={"whiteAlpha.400"}
        w={"100%"}
        p={"12px 10px 12px 10px"}
      >
        <Tooltip label="Search User to Chat" hasArrow placement="bottom-end">
          <Button variant={"solid"}>
            <i class="fa-solid fa-magnifying-glass"></i>
            <Text display={{ base: "none", md: "flex" }} px={4}>
              Seach User
            </Text>
          </Button>
        </Tooltip>
        <div>
          <Menu>
            <MenuButton p={1}>
              <BellIcon fontSize={"2xl"} m={1} color={"whiteAlpha.900"} />
            </MenuButton>
            {/*<MenuList></MenuList>*/}
          </Menu>
          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
              <Avatar
                size={"sm"}
                cursor={"pointer"}
                name={user.name}
                src={user.pic}
              />
            </MenuButton>
            <MenuList>
              <ProfileModal user={user}>
                {<MenuItem>My Profile</MenuItem>}
              </ProfileModal>
              <MenuDivider />
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </div>
      </Box>
    </>
  );
};

export default SideDrawer;
