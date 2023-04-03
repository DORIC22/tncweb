import React from 'react';
import filter_date_up from "../Resources/filter_date_up.svg";
import filter_date_down from "../Resources/filter_date_down.svg";

const SearchBar = ({className, searchText, sortDateByDesc, onChangeSearchText, onChangeDateSorting}) => {
    return (
        <div className={`flex ${className}`}>
            <input
                className='w-full gradient-border border border-darkGray px-1 py-1 rounded-lg shadow-sm focus:outline-none focus:border-Accent_light text-xs sm:text-base'
                placeholder="Поиск"
                value={searchText}
                onChange={(e) => onChangeSearchText(e.target.value)}
            />
            <div className='flex gap-2 ml-2'>
                <button className={'gradient-border border rounded-lg px-1 py-0.5'} onClick={onChangeDateSorting}>
                    {
                        sortDateByDesc ? <img src={filter_date_up} className='w-[25px] h-[25px]'/> :
                            <img src={filter_date_down} className='w-[25px] h-[25px]'/>
                    }
                </button>
            </div>
        </div>
    );
};

export default SearchBar;