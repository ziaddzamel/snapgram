import { Outlet, Navigate } from "react-router-dom";
import { HStack, Image, Flex } from "@chakra-ui/react";
const AuthLayout = () => {
  const isAUTH = false;

  return (
    <>
      {isAUTH ? (
        <Navigate to="/" />
      ) : (
        <HStack h="100vh">
          <Flex flex="1" justifyContent="center" alignItems="center" py="10vw">
            <Outlet />
          </Flex>
          <Image
            objectFit="cover"
            w="50%"
            src="../public/assets/images/side-img.svg"
            h="100vh"
            display={{
              base: "none",
              lg: "block",
            }}
            bgSize="cover"
            bgRepeat="no-repeat"
          />
        </HStack>
      )}
    </>
  );
};

export default AuthLayout;
