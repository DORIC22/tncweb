import React, {useContext} from "react";

export default function Header(){
    return (
        <header>
            <div className='text-center block'>
                <span className='block text-4xl font-black sm:text-5xl'>TNC Web</span>
                <span className='block mt-2.5 text-xs sm:text-2xl'>Система учёта состояния сетевого оборудования</span>
            </div>
        </header>
    )
}