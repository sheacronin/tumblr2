import { onAuthStateChanged, getAuth } from 'firebase/auth';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import './App.css';
import StyledHeader from './components/Header';
import StyledPost from './components/Post';
import SignOutButton from './components/SignOutButton';
import SignUp from './components/SignUp';
import app from './firebase';

const PostsContainer = styled.main`
    margin-top: 40px;
`;

function App(props) {
    const { className } = props;
    const [currentUser, setCurrentUser] = useState(null);
    console.log('current user', currentUser);

    useEffect(() => {
        onAuthStateChanged(getAuth(), setCurrentUser);
    }, []);

    const content =
        currentUser !== null ? (
            <section>
                <PostsContainer>
                    <StyledPost />
                    <StyledPost />
                </PostsContainer>
                <SignOutButton />
            </section>
        ) : (
            <SignUp />
        );

    return (
        <div id="app" className={className}>
            <StyledHeader />
            {content}
        </div>
    );
}

export default App;
