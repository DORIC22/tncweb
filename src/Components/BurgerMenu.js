import React, {useState} from 'react';

const BurgerMenu = ({ options }) => {
    const [isActive, setIsActive] = useState(false)

    return (
        <div className={`relative m-1`}>
            <div className={`burger flex relative items-center justify-end w-9 h-6 cursor-pointer
            before:absolute before:h-1 before:w-full before:bg-white before:transition-all before:top-0
            after:absolute after:h-1 after:w-full after:bg-white after:transition-all after:bottom-0
            ${isActive && 'before:top-1/2 before:transform before:-rotate-45 before:-translate-y-1/2'}
            ${isActive && 'after:bottom-1/2 after:transform after:rotate-45 after:translate-y-1/2'}`}
                 onClick={() => setIsActive(prev => !prev)}>
                <span className={`h-1 w-full bg-white scale-1 ${isActive && 'scale-0'}`}/>
            </div>
            {
                isActive && (
                    <div className={`absolute bg-white`}>
                        <ul>
                            {
                                options.map((opt, index) =>
                                    <li key={index}>
                                        <a href={opt.link}>{opt.label}</a>
                                    </li>
                                )
                            }
                        </ul>
                    </div>
                )
            }
        </div>

    );
};

export default BurgerMenu;