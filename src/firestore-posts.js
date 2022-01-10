import {
    getFirestore,
    query,
    collectionGroup,
    where,
    getDocs,
    collection,
    getDoc,
    doc,
} from 'firebase/firestore';
// eslint-disable-next-line no-unused-vars
import app from './firebase';

const db = getFirestore();

export async function getPostById(id) {
    const postQ = query(collectionGroup(db, 'posts'), where('id', '==', id));

    const postSnapshot = await getDocs(postQ);
    let post;
    postSnapshot.forEach((desiredPost) => (post = desiredPost.data()));
    return post;
}

export async function getReblogs(post) {
    const db = getFirestore();
    // use this post's ID
    const originalPost = await getFirstOriginalPost();

    const originalPostReblogs = await getAllReblogsOfPost(originalPost);
    const allReblogs = [...originalPostReblogs];
    getAllReblogsOfSeveralPosts(originalPostReblogs);
    return allReblogs;

    async function getFirstOriginalPost() {
        let currentPost = post;

        while (currentPost.originalPostId) {
            currentPost = await getPostById(currentPost.originalPostId);
        }

        return currentPost;
    }

    // check for every post that uses that post as a reblog
    async function getAllReblogsOfPost(post) {
        const q = query(
            collectionGroup(db, 'posts'),
            where('originalPostId', '==', post.id)
        );
        const reblogsSnapshot = await getDocs(q);

        const reblogs = [];
        reblogsSnapshot.forEach((reblog) => reblogs.push(reblog.data()));
        return reblogs;
    }

    async function getAllReblogsOfSeveralPosts(posts) {
        for (let i = 0; i < posts.length; i++) {
            const moreReblogs = await getAllReblogsOfPost(posts[i]);
            if (moreReblogs[0]) allReblogs.push(...moreReblogs);

            // loop thru more reblogs and get all reblogged posts of them
            for (let j = 0; j < moreReblogs.length; j++) {
                await getAllReblogsOfSeveralPosts(moreReblogs);
            }
        }
    }
}

export async function getPostLikes(postId) {
    const db = getFirestore();

    const likesQ = query(
        collection(db, 'users'),
        where('likes', 'array-contains', postId)
    );

    const likesSnapshot = await getDocs(likesQ);
    const postLikes = [];
    likesSnapshot.forEach((userThatLiked) =>
        postLikes.push(userThatLiked.data().id)
    );
    return postLikes;
}

export async function getUserById(id) {
    const db = getFirestore();
    const user = await getDoc(doc(db, 'users', id));
    return user.data();
}
