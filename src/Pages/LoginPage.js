import React from "react";
import Auth from "../Components/Auth";
import Logo from '../Resources/logo.png'
import {useLocation, useNavigate} from "react-router-dom";
import * as AuthConstants from "../Common/AuthConstants"

export const LoginPage = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const fromUrl = location.state?.from?.pathname || '/'

    return (
        <div className='flex flex-col items-center'>
            <div className='my-6 2xl:my-16 md:my-3'>
                <img src={Logo} alt='logo tnc' className='w-[100px] sm:w-[130px]'/>
            </div>

            {
                new Date().getTime() > parseInt(localStorage.getItem(AuthConstants.expiresUserAuth)) &&
                <div
                    className='text-sm bg-red-100 sm:p-3 p-2 mb-4 border-red-600 border-2 rounded-lg sm:w-2/5 min-w-[315px] sm:px-10 sm:min-w-[500px] sm:text-base'
                    style={{textAlign: 'center'}}>
                    <a>
                        Ваша сессия истекла. <br/>
                        Пожалуйста, пройдите авторизацию
                    </a>
                </div>
            }

            <Auth/>
        </div>
    )
}