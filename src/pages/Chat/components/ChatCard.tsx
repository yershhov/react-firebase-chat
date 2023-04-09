import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCompanion, getLastMessageForChat } from "../../../firebase/utils";
import { Message } from "../../../firebase/entities/message";
import { Chat } from "../../../firebase/entities/chat";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../firebase/config";
import { UserEntity } from "../../../firebase/entities/user";
import { QueryDocumentSnapshot } from "firebase/firestore";

type ChatCardProps = {
  chat: QueryDocumentSnapshot<Chat>;
};

const ChatCard = (props: ChatCardProps) => {
  const [user] = useAuthState(auth);
  const [lastMessage, setLastMessage] = useState<Message>();
  const [companion, setCompanion] = useState<UserEntity>();

  useEffect(() => {
    getLastMessageForChat(props.chat.id).then((res) => {
      setLastMessage(res);
    });
    getCompanion(user!, props.chat.data().users).then((res) => setCompanion(res));
  }, []);

  return (
    <>
      {lastMessage && (
        <Link to={`/${companion?.email}/${props.chat.id}`}>
          <div
            key={props.chat.id}
            className=" border-b dark:border-zinc-800 flex items-center gap-4 px-4 py-3 hover:cursor-pointer hover:backdrop-brightness-150"
          >
            <div className="h-[3.5rem] dark:bg-zinc-700 aspect-square rounded-full" />
            <div className="flex flex-col gap-2">
              <p className="font-semibold">{companion?.email}</p>
              <p className="dark:text-gray-400 text-xs">{lastMessage?.text}</p>
            </div>
          </div>
        </Link>
      )
      }
    </>
  );
};

export default ChatCard;
