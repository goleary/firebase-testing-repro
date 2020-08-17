"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.helloWorld = void 0;
const functions = require("firebase-functions");
const firebase = require("firebase-admin");
// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript
class Post {
    constructor(title, author) {
        this.title = title;
        this.author = author;
    }
    toString() {
        return this.title + ", by " + this.author;
    }
}
const postConverter = {
    toFirestore(post) {
        return { title: post.title, author: post.author };
    },
    fromFirestore(snapshot) {
        const data = snapshot.data();
        return new Post(data.title, data.author);
    },
};
exports.helloWorld = functions.https.onRequest(async (request, response) => {
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
});
//# sourceMappingURL=index.js.map