import { doc, getDoc, getFirestore } from 'firebase/firestore';
import { useEffect } from 'react';
import { useState } from 'react/cjs/react.development';
import styled from 'styled-components';
import BlogInfo from './BlogInfo';

const StyledPost = styled(Post)`
    background-color: white;
    width: 100vw;
    color: black;
    max-width: 540px;
    padding: 10px;
    font-family: 'Helvetica Neue', sans-serif;
    margin-bottom: 10px;
`;

function Post(props) {
    const { className, post, currentUser } = props;
    const [author, setAuthor] = useState('loading');

    useEffect(() => {
        getPostAuthor().then((postAuthor) => setAuthor(postAuthor));

        async function getPostAuthor() {
            const db = getFirestore();
            const postAuthor = await getDoc(doc(db, `users/${post.authorId}`));
            return postAuthor.data();
        }
    }, [post.authorId]);

    if (author === 'loading') return <div>Loading...</div>;

    return (
        <article className={className}>
            <BlogInfo
                blogName={author.blogName}
                profilePhotoURL={author.photoURL}
                userId={author.id}
                currentUserId={currentUser.uid}
            />
            <div>{post.content}</div>
            <div>
                {post.tags &&
                    post.tags.map((tag) => <span key={tag}>#{tag}</span>)}
            </div>
            <div>like, reblog, etc</div>
        </article>
    );
}

export default StyledPost;
