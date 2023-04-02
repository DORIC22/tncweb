import React from "react";
import Auth from "../Components/Auth";
import Logo from '../Resources/logo.png'
import {useLocation, useNavigate} from "react-router-dom";

export const LoginPage = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const fromUrl = location.state?.from?.pathname || '/'

    return (
        <div className='flex flex-col items-center'>
            <div className='my-6 2xl:my-16 md:my-3'>
                <img src={Logo} alt='logo tnc' className='w-[100px] sm:w-[130px]'/>
            </div>
            <Auth/>
        </div>
    )
}