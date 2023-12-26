import {
  Box,
  Heading,
  Image,
  Input,
  InputGroup,
  InputLeftAddon,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { useGetPosts, useSearchPosts } from "../../Lib/react-query/queries";
import useDebounce from "../../hooks/useDebounce";
import GridPostList from "../../Components/Shared/Shared/GridPostList";
import SearchResults from "../../Components/Shared/Shared/SearchResults";

const Explore = () => {
  const { data: posts } = useGetPosts();
  const [searchValue, setSearchValue] = useState("");
  const debouncedSearch = useDebounce(searchValue, 500);
  const { data: searchedPosts, isFetching: isSearchFetching } =
    useSearchPosts(debouncedSearch);

  const shouldShowSearchResults = debouncedSearch !== ""; // Use debouncedSearch for comparison
  const shouldShowPosts =
    !shouldShowSearchResults &&
    posts?.pages.every((item) => item.documents.length === 0);

  return (
    <VStack alignItems={"flex-start"} spacing={6} m={"20px"}>
      <Heading alignSelf={"flex-start"}>Search</Heading>
      <InputGroup>
        <InputLeftAddon
          bg={"#1F1F22"}
          border="none"
          children={<Image src="../public/assets/icons/search.svg" />}
        />
        <Input
          bg="#1F1F22"
          border="none"
          w={"100%"}
          focusBorderColor="none"
          _focus={{ boxShadow: "none" }}
          placeholder="Search"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </InputGroup>
      <Text my="20px" fontSize={"2xl"}>
        {shouldShowSearchResults ? "Search results" : "Popular todaty"}
      </Text>
      <Box className="block-center">
        {shouldShowSearchResults ? (
          <SearchResults
            searchedPosts={searchedPosts}
            isSearchFetching={isSearchFetching}
          />
        ) : shouldShowPosts ? (
          <Text>End of Posts</Text>
        ) : (
          posts?.pages.map((item, index) => (
            <GridPostList key={`page-${index}`} posts={item.documents} />
          ))
        )}
      </Box>
    </VStack>
  );
};

export default Explore;
