import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useParams } from "react-router-dom";
import { auth } from "../../firebase/config";
import { Message } from "../../firebase/entities/message";
import { getMessagesForChat } from "../../utils/firestoreUtils";

// type ChatProps = {
//   id: string;
// };

const Chat = () => {
  const params = useParams();
  const [user] = useAuthState(auth);
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    getMessagesForChat(user!.uid, params.chatId!).then((res) =>
      setMessages(res)
    );
  }, []);

  return (
    <div>
      {messages.map((item) => {
        console.log(messages);
        return <p>{item.text}</p>;
      })}
    </div>
  );
};

export default Chat;
