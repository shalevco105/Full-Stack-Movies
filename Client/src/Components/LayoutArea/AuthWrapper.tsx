import React from 'react';
import { Navigate } from 'react-router-dom';
import { notify } from '../../Utils/notify';

interface AuthWrapperProps {
    isAuthenticated: boolean;
    children: React.ReactElement;
}

const AuthWrapper: React.FC<AuthWrapperProps> = ({ isAuthenticated, children }) => {
    if (!isAuthenticated) {
        notify.error("You are Unathorized get this page! Login First")
        return <Navigate to="/login" />;
    }
    return children;
};

export default AuthWrapper;
