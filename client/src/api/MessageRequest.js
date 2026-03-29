import React from "react";
import "./Message.css";

const Message = ({ message, own }) => {
  return (
    <div className={own ? "message own" : "message"}>
      <span>{message.text}</span>
    </div>
  );
};

export default Message;