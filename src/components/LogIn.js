import styled from 'styled-components';
import Logo from './Logo';
import { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const StyledSection = styled.section`
    width: 100vw;
    display: flex;
    flex-direction: column;
    margin-top: 20vh;
    align-items: center;
`;

const LogInForm = styled.form`
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    width: 300px;
`;

const StyledInput = styled.input`
    padding: 11px 13px;
    line-height: 1.5;
    border: none;
    border-bottom: 1px solid #e7e7e7;
    width: 300px;
    margin-bottom: 6px;
`;

const LogInButton = styled.button`
    background-color: #00b8ff;
    border: none;
    padding: 10px 15px;
    height: 44px;
    margin-top: 12px;
    font-weight: 700;
`;

function LogIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onEmailChanged = (e) => setEmail(e.target.value);
    const onPasswordChanged = (e) => setPassword(e.target.value);

    const navigate = useNavigate();

    function onLogInSubmitted(e) {
        e.preventDefault();

        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                // const user = userCredential.user;
                // ...
                navigate('/dashboard');
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
            });
    }

    return (
        <StyledSection>
            <Logo />
            <LogInForm>
                <StyledInput
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Email"
                    value={email}
                    onChange={onEmailChanged}
                />
                <StyledInput
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Password"
                    value={password}
                    onChange={onPasswordChanged}
                />
                <LogInButton onClick={onLogInSubmitted}>Log in</LogInButton>
            </LogInForm>
        </StyledSection>
    );
}

export default LogIn;
