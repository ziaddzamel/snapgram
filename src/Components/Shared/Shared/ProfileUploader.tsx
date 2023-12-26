import { useCallback, useState } from "react";
import { FileWithPath, useDropzone } from "react-dropzone";

import { convertFileToUrl } from "../../../Lib/utils";
import { Avatar, Box, HStack, Input, Text } from "@chakra-ui/react";

type ProfileUploaderProps = {
  fieldChange: (files: File[]) => void;
  mediaUrl: string;
};

const ProfileUploader = ({ fieldChange, mediaUrl }: ProfileUploaderProps) => {
  const [file, setFile] = useState<File[]>([]);
  const [fileUrl, setFileUrl] = useState<string>(mediaUrl);

  const onDrop = useCallback(
    (acceptedFiles: FileWithPath[]) => {
      setFile(acceptedFiles);
      fieldChange(acceptedFiles);
      setFileUrl(convertFileToUrl(acceptedFiles[0]));
    },
    [file]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpeg", ".jpg"],
    },
  });

  return (
    <Box {...getRootProps()}>
      <Input {...getInputProps()} className="cursor-pointer" />

      <HStack className="cursor-pointer flex-center gap-4" cursor={"pointer"}>
        <Avatar
          src={fileUrl || "/assets/icons/profile-placeholder.svg"}
          size={"xl"}
        />
        <Text color={"#7878A3"}>Change profile photo</Text>
      </HStack>
    </Box>
  );
};

export default ProfileUploader;
