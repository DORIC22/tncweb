import React, {useRef, useState} from 'react';
import SearchBar from "../SearchBar";
import Select from "../Select";
import {RoleOptions} from "../../Common/SelectOptions";
import InputMask from "react-input-mask";
import ModalWindow from "../ModalWindow";
import {Form} from "react-router-dom";
import useModal from "../../Hooks/useModal";
import useIgorSubmit from "../../Hooks/useIgorSubmit";

const FilterUsersList = ({searchText, sortDateByDesc, onChangeSearchText, onChangeRole, onChangeDateSorting}) => {
    const [isLoading, setIsLoading] = useState(false)

    const [isOpenRegisterModal, toggleRegisterModel] = useModal()
    const [submitRegisterUser, errorsRegisterUser] = useIgorSubmit()
    const registerUserFormRef = useRef()

    const [selectedRole, setSelectedRole] = useState(RoleOptions[0]);

    const handleChangeRole = (item) => {
        setSelectedRole(item);
    };

    const inputStyle = 'border border-darkGray p-2 rounded-lg shadow-sm focus:outline-none focus:border-Accent_light text-xs sm:text-base mt-2'

    const registerModalButtons = [
        {
            content: 'зарегистрировать',
            isSubmit: false,
            onClick: () => {
                submitRegisterUser(registerUserFormRef.current, x => {
                    console.log('End submit')
                    setIsLoading(false)
                    if (x) {
                        if (Object.keys(x).length == 0) {
                            toggleRegisterModel()
                        }
                    }
                }, {method: 'POST', action: '/users'}, () => {
                    console.log('Start submit')
                    setIsLoading(true)
                })
            }
        },
        {
            content: 'Отмена',
            onClick: () => {
                toggleRegisterModel()
            }
        }
    ]

    return (
        <div className='mb-2'>
            <ModalWindow title='Регистрация' isOpen={isOpenRegisterModal}
                         width={350} widthSm={500} buttons={registerModalButtons}>
                <Form method='POST' action='/users' ref={registerUserFormRef}>
                    <div className='py-2 px-4 flex flex-col'>
                        <input
                            className={inputStyle}
                            placeholder='Фамилия'
                            maxLength={102}
                            name='lastName'
                        />
                        {errorsRegisterUser?.lastName &&
                            <span className='ml-2 text-sm text-red-500'>{errorsRegisterUser.lastName}</span>}
                        <input
                            className={inputStyle}
                            placeholder='Имя'
                            maxLength={102}
                            name='firstName'
                        />
                        {errorsRegisterUser?.firstName &&
                            <span className='ml-2 text-sm text-red-500'>{errorsRegisterUser.firstName}</span>}
                        <input
                            className={inputStyle}
                            placeholder='Отчество'
                            maxLength={102}
                            name='patronymic'
                        />
                        <InputMask
                            className={inputStyle}
                            placeholder='Телефон'
                            type='tel'
                            mask="+7 (999) 999-99-99"
                            name='phone'
                        />
                        {errorsRegisterUser?.phone &&
                            <span className='ml-2 text-sm text-red-500'>{errorsRegisterUser.phone}</span>}
                        <input
                            className={`${inputStyle} `}
                            placeholder='Электронная почта'
                            autoComplete={'new-password'}
                            maxLength={100}
                            type={"email"}
                            name='email'
                        />
                        {errorsRegisterUser?.email &&
                            <span className='ml-2 text-sm text-red-500 mb-2'>{errorsRegisterUser.email}</span>}
                        <Select
                            options={RoleOptions}
                            defaultValue={RoleOptions[0]}
                            onChange={handleChangeRole}
                        />


                        <input value={selectedRole} name='role' hidden/>
                    </div>
                </Form>
            </ModalWindow>

            <SearchBar className={'mt-4'} onChangeSearchText={onChangeSearchText}
                       onChangeDateSorting={onChangeDateSorting}
                       searchText={searchText}
                       sortDateByDesc={sortDateByDesc}/>
            <div className='flex justify-between mt-2'>
                <div className='sm:w-2/3 w-1/2'>
                    <Select options={RoleOptions} defaultValue={RoleOptions[0]} onChange={onChangeRole}/>
                </div>
                <button
                    className='bg-Accent sm:px-6 sm:base text-sm rounded-lg py-0 px-2 text-white sm:ml-5 ml-1 sm:w-1/3 w-1/2'
                    onClick={toggleRegisterModel}>
                    Зарегистрировать
                </button>
            </div>
        </div>
    );
};

export default FilterUsersList;