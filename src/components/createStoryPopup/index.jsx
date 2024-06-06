import { useRef, useState } from "react";
import "./style.css";
import EmojiPickerBackgrounds from "../createPostPopup/EmojiPickerBackgrounds";
import PulseLoader from "react-spinners/PulseLoader";
const CreateStoryPopup = ({ setCreateStory, user }) => {
  const storyPopup = useRef(null);
  const [text, setText] = useState("");
  const [background, setBackground] = useState("");
  const [loading, setLoading] = useState(false);
  return (
    <>
      <div className="blur">
        <div className="storyBox " ref={storyPopup}>
          <div className="box_header">
            <div
              className="small_circle"
              onClick={() => {
                setCreateStory(false);
              }}
            >
              <i className="exit_icon"></i>
            </div>
            <span>Create Story</span>
          </div>

          <div className="box_profile ">
            <img src={user?.picture} alt="" className="box_profile_img" />
            <div className="box_col">
              <div className="box_profile_name">
                {user?.first_name} {user?.last_name}
              </div>
              <div className="box_privacy">
                <img src="../../../icons/public.png" alt="" />
                <span>Public</span>
                <i className="arrowDown_icon"></i>
              </div>
            </div>
          </div>
          <EmojiPickerBackgrounds
            text={text}
            user={user}
            setText={setText}
            setBackground={setBackground}
            background={background}
          />
          <div className="createStory_btns">
            <button className="gray_btn" onClick={() => setCreateStory(false)}>
              Discard
            </button>
            <button
              className="blue_btn "
              // onClick={() => updateCoverPicture()}
            >
              {loading ? <PulseLoader color="#fff" size={5} /> : "Save changes"}
              Share Story
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateStoryPopup;
