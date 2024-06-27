import React, { useReducer, useState } from "react";
import Header from "../../components/header";
import "./style.css";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CreateStoryPopup from "../../components/createStoryPopup";
import { postsReducer } from "../../functions/reducers";

const CreateStory = () => {
  const [createStory, setCreateStory] = useState(false);
  const { user } = useSelector((state) => ({ ...state }));
  // eslint-disable-next-line
  const [{ loading, stories }, dispatch] = useReducer(postsReducer, {
    loading: false,
    stories: [],
    error: "",
  });

  return (
    <>
      {createStory && (
        <CreateStoryPopup
          setCreateStory={setCreateStory}
          user={user}
          stories={stories}
          dispatch={dispatch}
        />
      )}
      <Header />
      <div className="create_story">
        <div className="create_story_left">
          <div className="create_story_left_header">
            <h3>Your Story</h3>
            <div className="small_circle">
              <i className="settings_filled_icon"></i>
            </div>
          </div>
          <div className="create_story_left_wrap">
            <Link to="/profile" className={`menu_item_user hover3 `}>
              <img
                src={user?.picture}
                alt={user?.username}
                className="create_story_user_img"
              />
              <span>
                {user?.first_name} {user?.last_name}
              </span>
            </Link>
          </div>
        </div>
        <div className="create_story_right">
          <div className="create_story_right_wrap">
            <div className="photo_story_gradient photo_story_wrap">
              <div className="add_circle">
                <i className="addPhoto_icon"></i>
              </div>
              <span>Create a Photo Story</span>
            </div>
            <div
              className="text_story_gradient photo_story_wrap"
              onClick={() => setCreateStory((prev) => !prev)}
            >
              <div className="add_circle">
                <i className="text_icon"></i>
              </div>
              <span>Create a Text Story</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateStory;
