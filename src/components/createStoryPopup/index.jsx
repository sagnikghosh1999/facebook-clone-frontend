import { useRef, useState } from "react";
import "./style.css";
import EmojiPickerBackgrounds from "../createPostPopup/EmojiPickerBackgrounds";
import PulseLoader from "react-spinners/PulseLoader";
import { createStory } from "../../functions/story";
import PostError from "../createPostPopup/PostError";
import useClickOutside from "../../helpers/clickOutside";
const CreateStoryPopup = ({ setCreateStory, user }) => {
  const storyPopup = useRef(null);
  const [text, setText] = useState("");
  const [background, setBackground] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useClickOutside(storyPopup, () => {
    setCreateStory(false);
  });

  const storySubmit = async () => {
    if (background) {
      setLoading(true);
      const response = await createStory(background, text, user.id, user.token);
      setLoading(false);
      if (response.status === "ok") {
        setBackground("");
        setText("");
        setCreateStory(false);
      } else {
        setError(response);
      }
    }
  };

  return (
    <>
      <div className="blur">
        <div className="storyBox " ref={storyPopup}>
          {error && <PostError error={error} setError={setError} />}
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
            <button className="blue_btn " onClick={() => storySubmit()}>
              {loading ? (
                <PulseLoader color="#fff" size={5} />
              ) : (
                "Share to Story"
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateStoryPopup;
