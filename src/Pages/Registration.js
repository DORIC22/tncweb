import React, { useState, useEffect } from 'react';
import ky from "ky";
import validator from "validator/es";
import InputMask from 'react-input-mask';
import {message} from "react-widgets/PropTypes";

export default function Registration() {
    const [register, setRegister] = useState(() => {
        return {
            email: "",
            phoneNumber: "",
            firstName: "",
            lastName: "",
            patronymic: "",
            role: ""
        };
    });

    const [isFormValid, setIsFormValid] = useState(false);

    useEffect(() => {
        const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(register.email);
        setIsFormValid(
            register.email !== "" &&
            register.phoneNumber !== "" &&
            register.firstName !== "" &&
            register.lastName !== "" &&
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

        console.log(register);
        alert("Форма успешно отправлена!\n" +
            "В случае регистрации, вы получите письмо на указанный вами адрес электронный почты.\n" +
            "Вы будете перенаправлены на страницу авторизации.");
        window.location.href = "/";
        // Если все валидно, то по кнопке попадаем сюда.
    };

    const inputStyle = "w-full border border-darkGray px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:border-accentBlue"

    return (
        <div className="align-middle flex justify-center items-center h-screen max-w-[575px]">
            <div className="shadow-formShadow bg-darkGray bg-opacity-20 my-auto px-10 py-8 rounded-2xl">
                <h2 className="text-center text-2xl font-black mb-4">Регистрация:</h2>
                <div className="my-4 mx-auto border-b-4 border-blue-500 rounded-full" style={{ borderColor: '#839BFF' }}></div>
                <form onSubmit={submit}>
                    <div className="mb-3.5 min-w-[350px]">
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

                    <div className="mb-3.5 min-w-[350px]">
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

                    <div class="flex justify-between">
                        <div className="mb-2 min-w-[100px] pr-1">
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

                        <div className="mb-2 min-w-[100px]">
                            <input
                                className={inputStyle}
                                type="text"
                                id="firstName"
                                placeholder="Имя"
                                name="firstName"
                                value={register.firstName}
                                onChange={changeInputRegister}
                                required // добавляем атрибут required
                            />
                        </div>
                        <div className="mb-3.5 min-w-[100px] pl-1">
                            <input
                                className={inputStyle}
                                type="text"
                                id="patronymic"
                                placeholder="Отчество"
                                name="patronymic"
                                value={register.patronymic}
                                onChange={changeInputRegister}
                                required // добавляем атрибут required
                            />
                        </div>
                    </div>


                    <div>
                        <select
                            id="role"
                            name="role"
                            value={register.role}
                            onChange={changeInputRegister}
                            className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-accentBlue focus:border-accentBlue sm:text-sm focus:bg-blue-100"
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
                            className={`px-12 py-2 rounded-lg mt-5 font-medium ${isFormValid ? 'bg-accentBlue' : 'bg-primary'}`}
                            disabled={
                                !validator.isEmail(register.email) ||
                                !register.email ||
                                !register.phoneNumber ||
                                !register.lastName ||
                                !register.firstName ||
                                !register.patronymic
                            }
                            style={{backgroundColor: isFormValid ? '#839BFF' : null}}
                        >
                            Подать заявку
                        </button>


                        <span className="text-xs mt-3">Уже есть аккаунт?
                          <a href="/" className="text-accentBlue">Пройдите авторизацию</a>
                        </span>
                    </div>
                </form>
            </div>
        </div>
    )
}
