import { collection, doc, query, setDoc, where } from "firebase/firestore";
import { get, is } from "immer/dist/internal";
import React, { useCallback, useEffect, useRef } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { AiOutlineSend } from "react-icons/ai";
import { useParams } from "react-router-dom";
import { auth, firestore } from "../../../firebase/config";
import { Message, messageConverter } from "../../../firebase/entities/message";

const ChatMessageInput = () => {
  const params = useParams();
  const [user] = useAuthState(auth);
  const messageInputRef = useRef<HTMLInputElement>(null);

  const sendMessage = useCallback(async () => {
    const newMmessageRef = doc(
      collection(firestore, "chats", params.chatId!, "messages").withConverter(
        messageConverter
      )
    );

    await setDoc(newMmessageRef, {
      sentAt: new Date(),
      uid: user?.uid,
      text: messageInputRef.current?.value,
    });
    messageInputRef.current!.value = "";
  }, [user]);

  useEffect(() => {
    messageInputRef.current?.focus();
  }, []);

  return (
    <div className="absolute bottom-0 w-full flex">
      <input
        ref={messageInputRef}
        type="text"
        id="message"
        className="  text-sm rounded-b-lg w-full p-4 dark:bg-mainDark
        dark:placeholder-gray-400 dark:text-gray-200 focus:outline-none caret-primary caret-w-10"
        placeholder="Message"
      />
      <div
        className=" bg-mainDark focus:outline-none
       rounded-br-lg pr-5 flex items-center"
      >
        <AiOutlineSend
          size={20}
          className="text-primary cursor-pointer"
          onClick={sendMessage}
        />
      </div>
    </div>
  );
};

export default ChatMessageInput;
