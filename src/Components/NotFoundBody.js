import React from 'react';
import NotFoundImage from "../Resources/NotFoundImage.svg"

const NotFoundBody = () => {
    return (
        <div>
            <div className='flex justify-center'>
                <p className='sm:text-5xl text-2xl'>Ошибка 404</p>
            </div>
            <div className='flex justify-center sm:p-12 p-6'>
                <img src={NotFoundImage} className='sm:w-[200px]'/>
            </div>
            <div className="flex h-full items-center">
                <p className="text-center sm:text-base text-sm">Похоже возникла какая-то ошибка, мы уже работаем над её исправлением,<br/>попробуйте позже.</p>
            </div>
        </div>
    );
};

export default NotFoundBody;