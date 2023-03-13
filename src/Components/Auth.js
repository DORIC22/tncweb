import React, { useContext, useEffect, useRef, useState } from "react";
import ky from 'ky'
import validator from "validator/es";
import { AuthContext } from "../hoc/AuthProvider";
import { Link } from "react-router-dom";

export default function Header() {
    const {loginUser, isLoggedIn} = useContext(AuthContext);

    const [register, setRegister] = useState(() => {
        return {
            email: "",
            password: "",
        };
    });

    const linkToHome = useRef(null);

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
        await loginUser(register.email, register.password);
    };

    useEffect(() => {
        if (isLoggedIn) {
            linkToHome.current.click();
        }
    }, [isLoggedIn]);

    return (
        <div className="align-middle">
            <div className='shadow-formShadow bg-darkGray bg-opacity-20 my-auto px-10 py-8 rounded-2xl '>
                <h2 className='text-center text-2xl font-black mb-4'>Авторизация:</h2>
                <div className="my-4 mx-auto border-b-4 border-blue-500 rounded-full" style={{ borderColor: '#839BFF' }}></div>
                <form onSubmit={submit}>
                    <div className='mb-3.5 min-w-[350px]'>
                        <input
                            className='w-full border border-darkGray px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:border-accentBlue'
                            type="email"
                            id="email"
                            placeholder='Email'
                            name="email"
                            value={register.email}
                            onChange={changeInputRegister}
                            formNoValidate
                        />
                    </div>

                    <div className='mb-2 min-w-[350px]'>
                        <input
                            className='w-full border border-darkGray px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:border-accentBlue'
                            type="password"
                            id="password"
                            placeholder="Пароль"
                            name="password"
                            value={register.password}
                            onChange={changeInputRegister}
                        />
                    </div>

                    <div className='flex items-center justify-center flex-col'>
                        <button type="submit" className='bg-primary px-12 py-2 rounded-lg mt-5 font-medium'>
                            Войти
                        </button>
                        {/* задаем ref для ссылки на страницу Home */}
                        <Link to='/home' ref={linkToHome} style={{display: 'none'}}>
                            <button>ссылка - переход</button>
                        </Link>
                        <span className='text-xs mt-3'>Нет аккаунта?
              <a href='/Registration' className='text-accentBlue'>Подайте заявку на регистрацию</a>
            </span>
                    </div>

                </form>
            </div>
        </div>
    )
}