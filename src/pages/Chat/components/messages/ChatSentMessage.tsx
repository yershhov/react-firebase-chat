import React, { ReactNode } from "react";
import { Message } from "../../../../firebase/entities/message";

type SentMessageProps = {
  message: Message;
};

const SentMessage = (props: SentMessageProps) => {
  return (
    <div className="chat chat-end">
      <div className="chat-bubble dark:bg-primary dark:text-gray-200">
        {props.message.text}
      </div>
    </div>
  );
};

export default SentMessage;
