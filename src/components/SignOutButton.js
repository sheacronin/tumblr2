import { getAuth, signOut } from 'firebase/auth';

const SignOutButton = () => {
    function onSignedOut() {
        const auth = getAuth();
        signOut(auth)
            .then(() => {
                // Sign-out successful.
            })
            .catch((error) => {
                // An error happened.
            });
    }

    return <button onClick={onSignedOut}>SignOut</button>;
};

export default SignOutButton;
