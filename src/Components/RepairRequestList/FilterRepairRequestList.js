import React from "react";
import Select from "../Select";
import filter_date_up from "../../Resources/filter_date_up.svg"
import filter_date_down from "../../Resources/filter_date_down.svg"

const FilterRepairRequestList = ({
                                     searchText,
                                     onChangeSearchText,
                                     onChangeRequestStatus,
                                     onChangeDeviceType,
                                     onChangeDateSorting,
                                     sortDateByDesc,
                                     children
                                 }) => {

    const deviceOptions = [
        {value: 0, label: 'Компьютер'},
        {value: 1, label: 'Принтер'},
        {value: 2, label: 'Камера'},
    ];

    const statusOptions = [
        {value: 0, label: 'В работе'},
        {value: 1, label: 'Активные'},
        {value: 2, label: 'Архив'},
        {value: 3, label: 'Отменённые'},
    ];

    const handleChange = (selected) => {
        onChangeDeviceType(selected)
    };

    return (
        <div className=''>
            <div className='flex mt-4'>
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

            <div className='my-2 flex justify-between gap-1 sm:gap-3'>
                <Select onChange={(e) => onChangeRequestStatus(e)}
                        options={statusOptions}
                        isMulti={false}
                        defaultValue={statusOptions[0]}
                        placeholder='Статус заявки'
                />
                <Select onChange={handleChange}
                        options={deviceOptions}
                        isMulti={true}
                        defaultValue={deviceOptions[0]}
                        placeholder='Тип оборудования'
                />
            </div>
            {children}
        </div>
    );
};

export default FilterRepairRequestList;