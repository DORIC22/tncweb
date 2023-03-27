import React, {useContext} from "react";
import headerLogoMobileApp from '../Resources/headerLogoMobileApp.png'
import {AuthContext} from "../hoc/AuthProvider";
import {Link} from "react-router-dom";

export default function Header() {
    const {isLoggedIn} = useContext(AuthContext)

    return (
        <header className='shadow-formShadow fixed w-full bg-white z-50'>
            <div className='flex justify-between items-center py-2 px-3'>
                <div className='sm:flex sm:justify-start sm:items-center sm:w-48'>
                    <h2 className='text-base font-bold sm:text-2xl'>TNC - Web</h2>
                    <h2 className='text-xs sm:hidden'>Система учета состояния сетевого оборудования</h2>
                </div>
                <div>
                    <h2 className='text-sm hidden sm:block'>
                        Система учета состояния сетевого оборудования
                    </h2>
                    <Link to={'naxyu'}>Пользователи</Link>
                </div>
                <div className='justify-center items-center sm:flex  sm:w-48'>
                    <img src={headerLogoMobileApp} alt='logo mobile' className='w-[20px] sm:w-[20px]'/>
                    <h2 className='hidden sm:ml-1 sm:block'>Клиентская версия</h2>
                </div>
            </div>
        </header>
    )
}
