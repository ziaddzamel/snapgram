import { Avatar, Box, Button, HStack, Image } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { useSignOutAccount } from "../../../Lib/react-query/queries";
import { useEffect } from "react";
import { useUserContext } from "../../../Context/AuthContext";
const Topbar = () => {
  const { mutate: signOut, isSuccess } = useSignOutAccount();
  const navigat = useNavigate();
  const { user } = useUserContext();
  useEffect(() => {
    if (isSuccess) {
      navigat(0);
    }
  }, [isSuccess]);

  return (
    <Box display={{
      base:"block",
      md:"none"
    }}>
      <HStack
        w="100%"
        justifyContent="space-between"
        py="5vw"
        px="3vw"
        alignItems="center"
      >
        <Link to="/">
          <Image src="../public/assets/images/logo.svg" />
        </Link>
        <Box>
          <Button colorScheme="" onClick={() => signOut()}>
            <Image src="../public/assets/icons/logout.svg" />
          </Button>
          <Link to={`/profile/${user.id}`}>
            <Avatar
              src={user.imageUrl || "../public/assets/images/profile.png"} name={user.name} size="sm" mt="4px"
            />
          </Link>
        </Box>
      </HStack>
    </Box>
  );
};

export default Topbar;
