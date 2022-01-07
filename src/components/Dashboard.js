import { collection, getDocs, getFirestore } from 'firebase/firestore';
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

            // get doc of following in user id.

            //const followingQ = query(collection(db, 'users')
            //const q = query(collection(db, 'users'), where('id', 'in', ))

            // get own posts
            const ownPostsSnapshot = await getDocs(
                collection(db, `users/${currentUserId}/posts`)
            );

            const ownPosts = [];
            ownPostsSnapshot.forEach((doc) => ownPosts.push(doc.data()));

            return ownPosts;
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
