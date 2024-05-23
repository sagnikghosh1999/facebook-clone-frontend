import { useEffect, useReducer, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";

import Home from "./pages/home";
import Activate from "./pages/home/Activate";
import Login from "./pages/login";
import Profile from "./pages/profile";
import Reset from "./pages/reset";
import LoggedInRoutes from "./routes/LoggedInRoutes";
import NotLoggedInRoutes from "./routes/NotLoggedInRoutes";
import CreatePostPopup from "./components/createPostPopup";
import axios from "axios";

function reducer(state, action) {
  switch (action.type) {
    case "POSTS_REQUEST":
      return { ...state, loading: true, error: "" };
    case "POSTS_SUCCESS":
      return { ...state, loading: false, posts: action.payload, error: "" };
    case "POSTS_ERROR":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}

function App() {
  const [visible, setVisible] = useState(false);
  const { user } = useSelector((state) => ({ ...state }));

  const [{ loading, error, posts }, dispatch] = useReducer(reducer, {
    loading: false,
    posts: [],
    error: "",
  });

  useEffect(() => {
    getAllPosts();
  }, []);

  const getAllPosts = async () => {
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
  };

  return (
    <>
      {visible && <CreatePostPopup user={user} setVisible={setVisible} />}
      <Routes>
        <Route element={<NotLoggedInRoutes />}>
          <Route path="/login" element={<Login />} exact />
        </Route>
        <Route element={<LoggedInRoutes />}>
          <Route
            path="/profile"
            element={<Profile setVisible={setVisible} />}
            exact
          />
          <Route
            path="/profile/:username"
            element={<Profile setVisible={setVisible} />}
            exact
          />
          <Route path="/activate/:token" element={<Activate />} exact />
          <Route
            path="/"
            element={<Home setVisible={setVisible} posts={posts} />}
            exact
          />
        </Route>
        <Route path="/reset" element={<Reset />} />
      </Routes>
    </>
  );
}

export default App;
