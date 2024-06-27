import { useCallback, useEffect, useReducer, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

import Home from "./pages/home";
import Activate from "./pages/home/Activate";
import Login from "./pages/login";
import Profile from "./pages/profile";
import Reset from "./pages/reset";
import LoggedInRoutes from "./routes/LoggedInRoutes";
import NotLoggedInRoutes from "./routes/NotLoggedInRoutes";
import CreatePostPopup from "./components/createPostPopup";
import { postsReducer } from "./functions/reducers";
import Friends from "./pages/friends";
import CreateStory from "./pages/createStory";

function App() {
  const [visible, setVisible] = useState(false);
  const { user, darkTheme } = useSelector((state) => ({ ...state }));

  const [{ loading, posts, stories }, dispatch] = useReducer(postsReducer, {
    loading: false,
    posts: [],
    stories: [],
    error: "",
  });

  const getAllPosts = useCallback(async () => {
    try {
      dispatch({
        type: "POSTS_REQUEST",
      });
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/getallposts`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      dispatch({
        type: "POSTS_SUCCESS",
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: "POSTS_ERROR",
        payload: error.response.data.message,
      });
    }
  }, [user]);

  const getAllStories = useCallback(async () => {
    try {
      dispatch({
        type: "STORIES_REQUEST",
      });
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/getallstories`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      dispatch({
        type: "STORIES_SUCCESS",
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: "STORIES_ERROR",
        payload: error.response.data.message,
      });
    }
  }, [user]);

  useEffect(() => {
    getAllPosts();
    getAllStories();
  }, [getAllPosts, getAllStories]);

  return (
    <div className={darkTheme ? "dark" : ""}>
      {visible && (
        <CreatePostPopup
          user={user}
          setVisible={setVisible}
          posts={posts}
          dispatch={dispatch}
        />
      )}
      <Routes>
        <Route element={<NotLoggedInRoutes />}>
          <Route path="/login" element={<Login />} exact />
        </Route>
        <Route element={<LoggedInRoutes />}>
          <Route
            path="/profile"
            element={
              <Profile setVisible={setVisible} getAllPosts={getAllPosts} />
            }
            exact
          />
          <Route
            path="/profile/:username"
            element={
              <Profile setVisible={setVisible} getAllPosts={getAllPosts} />
            }
            exact
          />
          <Route
            path="/friends"
            element={
              <Friends setVisible={setVisible} getAllPosts={getAllPosts} />
            }
            exact
          />
          <Route
            path="/friends/:type"
            element={
              <Friends setVisible={setVisible} getAllPosts={getAllPosts} />
            }
            exact
          />
          <Route path="/activate/:token" element={<Activate />} exact />
          <Route path="/stories/create" element={<CreateStory />} exact />
          <Route
            path="/"
            element={
              <Home
                setVisible={setVisible}
                posts={posts}
                stories={stories}
                loading={loading}
                getAllPosts={getAllPosts}
              />
            }
            exact
          />
        </Route>
        <Route path="/reset" element={<Reset />} />
      </Routes>
    </div>
  );
}

export default App;
