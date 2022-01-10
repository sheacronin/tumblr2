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

const BlogInfoContainer = styled.div`
    display: flex;
    a {
        text-decoration: none;
        color: black;
        font-weight: 700;
        display: flex;
        align-items: center;

        span {
            margin-left: 10px;
        }
    }
`;

function BlogInfo(props) {
    const { blogName, profilePhotoURL, userId, isFollowed, followUser } = props;

    return (
        <BlogInfoContainer>
            <Link to={`/blog/${blogName}`}>
                <PostProfilePhoto
                    src={profilePhotoURL}
                    alt={`${blogName}'s profile`}
                />
                <span>{blogName}</span>
            </Link>
            {!isFollowed && (
                <FollowButton onClick={() => followUser(userId)}>
                    Follow
                </FollowButton>
            )}
        </BlogInfoContainer>
    );
}

export default BlogInfo;
