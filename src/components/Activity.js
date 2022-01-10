import { getFirestore, getDocs, collection } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getPostLikes, getReblogs, getUserById } from '../firestore-posts';
import uniqid from 'uniqid';

const ActivityContainer = styled.main`
    margin-top: 44px;
`;

const Note = styled.article`
    background-color: white;
    text-align: center;
    padding: 15px 0;
    border-bottom: 1px solid grey;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    max-width: 625px;
    margin: 0 auto;
`;

const ImageContainer = styled.div`
    position: relative;
    margin: 0 15px;

    img {
        height: 25px;
        width: 25px;
        border-radius: 5px;
    }

    svg {
        position: absolute;
        right: -5px;
        bottom: 0;
    }
`;

function Activity(props) {
    const { currentUser } = props;
    const [activity, setActivity] = useState([]);

    useEffect(() => {
        getActivity().then((result) => setActivity(result));

        async function getActivity() {
            if (currentUser === null) return [];

            const db = getFirestore();
            const currentUserId = currentUser.uid;
            const currentUserPostsSnapshot = await getDocs(
                collection(db, `users/${currentUserId}/posts`)
            );

            const currentUserPosts = [];
            currentUserPostsSnapshot.forEach((post) =>
                currentUserPosts.push(post.data())
            );

            const postActivity = [];
            for (let i = 0; i < currentUserPosts.length; i++) {
                const thisPost = currentUserPosts[i];

                const rebloggers = [];
                const reblogs = await getReblogs(thisPost);
                for (let j = 0; j < reblogs.length; j++) {
                    const user = await getUserById(reblogs[j].authorId);
                    rebloggers.push(user);
                }

                const likers = [];
                const likerIds = await getPostLikes(thisPost.id);
                for (let j = 0; j < likerIds.length; j++) {
                    const user = await getUserById(likerIds[j]);
                    likers.push(user);
                }

                postActivity.push({
                    post: thisPost,
                    rebloggers: rebloggers,
                    likers: likers,
                });
            }
            return postActivity;
        }
    }, [currentUser]);

    const notes = [];
    activity.forEach((note) => {
        note.rebloggers.forEach((reblog) => {
            notes.push(
                <Note key={uniqid()}>
                    <ImageContainer>
                        <img
                            src={reblog.photoURL}
                            alt={`${reblog.blogName}'s profile`}
                        />
                        <svg
                            viewBox="0 0 16 16"
                            width="14"
                            height="14"
                            fill="#00cf35"
                        >
                            <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"></path>
                            <path
                                fill="#ffffff"
                                d="M10.5 7.05c-.344.227-.5 0-.5-.23V5.75H5.593A.594.594 0 0 0 5 6.343v1.324a.625.625 0 0 1-1.25 0V6.343c0-1.016.827-1.843 1.843-1.843H10V3.32c0-.27.315-.398.5-.27s2 2 2 2l-2 2zM6 10.542h4.406A.594.594 0 0 0 11 9.949V8.625a.625.625 0 0 1 1.25 0V9.95a1.845 1.845 0 0 1-1.844 1.843H6v1.032s-.057.498-.5.208l-2-1.978 2-2c.173-.138.5 0 .5.286v1.202z"
                            ></path>
                        </svg>
                    </ImageContainer>
                    <span>
                        {reblog.blogName} reblogged your post "
                        {note.post.content}"
                    </span>
                </Note>
            );
        });
        note.likers.forEach((like) => {
            notes.push(
                <Note key={uniqid()}>
                    <ImageContainer>
                        <img
                            src={like.photoURL}
                            alt={`${like.blogName}'s profile`}
                        />
                        <svg
                            viewBox="0 0 16 16"
                            width="14"
                            height="14"
                            fill="#ff4930"
                        >
                            <circle cx="8" cy="8" r="8"></circle>
                            <path
                                fill="#ffffff"
                                d="M9.903 4.5c-.64 0-1.265.316-1.76.89a5.38 5.38 0 0 0-.144.175 6.11 6.11 0 0 0-.144-.174C7.36 4.816 6.735 4.5 6.1 4.5a1.99 1.99 0 0 0-1.25.458c-1.092.876-1.025 2.428-.394 3.507.875 1.496 2.662 3.043 3.011 3.337.151.128.34.198.533.198.192 0 .382-.07.533-.197.35-.295 2.136-1.842 3.01-3.338.633-1.081.703-2.633-.387-3.507A1.991 1.991 0 0 0 9.903 4.5z"
                            ></path>
                        </svg>
                    </ImageContainer>
                    <span>
                        {like.blogName} liked your post "{note.post.content}"
                    </span>
                </Note>
            );
        });
    });

    return <ActivityContainer>{notes}</ActivityContainer>;
}

export default Activity;
