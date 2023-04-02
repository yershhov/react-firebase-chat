import React from "react";
import { Message } from "../../../../firebase/entities/message";
type ReceivedMessageProps = {
  message: Message;
};

const ReceivedMessage = (props: ReceivedMessageProps) => {
  return (
    <div className="chat chat-start">
      <div className="chat-bubble">{props.message.text}</div>
    </div>
  );
};

export default ReceivedMessage;
