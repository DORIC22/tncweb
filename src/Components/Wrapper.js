import React from 'react'

export const Wrapper = ({ children }) => {
    return(
        <div className='container mx-auto flex flex-col items-center justify-start flex-1 mt-[50px]'>
            {children}
        </div>
    )
}