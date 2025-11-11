import { useEffect } from "react";
import { Routes, Route } from "react-router";
import Header from "./Header";
import Nav from "./Nav";
import Home from "./Home";
import NewPost from "./NewPost";
import EditPost from "./EditPost";
import PostPage from "./PostPage";
import About from "./About";
import Missing from "./Missing";
import Footer from "./Footer";
import { useStoreActions } from "easy-peasy";
import { DUMMY_POSTS } from "./data/posts";

function App() {
  const setPosts = useStoreActions((actions) => actions.setPosts);
  const data = JSON.parse(localStorage.getItem("posts")) || DUMMY_POSTS;

  useEffect(() => {
    setPosts(data);
    localStorage.setItem("posts", JSON.stringify(data));
  }, [data, setPosts]);

  return (
    <div className="App">
      <Header title="React JS Blog" />
      <Nav />
      <Routes>
        <Route>
          <Route path="/" element={<Home />} />
          <Route path="/post" element={<NewPost />} />
          <Route path="/edit/:id" element={<EditPost />} />
          <Route path="/post/:id" element={<PostPage />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<Missing />} />
        </Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
