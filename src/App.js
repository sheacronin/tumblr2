import { useState } from 'react';
import styled from 'styled-components';
import './App.css';
import StyledHeader from './components/Header';
import StyledPost from './components/Post';

const PostsContainer = styled.main`
    margin-top: 40px;
`;

function App(props) {
    const { className } = props;
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const app = isLoggedIn ? (
        <div id="app" className={className}>
            <StyledHeader />
            <PostsContainer>
                <StyledPost />
                <StyledPost />
            </PostsContainer>
        </div>
    ) : (
        <div id="app" className={className}>
            <button>Log in</button>
        </div>
    );

    return app;
}

export default App;
