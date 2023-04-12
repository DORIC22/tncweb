import React, {useContext} from 'react';
import {Navigate, useLocation} from "react-router-dom";
import {AuthContext} from "./AuthProvider";

const RequireAuth = ({children}) => {
    const location = useLocation()
    const {isLoggedIn} = useContext(AuthContext)

    return (
        isLoggedIn ? children : <Navigate to='/' state={{from: location}} replace={true}/>
    )
};

export default RequireAuth;