import { useMediaQuery } from "react-responsive";
import Skeleton from "react-loading-skeleton";

import { ArrowRight, Plus } from "../../../svg";
import "./style.css";
import { stories } from "../../../data/home";
import Story from "./Story";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Stories(storiess) {
  console.log(storiess);
  const { user } = useSelector((user) => ({ ...user }));
  const query1175 = useMediaQuery({
    query: "(max-width:1175px)",
  });
  const query1030 = useMediaQuery({
    query: "(max-width:1030px)",
  });
  const query960 = useMediaQuery({
    query: "(max-width:960px)",
  });
  const query885 = useMediaQuery({
    query: "(max-width:885px)",
  });

  const max = query885
    ? 5
    : query960
    ? 4
    : query1030
    ? 5
    : query1175
    ? 4
    : stories.length;

  return (
    <div className="stories">
      <Link to={"/stories/create"} className="create_story_card">
        <img
          src={user?.picture}
          alt={user?.username}
          className="create_story_img"
        />
        <div className="plus_story">
          <Plus color={"#fff"} />
        </div>
        <div className="story_create_text">Create Story</div>
      </Link>
      {false ? (
        <>
          {stories.slice(0, max).map((story, i) => (
            <div className="story">
              <Skeleton
                height="190px"
                containerClassName="avatar-skeleton"
                style={{ borderRadius: "10px" }}
              />
              <div className="story_profile_pic">
                <Skeleton
                  circle
                  height="40px"
                  width="40px"
                  containerClassName="avatar-skeleton"
                />
              </div>
            </div>
          ))}
        </>
      ) : (
        <>
          {stories.slice(0, max).map((story, i) => (
            <Story story={story} key={i} />
          ))}
        </>
      )}
      <div className="white_circle hover2">
        <ArrowRight color={"#65676b"} />
      </div>
    </div>
  );
}
