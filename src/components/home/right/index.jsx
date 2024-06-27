import { useSelector } from "react-redux";
import { Dots, NewRoom, Plus, Search } from "../../../svg";
import Contact from "./Contact";
import "./style.css";

export default function RightHome({ friends }) {
  const { user } = useSelector((state) => ({ ...state }));
  const color = "#65676b";
  return (
    <div className="right_home">
      <div className="heading">Sponsored</div>
      <div className="splitter1"></div>
      <div className="contacts_wrap">
        <div className="contacts_header">
          <div className="contacts_header_left">Contacts</div>
          <div className="contacts_header_right">
            <div className="contact_circle hover1">
              <NewRoom color={color} />
            </div>
            <div className="contact_circle hover1">
              <Search color={color} />
            </div>
            <div className="contact_circle hover1">
              <Dots color={color} />
            </div>
          </div>
        </div>
        <div className="contacts_list">
          {friends?.slice(0, 8).map((friend, i) => (
            <Contact friend={friend} key={i} />
          ))}
        </div>
      </div>
      <div className="splitter1"></div>
      <div className="contacts_wrap">
        <div className="contacts_header">
          <div className="contacts_header_left">Group Conversation</div>
        </div>
        <div className="create_group hover3">
          <div className="create_group_icon">
            <Plus color={"#000"} />
          </div>
          <div className="create_group_text">
            <span>Create New Conversation</span>
          </div>
        </div>
      </div>
    </div>
  );
}
