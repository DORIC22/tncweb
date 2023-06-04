import React, {useContext, useState} from 'react';
import CanSelectedLink from "./CanSelectedLink";
import exitIcon from "../Resources/exit.svg";
import useModal from "../Hooks/useModal";
import ModalWindow from "./ModalWindow";
import {AuthContext} from "../hoc/AuthProvider";

const BurgerMenu = ({links}) => {
    const {logoutUser} = useContext(AuthContext)
    const [isActive, setIsActive] = useState(false)
    const [isOpenLogoutModel, toggleLogoutModel] = useModal()
    const logoutModelButtons = [
        {
            content: 'да',
            onClick: () => {
                logoutUser()
                console.log('Achievement required: Home sweet Home')
                toggleLogoutModel()
            }
        },
        {
            content: 'нет',
            onClick: () => {
                console.log('Achievement required: Сорвался!')
                toggleLogoutModel()
            }
        }
    ]

    return (
        <>
            <div className={`relative my-auto md:hidden`}>
                <div className={`burger flex relative items-center justify-center w-6 h-5
            before:absolute before:h-[3px] before:rounded-lg before:w-full before:bg-Accent before:transition-all before:top-0
            after:absolute after:h-[3px] after:rounded-lg after:w-full after:bg-Accent after:transition-all after:bottom-0
            ${isActive && 'before:top-1/2 before:transform before:-rotate-45 before:-translate-y-1/2'}
            ${isActive && 'after:bottom-1/2 after:transform after:rotate-45 after:translate-y-1/2'}`}
                     onClick={() => setIsActive(prev => !prev)}>
                <span
                    className={`h-[3px] rounded-lg w-full bg-Accent scale-1 ${isActive && 'scale-0 transition duration-100 ease-in-out'}`}/>
                </div>
                <div
                    className={`${isActive && 'opacity-100 pointer-events-auto'} opacity-0 pointer-events-none absolute bg-white top-[34px] py-3 bg-white border-t-[2px] border-Accent drop-shadow-md rounded-b
                        transition-opacity duration-500 ease-in-out`}>
                    <ul>
                        {
                            links.map((opt, index) =>
                                <li key={index}
                                    className={'mt-2 text-sm whitespace-nowrap w-full '}>
                                    <CanSelectedLink to={opt.link}>{opt.label}</CanSelectedLink>
                                </li>
                            )
                        }
                    </ul>
                    <div className='border-t border-gray-100 mx-1 mt-3 pt-3 px-4'>
                        <button className='flex items-center gap-1 text-sm' onClick={toggleLogoutModel}>
                            <img src={exitIcon} width={15}/>
                            Выйти
                        </button>
                    </div>
                </div>
            </div>
            <ModalWindow title='Выйти из аккаунта?' isOpen={isOpenLogoutModel} width={450} widthSm={450}
                         buttons={logoutModelButtons}>
            </ModalWindow>
        </>
    );
};

export default BurgerMenu;