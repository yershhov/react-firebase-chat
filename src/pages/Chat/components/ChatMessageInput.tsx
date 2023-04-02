import React, { useEffect, useRef } from "react";
import { AiOutlineSend } from "react-icons/ai";

const ChatMessageInput = () => {
  const messageInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messageInputRef.current?.focus();
  }, []);

  return (
    <div className="absolute bottom-0 w-full flex">
      <input
        ref={messageInputRef}
        type="text"
        id="first_name"
        className="  text-sm rounded-b-lg w-full p-4 dark:bg-mainDark
 dark:placeholder-gray-400 dark:text-gray-200 focus:outline-none caret-primary
 "
        placeholder="Message"
        required
      />
      <div
        className=" bg-mainDark focus:outline-none
       rounded-br-lg pr-5 flex items-center "
      >
        <AiOutlineSend size={20} className="text-primary cursor-pointer" />
      </div>
    </div>
  );
};

export default ChatMessageInput;
