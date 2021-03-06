import {
    arrayRemove,
    arrayUnion,
    doc,
    getDoc,
    getFirestore,
    updateDoc,
} from 'firebase/firestore';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import styled from 'styled-components';
import { getReblogs, getPostLikes } from '../firestore-posts';
import BlogInfo from './BlogInfo';
import Notes from './Notes';
import PostPreview from './PostPreview';

const StyledPost = styled(Post)`
    background-color: white;
    width: 100vw;
    color: black;
    max-width: 540px;
    padding: 15px 20px;
    font-family: 'Helvetica Neue', sans-serif;
    margin: 0 auto 10px auto;
    text-align: left;
`;

const PostFooter = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 25px;
`;

const Button = styled.button`
    background: none;
    border: none;
    margin-left: ${(props) => (props.notes ? '0' : '15px')};
    font-family: Helvetica Neue;
    font-size: 16px;
    font-weight: 700;
    color: rgba(0, 0, 0, 0.65);
`;

const TagsContainer = styled.div`
    a {
        text-decoration: none;
    }
`;

const PostTag = styled.span`
    color: rgba(0, 0, 0, 0.65);
    margin-right: 11px;
`;

const PostContent = styled.div`
    margin: 15px 0;
`;

function Post(props) {
    const {
        className,
        post,
        currentUser,
        followUser,
        isFollowed,
        followedUsers,
    } = props;
    const [author, setAuthor] = useState('loading');
    const [likes, setLikes] = useState([]);
    const [postReblogs, setPostReblogs] = useState([]);
    const [showNotes, setShowNotes] = useState(false);
    const doesCurrentUserLike = likes.includes(currentUser.uid);

    useEffect(() => {
        getPostAuthor().then((postAuthor) => setAuthor(postAuthor));

        async function getPostAuthor() {
            const db = getFirestore();
            const postAuthor = await getDoc(doc(db, `users/${post.authorId}`));
            return postAuthor.data();
        }
    }, [post.authorId]);

    useEffect(() => {
        getPostLikes(post.id).then((result) => setLikes(result));
    }, [post.id]);

    useEffect(() => {
        getReblogs(post).then((allReblogs) => setPostReblogs(allReblogs));
    }, [post]);

    function toggleLikePost() {
        const db = getFirestore();

        if (likes.includes(currentUser.uid)) {
            updateDoc(doc(db, 'users', currentUser.uid), {
                likes: arrayRemove(post.id),
            });

            setLikes((prevState) => {
                const newState = [...prevState];
                const unlikeIndex = newState.indexOf(currentUser.uid);
                newState.splice(unlikeIndex, 1);
                return newState;
            });
        } else {
            updateDoc(doc(db, 'users', currentUser.uid), {
                likes: arrayUnion(post.id),
            });

            setLikes((prevState) => [...prevState, currentUser.uid]);
        }
    }

    if (currentUser === null) return;
    if (author === 'loading') return <div>Loading...</div>;

    return (
        <article className={className}>
            <BlogInfo
                blogName={author.blogName}
                profilePhotoURL={author.photoURL}
                userId={author.id}
                followUser={followUser}
                isFollowed={isFollowed}
            />
            {post.isReblog && (
                <PostPreview
                    postId={post.originalPostId}
                    followUser={followUser}
                    isFollowed={isFollowed}
                />
            )}
            <PostContent>{post.content}</PostContent>
            <TagsContainer>
                {post.tags &&
                    post.tags.map((tag) => (
                        <Link to={`/search/${tag}`} key={tag}>
                            <PostTag>#{tag}</PostTag>{' '}
                        </Link>
                    ))}
            </TagsContainer>
            <PostFooter>
                <Button
                    notes
                    onClick={() => setShowNotes((prevState) => !prevState)}
                >
                    <span>{likes.length + postReblogs.length} notes</span>
                </Button>
                <div>
                    <Link to={`/reblog/${post.id}`}>
                        <Button>
                            <svg
                                role="img"
                                viewBox="0 0 17 18.1"
                                width="21"
                                height="21"
                                fill="rgba(0, 0, 0, 0.65)"
                            >
                                <path d="M12.8.2c-.4-.4-.8-.2-.8.4v2H2c-2 0-2 2-2 2v5s0 1 1 1 1-1 1-1v-4c0-1 .5-1 1-1h9v2c0 .6.3.7.8.4L17 3.6 12.8.2zM4.2 17.9c.5.4.8.2.8-.3v-2h10c2 0 2-2 2-2v-5s0-1-1-1-1 1-1 1v4c0 1-.5 1-1 1H5v-2c0-.6-.3-.7-.8-.4L0 14.6l4.2 3.3z"></path>
                            </svg>
                        </Button>
                    </Link>
                    <Button onClick={toggleLikePost}>
                        <svg
                            role="img"
                            width="23"
                            height="21"
                            viewBox="0 0 20 18"
                            fill={
                                doesCurrentUserLike
                                    ? '#ff4930'
                                    : 'rgba(0, 0, 0, 0.65)'
                            }
                        >
                            {doesCurrentUserLike ? (
                                <path d="M17.888 1.1C16.953.38 15.87 0 14.758 0c-1.6 0-3.162.76-4.402 2.139-.098.109-.217.249-.358.42a12.862 12.862 0 0 0-.36-.421C8.4.758 6.84 0 5.248 0 4.14 0 3.06.381 2.125 1.1-.608 3.201-.44 6.925 1.14 9.516c2.186 3.59 6.653 7.301 7.526 8.009.38.307.851.474 1.333.474a2.12 2.12 0 0 0 1.332-.473c.873-.71 5.34-4.42 7.526-8.01 1.581-2.597 1.755-6.321-.968-8.418"></path>
                            ) : (
                                <path d="M14.658 0c-1.625 0-3.21.767-4.463 2.156-.06.064-.127.138-.197.225-.074-.085-.137-.159-.196-.225C8.547.766 6.966 0 5.35 0 4.215 0 3.114.387 2.162 1.117c-2.773 2.13-2.611 5.89-1.017 8.5 2.158 3.535 6.556 7.18 7.416 7.875A2.3 2.3 0 0 0 9.998 18c.519 0 1.028-.18 1.436-.508.859-.695 5.257-4.34 7.416-7.875 1.595-2.616 1.765-6.376-1-8.5C16.895.387 15.792 0 14.657 0h.001zm0 2.124c.645 0 1.298.208 1.916.683 1.903 1.461 1.457 4.099.484 5.695-1.973 3.23-6.16 6.7-6.94 7.331a.191.191 0 0 1-.241 0c-.779-.631-4.966-4.101-6.94-7.332-.972-1.595-1.4-4.233.5-5.694.619-.475 1.27-.683 1.911-.683 1.064 0 2.095.574 2.898 1.461.495.549 1.658 2.082 1.753 2.203.095-.12 1.259-1.654 1.752-2.203.8-.887 1.842-1.461 2.908-1.461h-.001z"></path>
                            )}
                        </svg>
                    </Button>
                </div>
            </PostFooter>
            {showNotes && (
                <Notes
                    reblogs={postReblogs}
                    likes={likes}
                    currentUser={currentUser}
                    followedUsers={followedUsers}
                />
            )}
        </article>
    );
}

export default StyledPost;
