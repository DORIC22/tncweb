import React, {useContext, useEffect} from 'react';
import {Navigate, Outlet, useLocation} from "react-router-dom";
import {AuthContext} from "./AuthProvider";

const RequireAuth = ({children}) => {
    const location = useLocation()
    const isLoggedIn  = true

    return (
        isLoggedIn ? children : <Navigate to='/' state={{from: location}} replace={true}/>
    )
};

export default RequireAuth;