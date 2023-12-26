import { useCallback, useState } from "react";
import { FileWithPath, useDropzone } from "react-dropzone";
import { Box, Flex, Heading, Image, Text, VStack } from "@chakra-ui/react";

type FileUploaderProps = {
  fieldChange: (files: File[]) => void;
  mediaUrl: string;
};

const FileUploder = ({ fieldChange, mediaUrl }: FileUploaderProps) => {
  const [file, setFile] = useState<File[]>([]);
  const [fileUrl, setFileUrl] = useState(mediaUrl);

  const onDrop = useCallback(
    (acceptedFiles: FileWithPath[]) => {
      // Update file state
      setFile(acceptedFiles);
      fieldChange(acceptedFiles);
      // Create a URL for the uploaded file
      const fileObjectUrl = URL.createObjectURL(acceptedFiles[0]);

      // Update fileUrl state with the created URL
      setFileUrl(fileObjectUrl);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [file]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpeg", ".jpg", ".svg"],
    },
  });
  return (
    <VStack w="100%" spacing={4} align="center">
      <Box
        {...getRootProps()}
        h={{ base: "300px", md: "400px", lg: "480px" }}
        w="100%"
        bg="#1F1F22"
        p={4}
        borderRadius="lg"
        cursor="pointer"
        display="flex"
        justifyContent={"center"}
        alignItems="center"
      >
        <input {...getInputProps()} />

        {fileUrl ? (
          <Flex width="100%" maxHeight="100%" overflow="hidden">
            <VStack width="100%">
              <Box width="100%" borderRadius="20px" overflow="hidden">
                <Image width="100%" h="400px" src={fileUrl} />
              </Box>
              <Text fontSize="12px" color="#5C5C7B">
                {" "}
                Click or Drop Image to Replace
              </Text>
            </VStack>
          </Flex>
        ) : (
          <VStack>
            <Image src="/public/assets/icons/file-upload.svg" />
            <Heading fontSize="sm">Drage Photo Here</Heading>
            <Text color="#5C5C7B" fontSize="sm">
              SVG,PNG,JPG
            </Text>
          </VStack>
        )}
      </Box>
    </VStack>
  );
};

export default FileUploder;
