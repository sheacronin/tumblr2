import { collection, getDocs, getFirestore } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import StyledPost from './Post';

const PostsContainer = styled.main`
    margin-top: 44px;
`;

function Explore(props) {
    const { currentUser } = props;

    const [explorePosts, setExplorePosts] = useState([]);

    useEffect(() => {
        getAllPosts().then((posts) => setExplorePosts(posts));

        const userIds = [];

        async function getAllPosts() {
            const db = getFirestore();
            const users = await getDocs(collection(db, 'users'));
            users.forEach((doc) => userIds.push(doc.data().id));

            const posts = [];

            for (let i = 0; i < userIds.length; i++) {
                const postsSnapshot = await getDocs(
                    collection(db, `users/${userIds[i]}/posts`)
                );

                postsSnapshot.forEach((post) => {
                    posts.push(post.data());
                });
            }

            console.log(posts);

            return posts;
        }
    }, []);

    return (
        <PostsContainer>
            {explorePosts.map((post) => (
                <StyledPost
                    post={post}
                    currentUser={currentUser}
                    key={post.id}
                />
            ))}
        </PostsContainer>
    );
}

export default Explore;
