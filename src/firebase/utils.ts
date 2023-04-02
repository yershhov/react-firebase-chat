import { User } from "firebase/auth";
import {
  collection,
  query,
  orderBy,
  limit,
  getDocs,
  where,
} from "firebase/firestore";
import { firestore } from "./config";
import { Chat, chatConverter } from "./entities/chat";
import { Message, messageConverter } from "./entities/message";
import { UserEntity } from "./entities/user";

export const getChat = async (uid: string, id: string) => {
  const chatsRef = collection(firestore, "chats").withConverter(chatConverter);
  const q = query(chatsRef, where("users", "array-contains", uid));

  const snapshot = await getDocs(q);

  const chatData = snapshot.docs[0].data();

  const chat = new Chat(chatData.id, chatData.users, chatData.messages);

  return chat;
};
export const getMessagesForChat = async (uid: string, id: string) => {
  const messagesRef = collection(
    firestore,
    "chats",
    id,
    "messages"
  ).withConverter(messageConverter);

  const q = query(messagesRef, orderBy("sentAt"));

  const snapshot = await getDocs(q);

  const messagesDocs = snapshot.docs;

  const messages = messagesDocs.map((doc) => doc.data());

  return messages;
};

export const getLastMessageForChat = async (id: string) => {
  const messagesRef = collection(
    firestore,
    "chats",
    id,
    "messages"
  ).withConverter(messageConverter);

  const q = query(messagesRef, orderBy("sentAt", "desc"), limit(1));

  const snapshot = await getDocs(q);

  const messageData = snapshot.docs[0].data();

  const message = new Message(
    messageData.sentAt,
    messageData.text,
    messageData.uid
  );

  return message;
};

export const getCompanion = async (
  user: User,
  users: string[]
): Promise<UserEntity> => {
  const companionId = users.filter((u) => u !== user.uid)[0];

  const usersRef = collection(firestore, "users");
  const q = query(usersRef, where("uid", "==", companionId));

  const snapshot = await getDocs(q);

  const companionData = snapshot.docs[0].data();
  const companion = new UserEntity(companionData.uid, companionData.email);
  return companion;
};
