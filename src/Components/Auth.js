import React, {useContext, useEffect, useState} from "react";
import {AuthContext} from "../hoc/AuthProvider";
import {Link, useNavigate} from "react-router-dom";

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
                            sm:px-10 2xl:py-8 sm:min-w-[500px] md:py-2 border-Accent_light border-b-4'>
                <h2 className='text-center text-2xl font-medium mb-6
                               sm:text-3xl'>
                    Авторизация:
                </h2>
                <div className="my-4 mx-auto border-b-4 border-Accent_light rounded-full"/>
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
                            <input type="checkbox"
                                   name="cbRememberMe"
                                   id="cbRememberMe"
                                   className='mr-2 h-5 w-5 align-middle'
                                   checked={rememberMe}
                                   onChange={(e) => setRememberMe(e.target.checked)}
                            />
                            <span className='align-middle h-5 leading-5'>Запомнить меня</span>
                        </label>
                    </div>

                    <div className='flex items-center justify-center flex-col'>
                        <button
                            className={`flex justify-center items-center px-12 py-2 rounded-lg mt-5 font-medium sm:px-20 ${
                                isFormValid ? "bg-Accent text-white" : "bg-WhiteThemeMainColor2 text-black"
                            }`}
                            type="submit"
                            disabled={!isFormValid || isLoading}
                        >
                            {isLoading ? (
                                <svg aria-hidden="true" role="status"
                                     className="inline w-6 h-6 mx-[14.5px] text-white animate-spin"
                                     viewBox="0 0 100 101"
                                     fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                        fill="#E5E7EB"/>
                                    <path
                                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                        fill="currentColor"/>
                                </svg>
                            ) : (
                                "Войти"
                            )}
                        </button>

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
