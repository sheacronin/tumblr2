import {
    collectionGroup,
    doc,
    getDoc,
    getDocs,
    getFirestore,
    query,
    where,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import StyledPost from './Post';

const PostsContainer = styled.main`
    margin-top: 40px;
`;

function Dashboard(props) {
    const { currentUser } = props;

    const [dashboardPosts, setDashboardPosts] = useState([]);

    useEffect(() => {
        getDashboardPosts().then((posts) => setDashboardPosts(posts));

        async function getDashboardPosts() {
            if (currentUser === null) return [];

            const db = getFirestore();

            const currentUserId = currentUser.uid;
            const currentUserInfo = await getDoc(
                doc(db, 'users', currentUserId)
            );
            const followedIds = currentUserInfo.data().following;

            const followedPosts = query(
                collectionGroup(db, 'posts'),
                where('authorId', 'in', followedIds)
            );
            const querySnapshot = await getDocs(followedPosts);

            const posts = [];
            querySnapshot.forEach((post) => posts.push(post.data()));

            return posts;
        }
    }, [currentUser]);

    return (
        <section>
            <PostsContainer>
                {dashboardPosts.map((post) => (
                    <StyledPost
                        key={post.id}
                        post={post}
                        currentUser={currentUser}
                    />
                ))}
            </PostsContainer>
        </section>
    );
}

export default Dashboard;
