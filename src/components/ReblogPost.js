import {
    getDocs,
    getFirestore,
    query,
    collectionGroup,
    where,
} from 'firebase/firestore';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react/cjs/react.development';
import NewPost from './NewPost';
import { useState } from 'react';

function ReblogPost(props) {
    const { originalPostId } = useParams();
    const { currentUser } = props;

    const [originalPost, setOriginalPost] = useState('loading');

    useEffect(() => {
        getOriginalPost().then((post) => setOriginalPost(post));
    });

    async function getOriginalPost() {
        const db = getFirestore();

        const originalPostQ = query(
            collectionGroup(db, 'posts'),
            where('id', '==', originalPostId)
        );

        const originalPostSnapshot = await getDocs(originalPostQ);
        let op;
        originalPostSnapshot.forEach((post) => (op = post.data()));
        return op;
    }

    return (
        <NewPost
            currentUser={currentUser}
            isReblog={true}
            originalPost={originalPost}
        />
    );
}

export default ReblogPost;
