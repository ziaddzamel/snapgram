import React from "react";
import { useGetAllUsers } from "../../Lib/react-query/queries";
import { Models } from "appwrite";
import {
  Avatar,
  Box,
  Button,
  Heading,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";

import { Link } from "react-router-dom";
import Loader from "../../Components/Shared/Loader";

const AllUsers: React.FC = () => {
  const { data: users, isLoading } = useGetAllUsers();

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
    <VStack m={"20px"}>
      <Heading alignSelf={"flex-start"} my="30px">
        All Users
      </Heading>
      <SimpleGrid columns={[1, 2, 2, 2, 2]} spacing="50px">
        {users?.map((user: Models.Document) => (
          <VStack
            key={user.name}
            w={"100%"}
            p={"40px 35px"}
            rounded={"xl"}
            border={"solid 2px #1F1F22"}
          >
            <Link to={`/profile/${user.$id}`}>
              <Avatar size="lg" src={user.imageUrl} alt={user.name} />
            </Link>

            <Heading
              fontSize={{
                base: "xl",
                md: "2xl",
              }}
            >
              {user.username}
            </Heading>
            <Text
              fontSize={{
                base: "12px",
                md: "15px",
              }}
              color="#5C5C7B"
            >
              @{user.name}
            </Text>

            <Button colorScheme="" p={"10px 30px"} bg={"#5D5FEF"}>
              Folow
            </Button>
          </VStack>
        ))}
      </SimpleGrid>
    </VStack>
  );
};

export default AllUsers;
