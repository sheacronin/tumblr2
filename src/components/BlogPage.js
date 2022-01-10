import { updateProfile } from 'firebase/auth';
import {
    collection,
    doc,
    getDocs,
    getFirestore,
    updateDoc,
} from 'firebase/firestore';
import { ref, getStorage, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import Post from './Post';

const BlogPageContainer = styled.div`
    color: white;
    margin-top: 44px;
    text-align: center;

    main {
        margin-top: 30px;
    }
`;

const ProfileImage = styled.img`
    width: 96px;
    height: 96px;
    border: 5px solid white;
`;

const TopBlogSection = styled.section`
    display: flex;
    justify-content: space-between;
    margin: 0 10px;
    align-items: center;
    height: 40px;

    span {
        margin-left: 15px;
    }
`;

const InvisibleButton = styled.button`
    background: none;
    border: none;
    margin: 0 10px;
`;

function BlogPage(props) {
    const { blogName } = useParams();
    const { currentUser, followedUsers, followUser } = props;

    const [blogOwner, setBlogOwner] = useState(null);
    const [blogPosts, setBlogPosts] = useState([]);
    const [isEditable, setIsEditable] = useState(false);

    useEffect(() => {
        getUserByBlogName().then((user) => {
            setBlogOwner(user);
            getOwnPosts(user).then((posts) => setBlogPosts(posts));
        });

        // search in users db for the user with this blog name
        async function getUserByBlogName() {
            const db = getFirestore();

            const users = [];
            const fetchedUsers = await getDocs(collection(db, 'users'));

            fetchedUsers.forEach((user) => users.push(user.data()));
            for (let i = 0; i < users.length; i++) {
                if (users[i].blogName === blogName) {
                    return users[i];
                }
            }
        }

        async function getOwnPosts(user) {
            const db = getFirestore();
            const postsSnapshot = await getDocs(
                collection(db, `users/${user.id}/posts`)
            );
            const posts = [];
            postsSnapshot.forEach((post) => posts.push(post.data()));
            return posts;
        }
    }, [blogName]);

    if (blogOwner === null) {
        return <div>Loading...</div>;
    }

    return (
        <BlogPageContainer>
            <TopBlogSection>
                <div>
                    <Link to="/dashboard">
                        <InvisibleButton>
                            <svg
                                viewBox="0 0 20 17"
                                width="18"
                                height="18"
                                fill="white"
                            >
                                <path d="M5.7 10.009l4.8 4.527c.2.2.2.603 0 .804L9 16.85c-.2.2-.6.2-.8 0L0 8.901v-.804L8.2.15c.2-.201.6-.201.8 0l1.5 1.509c.2.2.2.603 0 .804L5.7 6.991h13.4s.9.905.9 1.006v.905l-1 1.107H5.7z"></path>
                            </svg>
                        </InvisibleButton>
                    </Link>
                    <span>{blogOwner.blogName}</span>
                </div>
                <div>
                    {blogOwner.id === currentUser.uid && (
                        <InvisibleButton
                            onClick={() =>
                                setIsEditable((prevState) => !prevState)
                            }
                        >
                            <svg
                                width="18"
                                height="18"
                                viewBox="0 0 24 24"
                                fill="white"
                            >
                                <path d="M24 10.526l-.36-.12-2.94-.962-.78-1.925 1.5-3.248-1.92-1.985-.36.18-2.76 1.444-1.86-.782L13.32 0h-2.58l-.12.421-1.08 2.707-1.86.782L4.5 2.346 2.58 4.33l1.56 3.188-.78 1.925L0 10.586v2.828l.36.12 2.94 1.083.78 1.924-1.5 3.309 1.92 1.985.36-.18 2.76-1.444 1.86.781L10.68 24h2.58l.12-.36 1.08-2.587 1.86-.782 3.18 1.564 1.92-1.985-.18-.361-1.38-2.827.78-1.925 3.3-1.203v-3.008H24zM7.2 11.97c0-2.647 2.16-4.812 4.8-4.812 2.64 0 4.8 2.165 4.8 4.812 0 2.647-2.16 4.812-4.8 4.812-2.64 0-4.8-2.165-4.8-4.812z"></path>
                            </svg>
                        </InvisibleButton>
                    )}
                    <svg
                        viewBox="0 0 15 18.9"
                        width="18"
                        height="18"
                        fill="white"
                    >
                        <path d="M7.5 8.8c2.6 0 4.7-2 4.7-4.4S10.1 0 7.5 0 2.8 2 2.8 4.4C2.9 6.8 5 8.8 7.5 8.8zm0 1.5c-4.2 0-7.5 3.2-7.5 7.4 0 .6.5 1.2 1.2 1.2h12.6c.7 0 1.2-.5 1.2-1.2 0-4.1-3.3-7.4-7.5-7.4z"></path>
                    </svg>
                </div>
            </TopBlogSection>
            <main>
                {!isEditable ? (
                    <ProfileImage
                        src={blogOwner.photoURL}
                        alt={`${blogOwner.blogName}'s proflie`}
                    />
                ) : (
                    <EditableProfilePhoto currentUser={currentUser} />
                )}
                <h2>Title</h2>
                <p>About</p>
                <section>
                    {blogPosts.map((post) => (
                        <Post
                            post={post}
                            currentUser={currentUser}
                            isFollowed={followedUsers.includes(blogOwner.id)}
                            followUser={followUser}
                        />
                    ))}
                </section>
            </main>
        </BlogPageContainer>
    );
}

function EditableProfilePhoto(props) {
    const { currentUser } = props;

    function onFileChanged(e) {
        const file = e.target.files[0];
        updateProfilePhoto(file);
    }

    async function updateProfilePhoto(file) {
        const filePath = `${currentUser.uid}/profile/${file.name}`;
        const newImageRef = ref(getStorage(), filePath);
        await uploadBytes(newImageRef, file);
        const publicImageUrl = await getDownloadURL(newImageRef);

        updateProfile(currentUser, {
            photoURL: publicImageUrl,
        });

        const db = getFirestore();
        updateDoc(doc(db, 'users', currentUser.uid), {
            photoURL: publicImageUrl,
        });
    }

    return (
        <div>
            Edit
            <img
                src={currentUser.photoURL}
                alt={`${currentUser.displayName}'s proflie`}
            />
            <input type="file" onChange={onFileChanged} />
        </div>
    );
}

export default BlogPage;
