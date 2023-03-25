import React, {useState} from 'react';
import FilterRepairRequestList from "./FilterRepairRequestList";
import { RepairRequestList } from "./RepairRequestList";

const FilterableRepairRequestList = () => {
    const [searchText, setSearchText] = useState('')
    const [requestStatus, setRequestStatus] = useState(0)
    const [deviceTypes, setDeviceTypes] = useState(['0'])

    const handleSearchTextChange = (searchText) => {
        setSearchText(searchText)
    }

    const handleRequestStatus = (requestStatus) => {
        setRequestStatus(requestStatus)
    }

    const handelDeviceType = (type, isChecked) => {
        console.log(type)
        console.log(isChecked)

        setDeviceTypes(type)

        /*if (isChecked){
            setDeviceTypes([...deviceTypes, type])
        }
        else{
            const newValue = deviceTypes.filter(t => t !== type)
            setDeviceTypes(newValue)
        }*/
    }

    return (
        <div className='h-full ms:flex justify-center items-center'>
            <div className='h-full'>
                <div className='flex justify-center items-center'>
                    <FilterRepairRequestList
                        searchText = {searchText}
                        requestStatus = {requestStatus}
                        onChangeSearchText = {handleSearchTextChange}
                        onChangeRequestStatus = {handleRequestStatus}
                        onChangeDeviceType = {handelDeviceType}
                    />
                </div>
                <div className='h-5/6'>
                    <RepairRequestList
                        searchText = {searchText}
                        requestStatus = {requestStatus}
                        deviceTypes = {deviceTypes}
                    />
                </div>
            </div>
        </div>
    );
};

export default FilterableRepairRequestList;