import {
    collection,
    getDocs,
    getFirestore,
    getDoc,
    doc,
    updateDoc,
    arrayUnion,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import StyledPost from './Post';

const PostsContainer = styled.main`
    margin-top: 44px;
`;

function Explore(props) {
    const { currentUser } = props;

    const [explorePosts, setExplorePosts] = useState([]);
    const [followedUsers, setFollowedUsers] = useState([]);

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

    useEffect(() => {
        getFollowedUsers().then((result) => setFollowedUsers(result));

        async function getFollowedUsers() {
            if (currentUser === null) return;

            const db = getFirestore();
            const userInfo = await getDoc(doc(db, `users/${currentUser.uid}`));

            const followedIds = userInfo.data().following;

            return followedIds;
        }
    }, [currentUser]);

    async function followUser(id) {
        const db = getFirestore();
        updateDoc(doc(db, `users/${currentUser.uid}`), {
            following: arrayUnion(id),
        });
        setFollowedUsers((prevState) => [...prevState, id]);
    }

    return (
        <PostsContainer>
            {explorePosts.map((post) => (
                <StyledPost
                    post={post}
                    currentUser={currentUser}
                    key={post.id}
                    isFollowed={followedUsers.includes(post.authorId)}
                    followUser={followUser}
                />
            ))}
        </PostsContainer>
    );
}

export default Explore;
