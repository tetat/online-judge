import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Navigate, useLocation } from 'react-router-dom';
import auth from '../../../firebase.init';
import Loading from '../../Shared/Loading/Loading';

const RequireVerification = ({ children }) => {
    const [user, loading, error] = useAuthState(auth);
    const location = useLocation();

    if (loading) {
        return <Loading></Loading>
    }


    if (!user.emailVerified) {
        return <Navigate to="/verify" state={{ from: location }} replace />;
    }

    return children;
};

export default RequireVerification;