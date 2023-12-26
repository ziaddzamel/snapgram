import { Models } from "appwrite";

import GridPostList from "../../Components/Shared/Shared/GridPostList";
import { useGetCurrentUser } from "../../Lib/react-query/queries";

const Saved = () => {
  const { data: currentUser } = useGetCurrentUser();

  const savePosts = currentUser?.save
    .map((savePost: Models.Document) => ({
      ...savePost.post,
      creator: {
        imageUrl: currentUser.imageUrl,
      },
    }))
    .reverse();

  return <GridPostList posts={savePosts} showStats={false} />;
};

export default Saved;
