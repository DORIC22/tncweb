import React, {useState} from 'react';

const FilterRepairRequestList = (props) => {
    const {
        searchText,
        requestStatus,
        onChangeSearchText,
        onChangeRequestStatus,
        onChangeDeviceType
    } = props

    return (
        <div>
            <div>
                <input
                    placeholder='Поиск'
                    value={searchText}
                    onChange={(e) => onChangeSearchText(e.target.value)} />
            </div>

            <div>
                <select value={requestStatus}
                        onChange={(e) => onChangeRequestStatus(e.target.value)}>
                    <option value='0'>В работе</option>
                    <option value='1'>Активные</option>
                    <option value='2'>Завершенные</option>
                    <option value='3'>Отмененные</option>
                </select>
            </div>

            <div>
                <h3>Тип оборудования</h3>
                <div >
                    <label >
                        <input type="checkbox" value='0'
                               onChange={(e) => onChangeDeviceType(
                            e.target.value, e.target.checked)} />
                        <span>Компьютер</span>
                    </label>
                    <label >
                        <input type="checkbox" value='1'
                               onChange={(e) => onChangeDeviceType(
                            e.target.value, e.target.checked)} />
                        <span>Принтер</span>
                    </label>
                    <label >
                        <input type="checkbox" value='2'
                               onChange={(e) => onChangeDeviceType(
                            e.target.value, e.target.checked)} />
                        <span>Камера</span>
                    </label>
                </div>
            </div>

            {props.children}
        </div>
    );
};

export default FilterRepairRequestList;