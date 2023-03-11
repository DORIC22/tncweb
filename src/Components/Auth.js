import React, {useContext, useEffect, useState} from "react";
import ky from 'ky'
import validator from "validator/es";
import { AuthContext } from "../hoc/AuthProvider";
import {Link} from "react-router-dom";

export default function Header(){
    const { loginUser } = useContext(AuthContext)

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

        console.log('Submit')
        alert('gdgdgdf')

        await loginUser(register.email, register.password)

        //window.location.href = "/home"

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
                        <Link to='/home'>
                            <button>НАЖМИ НА МЕНЯ СУККА</button>
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

