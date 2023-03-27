import React, {useState} from 'react';
import FilterRepairRequestList from "./FilterRepairRequestList";
import {RepairRequestList} from "./RepairRequestList";

const FilterableRepairRequestList = () => {
    const [searchText, setSearchText] = useState('')
    const [requestStatus, setRequestStatus] = useState(0)
    const [deviceTypes, setDeviceTypes] = useState(['0'])
    const [sortDateByDesc, setSortDateByDesc] = useState(false)

    const handleSearchTextChange = (searchText) => {
        setSearchText(searchText)
    }

    const handleRequestStatus = (requestStatus) => {
        setRequestStatus(requestStatus)
    }

    const handelDeviceType = (type, isChecked) => {
        setDeviceTypes(type)
    }

    const handleDateSorting = () => {
        setSortDateByDesc((prev) => !prev)
    }

    return (
        <>
            <FilterRepairRequestList
                searchText={searchText}
                onChangeSearchText={handleSearchTextChange}
                onChangeRequestStatus={handleRequestStatus}
                onChangeDeviceType={handelDeviceType}
                onChangeDateSorting={handleDateSorting}
            />
            <RepairRequestList
                searchText={searchText}
                requestStatus={requestStatus}
                deviceTypes={deviceTypes}
                sortDateByDesc={sortDateByDesc}
            />
        </>
    );
};

export default FilterableRepairRequestList;