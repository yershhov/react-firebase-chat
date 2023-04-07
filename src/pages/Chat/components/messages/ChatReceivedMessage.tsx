import { Message } from "../../../../firebase/entities/message";

type ReceivedMessageProps = {
  message: Message;
};

const ReceivedMessage = (props: ReceivedMessageProps) => {
  return (
    <div className="chat chat-start">
      <div className="chat-header">
        <time className="text-xs opacity-50">
          {props.message.sentAt
            //@ts-ignore
            .toDate()
            .toLocaleTimeString(window.navigator.language, {
              day: "numeric",
              month: "short",
              hour: "2-digit",
              minute: "2-digit",
            })}
        </time>
      </div>
      <div className="chat-bubble dark:bg-lightDark dark:text-gray-200">
        {props.message.text}
      </div>
    </div>
  );
};

export default ReceivedMessage;
