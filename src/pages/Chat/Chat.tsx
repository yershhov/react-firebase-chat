import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useParams } from "react-router-dom";
import HeaderContainer from "../../components/layouts/HeaderContainer";
import PageContainer from "../../components/layouts/PageContainer";
import { auth } from "../../firebase/config";
import { Message } from "../../firebase/entities/message";
import { UserEntity } from "../../firebase/entities/user";
import {
  getChat,
  getCompanion,
  getMessagesForChat,
} from "../../firebase/utils";
import ChatHeader from "./components/ChatHeader";
import ReceivedMessage from "./components/messages/ChatReceivedMessage";
import SentMessage from "./components/messages/ChatSentMessage";

// type ChatProps = {
//   id: string;
// };

const Chat = () => {
  const params = useParams();
  const [user] = useAuthState(auth);
  const [messages, setMessages] = useState<Message[]>([]);
  const [companion, setCompanion] = useState<UserEntity>();

  useEffect(() => {
    getMessagesForChat(user!.uid, params.chatId!).then((res) =>
      setMessages(res)
    );
    getChat(user!.uid, params.chatId!).then((res) => {
      getCompanion(user!, res.users).then((res) => setCompanion(res));
    });
  }, []);

  return (
    <div>
      <ChatHeader companion={companion!} />
      <PageContainer>
        <div>
          {messages.map((message) => {
            console.log(message);
            return message.uid === user?.uid ? (
              <SentMessage message={message} />
            ) : (
              <ReceivedMessage message={message} />
            );
          })}
        </div>
      </PageContainer>
    </div>
  );
};

export default Chat;
