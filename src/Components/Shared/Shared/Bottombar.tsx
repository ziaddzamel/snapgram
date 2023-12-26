import { HStack, Image, Text, VStack, LinkBox } from "@chakra-ui/react";
import { NavLink, useLocation } from "react-router-dom";
import { bottombarLinks } from "../../../constants";

const Bottombar = () => {
  const { pathname } = useLocation();

  return (
    <HStack
      spacing={0}
      px={3}
      py={2}
      bg="dark.2"
      position="fixed"
      bottom={0}
      left={0}
      right={0}
      zIndex={10}
      w="full"
      justifyContent="space-between"
      display={{
        base: "flex",
        md: "none",
      }}
    >
      {bottombarLinks.map((link) => {
        const isActive = pathname === link.route;
        return (
          <LinkBox
            key={link.label}
            as={NavLink}
            to={link.route}
            bg={isActive ? "#5D5FEF" : "inherit"}
            rounded="md"
            p={3}
            _hover={{
              backgroundColor: "#5D5FEF",
              transition: "background-color 0.3s ease-in-out",
            }}
          >
            <VStack
              spacing={2}
              fontSize="12px"
              fontWeight={600}
              textAlign="center"
            >
              <Image
                p={0}
                w="20px"
                src={link.imgURL}
                style={{
                  filter: isActive ? "brightness(0) invert(100%)" : "none",
                  transition: "filter 0.3s", // Adjust the duration as needed
                }}
              />
              <Text>{link.label}</Text>
            </VStack>
          </LinkBox>
        );
      })}
    </HStack>
  );
};

export default Bottombar;
