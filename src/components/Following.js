import {
    arrayRemove,
    collection,
    getDocs,
    getFirestore,
    query,
    updateDoc,
    where,
    doc,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import BlogInfo from './BlogInfo';
import styled from 'styled-components';

const FollowingContainer = styled.main`
    margin-top: 44px;
    color: white;
`;

const FollowedUsersContainer = styled.section`
    background-color: white;

    div {
        padding: 5px;
        display: flex;
        justify-content: space-between;
    }

    button {
        background: none;
        border: none;
        color: #00b8ff;
        font-weight: bold;
    }
`;

function Following(props) {
    const { currentUser, followedUsers } = props;
    const [followedUsersInfo, setFollowedUsersInfo] = useState([]);

    useEffect(() => {
        if (followedUsers.length === 0) return;

        getFollowedUsers().then((users) => setFollowedUsersInfo(users));

        async function getFollowedUsers() {
            const db = getFirestore();

            const followingQ = query(
                collection(db, 'users'),
                where('id', 'in', followedUsers)
            );
            const followingSnapshot = await getDocs(followingQ);
            const followed = [];
            followingSnapshot.forEach((followedUser) =>
                followed.push(followedUser.data())
            );
            return followed;
        }
    }, [followedUsers]);

    function unfollowUser(userToUnfollow) {
        const db = getFirestore();
        const currentUserId = currentUser.uid;
        updateDoc(doc(db, 'users', currentUserId), {
            following: arrayRemove(userToUnfollow.id),
        });

        setFollowedUsersInfo((prevState) => {
            const newState = [...prevState];
            const unfollowIndex = newState.indexOf(userToUnfollow);
            newState.splice(unfollowIndex, 1);
            return newState;
        });
    }

    return (
        <FollowingContainer>
            <h2>{followedUsersInfo.length} Following</h2>
            <FollowedUsersContainer>
                {followedUsersInfo.map((user) => (
                    <div key={user.id}>
                        <BlogInfo
                            blogName={user.blogName}
                            profilePhotoURL={user.photoURL}
                            userId={user.id}
                            currentUserId={currentUser.uid}
                            isFollowed={true}
                        />
                        {user.id !== currentUser.uid && (
                            <button onClick={() => unfollowUser(user)}>
                                Unfollow
                            </button>
                        )}
                    </div>
                ))}
            </FollowedUsersContainer>
        </FollowingContainer>
    );
}

export default Following;
