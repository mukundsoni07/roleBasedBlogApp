import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';
import './Navbar.css';

export default function Navbar() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        localStorage.removeItem('user');
        navigate('/login');
    };

    return (
        <nav className="navbar">
            <div className="navbar-left">
                <h1 to="/" className="navbar-logo">Role based Blog Site</h1>
            </div>
            <div className="navbar-right">
                {!user && (
                    <>
                        <button
                            className="navbar-button"
                            onClick={() => navigate('/login')}
                        >
                            Login
                        </button>
                        <button
                            className="navbar-button"
                            onClick={() => navigate('/register')}
                        >
                            Register
                        </button>
                    </>
                )}


                {user && (
                    <>
                        <span className="navbar-user">Hello, {user.fullName}</span>
                        <button className="navbar-button" onClick={handleLogout}>
                            Logout
                        </button>
                    </>
                )}
            </div>
        </nav>
    );
}
