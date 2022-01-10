import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { getPostById } from '../firestore-posts';
import StyledPost from './Post';

const PostsContainer = styled.main`
    margin-top: 40px;
`;

function Likes(props) {
    const { currentUser, followedUsers, followUser } = props;
    const [likedPosts, setLikedPosts] = useState([]);

    useEffect(() => {
        getLikedPosts().then((posts) => setLikedPosts(posts));

        async function getLikedPosts() {
            if (currentUser === null) return [];

            const db = getFirestore();
            const currentUserId = currentUser.uid;
            const currentUserInfo = await getDoc(
                doc(db, 'users', currentUserId)
            );

            const likes = currentUserInfo.data().likes;
            const posts = [];
            for (let i = 0; i < likes.length; i++) {
                const likedPost = await getPostById(likes[i]);
                posts.push(likedPost);
            }
            return posts;
        }
    }, [currentUser]);

    return (
        <PostsContainer>
            {likedPosts.map((post) => (
                <StyledPost
                    key={post.id}
                    post={post}
                    currentUser={currentUser}
                    isFollowed={followedUsers.includes(post.authorId)}
                    followUser={followUser}
                />
            ))}
        </PostsContainer>
    );
}

export default Likes;
