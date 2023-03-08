import React, { useState } from "react";
import ky from 'ky'
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


    const submit = async (e) => {
        e.preventDefault()

        const user = await ky.get('http://192.168.0.107:7119/api/users?email=' + register.email, {
                headers: {
                    'x-apikey': '59a7ad19f5a9fa0808f11931',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                }
            }
        ).json();

        console.log(user)
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
                            <a href='/home' className='text-accentBlue'>Подайте заявку на регистрацию</a>
                        </span>
                    </div>

                </form>
            </div>
        </div>
    )
}

