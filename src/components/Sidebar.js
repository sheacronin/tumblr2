import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { getAuth, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import BlogInfo from './BlogInfo';

const StyledNav = styled.nav`
    z-index: 1;
    height: calc(100vh - 44px);
    width: 90vw;
    position: fixed;
    background-color: #001936;
    color: white;
    top: 44px;

    ul li {
        list-style-type: none;
        min-height: 41px;
    }

    .dashboard-li {
        margin-top: 15px;
    }

    svg {
        fill: white;
        margin-left: 15px;
        margin-right: 10px;
    }

    a,
    button {
        color: white;
        text-decoration: none;
        border: none;
        width: 100%;
        background: none;
        text-align: left;
    }

    button {
        min-height: 30px;
        font-family: Helvetica Neue;
        font-size: 16px;
        display: flex;
        align-items: center;

        span {
            padding-left: 15px;
        }
    }

    a span {
        padding: 13px 15px;
    }
`;

const CreateAPostListItem = styled.li`
    text-align: center;

    a {
        padding: 8px 0;
        background-color: #00b8ff;
        border-radius: 5px;
        display: flex;
        align-items: center;
        width: 200px;
        height: 40px;
        margin: 10px auto;
    }
`;

const BlogsContainer = styled.div`
    margin-left: 15px;

    h4 {
        font-size: 21px;
    }
`;

function Sidebar(props) {
    const { setIsShowing, currentUser } = props;

    const navigate = useNavigate();

    function onSignedOut() {
        const auth = getAuth();
        signOut(auth)
            .then(() => {
                // Sign-out successful.
                navigate('/');
                setIsShowing(false);
            })
            .catch((error) => {
                // An error happened.
            });
    }

    return (
        <StyledNav>
            <ul>
                <CreateAPostListItem>
                    <Link to="/new">
                        <svg
                            viewBox="0 0 16.8 16.8"
                            width="20"
                            height="20"
                            fill="RGB(var(--white))"
                        >
                            <path d="M1.2 11.9l-1.2 5 5-1.2 8.2-8.2-3.8-3.8-8.2 8.2zM10 6.3l-6.2 6.2-.6-.6 6.2-6.2c0-.1.6.6.6.6zM13.1 0l-2.5 2.5 3.7 3.7 2.5-2.5L13.1 0z"></path>
                        </svg>
                        <span>Create a post</span>
                    </Link>
                </CreateAPostListItem>
                <li className="dashboard-li">
                    <Link to="/dashboard">
                        <svg
                            width="20"
                            height="21"
                            viewBox="0 0 20 21"
                            fill="RGB(var(--white-on-dark))"
                        >
                            <path d="M19.55 8.117L10.567.157a.967.967 0 0 0-1.056 0L.528 8.117C.211 8.327 0 8.746 0 9.06v11.312c0 .314.317.628.634.628H6.34v-6.389c0-.524.423-.943.952-.943h5.389c.528 0 .951.42.951.943V21h5.706c.317 0 .635-.314.635-.628V9.06c.105-.314-.106-.838-.423-.943"></path>
                        </svg>
                        <span>Dashboard</span>
                    </Link>
                </li>
                <li>
                    <Link to="/explore">
                        <svg
                            viewBox="0 0 21.8 21.8"
                            width="20"
                            height="20"
                            fill="RGB(var(--white-on-dark))"
                        >
                            <path d="M10.9 21.8C4.9 21.8 0 16.9 0 10.9S4.9 0 10.9 0s10.9 4.9 10.9 10.9-4.9 10.9-10.9 10.9zM12 2.1c-.5-.1-1.8-.1-2 0-4.1.4-7.5 3.7-8 7.8-.1.5-.1 1.8 0 2 .4 4.2 3.8 7.6 8 8h2c4.1-.5 7.4-3.8 7.8-8v-2C19.2 5.8 16 2.6 12 2.1zm1.7 11.3c-.1.2-.2.3-.4.4l-6.7 2.5c-.5.2-1.1-.3-.9-.9l2.5-6.7c.1-.2.2-.3.4-.4l6.7-2.5c.5-.2 1.1.3.9.9l-2.5 6.7zm-1.9-3.3c-.5-.5-1.3-.5-1.7 0-.5.5-.5 1.3 0 1.7.5.5 1.3.5 1.7 0 .4-.4.4-1.2 0-1.7z"></path>
                        </svg>
                        <span>Explore</span>
                    </Link>
                </li>
                <li>
                    <Link to="/activity">
                        <svg
                            viewBox="0 0 13.8 19.6"
                            width="20"
                            height="20"
                            fill="RGB(var(--white-on-dark))"
                        >
                            <path d="M3.5 19.5c-.1 0-.2-.1-.2-.1-.6-.3-.9-.9-.7-1.5l2.2-5.8H1.3c-.1 0-.3 0-.4-.1-.4-.1-.6-.3-.8-.6-.2-.4-.2-1 .2-1.4L8.9.5c.3-.4.9-.6 1.4-.4.1 0 .2.1.2.1.6.3.9.9.7 1.5L9 7h3.5c.1 0 .3 0 .4.1.4.1.6.5.7.8.2.4.2 1-.2 1.4L4.8 19c-.2.3-.6.5-1 .5 0 .1-.2.1-.3 0z"></path>
                        </svg>
                        <span>Activity</span>
                    </Link>
                </li>
                <li>
                    <Link to="/likes">
                        <svg
                            role="img"
                            width="20"
                            height="18"
                            viewBox="0 0 20 18"
                            fill="RGB(var(--white-on-dark))"
                        >
                            <path d="M17.888 1.1C16.953.38 15.87 0 14.758 0c-1.6 0-3.162.76-4.402 2.139-.098.109-.217.249-.358.42a12.862 12.862 0 0 0-.36-.421C8.4.758 6.84 0 5.248 0 4.14 0 3.06.381 2.125 1.1-.608 3.201-.44 6.925 1.14 9.516c2.186 3.59 6.653 7.301 7.526 8.009.38.307.851.474 1.333.474a2.12 2.12 0 0 0 1.332-.473c.873-.71 5.34-4.42 7.526-8.01 1.581-2.597 1.755-6.321-.968-8.418"></path>
                        </svg>
                        <span>Likes</span>
                    </Link>
                </li>
                <li>
                    <Link to="/following">
                        <svg
                            viewBox="0 0 20 21"
                            width="20"
                            height="21"
                            fill="RGB(var(--white-on-dark))"
                        >
                            <path d="M11.5 8.8c0-1.5-1.2-2.8-2.6-2.8-1.4 0-2.6 1.3-2.6 2.8 0 1.5 1.2 2.2 2.6 2.2 1.5 0 2.6-.7 2.6-2.2zM5 16.2v.8h7.7v-.8c0-3-1.7-4.2-3.9-4.2C6.7 12 5 13.2 5 16.2zM16 19H2V4h10V2H2C.9 2 0 2.9 0 4v14.9C0 20.1.9 21 2 21h14.2c1.1 0 1.8-.9 1.8-2.1V8h-2v11zm2-17V0h-2v2h-2v2h2v2h2V4h2V2h-2z"></path>
                        </svg>
                        <span>Following</span>
                    </Link>
                </li>
                <li>
                    <button onClick={onSignedOut}>
                        <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="RGB(var(--white-on-dark))"
                        >
                            <path d="M24 10.526l-.36-.12-2.94-.962-.78-1.925 1.5-3.248-1.92-1.985-.36.18-2.76 1.444-1.86-.782L13.32 0h-2.58l-.12.421-1.08 2.707-1.86.782L4.5 2.346 2.58 4.33l1.56 3.188-.78 1.925L0 10.586v2.828l.36.12 2.94 1.083.78 1.924-1.5 3.309 1.92 1.985.36-.18 2.76-1.444 1.86.781L10.68 24h2.58l.12-.36 1.08-2.587 1.86-.782 3.18 1.564 1.92-1.985-.18-.361-1.38-2.827.78-1.925 3.3-1.203v-3.008H24zM7.2 11.97c0-2.647 2.16-4.812 4.8-4.812 2.64 0 4.8 2.165 4.8 4.812 0 2.647-2.16 4.812-4.8 4.812-2.64 0-4.8-2.165-4.8-4.812z"></path>
                        </svg>
                        <span>Log out</span>
                    </button>
                </li>
            </ul>
            <BlogsContainer>
                <h4>Blogs</h4>
                <ul>
                    <BlogInfo
                        blogName={currentUser.displayName}
                        profilePhotoURL={currentUser.photoURL}
                        isFollowed={true}
                    />
                </ul>
            </BlogsContainer>
        </StyledNav>
    );
}

export default Sidebar;
