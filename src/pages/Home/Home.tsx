import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import Header from "./Header";
import { auth, firestore } from "../../firebase/config";
import ChatCard from "../Chat/components/ChatCard";
import { Chat, chatConverter } from "../../firebase/entities/chat";
import PageContainer from "../../components/layouts/PageContainer";
import { AnimatePresence, motion } from "framer-motion";

const Home = () => {
  const [user] = useAuthState(auth);

  const [chats, setChats] = useState<Chat[]>([]);

  useEffect(() => {
    const chatsRef = collection(firestore, "chats").withConverter(
      chatConverter
    );

    const q = query(chatsRef, where("users", "array-contains", user?.uid));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const newChats = querySnapshot.docs.map((doc) => doc.data());
      setChats(newChats);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <AnimatePresence>
      {location.pathname === '/' && (<motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="h-[calc(100%-3.8rem)]"
      >
        <Header />
        <div className="h-full overflow-y-auto">
          <div>
            {chats.map((chat) => {
              return <ChatCard key={chat.id} chat={chat} />;
            })}
          </div>
        </div>
      </motion.div>)}

    </AnimatePresence>
  );
};

export default Home;
