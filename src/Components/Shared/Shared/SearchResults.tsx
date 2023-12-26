import { Models } from "appwrite";
import Loader from "../Loader";
import GridPostList from "./GridPostList";
import { Text } from "@chakra-ui/react";

type searcheResulteProps = {
  isSearchFetching: boolean;
  searchedPosts: Models.Document[];
};

const SearchResults = ({
  isSearchFetching,
  searchedPosts,
}: searcheResulteProps) => {
  if (isSearchFetching) return <Loader />;
  if (searchedPosts && searchedPosts.documents.length > 0) {
    return <GridPostList posts={searchedPosts.documents} />;
  }
  return <Text fontSize={"2xl"}>No Results</Text>;
};

export default SearchResults;
