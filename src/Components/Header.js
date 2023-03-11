import React, {useContext} from "react";

export default function Header(){
    return (
        <header>
            <div className='text-center block'>
                <span className='block text-3xl font-black'>TNC Web</span>
                <span className='block mt-2.5'>Система учёта состояния сетевого оборудования</span>
            </div>
        </header>
    )
}