import { useGetPostById } from "../../Lib/react-query/queries";
import { Link, useParams } from "react-router-dom";
import {
  Avatar,
  HStack,
  Heading,
  VStack,
  Text,
  Image,
  Stack,
  Box,
} from "@chakra-ui/react";
import { multiFormatDateString } from "../../Lib/utils";
import PostStas from "../../Components/Shared/Shared/PostStas";
import { useUserContext } from "../../Context/AuthContext";
import PostCard from "../../Components/Shared/Shared/PostCard";

const PostDetails = () => {
  const params = useParams();
  const id = params.id;

  const { data: post } = useGetPostById(id || "");
  const { user } = useUserContext();
  if (!post) {
    // Handle the case where post is undefined, for example, show a loading state
    return <div>Loading...</div>;
  }
  return (
    <>
      <Stack
        direction="row"
        mt={"50px"}
        ml={{
          base: "0",
          xl: "30px",
        }}
        display={["none", null, null, null, "flex"]}
      >
        <Image mr="-6px" src={post?.imageUrl} boxSize={"sm"} rounded="sm" />
        <VStack
          spacing={6}
          alignItems="flex-start"
          bg="#101012"
          w={"50%"}
          h={"64vh"}
          p="30px"
          rounded="lg"
        >
          <VStack h="100%" spacing={10}>
            <HStack spacing="150px">
              <HStack>
                <Link to={`/profile/${post?.creator.$id}`}>
                  <Avatar
                    src={
                      post?.creator?.imageUrl ||
                      "../public/assets/images/profile.png"
                    }
                  />
                </Link>
                <VStack alignItems="flex-start">
                  <Heading fontSize="16px">{post?.creator.name}</Heading>
                  <HStack>
                    <Text color="#5C5C7B" fontSize="14px">
                      {multiFormatDateString(post?.$createdAt)}
                    </Text>
                    <Text color="#5C5C7B" fontSize="14px">
                      {post?.location}
                    </Text>
                  </HStack>
                </VStack>
              </HStack>
              <HStack>
                <Link to={`/updatePost/${post?.$id}`}>
                  <Image
                    w="30px"
                    h="30px"
                    src="../public/assets/icons/edit.svg"
                  />
                </Link>
              </HStack>
            </HStack>
            <Box
              alignSelf="flex-start"
              bg={"#1F1F22"}
              minH="1px"
              w="calc(100% + 60px)"
              ml={"-30px"}
            ></Box>
            <Box mt="-20px" alignSelf="flex-start">
              <Link to={`/posts/${post?.$id}`}>
                <Text mb="10px">{post?.caption}</Text>
                <HStack mb="10px" alignItems="center">
                  {post?.tags.map((tag: string) => (
                    <Text fontSize="12px" color="#5C5C7B" key={tag}>
                      #{tag}
                    </Text>
                  ))}
                </HStack>
              </Link>
            </Box>
          </VStack>
          <Box w="100%" alignSelf="flex-end">
            <PostStas post={post} userId={user.id} />
          </Box>
        </VStack>
      </Stack>
      <Box mt={"50px"} display={["block", null, null, null, "none"]}>
        <PostCard post={post} />
      </Box>
    </>
  );
};

export default PostDetails;
