import { Box, Center, Flex } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import Topbar from "../Components/Shared/Shared/Topbar";
import LedtSidebar from "../Components/Shared/Shared/LedtSidebar";
import Bottombar from "../Components/Shared/Shared/Bottombar";
import RightSidebar from "../Components/Shared/Shared/RightSidebar";

const RootLayout = () => {
  return (
    <>
      <Topbar />
      <Flex>
        <LedtSidebar />

        <Box
          flex="3"
          overflowY="auto"
          maxHeight={{ base: "none  ", md: "100vh" }}
          
        >
          <Center>
            <Outlet />
          </Center>
        </Box>

        <RightSidebar />
      </Flex>
      <Bottombar />
    </>
  );
};

export default RootLayout;
