import styled from 'styled-components';
import BlogInfo from './BlogInfo';

const NewPostContainer = styled.div`
    background-color: white;
    margin-top: 44px;
    height: 375px;
    width: 100vw;
    position: relative;
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
`;

const TagsTextarea = styled.textarea`
    width: 100%;
    border: none;
    position: absolute;
    bottom: 0;
    left: 0;
`;

function NewPost() {
    return (
        <NewPostContainer>
            <PostButtonsContainer>
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
                <PostButton>Post</PostButton>
            </PostButtonsContainer>
            <BlogInfo />
            <PostTextarea>Go ahead, put anything</PostTextarea>
            <TagsTextarea>#add tags</TagsTextarea>
        </NewPostContainer>
    );
}

export default NewPost;