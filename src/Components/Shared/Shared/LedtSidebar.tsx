import {
  Avatar,
  Flex,
  Button,
  HStack,
  Heading,
  Image,
  Text,
  VStack,
  LinkBox,
  Box,
} from "@chakra-ui/react";
import { NavLink, Link, useLocation, useNavigate } from "react-router-dom";
import { useSignOutAccount } from "../../../Lib/react-query/queries";
import { useEffect } from "react";
import { useUserContext } from "../../../Context/AuthContext";
import { sidebarLinks } from "../../../constants";
import { INavLink } from "../../../types";

const LedtSidebar = () => {
  const { mutate: signOut, isSuccess } = useSignOutAccount();
  const navigat = useNavigate();
  const { user } = useUserContext();

  useEffect(() => {
    if (isSuccess) {
      navigat(0);
      console.log(user);
    }
  }, [isSuccess]);
  const { pathname } = useLocation();

  return (
    <VStack
      position="sticky"
      top="0"
      zIndex="100"
      spacing={10}
      alignItems="flex-start"
      p="15px"
      bg="#1F1F22"
      h="100vh"
      w="250px"
      display={{
        base: "none",
        md: "flex",
      }}
    >
      <Image w="200px" src="/assets/images/logo.svg" />
      <HStack spacing={5}>
        <Link to={`/profile/${user.id}`}>
          <HStack spacing={5}>
            <Avatar
              size={"lg"}
              src={user.imageUrl || "/assets/images/profile.png"}
            />
            <Flex gap="5px" direction="column" alignItems="flex-start">
              <Heading fontWeight={600} fontSize="18px">
                {user.name}
              </Heading>
              <Text fontSize="15px">{user.username}</Text>
            </Flex>
          </HStack>
        </Link>
      </HStack>
      <VStack w="100%" spacing={5}>
        {sidebarLinks.map((link: INavLink) => {
          const isActive = pathname === link.route;
          return (
            <LinkBox
              key={link.label}
              bg={isActive ? "#5D5FEF" : "inherit"}
              rounded="md"
              w="100%"
              p="10px 12px"
              as={NavLink}
              to={link.route}
              _hover={{
                backgroundColor: "#5D5FEF",
                transition: "background-color 0.3s ease-in-out",
              }}
            >
              <HStack spacing={4} fontSize="16px" fontWeight={600}>
                <Image
                  src={link.imgURL}
                  w="30px"
                  style={{
                    filter: isActive ? "brightness(0) invert(100%)" : "none",
                    transition: "filter 0.3s", // Adjust the duration as needed
                  }}
                />

                <Text fontSize="16px">{link.label}</Text>
              </HStack>
            </LinkBox>
          );
        })}
        <Box mt={"70px"} alignSelf={"flex-start"} w={"100%"}>
          <Button
            justifyContent={"flex-start"}
            w={"100%"}
            p="10px 12px"
            colorScheme=""
            _hover={{
              backgroundColor: "#5D5FEF",
              transition: "background-color 0.3s ease-in-out",
            }}
            onClick={() => signOut()}
          >
            <HStack spacing={1} fontSize="16px" fontWeight={600}>
              <Image w="30px" src="/assets/icons/logout.svg" />
              <Text fontSize="16px" fontWeight={600} ml="15px">
                Log Out
              </Text>
            </HStack>
          </Button>
        </Box>
      </VStack>
    </VStack>
  );
};

export default LedtSidebar;
