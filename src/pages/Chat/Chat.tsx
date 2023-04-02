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
import ChatMessageInput from "./components/ChatMessageInput";
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
    async function fetchData() {
      try {
        const messages = await getMessagesForChat(user!.uid, params.chatId!);
        setMessages(messages);
        const chat = await getChat(user!.uid, params.chatId!);
        const companion = await getCompanion(user!, chat.users);
        setCompanion(companion);
      } catch (error) {
        // handle error
      }
    }
    fetchData();
  }, [user, params.chatId]);

  return (
    <div>
      <ChatHeader companion={companion!} />
      <PageContainer>
        <div>
          {messages.map((message, index) => {
            return message.uid === user?.uid ? (
              <SentMessage key={"mesage-" + index} message={message} />
            ) : (
              <ReceivedMessage key={"mesage-" + index} message={message} />
            );
          })}
        </div>
      </PageContainer>
      <ChatMessageInput />
    </div>
  );
};

export default Chat;
