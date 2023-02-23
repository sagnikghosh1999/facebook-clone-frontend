import Header from "../../components/header";
import LeftHome from "../../components/home/left";
import RightHome from "../../components/home/right";
import Stories from "../../components/home/stories";
import "./style.css";

export default function Home() {
  return (
    <div className="home">
      <Header />
      <LeftHome />
      <div className="home_middle">
        <Stories />
      </div>
      <RightHome />
    </div>
  );
}
