import React, {useState} from 'react';
import FilterRepairRequestList from "./FilterRepairRequestList";
import { RepairRequestList } from "./RepairRequestList";

const FilterableRepairRequestList = () => {
    const [searchText, setSearchText] = useState('')
    const [requestStatus, setRequestStatus] = useState(0)
    const [deviceTypes, setDeviceTypes] = useState([])

    const handleSearchTextChange = (searchText) => {
        setSearchText(searchText)
    }

    const handleRequestStatus = (requestStatus) => {
        setRequestStatus(requestStatus)
    }

    const handelDeviceType = (type, isChecked) => {
        console.log(type)
        console.log(isChecked)

        if (isChecked){
            setDeviceTypes([...deviceTypes, type])
        }
        else{
            const newValue = deviceTypes.filter(t => t !== type)
            setDeviceTypes(newValue)
        }
    }

    return (
        <div>
            <FilterRepairRequestList
                searchText = {searchText}
                requestStatus = {requestStatus}
                onChangeSearchText = {handleSearchTextChange}
                onChangeRequestStatus = {handleRequestStatus}
                onChangeDeviceType = {handelDeviceType}
            />

            <RepairRequestList
                searchText = {searchText}
                requestStatus = {requestStatus}
                deviceTypes = {deviceTypes}
            />
        </div>
    );
};

export default FilterableRepairRequestList;