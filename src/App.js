import { useState } from "react";
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

function App() {
  const [visible, setVisible] = useState(false);
  const { user } = useSelector((state) => ({ ...state }));
  return (
    <>
      {visible && <CreatePostPopup user={user} setVisible={setVisible} />}
      <Routes>
        <Route element={<NotLoggedInRoutes />}>
          <Route path="/login" element={<Login />} exact />
        </Route>
        <Route element={<LoggedInRoutes />}>
          <Route path="/profile" element={<Profile />} exact />
          <Route path="/activate/:token" element={<Activate />} exact />
          <Route path="/" element={<Home setVisible={setVisible} />} exact />
        </Route>
        <Route path="/reset" element={<Reset />} />
      </Routes>
    </>
  );
}

export default App;
