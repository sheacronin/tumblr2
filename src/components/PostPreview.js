import BlogInfo from './BlogInfo';
import { useEffect, useState } from 'react';
import {
    getFirestore,
    getDoc,
    doc,
    collectionGroup,
    query,
    where,
    getDocs,
} from 'firebase/firestore';
import styled from 'styled-components';

const PostPreviewContainer = styled.article`
    padding: 10px;
    border: 1px solid #e2e2e2;
    margin: 8px;
    border-radius: 2px;
`;

function PostPreview(props) {
    const { currentUser, postId } = props;
    const [author, setAuthor] = useState('loading');

    const [post, setPost] = useState('loading');

    useEffect(() => {
        getPost().then((post) => {
            setPost(post);
            getPostAuthor(post).then((postAuthor) => setAuthor(postAuthor));
        });

        async function getPost() {
            const db = getFirestore();

            const postQ = query(
                collectionGroup(db, 'posts'),
                where('id', '==', postId)
            );

            const postSnapshot = await getDocs(postQ);
            let op;
            postSnapshot.forEach((thisPost) => (op = thisPost.data()));
            return op;
        }

        async function getPostAuthor(post) {
            const db = getFirestore();
            const postAuthor = await getDoc(doc(db, `users/${post.authorId}`));
            return postAuthor.data();
        }
    }, [postId]);

    if (author === 'loading' || post === 'loading')
        return <div>Loading...</div>;

    return (
        <section>
            {post.originalPostId && (
                <PostPreview
                    currentUser={currentUser}
                    postId={post.originalPostId}
                />
            )}
            <PostPreviewContainer>
                <BlogInfo
                    blogName={author.blogName}
                    profilePhotoURL={author.photoURL}
                    userId={author.id}
                    currentUserId={currentUser.uid}
                />
                <div>{post.content}</div>
            </PostPreviewContainer>
        </section>
    );
}

export default PostPreview;
