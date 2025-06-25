import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';

const RedirectIfAuth = ({ children }) => {
    const { user } = useAuth();

    return user ? <Navigate to="/" /> : children;
};

export default RedirectIfAuth;
