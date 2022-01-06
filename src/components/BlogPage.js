import { collection, getDocs, getFirestore } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

const BlogPageContainer = styled.div`
    color: white;
    margin-top: 44px;
`;

function BlogPage(props) {
    const { blogName } = useParams();

    const [blogOwner, setBlogOwner] = useState(null);

    useEffect(() => {
        getUserByBlogName().then((user) => setBlogOwner(user));

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
    }, [blogName]);

    if (blogOwner === null) {
        return <div>Loading...</div>;
    }

    return (
        <BlogPageContainer>
            <section>
                <span>{blogOwner.blogName}</span>
            </section>
            <main>
                <img
                    src={blogOwner.photoURL}
                    alt={`${blogOwner.blogName}'s proflie`}
                />
                <h2>Title</h2>
                <p>About</p>
                <section>Posts</section>
            </main>
        </BlogPageContainer>
    );
}

export default BlogPage;
