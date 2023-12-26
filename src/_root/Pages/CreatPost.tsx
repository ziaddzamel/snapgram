
import PostForm from "../../Components/Shared/Forms/PostForm";
import { HStack, Heading, Image, VStack } from "@chakra-ui/react";

const CreatPost = () => {
  return (
    <VStack m={"20px"}>
      <HStack my={"20px"} ml="30px" alignSelf={"flex-start"}>
        <Image src="../public/assets/icons/add-post.svg" />
        <Heading fontSize={"3xl"}>Create Post</Heading>
      </HStack>
      <PostForm action="Create" />
    </VStack>
  );
};

export default CreatPost;
