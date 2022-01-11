import { onAuthStateChanged, getAuth } from 'firebase/auth';
import { useEffect, useState } from 'react';
import {
    HashRouter as Router,
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
import NewPost from './components/NewPost';
import Dashboard from './components/Dashboard';
import Explore from './components/Explore';
import BlogPage from './components/BlogPage';
import Following from './components/Following';
// eslint-disable-next-line no-unused-vars
import app from './firebase';
import ReblogPost from './components/ReblogPost';
import {
    getFirestore,
    getDoc,
    doc,
    updateDoc,
    arrayUnion,
} from 'firebase/firestore';
import Likes from './components/Likes';
import Activity from './components/Activity';
import Search from './components/Search';

function App(props) {
    const { className } = props;
    const [currentUser, setCurrentUser] = useState(null);

    const [isSidebarShowing, setIsSidebarShowing] = useState(false);
    const [followedUsers, setFollowedUsers] = useState([]);

    useEffect(() => {
        onAuthStateChanged(getAuth(), setCurrentUser);
    }, []);

    useEffect(() => {
        getFollowedUsers().then((result) => setFollowedUsers(result));

        async function getFollowedUsers() {
            if (currentUser === null) return [];

            const db = getFirestore();
            const userInfo = await getDoc(doc(db, `users/${currentUser.uid}`));

            const followedIds = userInfo.data().following;

            return followedIds;
        }
    }, [currentUser]);

    async function followUser(id) {
        const db = getFirestore();
        updateDoc(doc(db, `users/${currentUser.uid}`), {
            following: arrayUnion(id),
        });
        setFollowedUsers((prevState) => [...prevState, id]);
    }

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
                    <Sidebar
                        setIsShowing={setIsSidebarShowing}
                        currentUser={currentUser}
                    />
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
                        element={
                            <Dashboard
                                currentUser={currentUser}
                                followedUsers={followedUsers}
                                followUser={followUser}
                            />
                        }
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
                        element={
                            <Explore
                                currentUser={currentUser}
                                followedUsers={followedUsers}
                                followUser={followUser}
                            />
                        }
                    />
                    <Route
                        path="/blog/:blogName"
                        element={
                            <BlogPage
                                currentUser={currentUser}
                                followedUsers={followedUsers}
                                followUser={followUser}
                            />
                        }
                    />
                    <Route
                        exact
                        path="/following"
                        element={
                            <Following
                                currentUser={currentUser}
                                followedUsers={followedUsers}
                            />
                        }
                    />
                    <Route
                        exact
                        path="/likes"
                        element={
                            <Likes
                                currentUser={currentUser}
                                followedUsers={followedUsers}
                                followUser={followUser}
                            />
                        }
                    />
                    <Route
                        exact
                        path="/activity"
                        element={<Activity currentUser={currentUser} />}
                    />
                    <Route
                        path="/reblog/:originalPostId"
                        element={<ReblogPost currentUser={currentUser} />}
                    />
                    <Route
                        path="/search/:tag"
                        element={
                            <Search
                                currentUser={currentUser}
                                followedUsers={followedUsers}
                                followUser={followUser}
                            />
                        }
                    />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
