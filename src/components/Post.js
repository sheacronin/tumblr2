import styled from 'styled-components';
import BlogInfo from './BlogInfo';

const StyledPost = styled(Post)`
    background-color: white;
    width: 100vw;
    color: black;
    max-width: 540px;
    padding: 10px;
    font-family: 'Helvetica Neue', sans-serif;
    margin-bottom: 10px;
`;

function Post(props) {
    const { className, post, currentUser } = props;

    return (
        <article className={className}>
            <BlogInfo
                blogName={post.authorName}
                profilePhotoURL={post.authorPhotoURL}
                userId={post.authorId}
                currentUserId={currentUser.uid}
            />
            <div>{post.content}</div>
            <div>tags</div>
            <div>like, reblog, etc</div>
        </article>
    );
}

export default StyledPost;
