import React, {useState} from 'react';
import SearchBar from "../SearchBar";
import Select from "../Select";
import {RoleOptions} from "../../Common/SelectOptions";
import sha256 from "js-sha256";
import ExtendedKy from "../../Common/ExtendedKy";
import InputMask from "react-input-mask";
import validator from "validator/es";
import emailjs from "emailjs-com";

const FilterUsersList = ({searchText, sortDateByDesc, onChangeSearchText, onChangeRole, onChangeDateSorting}) => {
    const [isModalAdd, setIsModalAdd] = useState(false)
    const [rPassword, setRPassword] = useState('')
    const [sendRegMail, setSendRegMail] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [savedUser, setSavedUser] = useState({
        lastName: '',
        firstName: '',
        patronymic: '',
        phone: '',
        email: '',
        role: 0,
        password: ''
    });

    const inputStyle = 'border border-darkGray p-2 rounded-lg shadow-sm focus:outline-none focus:border-Accent_light text-xs sm:text-base mt-2'

    function isModalAddChange() {
        setIsModalAdd((prev) => !prev)
        for (const key in savedUser) {
            if (savedUser.hasOwnProperty(key)) {
                savedUser[key] = '';
            }
        }
    }

    async function saveNewUser() {
        if (!savedUser.firstName || !savedUser.lastName) {
            alert('Заполните все поля.');
            return;
        }

        if (!validator.isEmail(savedUser.email)) {
            alert('Введите корректный адрес электронной почты.');
            return;
        }

        if (savedUser.phone.includes('_') || !savedUser.phone) {
            alert('Введите корректный номер телефона.');
            return;
        }

        if (rPassword !== savedUser.password) {
            alert('Введенные пароли не совпадают.');
            return;
        }

        if (!validator.isStrongPassword(savedUser.password)) {
            alert('Сложность пароля не отвечает требованиям безопасности.');
            return;
        }
        setIsLoading(true)
        let nonHashPassword = savedUser.password
        savedUser.password = sha256(savedUser.password);
        savedUser.phone = formatPhoneNumber(savedUser.phone);

        try {
            const response = await ExtendedKy.post('users', {json: savedUser});
            if (sendRegMail) {
                sendMail(nonHashPassword)
            }
            else
            {
                setIsLoading(false)
                alert('Сохранено')
                setIsModalAdd(false)
            }
        } catch (error) {
            console.error('Failed to save new user:', error);
            alert('Не удалось сохранить нового пользователя.');
            setIsLoading(false)
        }
    }

    function sendMail(nonHashPassword) {

        const templateParams = {
            userEmail: savedUser.email,
            userFullName: savedUser.lastName + ' ' + savedUser.firstName + ' ' + savedUser.patronymic,
            userPassword: nonHashPassword
        };

        switch (savedUser.role) {
            case 0:
                templateParams.userRole = 'Пользователь'
                break
            case 1:
                templateParams.userRole = 'Техник'
                break
            case 2:
                templateParams.userRole = 'Администратор'
                break
        }

        emailjs.send('service_58empoa', 'template_8uv60ai', templateParams, '9UvieRKIjqQahLyKs')
            .then((result) => {
                setIsLoading(false)
                isModalAddChange();
                alert('Успешно отправлено!')
            }, (error) => {
                console.log(error)
                setIsLoading(false)
            });
    }

    const handleChange = (selected) => {
        savedUser.role = selected
    };

    function formatPhoneNumber(phoneNumber) {
        const numericPhoneNumber = phoneNumber.replace(/\D/g, '');

        return numericPhoneNumber;
    }

    const changeSendRegMail = () => {
        setSendRegMail(!sendRegMail)
    }

    return (
        <div>
            {isModalAdd &&
                <>

                    <div className='z-50 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg min-w-[250px] sm:min-w-[400px] gradient-border border'>
                        <div className='z-50 bg-white w-full p-2 shadow-formShadow rounded-tr-lg rounded-tl-lg flex justify-center'>
                            <p className='sm:text-2xl text-base'>Регистрация</p>
                        </div>

                        <div className='py-2 px-4 flex flex-col'>
                            <input
                                className={inputStyle}
                                placeholder='Фамилия'
                                maxLength={102}
                                value={savedUser.lastName}
                                onChange={(event) => setSavedUser({...savedUser, lastName: event.target.value})}/>
                            <input
                                className={inputStyle}
                                placeholder='Имя'
                                maxLength={102}
                                value={savedUser.firstName}
                                onChange={(event) => setSavedUser({...savedUser, firstName: event.target.value})}/>
                            <input
                                className={inputStyle}
                                placeholder='Отчество'
                                maxLength={102}
                                value={savedUser.patronymic}
                                onChange={(event) => setSavedUser({...savedUser, patronymic: event.target.value})}/>
                            <InputMask
                                className={inputStyle}
                                placeholder='Телефон'
                                type='tel'
                                mask="+7 (999) 999-99-99"
                                value={savedUser.phone}
                                onChange={(event) => setSavedUser({...savedUser, phone: event.target.value})}/>
                            <input
                                className={`${inputStyle} mb-2`}
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
                                className={inputStyle}
                                placeholder='Пароль'
                                type={"password"}
                                autoComplete={'new-password'}
                                value={savedUser.password}
                                onChange={(event) => setSavedUser({...savedUser, password: event.target.value})}/>

                            <input
                                type={"password"}
                                className={inputStyle}
                                placeholder='Повтор пароля'
                                autoComplete={'new-password'}
                                onChange={(event) => setRPassword(event.target.value)}/>

                            <div className='flex justify-start mt-2'>
                                <input className=''
                                       type={"checkbox"}
                                       onChange={changeSendRegMail}
                                />
                                <span className='ml-2'>Отправить письмо</span>

                                {isLoading && (
                                    <div className="fixed inset-0 flex items-center justify-center">
                                        <div className="bg-gray-100 shadow-formShadow px-4 py-3 rounded-lg z-50 flex items-center">
                                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-Accent_light sm:w-8 sm:h-8" xmlns="http://www.w3.org/2000/svg"
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