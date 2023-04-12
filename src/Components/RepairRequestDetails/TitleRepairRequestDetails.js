import React, {useState} from 'react';
import Select from "../Select";
import {RepairRequestStatusOptions} from "../../Common/SelectOptions";
import {useRepairRequestStore} from "../../Stores/Stores";

const TitleRepairRequestDetails = ({date, requestNumber, status}) => {
    const [selectedStatus, setSelectedStatus] = useState(status) // сохраняем значение выбранного статуса

    const repairNote = useRepairRequestStore(state => state.repairNote)

    const changeStatus = (e) => {

        useRepairRequestStore.setState(prev => ({...prev, status: e}))

        // сохраняем значение выбранного статуса при открытии модального окна
        setSelectedStatus(e)
    }

    return (
        <div className='mt-4 flex sm:items-center'>

            <div className='w-full sm:flex'>
                <h2 className='font-bold text-xs sm:text-2xl'>Заявка №: {requestNumber}</h2>
                <h2 className='font-bold text-xs sm:text-2xl sm:ml-4'>От {date}</h2>
            </div>
            <div className='w-1/2'>
                <Select options={RepairRequestStatusOptions}
                        defaultValue={RepairRequestStatusOptions.find(x => x.value === status)}
                        onChange={(e) => changeStatus(e)}
                        isEnabled={!repairNote}/>
            </div>
        </div>
    );
};

export default TitleRepairRequestDetails;