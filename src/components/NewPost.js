import { useState } from 'react';
import styled from 'styled-components';
import BlogInfo from './BlogInfo';
import { getFirestore, setDoc, doc } from 'firebase/firestore';
import uniqid from 'uniqid';
import Tag from './Tag';
import { Link, useNavigate } from 'react-router-dom';
import PostPreview from './PostPreview';

const NewPostContainer = styled.div`
    background-color: white;
    margin: 44px auto 0 auto;
    height: 375px;
    width: 100vw;
    max-width: 700px;
    position: relative;

    img {
        margin-left: 10px;
    }
`;

const PostButtonsContainer = styled.div`
    display: flex;
    justify-content: space-between;
`;

const CloseButton = styled.button`
    background-color: transparent;
    height: 40px;
    width: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
`;

const PostButton = styled.button`
    border: none;
    border-radius: 3px;
    background-color: #00b8ff;
    color: white;
    margin-right: 8px;
    margin-top: 8px;
    min-width: 84px;
`;

const PostTextarea = styled.textarea`
    width: 100%;
    border: none;
    font-family: Helvetica Neue;
    font-size: 16px;
    padding: 20px;
    height: 60%;
`;

const TagsInput = styled.input`
    border: none;
    height: 40px;
    font-family: Helvetica Neue;
    font-size: 16px;
`;

const TagsList = styled.ul`
    position: absolute;
    left: 0;
    display: flex;
    list-style-type: none;
    align-items: center;
    width: 100vw;
    flex-wrap: wrap;
    padding-bottom: 20px;
    background-color: white;

    li {
        flex-shrink: 0;
        margin-left: 15px;
    }
`;

function NewPost(props) {
    const [postContent, setPostContent] = useState('');
    const [postTags, setPostTags] = useState([]);
    const [currentTag, setCurrentTag] = useState('');
    const { currentUser, isReblog, originalPostId } = props;

    function onPostContentChanged(e) {
        setPostContent(e.target.value);
    }

    function onCurrentTagChanged(e) {
        setCurrentTag(e.target.value);
    }

    const navigate = useNavigate();

    async function onPostButtonClicked() {
        const db = getFirestore();

        const postId = uniqid();
        await setDoc(doc(db, `users/${currentUser.uid}/posts/${postId}`), {
            content: postContent,
            authorId: currentUser.uid,
            id: postId,
            tags: postTags,
            isReblog: !!isReblog,
            originalPostId: originalPostId || null,
        });

        navigate('/dashboard');
    }

    function onTagsKeyDown(e) {
        if (e.key === 'Enter') {
            if (postTags.includes(currentTag)) return;
            setPostTags((prevState) => [...prevState, currentTag]);
            setCurrentTag('');
        }
    }

    function removeTag(tag) {
        setPostTags((prevState) => {
            const newState = [...prevState];
            const tagIndex = newState.indexOf(tag);
            newState.splice(tagIndex, 1);
            return newState;
        });
    }

    return (
        <NewPostContainer>
            <PostButtonsContainer>
                <Link to="/dashboard">
                    <CloseButton>
                        <svg
                            viewBox="0 0 16 16"
                            width="14"
                            height="14"
                            fill="RGB(var(--black))"
                        >
                            <path d="M9.527 8l6.164-6.188a1.066 1.066 0 0 0 0-1.5 1.053 1.053 0 0 0-1.495 0L8 6.531 1.805.311a1.053 1.053 0 0 0-1.495 0 1.064 1.064 0 0 0 0 1.5L6.473 8 .31 14.188a1.064 1.064 0 0 0 0 1.501 1.052 1.052 0 0 0 1.495 0L8 9.47l6.195 6.22a1.052 1.052 0 0 0 1.495 0 1.066 1.066 0 0 0 0-1.5L9.527 8z"></path>
                        </svg>
                    </CloseButton>
                </Link>
                <PostButton onClick={onPostButtonClicked}>Post</PostButton>
            </PostButtonsContainer>
            {currentUser !== null ? (
                <BlogInfo
                    blogName={currentUser.displayName}
                    profilePhotoURL={currentUser.photoURL}
                    currentUserId={currentUser.uid}
                    userId={currentUser.uid}
                />
            ) : (
                <div>Loading...</div>
            )}
            {isReblog && (
                <PostPreview
                    currentUser={currentUser}
                    postId={originalPostId}
                />
            )}
            <PostTextarea
                value={postContent}
                onChange={onPostContentChanged}
                placeholder="Go ahead, put anything"
            />
            <div>
                <TagsList>
                    {postTags.map((tag) => (
                        <li key={tag}>
                            <Tag tagText={tag} removeTag={removeTag} />
                        </li>
                    ))}
                    <li>
                        <TagsInput
                            type="text"
                            value={currentTag}
                            onChange={onCurrentTagChanged}
                            onKeyDown={onTagsKeyDown}
                            placeholder="#add tags"
                        />
                    </li>
                </TagsList>
            </div>
        </NewPostContainer>
    );
}

export default NewPost;
