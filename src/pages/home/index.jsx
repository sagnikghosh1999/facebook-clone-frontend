import { useSelector } from "react-redux";
import CreatePost from "../../components/createPost";
import Header from "../../components/header";
import LeftHome from "../../components/home/left";
import RightHome from "../../components/home/right";
import Stories from "../../components/home/stories";
import SendVerification from "../../components/sendVerification";
import "./style.css";

export default function Home() {
  const { user } = useSelector((user) => ({ ...user }));
  return (
    <div className="home">
      <Header />
      <LeftHome />
      <div className="home_middle">
        <Stories />
        {user.verified === false && <SendVerification />}
        <CreatePost />
      </div>
      <RightHome />
    </div>
  );
}
