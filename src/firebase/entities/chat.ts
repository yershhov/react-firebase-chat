import { QueryDocumentSnapshot, SnapshotOptions } from "firebase/firestore";
import { Message } from "./message";

export class Chat {
  // array of uids of user present in chat
  id: string;
  users: string[];
  messages: Message[];

  constructor(id: string, users: string[], messages: Message[]) {
    this.id = id;
    this.users = users;
    this.messages = messages;
  }
}
export const chatConverter = {
  toFirestore: (chat: Chat) => {
    return {
      id: chat.id,
      users: chat.users,
      messages: chat.messages,
    };
  },
  fromFirestore: (
    snapshot: QueryDocumentSnapshot<Chat>,
    options: SnapshotOptions
  ) => {
    const data = snapshot.data(options);
    return new Chat(data.id, data.users, data.messages);
  },
};
