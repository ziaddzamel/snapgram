
import PostForm from "../../Components/Shared/Forms/PostForm";
import { useParams } from "react-router-dom";
import { useGetPostById } from "../../Lib/react-query/queries";
import Loader from "../../Components/Shared/Loader";
import { HStack, Heading, VStack, Image } from "@chakra-ui/react";

const EditPost = () => {
  const { id } = useParams();
  const { data: post, isPending } = useGetPostById(id || "");

  if (isPending) {
    // You can render a loading indicator here if needed
    return <Loader />;
  }

  return (
    <VStack m="20px">
      <HStack my={"20px"} ml="30px" alignSelf={"flex-start"}>
        <Image src="../public/assets/icons/add-post.svg" />
        <Heading fontSize={"3xl"}>Edit Post</Heading>
      </HStack>
      <PostForm post={post} action="Update" />
    </VStack>
  );
};

export default EditPost;
