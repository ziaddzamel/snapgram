import * as z from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useParams } from "react-router-dom";
import ProfileUploader from "../../Components/Shared/Shared/ProfileUploader";

import { ProfileValidation } from "../../Lib/validation/index";
import { useUserContext } from "../../Context/AuthContext";
import { useGetUserById, useUpdateUser } from "../../Lib/react-query/queries";
import {
  Button,
  FormControl,
  FormLabel,
  HStack,
  Heading,
  Image,
  Input,
  Textarea,
  VStack,
} from "@chakra-ui/react";

const UpdateProfile = () => {
  const navigate = useNavigate();

  const { user, setUser } = useUserContext();
  const form = useForm<z.infer<typeof ProfileValidation>>({
    resolver: zodResolver(ProfileValidation),
    defaultValues: {
      file: [],
      name: user.name,
      username: user.username,
      email: user.email,
      bio: user.bio || "",
    },
  });
  const { id } = useParams();
  const { data: currentUser } = useGetUserById(id);
  const { mutateAsync: updateUser } = useUpdateUser();

  if (!currentUser) {
    return console.log(currentUser);
  }

  // Handler
  const handleUpdate = async (value: z.infer<typeof ProfileValidation>) => {
    const updatedUser = await updateUser({
      userId: currentUser.$id,
      name: value.name,
      username: value.username,
      bio: value.bio,
      file: value.file,
      imageUrl: currentUser.imageUrl,
      imageId: currentUser.imageId,
    });
    console.log("Updated User:", updatedUser);
    if (!updatedUser) {
      console.log("error updating");
    }

    setUser({
      ...user,
      name: updatedUser?.name,
      username: updatedUser?.username,
      bio: updatedUser?.bio,
      imageUrl: updatedUser?.imageUrl,
    });
    return navigate(`/profile/${id}`);
  };

  return (
    <VStack
      mt="40px"
      color={"white"}
      alignItems={"flex-start"}
      spacing={10}
      as={"form"}
      onSubmit={form.handleSubmit(handleUpdate)}
    >
      <HStack spacing={6}>
        <Image src="/public/assets/icons/edit.svg" />
        <Heading>Edit Profile</Heading>
      </HStack>
      <FormControl w="50vw">
        <Controller
          control={form.control}
          name="file"
          render={({ field }) => (
            <ProfileUploader
              {...field}
              fieldChange={field.onChange}
              mediaUrl={currentUser.imageUrl}
            />
          )}
        />
      </FormControl>

      <FormControl w="100%">
        <FormLabel>Name</FormLabel>
        <Controller
          control={form.control}
          name="name"
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
        <FormLabel>User Name</FormLabel>
        <Controller
          control={form.control}
          name="username"
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
        <FormLabel>Email</FormLabel>
        <Controller
          control={form.control}
          name="email"
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
        <FormLabel>Bio</FormLabel>
        <Controller
          control={form.control}
          name="bio"
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
      <Button type="submit" className="shad-button_primary whitespace-nowrap">
        update
      </Button>
    </VStack>
  );
};

export default UpdateProfile;
