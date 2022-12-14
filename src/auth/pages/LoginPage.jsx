import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context';

export const LoginPage = () => {

    const { login } = useContext( AuthContext );
    const navigate = useNavigate();
    
    const onLogin = () => {
        const lastPasth = localStorage.getItem('lastPath') || '/';
        login('User');
        navigate(lastPasth);
    }

    return (
        <div className="container mt-5">
            <h1>Login</h1>

            <button
                className="btn btn-primary"
                onClick={onLogin}
            >Login</button>
        </div>
    )
}
