import React from 'react'

export const Wrapper = ({children}) => {
    return (
        <div className='container px-4 lg:px-36 mx-auto flex flex-col justify-start flex-1 mt-[50px]'>
            {children}
        </div>
    )
}