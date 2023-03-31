import React from 'react';
import {Link} from "react-router-dom";

const Card = ({title, linkToDetails, image, footerTitle, footerValue, children}) => {
    const date = new Date(footerValue).toLocaleDateString()

    return (
        <div className='my-2 p-2 shadow-formShadow rounded-lg'>
            <div className='flex'>
                <div className='bg-gray-100 p-2 rounded-lg flex-shrink-0 flex items-center'>
                    {image}
                </div>
                <div className={'ml-2 flex flex-col flex-1 justify-start'}>
                    <Link className='text-xl font-medium opacity-80' to={linkToDetails}>{title}</Link>

                    {children}

                    <div className='bg-gray-100 rounded-lg py-0.5 mt-1 px-3 hidden sm:flex sm:justify-between'>
                        <p className='text-sm'>{footerTitle}</p>
                        <p className='text-sm'>{date}</p>
                    </div>
                </div>
            </div>
            <div className='bg-gray-100 rounded-lg py-0.5 mt-1 px-3 flex justify-between sm:hidden'>
                <p className='text-sm'>{footerTitle}</p>
                <p className='text-sm'>{date}</p>
            </div>
        </div>
    );
};

export default Card;