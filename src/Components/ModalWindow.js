import React, {useState} from 'react';

const ModalWindow = ({isOpen, title, width, widthSm, children, buttons}) => {
    const [isOpenModal, setIsOpenModal] = useState(isOpen)

    if (!isOpen) {
        return null;
    }

    return (
        <>
            <div
                className={`fixed z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
                    bg-white px-2 py-2 rounded-lg min-w-[${width}px] gradient-border border
                    sm:px-6 sm:min-w-[${widthSm}px]`}>
                <div className=''>
                    <div className='flex justify-center'>
                        <p className='text-sm sm:text-base'>{title}</p>
                    </div>
                    {children}
                    <div className='flex justify-center'>
                        {
                            buttons.map(button =>
                                <button className={button.className} onClick={button.onClick}>{button.content}</button>)
                        }
                    </div>
                </div>
            </div>

            <div className='fixed top-0 left-0 w-full h-full bg-black opacity-50 z-40'
                 onClick={() => setIsOpenModal(prev => !prev)}/>
        </>
    );
};

export default ModalWindow;