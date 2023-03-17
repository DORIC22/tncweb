import React from "react";
import Auth from "./Auth";
import Logo from '../Resources/logo.png'
import {useLocation, useNavigate} from "react-router-dom";

export const LoginPage = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const fromUrl = location.state?.from?.pathname || '/'

    return (
        <div className='mx-auto h-full mt-8
        sm:mt-20'>
            <div className='flex justify-center mt-8 mb-10
            sm:mb-16 mt-40'>
                <img src={Logo} alt='logo tnc' className='w-[120px] sm:w-[150px]'/>
            </div>
            <Auth/>
        </div>
    )
}