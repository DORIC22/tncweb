import React, {useContext} from 'react';
import {Navigate, useLocation} from "react-router-dom";
import {AuthContext} from "./AuthProvider";

const RequireAuth = ({children}) => {
    const location = useLocation();
    const {isLoggedIn, isInit} = useContext(AuthContext);

    if (!isInit) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-gray-300"></div>
            </div>
        )
    }

    return isLoggedIn ? (
        children
    ) : (
        <Navigate to="/login" state={{from: location}} replace={true}/>
    );
};

export default RequireAuth;