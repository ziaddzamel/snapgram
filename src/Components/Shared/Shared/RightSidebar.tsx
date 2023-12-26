import React from "react";
import { useGetAllUsers } from "../../../Lib/react-query/queries";
import {
  VStack,
  Heading,
  SimpleGrid,
  Avatar,
  Text,
  Button,
  Box,
} from "@chakra-ui/react";
import { Models } from "appwrite";
import { Link } from "react-router-dom";
import Loader from "../Loader";

const RightSidebar = () => {
  const { data: users, isLoading } = useGetAllUsers();

  const sortedUsers = users
    ?.sort((a, b) => b.posts.length - a.posts.length)
    .slice(0, 4);

  if (isLoading) {
    return (
      <Box
        position="absolute"
        top="50%"
        left="50%"
        transform="translate(-50%, -60%)"
      >
        <Loader />
      </Box>
    );
  }

  return (
    <VStack
      spacing={10}
      alignItems="flex-start"
      p="15px"
      bg="#1F1F22"
      h="100vh"
      w="250px"
      display={{
        base: "none",
        xl: "flex",
      }}
      overflowY="auto" // Make the sidebar scrollable
    >
      <Heading alignSelf={"flex-start"}>Top Creators</Heading>

      {sortedUsers?.map((user: Models.Document) => (
        <VStack
          key={user.name}
          w={"100%"}
          p={"20px 20px"}
          rounded={"xl"}
          border={"solid 2px #5C5C7B"}
        >
          <Link to={`/profile/${user.$id}`}>
            <Avatar size="md" src={user.imageUrl} alt={user.name} />
          </Link>

          <Heading fontSize={"lg"}>{user.username}</Heading>

          <Text fontSize="12px" color="#5C5C7B">
            @{user.name}
          </Text>

          <Button colorScheme="" p={"5px 20px"} bg={"#5D5FEF"}>
            Follow
          </Button>
        </VStack>
      ))}
    </VStack>
  );
};

export default RightSidebar;
