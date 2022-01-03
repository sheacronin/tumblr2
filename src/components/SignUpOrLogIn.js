import styled from 'styled-components';
import SignUpButton from './SignUpButton';
import { Link } from 'react-router-dom';
import Logo from './Logo';

const StyledSection = styled.section`
    width: 100vw;
    display: flex;
    flex-direction: column;
    margin-top: 20vh;
    align-items: center;
`;

const TagLineDiv = styled.div`
    color: white;
    text-align: center;
    width: 300px;
    font-size: 1.3rem;
    margin-top: 20px;
`;

const ButtonsDiv = styled.div`
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    width: 300px;
`;

const LogInButton = styled.button`
    background-color: #00cf35;
    border: none;
    padding: 10px 15px;
    height: 44px;
    margin-top: 12px;
    font-weight: 700;
    width: 300px;
`;

function SignUpOrLogIn() {
    return (
        <StyledSection>
            <Logo />
            <TagLineDiv>
                Make stuff, look at stuff, talk about stuff, find your people.
            </TagLineDiv>
            <ButtonsDiv>
                <Link to="/register">
                    <SignUpButton />
                </Link>
                <Link to="/login">
                    <LogInButton>Log in</LogInButton>
                </Link>
            </ButtonsDiv>
        </StyledSection>
    );
}

export default SignUpOrLogIn;
