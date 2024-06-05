import React from "react";
import Header from "../../components/header";
import "./style.css";
import { useSelector } from "react-redux";

const CreateStory = () => {
  const { user } = useSelector((state) => ({ ...state }));
  return (
    <>
      <Header />
      <div className="create_story">
        <div className="create_story_left">
          <div className="create_story_left_header">
            <h3>Your Story</h3>
            <div className="small_circle">
              <i className="settings_filled_icon"></i>
            </div>
            <div className="create_story_left_wrap"></div>
          </div>
          <div className="create_story_right"></div>
        </div>
      </div>
    </>
  );
};

export default CreateStory;
