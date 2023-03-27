import React, {useContext, useEffect, useRef, useState} from "react";
import {AuthContext} from "../hoc/AuthProvider";
import {Link, useNavigate} from "react-router-dom";

export default function Header() {
    const {loginUser, isLoggedIn} = useContext(AuthContext);
    const navigate = useNavigate()
    const linkToHome = useRef(null);
    const [rememberMe, setRememberMe] = useState(false);

    const handleRememberMeChange = (event) => {
        setRememberMe(event.target.checked);
    };


    const [register, setRegister] = useState(() => {
        return {
            email: "",
            password: "",
        };
    });

    //если стоит чекбокс
    const loginUserOnInit = async () => {
        if (localStorage.getItem("UserAuth") === "true") {
            const email = localStorage.getItem("email");
            const password = localStorage.getItem("password");
            await loginUser(email, password, rememberMe);
        }
    };

    (async () => {
        await loginUserOnInit();
    })();


    useEffect(() => {
        if (isLoggedIn) {
            navigate("/repair-requests")
        }
    }, [isLoggedIn, navigate])

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
        console.log('Submit');
        if (localStorage.getItem("UserAuth") === "true") {
            register.email = localStorage.getItem("email")
            register.password = localStorage.getItem("password")
        }
        await loginUser(register.email, register.password, rememberMe);
    };

    const [isFormValid, setIsFormValid] = useState(false);

    useEffect(() => {
        // Проверяем, что email и password не пустые строки
        setIsFormValid(register.email !== "" && register.password !== "");
    }, [register.email, register.password]);

    return (
        <div className="align-middle">
            <div className='shadow-formShadow bg-WhiteThemeMainColor1 min-w-[315px] p-6 my-auto rounded-2xl
                            sm:px-10 sm:py-8 sm:min-w-[500px]'>
                <h2 className='text-center text-2xl font-medium mb-6
                               sm:text-3xl'>
                    Авторизация:
                </h2>
                <div className="my-4 mx-auto border-b-4 border-Accent_light rounded-full"/>
                <form onSubmit={submit}>
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
                                   onChange={handleRememberMeChange}
                            />
                            <span className='align-middle h-5 leading-5'>Запомнить меня</span>
                        </label>
                    </div>

                    <div className='flex items-center justify-center flex-col'>
                        <button className='bg-WhiteThemeMainColor2 px-12 py-2 rounded-lg mt-5 font-medium
                                           sm:px-20' type="submit"
                                disabled={!isFormValid}>
                            Войти
                        </button>
                        {/* задаем ref для ссылки на страницу Home */}
                        <Link to='/home' ref={linkToHome} className='hidden'>
                            <button>ссылка - переход</button>
                        </Link>
                        <span className='text-xs font-light mt-3
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
