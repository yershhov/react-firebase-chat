import { collection, doc, query, setDoc, where } from "firebase/firestore";
import { get, is } from "immer/dist/internal";
import React, { RefObject, useCallback, useEffect, useRef } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { AiOutlineSend } from "react-icons/ai";
import { useParams } from "react-router-dom";
import { auth, firestore } from "../../../firebase/config";
import { Message, messageConverter } from "../../../firebase/entities/message";

type ChatMessageInputProps = {
  chatScrollableContainer: RefObject<HTMLDivElement>;
  scrollToBottom: () => void;
};

const ChatMessageInput = (props: ChatMessageInputProps) => {
  const params = useParams();
  const [user] = useAuthState(auth);
  const messageInputRef = useRef<HTMLInputElement>(null);

  const sendMessage = async () => {
    const messageText = messageInputRef.current!.value;
    messageInputRef.current!.value = "";
    const newMmessageRef = doc(
      collection(firestore, "chats", params.chatId!, "messages").withConverter(
        messageConverter
      )
    );

    await setDoc(newMmessageRef, {
      sentAt: new Date(),
      uid: user?.uid,
      text: messageText,
    });
    props.scrollToBottom();
  };

  useEffect(() => {
    messageInputRef.current?.focus();
  }, []);

  return (
    <>
      <div>
        <form
          action="post"
          onSubmit={(e) => {
            e.preventDefault();
            if (messageInputRef.current!.value !== "") {
              sendMessage();
            }
          }}
        >
          <div className="w-full flex">
            <input
              ref={messageInputRef}
              type="text"
              id="message"
              className="text-sm rounded-bl-lg w-full h-[3.3rem] p-4 dark:bg-mainDark
          dark:placeholder-zinc-600 dark:text-gray-200 focus:outline-none caret-primary caret-w-10"
              placeholder="Message"
              autoComplete="off"
            />
            <button
              type="submit"
              className=" bg-mainDark focus:outline-none
              rounded-br-lg pr-5 flex items-center"
            >
              <AiOutlineSend
                size={20}
                className="text-primary cursor-pointer"
              />
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ChatMessageInput;
