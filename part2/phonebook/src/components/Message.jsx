import React from "react";

const Message = ({ message, style }) => {
  if (!message) {
    return null;
  }

  return <div className={`message ${style}`}>{message}</div>;
};

export default Message;
