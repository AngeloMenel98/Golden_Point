import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Routes as Paths,
} from 'react-router-dom';
import Login from '../pages/Login';
import Home from '../pages/Home';
import { usersApi } from '../apiServices';

const Routes: React.FC = () => {
    const handleLogin = async (username: string, password: string) => {
        try {
            const data = await usersApi.logIn(username, password);
            localStorage.setItem('token', data.token);
        } catch (error) {
            console.error('Error en el inicio de sesión:', error);
        }
    };
    return (
        <Router>
            <Paths>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
            </Paths>
        </Router>
    );
};

export default Routes;
