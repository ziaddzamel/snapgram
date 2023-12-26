import { Box, HStack, Image, Text } from "@chakra-ui/react";
import { Models } from "appwrite";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  useLikePost,
  useSavePost,
  useDeleteSavedPost,
  useGetCurrentUser,
} from "../../../Lib/react-query/queries";
import { checkIsLiked } from "../../../Lib/utils";

import Loader from "../Loader";

type PostStatsProps = {
  post?: Models.Document;
  userId: string;
};

const PostStas = ({ userId, post }: PostStatsProps) => {
  const likesList = post?.likes?.map((user: Models.Document) => user.$id) || [];

  const [likes, setLikes] = useState<string[]>(likesList);
  const [isSaved, setIsSaved] = useState(false);

  const { mutate: likePost } = useLikePost();
  const { mutate: savePost, isPending: isSavingPost } = useSavePost();
  const { mutate: deleteSavePost, isPending: isDeleteingSave } =
    useDeleteSavedPost();
  const { data: currentUser } = useGetCurrentUser();
  const savedPostRecord = currentUser?.save.find(
    (record: Models.Document) => record.post.$id === post?.$id
  );

  useEffect(() => {
    setIsSaved(!!savedPostRecord);
  }, [currentUser]);

  function handelLikePost(e: React.MouseEvent) {
    e.stopPropagation();
    let newLikes = [...likes];
    const hasLiked = newLikes.includes(userId);
    if (hasLiked) {
      newLikes = newLikes.filter((id) => id !== userId);
    } else {
      newLikes.push(userId);
    }
    setLikes(newLikes);
    likePost({ postId: post?.$id || "", likesArray: newLikes });
  }
  const handleSavePost = (
    e: React.MouseEvent<HTMLImageElement, MouseEvent>
  ) => {
    e.stopPropagation();

    if (savedPostRecord) {
      setIsSaved(false);
      return deleteSavePost(savedPostRecord.$id);
    }

    savePost({ userId: userId, postId: post.$id });
    setIsSaved(true);
  };
  return (
    <HStack w="100%" justifyContent="space-between" position="relative">
      <HStack>
        <Image
          src={`${
            checkIsLiked(likes, userId)
              ? "/public/assets/icons/liked.svg"
              : "/public/assets/icons/like.svg"
          }`}
          cursor="pointer"
          onClick={handelLikePost}
        />
        <Text>{likes.length}</Text>
      </HStack>
      {isSavingPost || isDeleteingSave ? (
        <Box w="30px" h="30px" position="absolute" right={-2} bottom={7}>
          <Loader />
        </Box>
      ) : (
        <Image
          src={
            isSaved
              ? "../public/assets/icons/saved.svg"
              : "../public/assets/icons/save.svg"
          }
          cursor="pointer"
          onClick={handleSavePost}
        />
      )}
    </HStack>
  );
};

export default PostStas;
