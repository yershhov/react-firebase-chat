import { QueryDocumentSnapshot, SnapshotOptions } from "firebase/firestore";

export class UserEntity {
  uid: string;
  email: string;

  constructor(uid: string, email: string) {
    this.uid = uid;
    this.email = email;
  }
}

export const userConverter = {
  toFirestore: (user: UserEntity) => {
    return {
      uid: user.uid,
      email: user.email,
    };
  },
  fromFirestore: (
    snapshot: QueryDocumentSnapshot<UserEntity>,
    options: SnapshotOptions
  ) => {
    const data = snapshot.data(options);
    return new UserEntity(data.uid, data.email);
  },
};
