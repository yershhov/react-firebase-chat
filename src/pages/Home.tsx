import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import Header from "../components/Header";
import { auth, firestore } from "../firebase/config";
import ChatCard from "./Chat/components/ChatCard";
import { Chat, chatConverter } from "../firebase/entities/chat";

const Home = () => {
  const [user] = useAuthState(auth);

  const [chats, setChats] = useState<Chat[]>([]);

  useEffect(() => {
    const chatsRef = collection(firestore, "chats").withConverter(
      chatConverter
    );

    const q = query(chatsRef, where("users", "array-contains", user?.uid));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        setChats([...chats, doc.data()]);
      });
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div>
      <Header />
      <div>
        {chats.map((chat) => {
          return <ChatCard chat={chat} />;
        })}
      </div>
    </div>
  );
};

export default Home;
