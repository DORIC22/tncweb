import React, {useState} from 'react';
import CanSelectedLink from "./CanSelectedLink";

const BurgerMenu = ({options}) => {
    const [isActive, setIsActive] = useState(false)

    return (
        <div className={`relative my-auto md:hidden`}>
            <div className={`burger flex relative items-center justify-center w-6 h-5
            before:absolute before:h-[3px] before:rounded-lg before:w-full before:bg-Accent before:transition-all before:top-0
            after:absolute after:h-[3px] after:rounded-lg after:w-full after:bg-Accent after:transition-all after:bottom-0
            ${isActive && 'before:top-1/2 before:transform before:-rotate-45 before:-translate-y-1/2'}
            ${isActive && 'after:bottom-1/2 after:transform after:rotate-45 after:translate-y-1/2'}`}
                 onClick={() => setIsActive(prev => !prev)}>
                <span
                    className={`h-[3px] rounded-lg w-full bg-Accent scale-1 ${isActive && 'scale-0 transition duration-100 ease-in-out'}`}/>
            </div>
            <div
                className={`${isActive && 'opacity-100 pointer-events-auto'} opacity-0 pointer-events-none absolute bg-white top-[34px] py-5 bg-white border-t-[2px] border-Accent drop-shadow-md rounded-b
                        transition-opacity duration-500 ease-in-out`}>
                <ul>
                    {
                        options.map((opt, index) =>
                            <li key={index}
                                className={'mt-2 text-sm whitespace-nowrap w-full '}>
                                <CanSelectedLink to={opt.link}>{opt.label}</CanSelectedLink>
                            </li>
                        )
                    }
                </ul>
            </div>
        </div>

    );
};

export default BurgerMenu;