import {
    collectionGroup,
    getDocs,
    getFirestore,
    query,
    where,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import StyledPost from './Post';

const PostsContainer = styled.main`
    margin-top: 44px;
`;

function Search(props) {
    const { currentUser, followedUsers, followUser } = props;
    const { tag } = useParams();

    const [searchPosts, setSearchPosts] = useState([]);

    useEffect(() => {
        getTaggedPosts().then((posts) => setSearchPosts(posts));

        async function getTaggedPosts() {
            const db = getFirestore();

            const q = query(
                collectionGroup(db, 'posts'),
                where('tags', 'array-contains', tag)
            );

            const postsWithTag = await getDocs(q);
            const posts = [];
            postsWithTag.forEach((post) => posts.push(post.data()));

            return posts;
        }
    }, [tag]);

    if (currentUser === null) return null;

    return (
        <PostsContainer>
            {searchPosts.map((post) => (
                <StyledPost
                    post={post}
                    currentUser={currentUser}
                    key={post.id}
                    isFollowed={followedUsers.includes(post.authorId)}
                    followUser={followUser}
                    followedUsers={followedUsers}
                />
            ))}
        </PostsContainer>
    );
}

export default Search;
