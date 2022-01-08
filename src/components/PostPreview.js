import BlogInfo from './BlogInfo';
import { useEffect, useState } from 'react';
import { getFirestore, getDoc, doc } from 'firebase/firestore';
import styled from 'styled-components';

const PostPreviewContainer = styled.article`
    padding: 10px;
    border: 1px solid #e2e2e2;
    margin: 8px;
    border-radius: 2px;
`;

function PostPreview(props) {
    const { currentUser, post } = props;
    const [author, setAuthor] = useState('loading');

    useEffect(() => {
        getPostAuthor().then((postAuthor) => setAuthor(postAuthor));

        async function getPostAuthor() {
            const db = getFirestore();
            const postAuthor = await getDoc(doc(db, `users/${post.authorId}`));
            return postAuthor.data();
        }
    }, [post]);

    if (author === 'loading') return <div>Loading...</div>;

    return (
        <PostPreviewContainer>
            <BlogInfo
                blogName={author.blogName}
                profilePhotoURL={author.photoURL}
                userId={author.id}
                currentUserId={currentUser.uid}
            />
            <div>{post.content}</div>
        </PostPreviewContainer>
    );
}

export default PostPreview;
