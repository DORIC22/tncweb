import React, { useState, useEffect } from 'react';
import validator from "validator/es";
import InputMask from 'react-input-mask';

export default function Registration() {
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

        if (register.fullName !== "" && register.fullName !== undefined)
        {
            let fioMassive = register.fullName.split(" ")
            register.lastName = fioMassive[0]
            register.firstName = fioMassive[1]
            register.patronymic = fioMassive[2]

            alert("Входное значение FullName: " + register.fullName + "\nЧто в итоге получилось, lastname,firstname,patronymic: " +
                register.lastName + "\n" + register.firstName + "\n" + register.patronymic)
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
        <div className="align-middle flex justify-center items-center h-screen min-w-[300px]">
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
                        <a className='text-xs text-Accent_light font-light
                                     sm:text-sm' href='/' >Пройдите авторизацию</a>
                    </div>
                </form>
            </div>
        </div>
    )
}
