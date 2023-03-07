import React, { useState } from "react";
import axios from "axios";
import validator from "validator/es";
export default function Header(){
    const [register, setRegister] = useState(() => {
        return {
            email: "",
            password: "",
        }
    })

    const changeInputRegister = event => {
        event.persist()
        setRegister(prev => {
            return {
                ...prev,
                [event.target.name]: event.target.value,
            }
        })
    }


    const submit = event => {
        event.preventDefault();
        if(!validator.isEmail(register.email)) {
            alert("Введите электронную почту!")
        }
        else {
            axios.get("http://www.youtube.com", {
                email: register.email,
                password: register.password,
            }).then(res => {
                if (res.data === true) {
                    window.location.href = "/auth"
                }
            }).catch(() => {
                alert("Проблема с сервером!")
            })
        }
    }


    return (
        <div className="align-middle">
            <div className='shadow-formShadow bg-darkGray bg-opacity-20 my-auto px-10 py-8 rounded-2xl '>
                <h2 className='text-center text-2xl font-black mb-6'>Авторизация:</h2>
                <form onSubmit={submit}>
                    <div className='mb-3.5 min-w-[350px]'>
                        <input className='w-full border border-darkGray px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:border-accentBlue'
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
                        <input className='w-full border border-darkGray px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:border-accentBlue'
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
                        <span className='text-xs mt-3'>Нет аккаунта?
                            <a href='#' className='text-accentBlue'>Подайте заявку на регистрацию</a>
                        </span>
                    </div>

                </form>
            </div>
        </div>
    )
}

