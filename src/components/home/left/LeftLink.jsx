import React from "react";

export default function LeftLink({ img, text, notification }) {
  return (
    <div className="left_link hover1">
      <img src={`/left/${img}.png`} alt={text} />
      {notification !== undefined ? (
        <div className="col">
          <div className="col1">{text}</div>
          <div className="col2">{notification}</div>
        </div>
      ) : (
        <span>{text}</span>
      )}
    </div>
  );
}
