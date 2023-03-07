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


    const submitChackin = event => {
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
        <div className="auth">
            <h2 align="Center">Авторизация:</h2>
            <form onSubmit={submitChackin}>
                <p>Email: <input
                    type="email"
                    id="email"
                    name="email"
                    value={register.email}
                    onChange={changeInputRegister}
                    formNoValidate
                /></p>
                <p>Password: <input
                    type="password"
                    id="password"
                    name="password"
                    value={register.password}
                    onChange={changeInputRegister}
                /></p>
                <div className="auth-container-btn">
                    <button type="submit" className="auth-btn">Войти</button>
                </div>
            </form>
        </div>
    )
}

