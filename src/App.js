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
import Sidebar from './components/Sidebar';
import app from './firebase';
import NewPost from './components/NewPost';
import Dashboard from './components/Dashboard';

const PostsContainer = styled.main`
    margin-top: 40px;
`;

function App(props) {
    const { className } = props;
    const [currentUser, setCurrentUser] = useState(null);
    console.log('current user', currentUser);

    const [isSidebarShowing, setIsSideBarShowing] = useState(false);

    useEffect(() => {
        onAuthStateChanged(getAuth(), setCurrentUser);
    }, []);

    const content =
        currentUser !== null ? (
            <Dashboard currentUser={currentUser} />
        ) : (
            <SignUpOrLogin />
        );

    return (
        <Router>
            <div id="app" className={className}>
                <StyledHeader
                    onHamburgerClick={() =>
                        setIsSideBarShowing((prevState) => !prevState)
                    }
                />
                {isSidebarShowing && <Sidebar />}
                <Routes>
                    <Route exact path="/" element={content} />
                    <Route
                        exact
                        path="/dashboard"
                        element={<Dashboard currentUser={currentUser} />}
                    />
                    <Route exact path="/register" element={<SignUp />} />
                    <Route exact path="/login" element={<LogIn />} />
                    <Route
                        exact
                        path="/new"
                        element={<NewPost currentUser={currentUser} />}
                    />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
