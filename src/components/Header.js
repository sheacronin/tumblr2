import styled from 'styled-components';

const StyledHeader = styled(Header)`
    width: 100vw;
    background-color: #001935;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 44px;
    position: fixed;
    top: 0;
`;

const HeaderItemsContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 90%;
    height: 100%;
`;

const InvisibleButton = styled.button`
    background-color: transparent;
    border: none;
`;

function Header(props) {
    const { className } = props;

    return (
        <header className={className}>
            <HeaderItemsContainer>
                <InvisibleButton onClick={props.onHamburgerClick}>
                    <svg
                        viewBox="0 0 25 25"
                        width="25"
                        height="25"
                        fill="#a4aeb7"
                    >
                        <rect y="6" width="20" height="2"></rect>
                        <rect y="12" width="20" height="2"></rect>
                        <rect y="18" width="20" height="2"></rect>
                    </svg>
                </InvisibleButton>
                <svg viewBox="0 0 21 36.8" width="14" height="25" fill="white">
                    <path d="M21 36.75h-6.2c-5.577 0-9.733-2.844-9.733-9.646V16.21H0v-5.9C5.576 8.876 7.909 4.12 8.177 0h5.79v9.354h6.757v6.856h-6.756v9.486c0 2.843 1.448 3.826 3.753 3.826h3.271L21 36.75z"></path>
                </svg>
                <svg width="18" height="18" viewBox="0 0 14 14" fill="#a4aeb7">
                    <path d="M1.676 5.7c0-2.2 1.873-4 4.042-4 2.268 0 4.043 1.8 4.043 4s-1.775 4-4.043 4c-2.169 0-4.042-1.8-4.042-4zm11.732 6.4L10.352 9c.69-.9 1.085-2.1 1.085-3.3 0-3.1-2.564-5.7-5.719-5.7C2.563 0 0 2.6 0 5.7s2.563 5.7 5.718 5.7c1.085 0 2.17-.4 3.057-.9l3.253 3.2c.197.2.493.3.789.3.296 0 .591-.1.789-.3.197-.2.394-.5.394-.8 0-.3-.296-.5-.592-.8z"></path>
                </svg>
            </HeaderItemsContainer>
        </header>
    );
}

export default StyledHeader;
