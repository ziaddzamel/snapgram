import { useUserContext } from "../../Context/AuthContext";
import {
  Avatar,
  Flex,
  HStack,
  Heading,
  Image,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Link, Outlet, useParams } from "react-router-dom";
import { useGetUserById } from "../../Lib/react-query/queries";

const Profile = () => {
  const { id } = useParams();
  const { user } = useUserContext();

  const { data: currentUser } = useGetUserById(id || "");
  if (!currentUser) return console.log("error");
  return (
    <Stack
      py="50px"
      px={{
        base: "10px",
        lg: "40px",
      }}
    >
      <Stack
        direction={["column", null, null, "row"]}
        alignItems={"flex-start"}
        spacing={"10"}
      >
        <Avatar size="2xl" src={currentUser.imageUrl} />
        <VStack spacing={5} alignItems="flex-start">
          <Flex gap={"50px"}>
            <Heading>{currentUser.username}</Heading>
            <Link to={`/update-profile/${user.id}`}>
              <HStack
                display={user.id === currentUser.$id ? "flex" : "none"}
                rounded={"lg"}
                alignItems={"center"}
                bg={"#1F1F22"}
                p={"5px 10px"}
                mt={"7px"}
              >
                <Image
                  w="20px"
                  h="20px"
                  src="/assets/icons/edit.svg"
                  style={{
                    filter: "brightness(0) invert(100%)",
                  }}
                />
                <Text fontSize={"15px"}>Edit Profiel</Text>
              </HStack>
            </Link>
          </Flex>
          <Text color={"#5C5C7B"}> @{currentUser.name} </Text>
          <Text w={["fit-content", null, "500px"]}> {currentUser.bio} </Text>
        </VStack>
      </Stack>
      <HStack mt={"100px"} mb="50px">
        <Link to="./">
          <HStack
            rounded={"lg"}
            bg={"#1F1F22"}
            py={"12px"}
            px={["20px", "20px", "40px"]}
          >
            <Image src="/assets/icons/posts.svg" />
            <Text> Posts</Text>
          </HStack>
        </Link>

        <Link to="posts-likes">
          <HStack
            rounded={"lg"}
            bg={"#1F1F22"}
            py={"12px"}
            px={["20px", "20px", "40px"]}
          >
            <Image src="/assets/icons/liked.svg" />
            <Text> liked </Text>
          </HStack>
        </Link>

        <Link to="saved">
          <HStack
            rounded={"lg"}
            bg={"#1F1F22"}
            py={"12px"}
            px={["20px", "20px", "40px"]}
          >
            <Image src="/assets/icons/saved.svg" />
            <Text> Saved</Text>
          </HStack>
        </Link>
      </HStack>

      <Outlet />
    </Stack>
  );
};

export default Profile;
