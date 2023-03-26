import React, {createContext, useState} from 'react';
import ky from "ky";
import sha256 from 'js-sha256';

export const AuthContext = createContext({ })

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState({ })
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    const loginUser = async (email, password, remeberMe) => {

        if (localStorage.getItem("UserAuth") === "true") {
            email = localStorage.getItem("email")
            password = localStorage.getItem("password")
        }

        let passwordHash = sha256(password)
        const result = await ky.get('http://192.168.0.107:7119/api/users?email=' + email + '&password=' + passwordHash, {
                headers: {
                    'x-apikey': '59a7ad19f5a9fa0808f11931',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                }
            }
        )
        console.log(result)
        if (result.status === 200) {
            setUser(result.json())
            setIsLoggedIn(true)
            if (remeberMe)
            {
                localStorage.setItem("UserAuth", "true")
                localStorage.setItem("email", email)
                localStorage.setItem("password", password)
            }
        } else {
            if (localStorage.getItem("UserAuth") === "true") {
                alert("С момента последней сессии на этом устройстве, ваши учетные данные изменились. Введите новый пароль.")
                localStorage.setItem("UserAuth", "false")
            }
            else {
                alert("Неверный логин или пароль")
            }
        }
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
