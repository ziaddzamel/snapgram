import { Models } from "appwrite";
import { Link } from "react-router-dom";

import { Box, Image, SimpleGrid } from "@chakra-ui/react";

type GridPostListProps = {
  posts: Models.Document[];
  showUser?: boolean;
  showStats?: boolean;
};

const GridPostList = ({ posts }: GridPostListProps) => {
  return (
    <SimpleGrid columns={[1, 2]} spacing={"15px"}>
      {posts.map((post) => (
        <Box key={post.$id}>
          <Link to={`/posts/${post.$id}`}>
            <Image
              src={post.imageUrl}
              alt="post"
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

export default GridPostList;
