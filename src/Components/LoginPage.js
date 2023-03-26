import React from "react";
import Auth from "./Auth";
import Logo from '../Resources/logo.png'
import {useLocation, useNavigate} from "react-router-dom";

export const LoginPage = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const fromUrl = location.state?.from?.pathname || '/'

    return (
        <div className='h-full'>
            <div className='flex flex-col justify-center items-center my-8 sm:my-16'>
                <div className='flex justify-center items-center'>
                    <img src={Logo} alt='logo tnc' className='w-[100px] sm:w-[130px]'/>
                </div>
            </div>
            <Auth/>
        </div>
    )
}