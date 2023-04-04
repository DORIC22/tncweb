import React, {useState} from 'react';
import SearchBar from "../SearchBar";
import Select from "../Select";
import {RoleOptions} from "../../SelectOptions";

const FilterUsersList = ({searchText, sortDateByDesc, onChangeSearchText, onChangeRole, onChangeDateSorting}) => {
    const [isModalAdd, setIsModalAdd] = useState(false)
    function isModalAddChange() {
        setIsModalAdd(!isModalAdd)
    }

    return (
        <div>
            {isModalAdd&&
                <>
                    <div className='z-50 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg min-w-[250px] sm:min-w-[400px] gradient-border border'>
                        <div className='z-50 bg-white w-full p-2 shadow-formShadow rounded-tr-lg rounded-tl-lg flex justify-center'>
                            <p className='sm:text-2xl text-base'>Регистрация</p>
                        </div>

                        <div className='py-2 px-4 flex flex-col'>
                            <input className='border border-darkGray p-2 rounded-lg shadow-sm focus:outline-none focus:border-Accent_light text-xs sm:text-base mt-2'
                                   placeholder='Фамилия'/>
                            <input className='border border-darkGray p-2 rounded-lg shadow-sm focus:outline-none focus:border-Accent_light text-xs sm:text-base mt-2'
                                   placeholder='Имя'/>
                            <input className='border border-darkGray p-2 rounded-lg shadow-sm focus:outline-none focus:border-Accent_light text-xs sm:text-base mt-2'
                                   placeholder='Отчество'/>
                            <input className='border border-darkGray p-2 rounded-lg shadow-sm focus:outline-none focus:border-Accent_light text-xs sm:text-base mt-2'
                                   placeholder='Телефон'/>
                            <input className='border border-darkGray p-2 rounded-lg shadow-sm focus:outline-none focus:border-Accent_light text-xs sm:text-base my-2'
                                   placeholder='Электронная почта'/>

                            <Select options={RoleOptions}
                                    defaultValue={RoleOptions[0]}
                            />

                            <input className='border border-darkGray p-2 rounded-lg shadow-sm focus:outline-none focus:border-Accent_light text-xs sm:text-base mt-2'
                                   placeholder='Пароль'/>
                            <input className='border border-darkGray p-2 rounded-lg shadow-sm focus:outline-none focus:border-Accent_light text-xs sm:text-base mt-2'
                                   placeholder='Повтор пароля'/>
                        </div>

                        <div className='flex justify-center'>
                            <button className='bg-Accent px-6 w-2/3 text-white sm:py-2 py-1 rounded-lg shadow-formShadow sm:w-2/5 sm:my-5 my-3'
                            onClick={isModalAddChange}>
                                Сохранить
                            </button>
                        </div>
                    </div>

                    <div className='fixed top-0 left-0 w-full h-full bg-black opacity-50 z-40'></div>
                </>
            }

            <SearchBar className={'mt-4'} onChangeSearchText={onChangeSearchText}
                       onChangeDateSorting={onChangeDateSorting}
                       searchText={searchText}
                       sortDateByDesc={sortDateByDesc}/>
            <div className='flex justify-between mt-3'>
                <div className='sm:w-2/3 w-1/2'>
                    <Select options={RoleOptions} defaultValue={RoleOptions[0]} onChange={onChangeRole}/>
                </div>
                <button
                    className='bg-Accent sm:px-6 sm:base text-sm rounded-lg py-0 px-2 text-white sm:ml-5 ml-2 sm:w-1/3 w-1/2'
                onClick={isModalAddChange}>
                    Добавить
                </button>
            </div>
        </div>
    );
};

export default FilterUsersList;