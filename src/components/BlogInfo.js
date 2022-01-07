import {
    arrayUnion,
    doc,
    getDoc,
    getFirestore,
    updateDoc,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const FollowButton = styled.button`
    color: #00b8ff;
    margin-left: 7px;
    background: none;
    border: none;
`;

const PostProfilePhoto = styled.img`
    width: 38px;
    height: 38px;
    border-radius: 3px;
`;

function BlogInfo(props) {
    const { blogName, profilePhotoURL, userId, currentUserId } = props;

    const [isFollowed, setIsFollowed] = useState(false);

    useEffect(() => {
        isCurrentUserFollowing().then((result) => setIsFollowed(result));

        async function isCurrentUserFollowing() {
            const db = getFirestore();
            const userInfo = await getDoc(doc(db, `users/${currentUserId}`));

            const followedIds = userInfo.data().following;

            return followedIds.includes(userId);
        }
    }, [currentUserId, userId]);

    async function followUser() {
        const db = getFirestore();
        updateDoc(doc(db, `users/${currentUserId}`), {
            followedIds: arrayUnion(userId),
        });
    }

    return (
        <div>
            <Link to={`/blog/${blogName}`}>
                <PostProfilePhoto
                    src={profilePhotoURL}
                    alt={`${blogName}'s profile`}
                />
                <span>{blogName}</span>
            </Link>
            {!isFollowed && (
                <FollowButton onClick={followUser}>Follow</FollowButton>
            )}
        </div>
    );
}

export default BlogInfo;
