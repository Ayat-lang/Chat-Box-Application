import {
  Box,
   Container,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useHistory } from "react-router";
import Login from "../components/Authentication/Login";
import Signup from "../components/Authentication/Signup";
import { DiAtom } from "react-icons/di"

// import { SunIcon} from '@chakra-ui/icons'





function Homepage() {
  const history = useHistory();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));

    if (user) history.push("/chats");
  }, [history]);

  return (
    <Container maxW="xl"  centerContent>

      <Container   maxW='xl' textColor={'#54b3d6'}   paddingTop={'15px'}  centerContent>
      <Box fontWeight={'800'} textShadow={"2.4px 2.0px black"}  borderColor={"black"} fontSize={'40px'}  >  <h1  className="ab">CHAT NetBox <DiAtom className='imo' fontSize={'20px'}  /> </h1> </Box>
      <h6 className="abc">Instant messaging and so much more!!</h6>
      
      </Container>
      
      <Container className="op" marginLeft={'330px'} >
        <Container marginLeft={'70px'} >
            <h1 className="fnt" >Welcome! Glad to see you </h1>
   
      </Container>
    
      <Box bg="white" w="100%" p={4} borderRadius="lg" borderWidth="1px">
        <Tabs isFitted variant="soft-rounded">
          <TabList mb="1em">
            <Tab>Login</Tab>
            <Tab>Sign Up</Tab>
          </TabList>
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
      </Container>

      
  );
}

export default Homepage;
