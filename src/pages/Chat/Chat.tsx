import { collection, query, orderBy, onSnapshot, where, Query, DocumentData, getDocs } from "firebase/firestore";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useParams } from "react-router-dom";
import { auth, firestore } from "../../firebase/config";
import { Message, messageConverter } from "../../firebase/entities/message";
import ChatHeader from "./components/ChatHeader";
import ChatMessageInput from "./components/ChatMessageInput";
import ReceivedMessage from "./components/messages/ChatReceivedMessage";
import SentMessage from "./components/messages/ChatSentMessage";
import { uuidv4 } from '@firebase/util';
import EmptyFullscreenState from "../../components/common/EmptyFullscreenState";

const Chat = () => {
  const params = useParams();
  const [user] = useAuthState(auth);
  const [messages, setMessages] = useState<Message[]>([]);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatBottomRef.current!.scrollIntoView({
      behavior: "smooth",
    });
  };

  useEffect(() => {
    chatBottomRef.current!.scrollIntoView();
  }, [messages]);

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
      <motion.div className="h-full w-full absolute z-40">
        <ChatHeader />
        <div className="h-[calc(100%-7.1rem)] max-h-[calc(100%-7.1rem)] overflow-y-auto bg-deepDark">
          {messages.length > 0 ? messages.map((message, index) => {
            return message.uid === user?.uid ? (
              <SentMessage key={uuidv4()} message={message} />
            ) : (
              <ReceivedMessage key={uuidv4()} message={message} />
            );
          }) : <EmptyFullscreenState message={"Send a message to start a chat"} />}
          <div ref={chatBottomRef}></div>
        </div>

        <ChatMessageInput
          chatScrollableContainer={chatBottomRef}
          scrollToBottom={scrollToBottom}
        />
      </motion.div>
    </AnimatePresence>
  );
};

export default Chat;
