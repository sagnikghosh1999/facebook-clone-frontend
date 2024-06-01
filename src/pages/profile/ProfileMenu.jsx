import { Link } from "react-router-dom";
import { Dots } from "../../svg";

export default function ProfileMenu({ showSuggestion, setShowSuggestion }) {
  return (
    <div className="profile_menu_wrap">
      <div className="profile_menu">
        <Link to="/" className="profile_menu_active">
          Posts
        </Link>
        <Link to="/" className="hover1">
          About
        </Link>
        <Link to="/" className="hover1">
          Friends
        </Link>
        <Link to="/" className="hover1">
          Photos
        </Link>
        <Link to="/" className="hover1">
          Videos
        </Link>
        <Link to="/" className="hover1">
          Check-ins
        </Link>
        <Link to="/" className="hover1">
          More
        </Link>
        <div
          className={`suggestion_btn hover1 ${
            showSuggestion && "active_show_suggestion"
          } `}
          onClick={() => {
            setShowSuggestion((prev) => !prev);
          }}
        >
          <Dots />
        </div>
      </div>
    </div>
  );
}
