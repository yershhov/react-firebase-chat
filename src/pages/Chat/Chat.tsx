import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useLocation, useParams } from "react-router-dom";
import PageContainer from "../../components/layouts/PageContainer";
import { auth, firestore } from "../../firebase/config";
import { Message, messageConverter } from "../../firebase/entities/message";
import { UserEntity } from "../../firebase/entities/user";
import ChatHeader from "./components/ChatHeader";
import ChatMessageInput from "./components/ChatMessageInput";
import ReceivedMessage from "./components/messages/ChatReceivedMessage";
import SentMessage from "./components/messages/ChatSentMessage";

const Chat = () => {
  const params = useParams();
  const [user] = useAuthState(auth);
  const [isChat, setIsChat] = useState(true);
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

    return () => {
      unsubscribe();
    };
  }, [user, params.chatId]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ ease: "easeInOut", duration: 0.3 }}
        className="h-full w-full absolute z-40"
      >
        <ChatHeader companion={companion!} />
        <div className="h-[calc(100%-7.7rem)] max-h-[calc(100%-7.7rem)] overflow-y-auto bg-deepDark">
          {messages.map((message, index) => {
            return message.uid === user?.uid ? (
              <SentMessage key={"mesage-" + index} message={message} />
            ) : (
              <ReceivedMessage key={"mesage-" + index} message={message} />
            );
          })}
        </div>
        <ChatMessageInput />
      </motion.div>
    </AnimatePresence>
  );
};

export default Chat;
