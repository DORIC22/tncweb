import React, {createContext, useState} from 'react';
import sha256 from 'js-sha256';
import ExtendedKy from "../Common/ExtendedKy";

export const AuthContext = createContext({})

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState({})
    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("UserAuth") === "true")

    const loginUser = async (email, password, rememberMe) => {

        if (localStorage.getItem("UserAuth") === "true") {
            email = localStorage.getItem("email")
            password = localStorage.getItem("password")
        }

        let passwordHash = sha256(password)
        const result = await ExtendedKy.get('users?email=' + email + '&password=' + passwordHash)
        console.log(result)
        if (result.status === 200) {
            setUser(await result.json())
            setIsLoggedIn(true)
            if (rememberMe) {
                localStorage.setItem("UserAuth", "true")
                localStorage.setItem("email", email)
                localStorage.setItem("password", password)
            }
        } else {
            if (localStorage.getItem("UserAuth") === "true") {
                alert("С момента последней сессии на этом устройстве, ваши учетные данные изменились. Введите новый пароль.")
                localStorage.setItem("UserAuth", "false")
            } else {
                alert("Неверный логин или пароль")
            }
        }
    }

    const logoutUser = () => {
        setIsLoggedIn(false)
    }

    return (
        <AuthContext.Provider value={{user, isLoggedIn, loginUser, logoutUser}}>
            {children}
        </AuthContext.Provider>
    );
};
