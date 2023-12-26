import { Box, Image } from "@chakra-ui/react";

const Loader = () => (
  <Box display="flex" justifyContent="center" alignItems="center" width="full">
    <Image
      src="../assets/icons/loader.svg"
      alt="loader"
      width={24}
      height={24}
      className="animate-spin"
    />
  </Box>
);

export default Loader;
