import React, {useEffect, useState} from 'react';
import validator from "validator/es";
import InputMask from 'react-input-mask';
import {Link} from "react-router-dom";
import emailjs from 'emailjs-com';


export default function RegistrationPage() {
    const [register, setRegister] = useState(() => {
        return {
            email: "",
            phoneNumber: "",
            firstName: "",
            lastName: "",
            patronymic: "",
            role: "",
            fullName: ""
        };
    });

    const [isFormValid, setIsFormValid] = useState(false);
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(register.email);
        setIsFormValid(
            register.email !== "" &&
            register.phoneNumber !== "" &&
            ((register.firstName !== "" && register.lastName !== "") || (register.fullName !== "")) &&
            isEmailValid
        );
    }, [register]);

    const changeInputRegister = (event) => {
        event.persist();
        setRegister((prev) => {
            return {
                ...prev,
                [event.target.name]: event.target.value,
            };
        });
    };

    const submit = async (e) => {
        e.preventDefault();

        if (register.role === undefined || register.role === "") {
            register.role = "1";
        }

        if (register.fullName !== "" && register.fullName !== undefined) {
            let fioMassive = register.fullName.split(" ")
            register.lastName = fioMassive[0]
            register.firstName = fioMassive[1]
            register.patronymic = fioMassive[2]

            alert("Входное значение FullName: " + register.fullName + "\nЧто в итоге получилось, lastname,firstname,patronymic: " +
                register.lastName + "\n" + register.firstName + "\n" + register.patronymic)
        }
        console.log(register.role)
        switch (register.role)
        {
            case '1':
                register.role = 'Администратор'
                break
            case '2':
                register.role = 'Техник'
                break
            case '3':
                register.role = 'Пользователь'
                break
        }
        sendMail();
    };

    const inputStyle = "w-full border border-darkGray px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:border-accentBlue"

    function sendMail() {
        console.log('ggbet')
        const templateParams = {
            from_name: register.firstName + ' ' + register.lastName + ' ' + register.patronymic,
            from_email: 'Net-Eye@yandex.ru',
            to_name: 'awesome.tnc@yandex.ru',
            userEmail: register.email,
            userPhoneNumber: register.phoneNumber,
            userRole: register.role
        };
        console.log(templateParams)
        setIsLoading(true)
        emailjs.send('service_58empoa', 'template_tgnnld8', templateParams, '9UvieRKIjqQahLyKs')
            .then((result) => {
                setIsLoading(false)
                alert('Успешно отправлено!')
                window.location.href = "/";
            }, (error) => {
                console.log(error)
                setIsLoading(false)
            });
    }

    return (
        <div className="align-middle flex flex-col justify-center items-center min-w-[300px] mt-8 2xl:mt-36 ">

            {isLoading&&
                <div className="inline-flex items-center absolute bg-gray-100 shadow-formShadow px-4 py-3 rounded-lg">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-Accent_light sm:w-8 sm:h-8" xmlns="http://www.w3.org/2000/svg"
                         fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                stroke-width="4"></circle>
                        <path className="opacity-75" fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647zM12 20.25a8.25 8.25 0 100-16.5 8.25 8.25 0 000 16.5z"></path>
                    </svg>
                    <span className='text-xs sm:text-base'>Отправляем письмо...</span>
                </div>

            }

            <div className="shadow-formShadow my-auto px-6 py-8 rounded-2xl bg-WhiteThemeMainColor1 min-w-[315px]">
                <h2 className="text-center text-2xl font-light mb-4">Регистрация:</h2>
                <div className="my-4 mx-auto border-b-4 border-Accent_light rounded-full"/>
                <form onSubmit={submit}>
                    <div className="mb-3.5">
                        <input
                            className={inputStyle}
                            type="email"
                            id="email"
                            placeholder="Почта"
                            name="email"
                            value={register.email}
                            onChange={changeInputRegister}
                            formNoValidate
                        />
                    </div>

                    <div className="mb-3.5">
                        <InputMask
                            className={inputStyle}
                            mask="+7 (999) 999-99-99"
                            type="tel"
                            id="phoneNumber"
                            placeholder="Телефон"
                            name="phoneNumber"
                            value={register.phoneNumber}
                            onChange={changeInputRegister}
                        />
                    </div>

                    {/* div на мобильный адаптив:*/}
                    <div className="mb-3.5
                    sm:hidden">
                        <input
                            className={inputStyle}
                            type="text"
                            id="fullName"
                            placeholder="ФИО"
                            name="fullName"
                            value={register.fullName}
                            onChange={changeInputRegister}
                        />
                    </div>

                    <div className="hidden
                    sm:flex justify-between">
                        <div className="mb-2 pr-1">
                            <input
                                className={inputStyle}
                                type="text"
                                id="lastName"
                                placeholder="Фамилия"
                                name="lastName"
                                value={register.lastName}
                                onChange={changeInputRegister}
                            />
                        </div>

                        <div className="mb-2">
                            <input
                                className={inputStyle}
                                type="text"
                                id="firstName"
                                placeholder="Имя"
                                name="firstName"
                                value={register.firstName}
                                onChange={changeInputRegister}
                                //required // добавляем атрибут required
                            />
                        </div>
                        <div className="mb-3.5 pl-1">
                            <input
                                className={inputStyle}
                                type="text"
                                id="patronymic"
                                placeholder="Отчество"
                                name="patronymic"
                                value={register.patronymic}
                                onChange={changeInputRegister}
                                //required // добавляем атрибут required
                            />
                        </div>
                    </div>


                    <div>
                        <select
                            id="role"
                            name="role"
                            value={register.role}
                            onChange={changeInputRegister}
                            className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm
                                       focus:outline-none focus:ring-accentBlue focus:border-accentBlue
                              sm:text-sm focus:bg-blue-100"
                            required
                        >
                            <option value="1">Администратор</option>
                            <option value="2">Техник</option>
                            <option value="3">Пользователь</option>
                        </select>
                    </div>
                    <div className="flex items-center justify-center flex-col">
                        <button
                            type="submit"
                            className={`px-12 py-2 rounded-lg mt-5 font-medium 
                                      ${isFormValid ? 'bg-Accent_light text-white' : 'bg-WhiteThemeMainColor2'}`}
                            disabled={
                                !validator.isEmail(register.email) ||
                                !register.email ||
                                !register.phoneNumber || !((!register.lastName || !register.firstName) || !register.fullName)
                            }
                        >
                            Подать заявку
                        </button>

                        <span className='text-xs font-light mt-3
                                        sm:text-sm'>Есть аккаунт?</span>
                        <Link className='text-xs text-Accent_light font-light
                                     sm:text-sm' to='/'>Пройдите авторизацию</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}
