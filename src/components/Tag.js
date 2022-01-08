import { useState } from 'react/cjs/react.development';
import styled from 'styled-components';

const TagContainer = styled.div`
    position: relative;
    background-color: ${(props) =>
        props.removable ? 'rgba(0, 184, 255, 0.25)' : 'none'};
    padding: 5px 8px;
    border-radius: 30px;

    span {
        color: ${(props) => (props.removable ? '#00b8ff' : 'grey')};
    }
`;

const RemoveTagButton = styled.button`
    background-color: #00b8ff;
    color: white;
    border: none;
    border-radius: 50%;
    width: 16px;
    height: 16px;
    position: absolute;
    top: -5px;
    right: -5px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

function Tag(props) {
    const [showingRemoveTagBtn, setShowingRemoveTagBtn] = useState(false);
    const { tagText, removeTag } = props;

    function toggleRemoveTagBtn() {
        setShowingRemoveTagBtn((prevState) => !prevState);
    }

    return (
        <TagContainer removable={showingRemoveTagBtn}>
            {showingRemoveTagBtn && (
                <RemoveTagButton onClick={() => removeTag(tagText)}>
                    x
                </RemoveTagButton>
            )}
            <span onClick={toggleRemoveTagBtn}>#{tagText}</span>
        </TagContainer>
    );
}

export default Tag;
