import React from 'react';
import NotFoundImage from "../Resources/NotFoundImage.svg"
import NotFoundBody from "../Components/NotFoundBody"

const NotFoundPage = () => {
    return (
        <div className='flex flex-col items-center pt-36 sm:pt-12 2xl:pt-36'>
            <NotFoundBody/>
        </div>
    );
};

export default NotFoundPage;