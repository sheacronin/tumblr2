import styled from 'styled-components';

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
    const { className, post } = props;

    return (
        <article className={className}>
            <div>{post.author}</div>
            <div>{post.content}</div>
            <div>tags</div>
            <div>like, reblog, etc</div>
        </article>
    );
}

export default StyledPost;
