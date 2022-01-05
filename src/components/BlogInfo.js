import { doc, getDoc, getFirestore } from 'firebase/firestore';
import { useEffect, useState } from 'react';

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

    return (
        <div>
            <img src={profilePhotoURL} alt={`${blogName}'s profile`} />
            <span>{blogName}</span>
            {!isFollowed && <span>Follow</span>}
        </div>
    );
}

export default BlogInfo;
