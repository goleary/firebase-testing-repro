import * as functions from "firebase-functions";
import * as firebase from "firebase-admin";

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

class Post {
  constructor(readonly title: string, readonly author: string) {}

  toString(): string {
    return this.title + ", by " + this.author;
  }
}
const postConverter: FirebaseFirestore.FirestoreDataConverter<Post> = {
  toFirestore(post: Post): firebase.firestore.DocumentData {
    return { title: post.title, author: post.author };
  },
  fromFirestore(snapshot: firebase.firestore.QueryDocumentSnapshot): Post {
    const data = snapshot.data()!;
    return new Post(data.title, data.author);
  },
};

export const helloWorld = functions.https.onRequest(
  async (request, response) => {
    functions.logger.info("Hello logs!", { structuredData: true });
    response.send("Hello from Firebase!");

    const postSnap = await firebase
      .firestore()
      .collection("posts")
      .withConverter(postConverter)
      .doc()
      .get();
    const post = postSnap.data();
    if (post !== undefined) {
      post.title; // string
      post.toString(); // Should be defined
    }
  }
);
