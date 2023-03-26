import {
  collection,
  doc,
  DocumentData,
  getDoc,
  getDocs,
  query,
  QueryDocumentSnapshot,
  QuerySnapshot,
  SnapshotOptions,
  where,
  WithFieldValue,
} from "firebase/firestore";
import { useCallback, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { toggleSideBar } from "../components/AppContainer/appContainer.slice";
import Header from "../components/Header";
import { auth, firestore } from "../firebase/config";
import { useAppDispatch, useAppSelector } from "../store";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

class User {
  uid: string;
  email: string;

  constructor(uid: string, email: string) {
    this.uid = uid;
    this.email = email;
  }
}

class Chat {
  withUser: User;
  message: string;

  constructor(withUser: User, message: string) {
    this.withUser = withUser;
    this.message = message;
  }
}

const chatConverter = {
  toFirestore: (chat: Chat) => {
    return {
      withUser: chat.withUser,
      message: chat.message,
    };
  },
  fromFirestore: (
    snapshot: QueryDocumentSnapshot<Chat>,
    options: SnapshotOptions
  ) => {
    const data = snapshot.data(options);
    return new Chat(data.withUser, data.message);
  },
};

const Home = () => {
  const dispatch = useAppDispatch();

  const [user] = useAuthState(auth);
  const sideBarIsOpen = useAppSelector(
    (state) => state.appContainer.sideBarIsOpen
  );

  const chatsCollectionRef = collection(
    doc(firestore, "users", user!.uid),
    "chats"
  ).withConverter(chatConverter);

  const [chats, setChats] = useState<Chat[]>([]);

  const fetchChats = async () => {
    const fetchedChats = await getDocs(chatsCollectionRef);
    const userChatsPromises = fetchedChats.docs.map(async (chatDocSnapshot) => {
      const withUserRef = chatDocSnapshot.get("withUser");
      const withUserDocSnapshot = await getDoc(withUserRef);
      const withUserData = withUserDocSnapshot.data() as User;
      const withUser = new User(withUserData.uid, withUserData.email);

      return { ...chatDocSnapshot.data(), withUser: withUser };
    });

    const userChats = await Promise.all(userChatsPromises);
    setChats(userChats);
  };

  useEffect(() => {
    fetchChats();
  }, []);

  return (
    <div>
      <Header />
      <div>
        {chats.map((chat, index) => {
          return (
            <Link to={`/${chat.withUser.email}`}>
              <div
                key={index}
                className=" border-b dark:border-zinc-700 flex items-center gap-4 px-4 py-3 hover:cursor-pointer hover:backdrop-brightness-150"
              >
                <div className="h-[3.5rem] dark:bg-zinc-700 aspect-square rounded-full"></div>
                <div className="flex flex-col gap-2">
                  <p className="dark:text-gray-200 font-semibold">
                    {chat.withUser.email}
                  </p>
                  <p className="dark:text-gray-400 text-xs">{chat.message}</p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
