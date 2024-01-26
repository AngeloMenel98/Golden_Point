import React from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import GPLogo from '../../images/logos/GP/GP';

const Navbar: React.FC = () => {
    return (
        <nav className="navbar">
            <Link to="/" className="logo">
                <GPLogo />
            </Link>
            <ul>
                <li className="login-link">
                    <Link to="/login">Iniciar Sesión</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
