import { useGetRecentPosts } from "../../Lib/react-query/queries";
import { Models } from "appwrite";
import PostCard from "../../Components/Shared/Shared/PostCard";
import { Box, Heading, VStack } from "@chakra-ui/react";

const Home = () => {
  const { data: posts } = useGetRecentPosts();

  return (
    <Box>
      <VStack spacing={10}>
        <Heading
          pl={"40px"}
          fontSize={"5xl"}
          alignSelf={"flex-start"}
          my="30px"
        >
          Home Feed
        </Heading>
        {posts?.documents.map((post: Models.Document) => (
          <PostCard key={post.$id} post={post} />
        ))}
      </VStack>
    </Box>
  );
};

export default Home;
