import React, {createContext, useEffect, useState} from 'react';
import sha256 from 'js-sha256';
import ExtendedKy from "../Common/ExtendedKy";
import * as AuthConstants from "../Common/AuthConstants";

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
    const [isInit, setIsInit] = useState(false)

    const init = async () => {
        setIsInit(false)

        if (localStorage.getItem(AuthConstants.isUserAuth) === 'true') {
            const useCookie = localStorage.getItem(AuthConstants.isUseCookie) === 'true'

            if (useCookie) {
                const isAuthorization = await checkAuthorizationCookies()

                setIsLoggedIn(isAuthorization)

                if (isAuthorization) {
                    const authResponse = await ExtendedKy.get('auth/by-cookie')
                    setUser(await authResponse.json())
                }
            }

            if (!useCookie) {
                const accessToken = localStorage.getItem(AuthConstants.accessToken)
                const refreshToken = localStorage.getItem(AuthConstants.refreshToken)

                const authResponse = await ExtendedKy.get('auth/by-cookie', {
                    headers: {
                        'refresh_token': refreshToken
                    }
                })

                setUser(await authResponse.json())
                setIsLoggedIn(authResponse.ok)
            }
        }

        setIsInit(true)
    }

    useEffect(init, [])

    useEffect(() => {
        const intervalId = setInterval(() => {
            console.log('check expires access token')
            const expiresDate = parseInt(localStorage.getItem(AuthConstants.expiresUserAuth))
            const currentDate = new Date().getTime()

            if (currentDate > expiresDate)
                logoutUser()
        }, 60000)

        return () => {
            clearInterval(intervalId)
        }
    }, [])

    const loginUser = async (email, password, rememberMe) => {

        const passwordHash = sha256(password)
        const result = await ExtendedKy.get('auth/by-credentials/?email=' + email + '&password=' + passwordHash)
        localStorage.setItem(AuthConstants.isNeedToRememberMe, rememberMe)
        localStorage.setItem(AuthConstants.isUserAuth, 'true')

        const existCookies = await checkAuthorizationCookies()
        localStorage.setItem(AuthConstants.isUseCookie, existCookies.toString())

        if (existCookies === false) {
            const refreshToken = result.headers.get('refresh_token')
            const accessToken = result.headers.get('access_token')

            localStorage.setItem(AuthConstants.accessToken, accessToken)
            localStorage.setItem(AuthConstants.refreshToken, refreshToken)
        }

        if (result.status === 200) {
            setUser(await result.json())
            setIsLoggedIn(true)
            localStorage.setItem(AuthConstants.expiresUserAuth, AuthConstants.lifeTimeUserAuth.toString())
        } else {

        }
    }

    const checkAuthorizationCookies = async () => (await ExtendedKy.head('auth')).status === 200

    const logoutUser = () => {
        console.log('logout')
        localStorage.setItem(AuthConstants.isUserAuth, 'false')
        setIsLoggedIn(false)
    }

    return (
        <AuthContext.Provider value={{user, isLoggedIn, isInit, loginUser, logoutUser}}>
            {children}
        </AuthContext.Provider>
    );
};
