import { onAuthStateChanged, getAuth } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import './App.css';
import StyledHeader from './components/Header';
import LogIn from './components/LogIn';
import StyledPost from './components/Post';
import SignOutButton from './components/SignOutButton';
import SignUp from './components/SignUp';
import SignUpOrLogin from './components/SignUpOrLogIn';
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
            <SignUpOrLogin />
        );

    return (
        <Router>
            <div id="app" className={className}>
                <StyledHeader />
                <Routes>
                    <Route exact path="/" element={content} />
                    <Route exact path="/register" element={<SignUp />} />
                    <Route exact path="/login" element={<LogIn />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
