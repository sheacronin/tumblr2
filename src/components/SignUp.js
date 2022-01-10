import { useState } from 'react';
import styled from 'styled-components';
import {
    getAuth,
    createUserWithEmailAndPassword,
    updateProfile,
} from 'firebase/auth';
import SignUpButton from './SignUpButton';
import Logo from './Logo';
import { useNavigate } from 'react-router-dom';
import { doc, getFirestore, setDoc } from 'firebase/firestore';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';

const StyledSection = styled.section`
    width: 100vw;
    display: flex;
    flex-direction: column;
    margin-top: 20vh;
    align-items: center;
`;

const SignUpForm = styled.form`
    margin-top: 20px;
    display: flex;
    flex-direction: column;
`;

const StyledInput = styled.input`
    padding: 11px 13px;
    line-height: 1.5;
    border: none;
    border-bottom: 1px solid #e7e7e7;
    width: 300px;
    margin-bottom: 6px;
`;

function SignUp() {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [blogName, setBlogName] = useState('');

    const onEmailChanged = (e) => setEmail(e.target.value);
    const onPasswordChanged = (e) => setPassword(e.target.value);
    const onBlogNameChanged = (e) => setBlogName(e.target.value);

    async function onSignUpSubmited(e) {
        e.preventDefault();

        const defaultProfilePhotoRef = ref(
            getStorage(),
            'default-profile-photo.png'
        );
        const defaultProfilePhotoUrl = await getDownloadURL(
            defaultProfilePhotoRef
        );

        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                updateProfile(user, {
                    displayName: blogName,
                    photoURL: defaultProfilePhotoUrl,
                });

                const db = getFirestore();
                setDoc(doc(db, `users/${user.uid}`), {
                    id: user.uid,
                    blogName: blogName,
                    photoURL: defaultProfilePhotoUrl,
                    following: [user.uid],
                    // there will also be a likes property when user likes a post
                }).then(() => navigate('/dashboard'));
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
            <SignUpForm>
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
                <StyledInput
                    type="text"
                    id="blogName"
                    name="blogName"
                    placeholder="Blog name"
                    value={blogName}
                    onChange={onBlogNameChanged}
                />

                <SignUpButton onClick={onSignUpSubmited} />
            </SignUpForm>
        </StyledSection>
    );
}

export default SignUp;
