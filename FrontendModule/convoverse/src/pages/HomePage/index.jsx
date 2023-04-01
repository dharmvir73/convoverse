import {
  Box,
  Container,
  Tab,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import Login from "../../components/Authentication/Login";
import Signup from "../../components/Authentication/Signup";

const Home = () => {
  return (
    <Container maxW="xl" centerContent>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        p={3}
        w="100%"
        m="15px 0 15px 0"
      >
        <Text color="white" fontSize="4xl" fontWeight="bold">
          ConvoVerse
          <span style={{ color: "blue" }}>.</span>
        </Text>
      </Box>
      <Box bg={"whiteAlpha.200"} width="100%" borderRadius={"15px"}>
        <Tabs size="md" isFitted variant="unstyled">
          <TabList color={"whiteAlpha.600"}>
            <Tab _selected={{ color: "white" }}>Login</Tab>
            <Tab _selected={{ color: "white" }}>Signup</Tab>
          </TabList>
          <TabIndicator
            mt="-1.5px"
            height="2px"
            bg="whiteAlpha.800"
            borderRadius="1px"
          />
          <TabPanels>
            <TabPanel>
              <Login />
            </TabPanel>
            <TabPanel>
              <Signup />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
};

export default Home;
