import React from "react";
import Auth from "./Auth";
import Logo from '../Resources/logo.png'

export const MainSection = () => {
    return (
        <div className='mx-auto h-full'>
            <div className='flex justify-center my-16'>
                <img src={Logo} width={150} height={150} alt='logo tnc'/>
            </div>
            <Auth/>
        </div>
    )
}