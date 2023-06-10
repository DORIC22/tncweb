import React, {useContext, useEffect, useState} from "react";
import {AuthContext} from "../hoc/AuthProvider";
import {Link, useNavigate} from "react-router-dom";
import LoaderButton from "./LoaderButton";

export default function Header() {
    const {loginUser, isLoggedIn} = useContext(AuthContext);
    const [rememberMe, setRememberMe] = useState(false)
    const [isFormValid, setIsFormValid] = useState(false)
    const [errorFormMessage, setErrorFormMessage] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()

    const [register, setRegister] = useState(() => {
        return {
            email: '',
            password: '',
        };
    });

    useEffect(() => {
        // Проверяем, что email и password не пустые строки
        setIsFormValid(register.email !== '' && register.password !== '');
    }, [register.email, register.password]);

    useEffect(() => {
        if (isLoggedIn) {
            navigate('/')
        }
    }, [isLoggedIn])

    const changeInputRegister = (event) => {
        event.persist()
        setRegister((prev) => {
            return {
                ...prev,
                [event.target.name]: event.target.value,
            }
        })
    }

    const submit = async (e) => {
        setIsLoading(true)

        if (e) {
            e.preventDefault()
        }

        console.log('Submit')

        const errorMessage = await loginUser(register.email, register.password, rememberMe)

        if (errorMessage) {
            setErrorFormMessage(errorMessage)
        }

        setIsLoading(false)
    }

    const handleKeyDown = async (event) => {
        if (event.key === 'Enter') {
            event.preventDefault()
            if (isFormValid) {
                await submit(null)
            }
        }
    }

    return (
        <div className="align-middle">
            <div className='shadow-formShadow bg-WhiteThemeMainColor1 min-w-[315px] p-6 my-auto rounded-2xl
                            sm:px-10 2xl:py-8 sm:min-w-[500px] md:py-2 border gradient-border'>
                <h2 className='text-center text-2xl font-medium mb-6
                               sm:text-3xl'>
                    Авторизация:
                </h2>
                <div
                    className="my-4 mx-auto h-[1px] border gradient-border rounded-full"></div>
                <form onSubmit={submit} onKeyDown={handleKeyDown}>
                    {errorFormMessage &&
                        <div className='my-2'>
                            <p className='text-base text-red-700 font-medium text-center'>
                                {errorFormMessage}</p>
                        </div>
                    }
                    <div className='mb-3.5'>
                        <input
                            className='w-full border border-darkGray px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:border-Accent_light'
                            type="email"
                            id="email"
                            placeholder='Email'
                            name="email"
                            value={register.email}
                            onChange={changeInputRegister}
                            formNoValidate
                        />
                    </div>

                    <div className='mb-2'>
                        <input
                            className='w-full border border-darkGray px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:border-Accent_light'
                            type="password"
                            id="password"
                            placeholder="Пароль"
                            name="password"
                            value={register.password}
                            onChange={changeInputRegister}
                        />
                    </div>

                    <div>
                        <label className='flex items-center'>
                            <div className="inline-flex items-center">
                                <label
                                    className="relative flex cursor-pointer items-center rounded-full p-3"
                                    htmlFor="checkbox-6"
                                    data-ripple-dark="true"
                                >
                                    <input
                                        type="checkbox"
                                        className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-indigo-500 checked:bg-indigo-500 checked:before:bg-indigo-500 hover:before:opacity-10"
                                        id="checkbox-6"
                                        defaultChecked
                                    />
                                    <div
                                        className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-3.5 w-3.5"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                            stroke="currentColor"
                                            stroke-width="1"
                                        >
                                            <path
                                                fill-rule="evenodd"
                                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                clip-rule="evenodd"
                                            ></path>
                                        </svg>
                                    </div>
                                </label>
                            </div>
                            <span className='align-middle h-5 leading-5'>Запомнить меня</span>
                        </label>
                    </div>

                    <div className='flex items-center justify-center flex-col'>
                        <LoaderButton isEnabled={isFormValid} isLoading={isLoading} type='submit'>
                            Войти
                        </LoaderButton>

                        <span className='text-xs font-light mt-2
                                        sm:text-sm'>Нет аккаунта?</span>
                        <Link className='text-xs text-Accent_light font-light
                                     sm:text-sm' to='/Registration'>
                            Подайте заявку на регистрацию
                        </Link>
                    </div>

                </form>
            </div>
        </div>
    )
}
