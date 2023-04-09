import React from "react";
import Select from "../Select";
import SearchBar from "../SearchBar";
import {DeviceOptions, RepairRequestStatusOptions} from "../../Common/SelectOptions";

const FilterRepairRequestList = ({
                                     searchText,
                                     onChangeSearchText,
                                     onChangeRequestStatus,
                                     onChangeDeviceType,
                                     onChangeDateSorting,
                                     sortDateByDesc,
                                     children
                                 }) => {

    const handleChange = (selected) => {
        onChangeDeviceType(selected)
    };

    return (
        <div>
            <SearchBar className='mt-4' searchText={searchText} sortDateByDesc={sortDateByDesc}
                       onChangeSearchText={onChangeSearchText}
                       onChangeDateSorting={onChangeDateSorting}/>

            <div className='my-2 flex justify-between gap-1 sm:gap-3'>
                <Select onChange={(e) => onChangeRequestStatus(e)}
                        options={RepairRequestStatusOptions}
                        isMulti={false}
                        defaultValue={RepairRequestStatusOptions[0]}
                        placeholder='Статус заявки'
                />
                <Select onChange={handleChange}
                        options={DeviceOptions}
                        isMulti={true}
                        defaultValue={DeviceOptions[0]}
                        placeholder='Тип оборудования'
                />
            </div>
            {children}
        </div>
    );
};

export default FilterRepairRequestList;