import { Models } from "appwrite";
import { Link } from "react-router-dom";
import { multiFormatDateString } from "../../../Lib/utils";
import { useUserContext } from "../../../Context/AuthContext";
import {
  Avatar,
  Box,
  HStack,
  Heading,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import PostStas from "./PostStas";
type PostCardProps = {
  post: Models.Document;
};

const PostCard = ({ post }: PostCardProps) => {
  const { user } = useUserContext();
  if (!post.creator) {
    // If post.creator is undefined, you may want to handle this case.
    // You can return null, display a placeholder, or handle it in a way that makes sense for your application.
    return null;
  }

  return (
    <VStack
      spacing={10}
      bg="#101012"
      w={{
        base: "95%",
        sm: "500px",
        md:"500px",
        lg: "600px",
      }}
      mx={"50px"}
      h={"100%"}
      p={["15px", "30px"]}
      rounded="xl"
    >
      <HStack justifyContent="space-between" w="100%">
        <HStack spacing={7} w="100%">
          <Link to={`/profile/${post.creator.$id}`}>
            <Avatar
              size={"lg"}
              src={
                post?.creator?.imageUrl || "/assets/images/profile.png"
              }
            />
          </Link>
          <VStack w="100%" alignItems="flex-start">
            <Heading fontSize="xl">{post.creator.name}</Heading>
            <HStack>
              <Text fontSize="xs">
                {multiFormatDateString(post.$createdAt)}
              </Text>
              <Text fontSize="xs">{post.location}</Text>
            </HStack>
          </VStack>
        </HStack>

        <Link to={`/updatePost/${post.$id}`}>
          <Image
            display={user.id !== post.creator.$id ? "none" : "block"}
            src="/assets/icons/edit.svg"
            w="30px"
            h="30px"
          />
        </Link>
      </HStack>
      <Link to={`/posts/${post.$id}`}>
        <Text mb="10px" fontSize={["12px", "15px", "15px"]}>
          {post.caption}
        </Text>
        <HStack mb="10px" alignItems="center">
          {post.tags.map((tag: string) => (
            <Text fontSize={["10px", "12px", "12px"]} color="#5C5C7B" key={tag}>
              #{tag}
            </Text>
          ))}
        </HStack>
        <Image w="100%" src={post.imageUrl} rounded="lg" />
      </Link>
      <Box mt={"-10px"} w="100%">
        <PostStas post={post} userId={user.id} />
      </Box>
    </VStack>
  );
};

export default PostCard;
