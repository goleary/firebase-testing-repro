import * as firebase from "firebase";

class Post {
  constructor(readonly title: string, readonly author: string) {}

  toString(): string {
    return this.title + ", by " + this.author;
  }
}
export const postConverter: firebase.firestore.FirestoreDataConverter<Post> = {
  toFirestore(post: Post): firebase.firestore.DocumentData {
    return { title: post.title, author: post.author };
  },
  fromFirestore(snapshot: firebase.firestore.QueryDocumentSnapshot): Post {
    const data = snapshot.data()!;
    return new Post(data.title, data.author);
  },
};
