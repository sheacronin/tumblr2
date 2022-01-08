import { useParams } from 'react-router-dom';
import NewPost from './NewPost';

function ReblogPost(props) {
    const { originalPostId } = useParams();
    const { currentUser } = props;

    return (
        <NewPost
            currentUser={currentUser}
            isReblog={true}
            originalPostId={originalPostId}
        />
    );
}

export default ReblogPost;
