import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useParams } from "react-router-dom";
import HeaderContainer from "../../components/layouts/HeaderContainer";
import PageContainer from "../../components/layouts/PageContainer";
import { auth, firestore } from "../../firebase/config";
import { Message, messageConverter } from "../../firebase/entities/message";
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
    const messagesRef = collection(
      firestore,
      "chats",
      params.chatId!,
      "messages"
    ).withConverter(messageConverter);

    const q = query(messagesRef, orderBy("sentAt"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const messages = querySnapshot.docs.map((doc) => doc.data());
      setMessages(messages);
    });

    async function fetchData() {
      try {
        const chat = await getChat(user!.uid, params.chatId!);
        const companion = await getCompanion(user!, chat.users);
        setCompanion(companion);
      } catch (error) {
        // handle error
      }
    }
    fetchData();

    return () => {
      unsubscribe();
    };
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
