import React, {createContext, useEffect, useState} from 'react';
import sha256 from 'js-sha256';
import ExtendedKy from "../Common/ExtendedKy";

export const AuthContext = createContext({})

/*
11.05.2023 Конспект по теме "Логика Авторизации от Игоря Крючка на клиентских приложениях, использующий javascript."
1. Необходимо выполнить запрос на сервер, и передать ему почту и пароль (уже есть, но не то).
2. Заменяем Users на auth, получим Result, и в Result будет очень много всего.
3. Result это у нас статус (json объект), который содержит в себе также информацию о пользователе.
4. Console log оставляем для проверки нашей догадки. Результат пока что не удовлетворительный, продолжаются попытки
что - то сделать, и запустить проект в тестовом виде к 17 числу.
*/

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState({})
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    const init = async () => {
        const useCookie = localStorage.getItem('useCookie') === 'true'

        if (useCookie) {
            alert('Используются куки, вы согласны')
            const isAuthorization = await checkAuthorizationCookies()
            setIsLoggedIn(isAuthorization)

            if (isAuthorization) {
                const authResponse = await ExtendedKy.get('auth/by-cookie')
                setUser(await authResponse.json())

                await ExtendedKy.put('auth')
            }
        } else if (!useCookie) {
            const accessToken = localStorage.getItem('accessToken')
            const refreshToken = localStorage.getItem('refreshToken')

            const authResponse = await ExtendedKy.get('auth/by-cookie', {
                headers: {
                    'refresh_token': refreshToken
                }
            })

            setUser(await authResponse.json())
            setIsLoggedIn(authResponse.ok)
        }
    }

    useEffect(init, [])

    const loginUser = async (email, password, rememberMe) => {

        const passwordHash = sha256(password)
        const result = await ExtendedKy.get('auth/by-credentials/?email=' + email + '&password=' + passwordHash)
        localStorage.setItem('rememberMe', rememberMe)

        const existCookies = await checkAuthorizationCookies()
        localStorage.setItem('useCookie', existCookies.toString())

        if (existCookies === false) {
            const refreshToken = result.headers.get('refresh_token')
            const accessToken = result.headers.get('access_token')

            localStorage.setItem('accessToken', accessToken)
            localStorage.setItem('refreshToken', refreshToken)
        }

        if (result.status === 200) {
            setUser(await result.json())
            setIsLoggedIn(true)
        } else {

        }
    }

    const checkAuthorizationCookies = async () => (await ExtendedKy.head('auth')).status === 200

    const logoutUser = () => {
        setIsLoggedIn(false)
        //TODO: Delete refresh token from cookie
    }

    return (
        <AuthContext.Provider value={{user, isLoggedIn, loginUser, logoutUser}}>
            {children}
        </AuthContext.Provider>
    );
};
