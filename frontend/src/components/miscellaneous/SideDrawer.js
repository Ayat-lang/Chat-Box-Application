import { Button } from "@chakra-ui/button";
import { useDisclosure } from "@chakra-ui/hooks";
import { Input } from "@chakra-ui/input";
import { Box, Text } from "@chakra-ui/layout";

import './style.css'

import {
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from "@chakra-ui/menu";
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
} from "@chakra-ui/modal";
import { Tooltip } from "@chakra-ui/tooltip";
// import { BellIcon, ChevronDownIcon } from "@chakra-ui/icons";

import { Avatar } from "@chakra-ui/avatar";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useToast } from "@chakra-ui/toast";
import ChatLoading from "../ChatLoading";
import { Spinner } from "@chakra-ui/spinner";
import ProfileModal from "./ProfileModal";
// import NotificationBadge from "react-notification-badge";
// import { Effect } from "react-notification-badge";
// import { getSender } from "../../config/ChatLogics";
import UserListItem from "../userAvatar/UserListItem";
import { ChatState } from "../../Context/ChatProvider";
import { Search2Icon } from '@chakra-ui/icons';
import { DiAtom } from "react-icons/di";
import { CgProfile } from "react-icons/cg";
import { FaPowerOff } from "react-icons/fa";

          // import { BiCross } from "react-icons/bi";

function SideDrawer() {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);

  const {
    setSelectedChat,
    user,
    // notification,
    // setNotification,
    chats,
    setChats,
  } = ChatState();

  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const history = useHistory();

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    history.push("/");
  };

  const handleSearch = async () => {
    if (!search) {
      toast({
        title: "Please Enter something in search",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top-left",
      });
      return;
    }

    try {
      setLoading(true);

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(`/api/user?search=${search}`, config);

      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the Search Results",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  const accessChat = async (userId) => {
    console.log(userId);

    try {
      setLoadingChat(true);
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post(`/api/chat`, { userId }, config);

      if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
      setSelectedChat(data);
      setLoadingChat(false);
      onClose();
    } catch (error) {
      toast({
        title: "Error fetching the chat",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  return (
    <>
      
    
     


      <div  >
        


            <Box
        d="flex"
        justifyContent="space-between"
        alignItems="center"
      
        w="100%"
        p="10px 10px -3px 10px"  //<--------------------------------
        
             >  
        

         <div  >
          <Menu>
            <MenuButton paddingLeft={9} paddingTop={9}  >
              {/* <NotificationBadge
                count={notification.length}
                effect={Effect.SCALE}
              /> */}
               
             <DiAtom className='im' fontSize={'20px'}  />
            </MenuButton>
            {/* <MenuList pl={2}>
              {!notification.length && "No New Messages"}
              {notification.map((notif) => (
                <MenuItem
                  key={notif._id}
                  onClick={() => {
                    setSelectedChat(notif.chat);
                    setNotification(notification.filter((n) => n !== notif));
                  }}
                >
                  {notif.chat.isGroupChat
                    ? `New Message in ${notif.chat.chatName}`
                    : `New Message from ${getSender(user, notif.chat.users)}`}
                </MenuItem>
              ))}
            </MenuList> */}
          </Menu>
          <Menu  >
            <MenuButton  transition='all 0.2s'
                          borderRadius='100%'
                          borderWidth='1px'
                          height='52px'
                          width='52.9px'
                        
                          _hover={{ bg: 'green' }}
                          _expanded={{ bg: 'green' }}
                          _focus={{ boxShadow: 'outline' }}   as={Button} bg="#DEECF9"   >
              <Avatar
                size="md"
                cursor="pointer"
                name={user.name}
                  src={user.pic}
                  marginLeft={'-15px'}
                  
              />
            </MenuButton>
            <MenuList>
              <ProfileModal user={user}>
                <MenuItem> <CgProfile fontSize={'20px'}  /> My Profile</MenuItem>{" "}
              </ProfileModal>
              <MenuDivider />
              <MenuItem onClick={logoutHandler}>  <FaPowerOff fontSize={'20px'} /> Log out </MenuItem>
            </MenuList>
          </Menu>
        </div>
 
        
        <Text fontSize="2xl" fontFamily="Work sans">
          ChatNetBox
        </Text>


        <Tooltip label="Search Users to chat" hasArrow placement="bottom-end">
          <Button variant="ghost" onClick={onOpen}>
            <i className="fas fa-search"></i>
            
          </Button>
        </Tooltip>
        
        
      </Box>

      <Drawer placement="top" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader    borderBottomWidth="0.5px" backgroundColor={'#DEECF9'} >Search New Users</DrawerHeader>
          <DrawerBody>
            <Box d="flex" pb={2} >
              <Input
                placeholder="Search by Name or Email"
                mr={2}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button onClick={handleSearch}> <Search2Icon/> </Button>
            </Box>
            {loading ? (
              <ChatLoading />
            ) : (
              searchResult?.map((user) => (
                <UserListItem
                  key={user._id}
                  user={user}
                  handleFunction={() => accessChat(user._id)}
                />
              ))
            )}
            {loadingChat && <Spinner ml="auto" d="flex" />}
          </DrawerBody>
        </DrawerContent>
      </Drawer>



      </div>
    </>
  );
}

export default SideDrawer;
