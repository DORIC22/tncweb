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
            content: 'отменить',
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
                        {errorsRegisterUser?.lastName && <span>{errorsRegisterUser.lastName}</span>}
                        <input
                            className={inputStyle}
                            placeholder='Имя'
                            maxLength={102}
                            name='firstName'
                        />
                        {errorsRegisterUser?.firstName && <span>{errorsRegisterUser.firstName}</span>}
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
                        {errorsRegisterUser?.phone && <span>{errorsRegisterUser.phone}</span>}
                        <input
                            className={`${inputStyle} mb-2`}
                            placeholder='Электронная почта'
                            autoComplete={'new-password'}
                            maxLength={100}
                            type={"email"}
                            name='email'
                        />
                        {errorsRegisterUser?.email && <span>{errorsRegisterUser.email}</span>}
                        <Select
                            options={RoleOptions}
                            defaultValue={RoleOptions[0]}
                            onChange={handleChangeRole}
                        />

                        {/*TODO: Refactoring*/}
                        <input value={selectedRole} name='role' hidden/>

                        <div className='flex justify-start mt-2'>
                            {isLoading && (
                                <div className="fixed inset-0 flex items-center justify-center">
                                    <div
                                        className="bg-gray-100 shadow-formShadow px-4 py-3 rounded-lg z-50 flex items-center">
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-Accent_light sm:w-8 sm:h-8"
                                             xmlns="http://www.w3.org/2000/svg"
                                             fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                                    strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor"
                                                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647zM12 20.25a8.25 8.25 0 100-16.5 8.25 8.25 0 000 16.5z"></path>
                                        </svg>
                                        <span className="text-xs sm:text-base">Отправляем письмо...</span>
                                    </div>
                                </div>
                            )}
                        </div>
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