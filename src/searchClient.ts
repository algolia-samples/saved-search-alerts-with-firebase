import algoliasearch from "algoliasearch/lite";

const searchClient = algoliasearch(
    <string>process.env.REACT_APP_ALGOLIA_APP_ID,
    <string>process.env.REACT_APP_ALGOLIA_API_KEY,
);

export default searchClient;
