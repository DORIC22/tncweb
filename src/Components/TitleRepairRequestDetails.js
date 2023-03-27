import React from 'react';
import Select from "./Select";

const TitleRepairRequestDetails = (props) => {
    const {date, requestNumber, status} = props

    const statusOptions = [
        {value: 0, label: 'В работе'},
        {value: 1, label: 'Активные'},
        {value: 2, label: 'Завершённые'},
        {value: 3, label: 'Архив'},
    ];

    return (
        <div className='mt-4 flex sm:items-center'>
            <div className='w-full sm:flex'>
                <p className='font-bold text-xs sm:text-base'>Заявка №: {requestNumber}</p>
                <p className='font-bold text-xs sm:text-base sm:ml-4'>От {date}</p>
            </div>
            <Select options={statusOptions}
                    defaultValue={statusOptions.find(x => x.value === status)}/>
        </div>
    );
};

export default TitleRepairRequestDetails;