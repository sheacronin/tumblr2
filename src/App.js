import { onAuthStateChanged, getAuth } from 'firebase/auth';
import { useEffect, useState } from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from 'react-router-dom';
import './App.css';
import StyledHeader from './components/Header';
import LogIn from './components/LogIn';
import SignUp from './components/SignUp';
import SignUpOrLogin from './components/SignUpOrLogIn';
import Sidebar from './components/Sidebar';
import app from './firebase';
import NewPost from './components/NewPost';
import Dashboard from './components/Dashboard';
import Explore from './components/Explore';
import BlogPage from './components/BlogPage';

function App(props) {
    const { className } = props;
    const [currentUser, setCurrentUser] = useState(null);
    console.log('current user', currentUser);

    const [isSidebarShowing, setIsSidebarShowing] = useState(false);

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
                    onHamburgerClick={() => {
                        if (currentUser !== null) {
                            setIsSidebarShowing((prevState) => !prevState);
                        }
                    }}
                />
                {isSidebarShowing && (
                    <Sidebar setIsShowing={setIsSidebarShowing} />
                )}
                <Routes>
                    <Route
                        exact
                        path="/"
                        element={
                            currentUser !== null ? (
                                <Navigate to="/dashboard" />
                            ) : (
                                <SignUpOrLogin />
                            )
                        }
                    />
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
                    <Route
                        exact
                        path="/explore"
                        element={<Explore currentUser={currentUser} />}
                    />
                    <Route path="/blog/:blogName" element={<BlogPage />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
