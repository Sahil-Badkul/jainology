import { auth, provider } from '../database/FirebaseConfig'
import { signInWithPopup } from 'firebase/auth'
import { useHistory } from 'react-router-dom'

const Login = ({ setIsAuth }) => {
    let history = useHistory();
    const signInWithGoogle = () => {
        signInWithPopup(auth, provider).then(() => {
            localStorage.setItem('isAuth', true);
            setIsAuth(true);
            history.push('/')
        })
    }
    return (
        <div className="loginPage">
            <p>Sing In With Google to Continue</p>
            <button className="login-with-google-btn" onClick={signInWithGoogle}>Sign in with Google</button>
        </div>
    );
}

export default Login;