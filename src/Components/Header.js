import React, {useContext, useState} from "react";
import headerLogoMobileApp from '../Resources/headerLogoMobileApp.png'
import {AuthContext} from "../hoc/AuthProvider";
import {Link} from "react-router-dom";
import BurgerMenu from "../Components/BurgerMenu"

export default function Header() {
    const {isLoggedIn} = useContext(AuthContext)
    const links = [ { label: 'Сетевое оборудование', link: '/techEquipment' },
        {label: 'Пользователи', link: '/users'},
        {label: 'Заявки', link: '/repair-requests'}]

    return (
        <header className='shadow-formShadow fixed w-full bg-white z-30'>
            <div className='flex justify-between items-center py-2 px-3'>

                <div className='flex'>
                    {isLoggedIn &&
                        <div className='sm:hidden bg-Accent rounded-lg '>
                            <BurgerMenu options={links}/>
                        </div>
                    }

                    <div className='sm:flex sm:justify-start sm:items-center sm:w-48 ml-2 sm:ml-0'>
                        <h2 className='text-2xl font-bold sm:text-2xl'>TNC - Web</h2>
                        { !isLoggedIn &&
                        <h2 className='text-xs sm:hidden'>Система учета состояния сетевого оборудования</h2>
                        }
                    </div>
                </div>

                <div>
                    { !isLoggedIn &&
                        <h2 className='text-sm hidden sm:block'> {/*sm:block*/}
                            Система учета состояния сетевого оборудования
                        </h2>
                    }
                    { isLoggedIn &&
                        <div className='hidden sm:block'> {/*если isLoggedIn = true*/}
                            <Link to={'/tech-equipment'} className=''>Сетевое оборудование</Link>
                            <Link to={'/users'} className='mx-4'>Пользователи</Link>
                            <Link to={'/repair-requests'} className=''>Заявки</Link>
                        </div>
                    }
                </div>

                <div className='justify-center items-center sm:flex  sm:w-48'>
                    <img src={headerLogoMobileApp} alt='logo mobile' className='w-[20px] sm:w-[20px]'/>
                    <h2 className='hidden sm:ml-1 sm:block'>Клиентская версия</h2>
                </div>

            </div>
        </header>
    )
}
