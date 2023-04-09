import React, {useState} from 'react';

const ModalWindow = ({isOpen, title, width, widthSm, children, buttons}) => {
    const [isOpenModal, setIsOpenModal] = useState(isOpen)

    if (!isOpen) {
        return null;
    }

    const defaultButtonsClassName = 'bg-Accent px-6 w-2/3 text-white sm:py-2 py-1 rounded-lg shadow-formShadow sm:w-2/5 sm:my-5 my-3 mx-1';

    return (
        <>
            <div className={`fixed z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
                    bg-white rounded-lg min-w-[${width}px] gradient-border border
                    sm:min-w-[${widthSm}px]`}>
                <div className=''>
                    <div
                        className='z-50 bg-white w-full p-2 shadow-formShadow rounded-tr-lg rounded-tl-lg flex justify-center'>
                        <p className='font-medium sm:text-xl text-base'>{title}</p>
                    </div>
                    <div className='p-3'>
                        {children}
                        <div className='flex flex-row-reverse justify-center'>
                            {
                                buttons.map(button =>
                                    <button className={button.className || defaultButtonsClassName}
                                            onClick={button.onClick}>{button.content}</button>)
                            }
                        </div>
                    </div>
                </div>
            </div>

            <div className='fixed top-0 left-0 w-full h-full bg-black opacity-50 z-40'
                 onClick={() => setIsOpenModal(prev => !prev)}/>
        </>
    );
};

export default ModalWindow;