import * as functions from "firebase-functions";
import * as firebase from "firebase-admin";

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

import { postConverter } from "./post";

export const helloWorld = functions.https.onRequest(
  async (request, response) => {
    functions.logger.info("Hello logs!", { structuredData: true });
    response.send("Hello from Firebase!");

    const postSnap = await firebase
      .firestore()
      .collection("posts")
      .withConverter(postConverter) // This line result in an error
      .doc()
      .get();
    const post = postSnap.data();
    if (post !== undefined) {
      post.title; // string
      post.toString(); // Should be defined
    }
  }
);
