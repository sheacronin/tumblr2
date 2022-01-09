import {
    getFirestore,
    query,
    collectionGroup,
    where,
    getDocs,
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
