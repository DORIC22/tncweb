import React, {createContext, useState} from 'react';
import ky from "ky";

export const AuthContext = createContext({ })

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState({ })
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    const loginUser = async (email, password) => {
        const result = await ky.get('http://192.168.0.107:7119/api/users?email=' + email, {
                headers: {
                    'x-apikey': '59a7ad19f5a9fa0808f11931',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                }
            }
        ).json();

        console.log(result)

        setUser({...result})

        setIsLoggedIn(true)
    }

    const logoutUser = () => {
        setIsLoggedIn(false)
    }

    return (
        <AuthContext.Provider value={ {user, isLoggedIn, loginUser, logoutUser} }>
            {children}
        </AuthContext.Provider>
    );
};