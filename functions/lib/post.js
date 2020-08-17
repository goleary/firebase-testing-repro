"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postConverter = void 0;
class Post {
    constructor(title, author) {
        this.title = title;
        this.author = author;
    }
    toString() {
        return this.title + ", by " + this.author;
    }
}
exports.postConverter = {
    toFirestore(post) {
        return { title: post.title, author: post.author };
    },
    fromFirestore(snapshot) {
        const data = snapshot.data();
        return new Post(data.title, data.author);
    },
};
//# sourceMappingURL=post.js.map