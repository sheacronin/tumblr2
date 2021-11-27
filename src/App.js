import styled from 'styled-components';
import './App.css';
import StyledHeader from './components/Header';
import StyledPost from './components/Post';

const PostsContainer = styled.main`
    margin-top: 40px;
`;

function App(props) {
    const { className } = props;

    return (
        <div id="app" className={className}>
            <StyledHeader />
            <PostsContainer>
                <StyledPost />
                <StyledPost />
            </PostsContainer>
        </div>
    );
}

export default App;
