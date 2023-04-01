import { QueryDocumentSnapshot, SnapshotOptions } from "firebase/firestore";

export class Message {
  sentAt: Date;
  text: string;
  uid: string;
  constructor(sentAt: Date, text: string, uid: string) {
    this.sentAt = sentAt;
    this.text = text;
    this.uid = uid;
  }
}

export const messageConverter = {
  toFirestore: (message: Message) => {
    return {
      sentAt: message.sentAt,
      text: message.text,
      uid: message.uid,
    };
  },
  fromFirestore: (
    snapshot: QueryDocumentSnapshot<Message>,
    options: SnapshotOptions
  ) => {
    const data = snapshot.data(options);
    return new Message(data.sentAt, data.text, data.uid);
  },
};
