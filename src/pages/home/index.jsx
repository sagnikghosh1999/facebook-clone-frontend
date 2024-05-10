import { useSelector } from "react-redux";
import CreatePost from "../../components/createPost";
import Header from "../../components/header";
import LeftHome from "../../components/home/left";
import RightHome from "../../components/home/right";
import Stories from "../../components/home/stories";
import SendVerification from "../../components/sendVerification";
import "./style.css";
import Post from "../../components/post";
import { useEffect, useRef, useState } from "react";

export default function Home({ setVisible, posts }) {
  const { user } = useSelector((user) => ({ ...user }));
  const middle = useRef(null);
  const [height, setHeight] = useState();
  useEffect(() => {
    setHeight(middle?.current?.clientHeight);
  }, [height]);
  return (
    <div className="home" style={{ height: `${height + 150}px` }}>
      <Header />
      <LeftHome />
      <div className="home_middle" ref={middle}>
        <Stories />
        {user.verified === false && <SendVerification />}
        <CreatePost setVisible={setVisible} />
        <div className="posts">
          {posts.map((post, i) => (
            <Post key={i} post={post} user={user} />
          ))}
        </div>
      </div>
      <RightHome />
    </div>
  );
}
