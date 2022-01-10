import { useState } from 'react';
import { useEffect } from 'react';
import styled from 'styled-components';
import PostPreview from './PostPreview';
import { getUserById } from '../firestore-posts';

const NotesButtonsContainer = styled.div`
    display: flex;

    button {
        margin-left: 30px;
        padding: 10px;
        background: none;
        border: none;
        display: flex;
        justify-content: center;
        align-items: center;
        color: rgba(0, 0, 0, 0.4);

        svg {
            margin-right: 8px;
        }
    }

    .green {
        color: #00cf36;
        border-bottom: 2px solid #00cf36;
    }

    .red {
        color: #ff4930;
        border-bottom: 2px solid #ff4930;
    }
`;

function Notes(props) {
    const { reblogs, likes, currentUser, followedUsers } = props;
    const [likers, setLikers] = useState([]);
    // if  not showing reblogs, showing likes
    const [showingReblogs, setShowingReblogs] = useState(true);

    useEffect(() => {
        getSeveralUsersByIds(likes).then((result) => setLikers(result));

        async function getSeveralUsersByIds(ids) {
            const users = [];
            for (let i = 0; i < ids.length; i++) {
                const user = await getUserById(ids[i]);
                users.push(user);
            }
            return users;
        }
    }, [likes]);

    return (
        <section>
            <NotesButtonsContainer>
                <button
                    className={showingReblogs ? 'green' : ''}
                    onClick={() => setShowingReblogs(true)}
                >
                    <svg
                        role="img"
                        viewBox="0 0 17 18.1"
                        width="18"
                        height="18"
                        fill={showingReblogs ? '#00cf36' : 'rgba(0, 0, 0, 0.4)'}
                    >
                        <path d="M12.8.2c-.4-.4-.8-.2-.8.4v2H2c-2 0-2 2-2 2v5s0 1 1 1 1-1 1-1v-4c0-1 .5-1 1-1h9v2c0 .6.3.7.8.4L17 3.6 12.8.2zM4.2 17.9c.5.4.8.2.8-.3v-2h10c2 0 2-2 2-2v-5s0-1-1-1-1 1-1 1v4c0 1-.5 1-1 1H5v-2c0-.6-.3-.7-.8-.4L0 14.6l4.2 3.3z"></path>
                    </svg>
                    {reblogs.length}
                </button>
                <button
                    className={!showingReblogs ? 'red' : ''}
                    onClick={() => setShowingReblogs(false)}
                >
                    <svg
                        role="img"
                        width="18"
                        height="18"
                        viewBox="0 0 20 18"
                        fill={showingReblogs ? 'rgba(0, 0, 0, 0.4)' : '#ff4930'}
                    >
                        <path d="M14.658 0c-1.625 0-3.21.767-4.463 2.156-.06.064-.127.138-.197.225-.074-.085-.137-.159-.196-.225C8.547.766 6.966 0 5.35 0 4.215 0 3.114.387 2.162 1.117c-2.773 2.13-2.611 5.89-1.017 8.5 2.158 3.535 6.556 7.18 7.416 7.875A2.3 2.3 0 0 0 9.998 18c.519 0 1.028-.18 1.436-.508.859-.695 5.257-4.34 7.416-7.875 1.595-2.616 1.765-6.376-1-8.5C16.895.387 15.792 0 14.657 0h.001zm0 2.124c.645 0 1.298.208 1.916.683 1.903 1.461 1.457 4.099.484 5.695-1.973 3.23-6.16 6.7-6.94 7.331a.191.191 0 0 1-.241 0c-.779-.631-4.966-4.101-6.94-7.332-.972-1.595-1.4-4.233.5-5.694.619-.475 1.27-.683 1.911-.683 1.064 0 2.095.574 2.898 1.461.495.549 1.658 2.082 1.753 2.203.095-.12 1.259-1.654 1.752-2.203.8-.887 1.842-1.461 2.908-1.461h-.001z"></path>
                    </svg>
                    {likers.length}
                </button>
            </NotesButtonsContainer>
            {showingReblogs
                ? reblogs.map((reblog) => (
                      <PostPreview
                          key={reblog.id}
                          postId={reblog.id}
                          currentUser={currentUser}
                          isNote={true}
                          isFollowed={followedUsers.includes(reblog.authorId)}
                      />
                  ))
                : likers.map((liker) => (
                      <div key={liker.id}>{liker.blogName}</div>
                  ))}
        </section>
    );
}

export default Notes;
