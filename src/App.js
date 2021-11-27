import './App.css';
import StyledPost from './components/Post';

function App(props) {
    const { className } = props;

    return (
        <div id="app" className={className}>
            <StyledPost />
            <StyledPost />
        </div>
    );
}

export default App;
