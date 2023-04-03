import React from 'react';
import SearchBar from "../SearchBar";
import Select from "../Select";
import {RoleOptions} from "../../SelectOptions";

const FilterUsersList = ({searchText, sortDateByDesc, onChangeSearchText, onChangeRole, onChangeDateSorting}) => {
    return (
        <div>
            <SearchBar className={'mt-4'} onChangeSearchText={onChangeSearchText}
                       onChangeDateSorting={onChangeDateSorting}
                       searchText={searchText}
                       sortDateByDesc={sortDateByDesc}/>
            <div className='flex justify-between mt-3'>
                <div className='sm:w-2/3 w-1/2'>
                    <Select options={RoleOptions} defaultValue={RoleOptions[0]} onChange={onChangeRole}/>
                </div>
                <button
                    className='bg-Accent sm:px-6 sm:base text-sm rounded-lg py-0 px-2 text-white sm:ml-5 ml-2 sm:w-1/3 w-1/2'>
                    Добавить
                </button>
            </div>
        </div>
    );
};

export default FilterUsersList;