import { useGetUserPosts } from "../../Lib/react-query/queries";
import { Box, Image, SimpleGrid } from "@chakra-ui/react";
import { Models } from "appwrite";
import { Link, useParams } from "react-router-dom";

const YourPosts = () => {
  const { id } = useParams();
  const { data: posts } = useGetUserPosts(id);

  return (
    <SimpleGrid columns={[1, 2, 2, 2]} spacing={"15px"}>
      {posts?.documents?.map((post: Models.Document) => (
        <Box
          display={"block"}
          mx={{
            base: "auto",
            lg: "none",
          }}
          key={post.$id}
        >
          <Link to={""}>
            <Image
              src={post.imageUrl}
              w="350px"
              h="350px"
              rounded={"2xl"}
              cursor={"pointer"}
              _hover={{
                transform: "scale(1.03)",
                transition: "transform 0.3s ease-in-out",
              }}
            />
          </Link>
        </Box>
      ))}
    </SimpleGrid>
  );
};

export default YourPosts;
