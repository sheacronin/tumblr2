import styled from 'styled-components';

const StyledButton = styled.button`
    background-color: #00b8ff;
    border: none;
    height: 44px;
    width: 300px;
    font-weight: 700;
`;

function SignUpButton({ onClick }) {
    return <StyledButton onClick={onClick}>Sign up</StyledButton>;
}

export default SignUpButton;
