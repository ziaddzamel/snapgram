import {
  VStack,
  FormControl,
  FormLabel,
  Textarea,
  Input,
  Button,
  Box,
} from "@chakra-ui/react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { PostValidation } from "../../../Lib/validation";
import { useCreatePost, useUpdatePost } from "../../../Lib/react-query/queries";
import { useUserContext } from "../../../Context/AuthContext";
import { Models } from "appwrite";
import { z } from "zod";
import FileUploder from "../Shared/FileUploder";
import Loader from "../Loader";

type PostFormProps = {
  post?: Models.Document;
  action: "Create" | "Update";
};
const PostForm = ({ post, action }: PostFormProps) => {
  const navigate = useNavigate();
  const { user } = useUserContext();
  const form = useForm({
    resolver: zodResolver(PostValidation),
    defaultValues: {
      caption: post ? post?.caption : "",
      file: [],
      location: post ? post.location : "",
      tags: post ? post.tags.join(",") : "",
    },
  });

  const { mutateAsync: createPost, isPending: isLoadingCreate } =
    useCreatePost();
  const { mutateAsync: updatePost, isPending: isLoadingUpdate } =
    useUpdatePost();
  const handleSubmit = async (value: z.infer<typeof PostValidation>) => {
    try {
      if (action === "Update") {
        if (post) {
          const updatedPost = await updatePost({
            ...value,
            postId: post.$id,
            imageId: post?.imageId,
            imageUrl: post?.imageUrl,
          });

          if (updatedPost) {
            navigate(`/posts/${post.$id}`);
            return;
          } else {
            console.log("Error updating post");
            return;
          }
        }
      } else if (action === "Create") {
        const newPost = await createPost({
          ...value,
          userId: user.id,
        });

        if (newPost) {
          navigate("/");
          return;
        } else {
          console.log("Error creating post");
          return;
        }
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <VStack
      as="form"
      p="3vw"
      alignItems="flex-start"
      w={{
        base: "80vw",
        sm: "80vw",
        md: "60vw",
      }}
      spacing={8}
      onSubmit={form.handleSubmit(handleSubmit)}
    >
      <FormControl w="100%">
        <FormLabel>Caption</FormLabel>
        <Controller
          control={form.control}
          name="caption"
          render={({ field }) => (
            <Textarea
              mt="10px"
              {...field}
              rounded="md"
              border="none"
              color="white"
              bg="#1F1F22"
            />
          )}
        />
      </FormControl>

      <FormControl w="100%">
        <FormLabel>Add Photos</FormLabel>
        <Controller
          control={form.control}
          name="file"
          render={({ field }) => (
            <FileUploder
              fieldChange={field.onChange}
              mediaUrl={post?.imageUrl}
            />
          )}
        />
      </FormControl>
      <FormControl w="100%">
        <FormLabel>Location</FormLabel>
        <Controller
          control={form.control}
          name="location"
          render={({ field }) => (
            <Input
              {...field}
              rounded={"md"}
              border={"none"}
              borderColor="transparent"
              bg={"#1F1F22"}
              color="white"
            />
          )}
        />
      </FormControl>
      <FormControl w="100%">
        <FormLabel>Tags</FormLabel>
        <Controller
          control={form.control}
          name="tags"
          render={({ field }) => (
            <Input
              {...field}
              rounded={"md"}
              border={"none"}
              borderColor="transparent"
              bg={"#1F1F22"}
              color="white"
            />
          )}
        />
      </FormControl>
      <Button
        bg={"#5D5FEF"}
        type="submit"
        className="shad-button_primary whitespace-nowrap"
        disabled={isLoadingCreate || isLoadingUpdate}
      >
        <Button
          bg={"#5D5FEF"}
          type="submit"
          className="shad-button_primary whitespace-nowrap"
          disabled={isLoadingCreate || isLoadingUpdate}
        >
          {isLoadingCreate || isLoadingUpdate ? (
            <Box mt="-70px" w="20px" h="20px">
              <Loader />
            </Box>
          ) : (
            `${action} Post`
          )}
        </Button>
      </Button>
    </VStack>
  );
};

export default PostForm;
