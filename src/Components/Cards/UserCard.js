import React, {useContext, useRef, useState} from 'react';
import Card from "./Card";
import UserIcon from "../Icons/UserIcon";
import ModalWindow from "../ModalWindow";
import useModal from "../../Hooks/useModal";
import {Form} from "react-router-dom";
import useIgorSubmit from "../../Hooks/useIgorSubmit";
import {AuthContext} from "../../hoc/AuthProvider";

const UserCard = ({title, role, id, email, phone, registrationDate}) => {
    const [inputFullName, setInputFullName] = useState('');

    const [isOpenChangePassModal, toggleChangePassModal] = useModal()
    const [isOpenDeleteUserModal, toggleDeleteUserModal] = useModal()

    const [submitResetPassword] = useIgorSubmit()
    const resetPasswordFormRef = useRef()

    const [submitDeleteUser] = useIgorSubmit()
    const deleteUserFormRef = useRef()

    const {user} = useContext(AuthContext)

    const isDisabled = inputFullName !== title;

    const changePassModalButtons = [
        {
            content: 'да',
            isSubmit: false,
            onClick: () => {
                submitResetPassword(resetPasswordFormRef.current, x => {
                    toggleChangePassModal()
                }, {method: 'PATCH', action: '/users'})
            }
        },
        {
            content: 'нет',
            onClick: () => {
                toggleChangePassModal()
            }
        }
    ]

    const deleteUserModalButtons = [
        {
            content: 'Удалить',
            isSubmit: false,
            onClick: () => {
                submitDeleteUser(deleteUserFormRef.current, x => {
                    toggleDeleteUserModal()
                }, {method: 'DELETE', action: '/users'})
            },
            className: `bg-Accent px-6 w-2/3 text-white sm:py-2 py-1 rounded-lg shadow-formShadow sm:w-2/5 sm:my-5 my-3 mx-1
             ${isDisabled && "opacity-50 cursor-not-allowed bg-gray-300 text-gray-600"}`
        },
        {
            content: 'Отмена',
            onClick: toggleDeleteUserModal
        }
    ]

    return (
        <Card title={title} linkToDetails={''} image={<UserIcon userRole={role} width={70} height={70}/>}
              footerTitle='Дата регистрации:' footerValue={new Date(registrationDate).toLocaleDateString()}>
            <div className='flex-1'>
                <p>{email}</p>
                <p>{phone}</p>
                <div className='flex sm:gap-16 gap-1 my-2 justify-between'>
                    <button className='text-xs py-1 sm:text-base w-1/2 bg-Accent text-white rounded-lg max-w-[250px]'
                            onClick={toggleChangePassModal}>
                        Сбросить пароль
                    </button>
                    <button className='w-1/2 text-xs sm:text-base bg-Accent text-white rounded-lg max-w-[250px]'
                            onClick={toggleDeleteUserModal}
                            disabled={user.id === id}>
                        Удалить
                    </button>
                </div>

                <ModalWindow title={`Сбросить пароль для: ${title}`} isOpen={isOpenChangePassModal}
                             width={250} widthSm={400} buttons={changePassModalButtons}>
                    <Form method='PATCH' action='/users' ref={resetPasswordFormRef}>
                        <div className='my-3 flex-col'>
                            <p>Уверены?</p>
                            <input name='id' defaultValue={id} type='hidden'/>
                        </div>
                    </Form>
                </ModalWindow>

                <ModalWindow title={`Удалить ${title}?`} isOpen={isOpenDeleteUserModal}
                             width={250} widthSm={400} buttons={deleteUserModalButtons}>
                    <Form method='DELETE' action='/users' ref={deleteUserFormRef}>
                        <div>
                            <p className='text-center'>Введите данные удаляемого:</p>
                            <input
                                className='w-full border border-darkGray px-3 py-2
                                    rounded-lg shadow-sm focus:outline-none focus:border-Accent_light my-2'
                                placeholder='ФИО'
                                type='text'
                                value={inputFullName}
                                onChange={(e) => setInputFullName(e.target.value)}/>
                            <input name='id' defaultValue={id} type='hidden'/>
                        </div>
                    </Form>
                </ModalWindow>
            </div>
        </Card>
    );
};

export default UserCard;