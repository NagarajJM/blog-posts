import Feed from "./Feed";
import { useStoreState } from "easy-peasy";

const Home = () => {
  const searchResults = useStoreState((state) => state.searchResults);
  return (
    <main className="Home">
      {searchResults.length ? (
        <Feed posts={searchResults} />
      ) : (
        <p className="statusMsg">No posts to display.</p>
      )}
    </main>
  );
};

export default Home;
