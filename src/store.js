import { createStore, action, thunk, computed } from "easy-peasy";

export default createStore({
    posts: [],
    setPosts: action((state, payload) => {
        state.posts = payload;
    }),
    postTitle: "",
    setPostTitle: action((state, payload) => {
        state.postTitle = payload;
    }),
    postBody: "",
    setPostBody: action((state, payload) => {
        state.postBody = payload;
    }),
    editTitle: "",
    setEditTitle: action((state, payload) => {
        state.editTitle = payload;
    }),
    editBody: "",
    setEditBody: action((state, payload) => {
        state.editBody = payload;
    }),
    search: "",
    setSearch: action((state, payload) => {
        state.search = payload;
    }),
    searchResults: [],
    setSearchResults: action((state, payload) => {
        state.searchResults = payload;
    }),
    postCount: computed(state => state.posts.length),
    getPostById: computed(state => {
        return id => state.posts.find(post => post.id.toString() === id);
    }),
    savePost: thunk((actions, newPost, helpers) => {
        const { posts } = helpers.getState();
        try {
            const newPosts = [...posts, newPost];
            localStorage.setItem("posts", JSON.stringify(newPosts));
            actions.setPosts(newPosts);
            actions.setPostTitle("");
            actions.setPostBody("");
        } catch (err) {
            console.log(`Error: ${err.message}`);
        }
    }),
    deletePost: thunk((actions, id, helpers) => {
        const { posts } = helpers.getState();
        const remainingPosts = posts.filter(post => post.id.toString() !== id);
        try {
            localStorage.setItem("posts", JSON.stringify(remainingPosts));
            actions.setPosts(remainingPosts);
        } catch (err) {
            console.log(`Error: ${err.message}`);
        }
    }),
    editPost: thunk((actions, updatedPost, helpers) => {
        const { posts } = helpers.getState();
        const updatedPosts = posts.map(post => post.id.toString() === updatedPost.id ? { ...updatedPost } : post);
        try {
            localStorage.setItem("posts", JSON.stringify(updatedPosts));
            actions.setPosts(updatedPosts);
            actions.setEditTitle("");
            actions.setEditBody("");
        } catch (err) {
            console.log(`Error: ${err.message}`);
        }
    })
})