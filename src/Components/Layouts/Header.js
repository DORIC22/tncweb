import React, {useContext} from "react";
import headerLogoMobileApp from '../../Resources/headerLogoMobileApp.png'
import {AuthContext} from "../../hoc/AuthProvider";
import BurgerMenu from "../BurgerMenu"
import CanSelectedLink from "../CanSelectedLink";
import {useNavigate} from "react-router-dom";

export default function Header() {
    const {isLoggedIn, logoutUser} = useContext(AuthContext)
    const navigate = useNavigate()
    const links = [{label: 'Сетевое оборудование', link: '/techEquipment'},
        {label: 'Пользователи', link: '/users'},
        {label: 'Заявки', link: '/'}]

    function out() {
        if (isLoggedIn) {
            const result = window.confirm("Выйти из аккаунта?");
            if (result) {
                localStorage.setItem("UserAuth", "false")
                logoutUser()
                navigate('/login')
                console.log('Achievement required:' +
                    'Home sweet Home')
            } else {
                console.log('Achievement required:' +
                    'Сорвался!')
            }
        }
    }

    return (
        <header className='shadow-formShadow fixed w-full bg-white z-30'>
            <div className='flex justify-between items-center py-2 px-3'>

                <div className='flex'>
                    {isLoggedIn &&
                        <BurgerMenu options={links}/>
                    }

                    <div className='sm:flex sm:justify-start sm:items-center ml-2 md:ml-0'>
                        <a onClick={out}>
                            <h2 className='text-2xl font-bold sm:text-2xl cursor-pointer'>Net-Eye</h2>
                        </a>
                        {!isLoggedIn &&
                            <h2 className='text-xs sm:hidden'>Система учета состояния сетевого оборудования</h2>
                        }
                    </div>
                </div>

                <div>
                    {!isLoggedIn &&
                        <h2 className='text-sm hidden sm:block'> {/*sm:block*/}
                            Система учета состояния сетевого оборудования
                        </h2>
                    }
                    {isLoggedIn &&
                        <div className='hidden md:block'> {/*если isLoggedIn = true*/}
                            <CanSelectedLink to={'/tech-equipment'} className=''>Сетевое оборудование</CanSelectedLink>
                            <CanSelectedLink to={'/users'} className='mx-4 lg:mx-12'>Пользователи</CanSelectedLink>
                            <CanSelectedLink to={'/'} className=''>Заявки</CanSelectedLink>
                        </div>
                    }
                </div>

                <a href="https://disk.yandex.ru/d/Nb2t_7hJu84djg" onClick={(e) => {
                    e.preventDefault();
                    window.open('https://disk.yandex.ru/d/Nb2t_7hJu84djg', '_blank', 'width=800,height=600');
                }}>
                    <div className='justify-center items-center md:flex  md:w-48'>
                        <img src={headerLogoMobileApp} alt='logo mobile' className='w-[20px] sm:w-[20px]'/>
                        <h2 className='hidden md:ml-1 md:block'>Клиентская версия</h2>
                    </div>
                </a>

            </div>
        </header>
    )
}
