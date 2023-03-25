import React, { useState } from "react";
import Select from "react-select";
import makeAnimated from 'react-select/animated';

const FilterRepairRequestList = (props) => {
    const {
        searchText,
        requestStatus,
        onChangeSearchText,
        onChangeRequestStatus,
        onChangeDeviceType,
    } = props;

    const options = [
        { value: "0", label: "Компьютер" },
        { value: "1", label: "Принтер" },
        { value: "2", label: "Камера" },
    ];

    const animatedComponents = makeAnimated();

    const handleChange = (selected) => {
        onChangeDeviceType(
            selected.map((option) => option.value),
            true
        );
    };

    return (
        <div className='w-full'>
            <div className='flex justify-between mt-2'>
                <input
                    className='w-full border border-darkGray px-1 py-1 rounded-lg shadow-sm focus:outline-none focus:border-Accent_light'
                    placeholder="Поиск"
                    value={searchText}
                    onChange={(e) => onChangeSearchText(e.target.value)}
                />
                <p className='ml-2'>Дата</p>
            </div>

            <div className='flex justify-between mt-2'>
                <select
                    className='border border-darkGray rounded-lg'
                    value={requestStatus}
                    onChange={(e) => onChangeRequestStatus(e.target.value)}
                >
                    <option value="0">В работе</option>
                    <option value="1">Активные</option>
                    <option value="2">Завершенные</option>
                    <option value="3">Отмененные</option>
                </select>


                <Select className='text-xs ml-2 w-full
                   sm:text-base h-full mx-auto w-full'
                        isClearable={false}
                        components={animatedComponents}
                        onChange={handleChange}
                        options={options}
                        isMulti
                        isSearchable={false}
                        defaultValue={[options[0]]}
                        placeholder='Тип оборудования'
                    />
            </div>
            {props.children}
        </div>
    );
};

export default FilterRepairRequestList;