import BlogInfo from './BlogInfo';
import { useEffect, useState } from 'react';
import { getFirestore, getDoc, doc } from 'firebase/firestore';
import styled from 'styled-components';
import { getPostById } from '../firestore-posts';

const PostPreviewContainer = styled.article`
    padding: 10px;
    border: 1px solid #e2e2e2;
    margin: 8px;
    border-radius: 2px;
`;

function PostPreview(props) {
    const { postId, isNote, followUser, isFollowed } = props;
    const [author, setAuthor] = useState('loading');

    const [post, setPost] = useState('loading');

    useEffect(() => {
        getPostById(postId).then((post) => {
            setPost(post);
            getPostAuthor(post).then((postAuthor) => setAuthor(postAuthor));
        });

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
            {post.originalPostId && !isNote && (
                <PostPreview
                    postId={post.originalPostId}
                    followUser={followUser}
                    isFollowed={isFollowed}
                />
            )}
            <PostPreviewContainer>
                <BlogInfo
                    blogName={author.blogName}
                    profilePhotoURL={author.photoURL}
                    userId={author.id}
                    followUser={followUser}
                    isFollowed={isFollowed}
                />
                <div>{post.content}</div>
            </PostPreviewContainer>
        </section>
    );
}

export default PostPreview;
