import React from "react";
import headerLogoMobileApp from '../Resources/headerLogoMobileApp.png'

export default function Header(){
    return (
        <header className='shadow-formShadow fixed w-full bg-white'>
            <div className='flex justify-between items-center py-2 px-3'>
                <div className='sm:flex justify-start items-center sm:w-48'>
                    <h2 className='text-base font-bold sm:text-2xl'>TNC - Web</h2>
                    <h2 className='text-xs sm:hidden'>Система учета состояния сетевого оборудования</h2>
                </div>
                <div>
                    <h2 className='text-sm hidden sm:block'>Система учета состояния сетевого оборудования</h2>
                </div>
                <div className='sm:flex justify-center items-center sm:w-48'>
                    <img src={headerLogoMobileApp} alt='logo mobile' className='w-[20px] sm:w-[20px]'/>
                    <h2 className='hidden sm:ml-1 sm:block'>Клиентская версия</h2>
                </div>
            </div>
        </header>
    )
}
