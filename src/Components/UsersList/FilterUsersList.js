import React, {useState} from 'react';
import SearchBar from "../SearchBar";
import Select from "../Select";
import {RoleOptions} from "../../SelectOptions";
import sha256 from "js-sha256";
import ExtendedKy from "../../ExtendedKy";
import InputMask from "react-input-mask";
import validator from "validator/es";

const FilterUsersList = ({searchText, sortDateByDesc, onChangeSearchText, onChangeRole, onChangeDateSorting}) => {
    const [isModalAdd, setIsModalAdd] = useState(false)
    const [rPassword, setRPassword] = useState('')
    const [savedUser, setSavedUser] = useState({
        lastName: '',
        firstName: '',
        patronymic: '',
        phoneNumber: '',
        email: '',
        userType: 0,
        password: ''
    });

    function isModalAddChange() {
        setIsModalAdd((prev) => !prev)
        for (const key in savedUser) {
            if (savedUser.hasOwnProperty(key)) {
                savedUser[key] = '';
            }
        }
    }


    function saveNewUser() {
        if (savedUser.firstName.length > 1 && savedUser.lastName.length > 1 && validator.isEmail(savedUser.email) && !savedUser.phoneNumber.includes('_'))
        {
            if(rPassword === savedUser.password)
            {
                if (validator.isStrongPassword(savedUser.password)) {
                    setSavedUser.password = (sha256(savedUser.password))
                    const response = ExtendedKy.put('users', {json: savedUser})
                    isModalAddChange()
                }
                else
                {
                    alert('Сложность пароля не отвечает требованиям безопасности')
                }
            }
            else
            {
                alert('Введенные пароли не совпадают.')
            }
        }
        else
        {
            alert('Заполните все поля.')
        }
    }

    const handleChange = (selected) => {
        savedUser.userType = selected
    };

    return (
        <div>
            {isModalAdd &&
                <>
                    <div
                        className='z-50 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg min-w-[250px] sm:min-w-[400px] gradient-border border'>
                        <div
                            className='z-50 bg-white w-full p-2 shadow-formShadow rounded-tr-lg rounded-tl-lg flex justify-center'>
                            <p className='sm:text-2xl text-base'>Регистрация</p>
                        </div>

                        <div className='py-2 px-4 flex flex-col'>
                            <input
                                className='border border-darkGray p-2 rounded-lg shadow-sm focus:outline-none focus:border-Accent_light text-xs sm:text-base mt-2'
                                placeholder='Фамилия'
                                maxLength={102}
                                value={savedUser.lastName}
                                onChange={(event) => setSavedUser({...savedUser, lastName: event.target.value})}/>
                            <input
                                className='border border-darkGray p-2 rounded-lg shadow-sm focus:outline-none focus:border-Accent_light text-xs sm:text-base mt-2'
                                placeholder='Имя'
                                maxLength={102}
                                value={savedUser.firstName}
                                onChange={(event) => setSavedUser({...savedUser, firstName: event.target.value})}/>
                            <input
                                className='border border-darkGray p-2 rounded-lg shadow-sm focus:outline-none focus:border-Accent_light text-xs sm:text-base mt-2'
                                placeholder='Отчество'
                                maxLength={102}
                                value={savedUser.patronymic}
                                onChange={(event) => setSavedUser({...savedUser, patronymic: event.target.value})}/>
                            <InputMask
                                className='border border-darkGray p-2 rounded-lg shadow-sm focus:outline-none focus:border-Accent_light text-xs sm:text-base mt-2'
                                placeholder='Телефон'
                                type='tel'
                                mask="+7 (999) 999-99-99"
                                value={savedUser.phoneNumber}
                                onChange={(event) => setSavedUser({...savedUser, phoneNumber: event.target.value})}/>
                            <input
                                className='border border-darkGray p-2 rounded-lg shadow-sm focus:outline-none focus:border-Accent_light text-xs sm:text-base my-2'
                                placeholder='Электронная почта'
                                autoComplete={'new-password'}
                                maxLength={100}
                                type={"email"}
                                value={savedUser.email}
                                onChange={(event) => setSavedUser({...savedUser, email: event.target.value})}/>

                            <Select options={RoleOptions}
                                    defaultValue={RoleOptions[0]}
                                    onChange={handleChange}
                            />

                            <input
                                className='border border-darkGray p-2 rounded-lg shadow-sm focus:outline-none focus:border-Accent_light text-xs sm:text-base mt-2'
                                placeholder='Пароль'
                                type={"password"}
                                autoComplete={'new-password'}
                                value={savedUser.password}
                                onChange={(event) => setSavedUser({...savedUser, password: event.target.value})}/>
                            <input
                                type={"password"}
                                className='border border-darkGray p-2 rounded-lg shadow-sm focus:outline-none focus:border-Accent_light text-xs sm:text-base mt-2'
                                placeholder='Повтор пароля'
                                autoComplete={'new-password'}
                                onChange={(event) => setRPassword(event.target.value)}/>
                        </div>

                        <div className='flex justify-center'>
                            <button
                                className='bg-Accent px-6 w-2/3 text-white sm:py-2 py-1 rounded-lg shadow-formShadow sm:w-2/5 sm:my-5 my-3 mx-1'
                                onClick={isModalAddChange}>
                                Отмена
                            </button>
                            <button
                                className='bg-Accent px-6 w-2/3 text-white sm:py-2 py-1 rounded-lg shadow-formShadow sm:w-2/5 sm:my-5 my-3 mx-1'
                                onClick={saveNewUser}>
                                Сохранить
                            </button>
                        </div>
                    </div>

                    <div className='fixed top-0 left-0 w-full h-full bg-black opacity-50 z-40'></div>
                </>
            }

            <SearchBar className={'mt-4'} onChangeSearchText={onChangeSearchText}
                       onChangeDateSorting={onChangeDateSorting}
                       searchText={searchText}
                       sortDateByDesc={sortDateByDesc}/>
            <div className='flex justify-between mt-3'>
                <div className='sm:w-2/3 w-1/2'>
                    <Select options={RoleOptions} defaultValue={RoleOptions[0]} onChange={onChangeRole}/>
                </div>
                <button
                    className='bg-Accent sm:px-6 sm:base text-sm rounded-lg py-0 px-2 text-white sm:ml-5 ml-2 sm:w-1/3 w-1/2'
                    onClick={isModalAddChange}>
                    Добавить
                </button>
            </div>
        </div>
    );
};

export default FilterUsersList;