import React, {useContext} from "react";
import {AuthContext} from "../../hoc/AuthProvider";
import useModal from "../../Hooks/useModal";
import ModalWindow from "../ModalWindow";
import exitIcon from "../../Resources/exit.svg"

export default function Footer() {
    const {isLoggedIn, logoutUser} = useContext(AuthContext)
    const [isOpenLogoutModel, toggleLogoutModel] = useModal()
    const logoutModelButtons = [
        {
            content: 'да',
            onClick: () => {
                logoutUser()
                toggleLogoutModel()
            }
        },
        {
            content: 'нет',
            onClick: toggleLogoutModel
        }
    ]

    return (
        <footer className='mt-auto bg-WhiteThemeBackground sm:p-0.5 flex justify-between'>
            <div className='flex-1 hidden md:block'>

            </div>
            <div className='flex-1'>
                <p className='text-center'>Все права защищены &copy; 2023</p>
            </div>
            <div className='flex-1 hidden md:block'>
                {isLoggedIn &&
                    <button className='flex items-center gap-1 mr-2 sm:mr-6 ml-auto' onClick={toggleLogoutModel}>
                        <img src={exitIcon} width={15}/>
                        Выйти
                    </button>
                }
            </div>

            <ModalWindow title='Выйти из аккаунта?' isOpen={isOpenLogoutModel} width={450} widthSm={450}
                         buttons={logoutModelButtons}>
            </ModalWindow>
        </footer>
    )
}