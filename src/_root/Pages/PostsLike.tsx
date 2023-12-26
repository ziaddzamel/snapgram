import Loader from "../../Components/Shared/Loader";
import GridPostList from "../../Components/Shared/Shared/GridPostList";
import { useGetCurrentUser } from "../../Lib/react-query/queries";
import { Box } from "@chakra-ui/react";

const PostsLike = () => {
  const { data: currentUser } = useGetCurrentUser();

  if (!currentUser)
    return (
      <Box>
        <Loader />
      </Box>
    );
  return (
    <>
      {currentUser.liked.length === 0 && (
        <p className="text-light-4">No liked posts</p>
      )}

      <GridPostList posts={currentUser.liked} showStats={false} />
    </>
  );
};

export default PostsLike;
