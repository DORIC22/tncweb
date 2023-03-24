import React from 'react'

export const Wrapper = ({ children }) => {
    return(
        <div className='container mx-auto px-3 min-h-screen flex items-center justify-center h-screen flex-col'>
            {children}
        </div>
    )
}