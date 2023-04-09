import React, {useState} from 'react';
import Select from "../Select";
import {RepairRequestStatusOptions} from "../../Common/SelectOptions";

const TitleRepairRequestDetails = ({date, requestNumber, status, onChangeStatus}) => {
    const [isModalCancel, setIsModalCancel] = useState(false)
    const [selectedStatus, setSelectedStatus] = useState(status) // сохраняем значение выбранного статуса

    function showModalCancel(e) {
        onChangeStatus(e[0])
        setSelectedStatus(e[0]) // сохраняем значение выбранного статуса при открытии модального окна

        if (isModalCancel === true)
            setIsModalCancel(false)
        if (e[0] === 3 || e[0] === 2) {
            setIsModalCancel(true)
        }
    }

    // используем сохраненное значение внутри модального окна
    function handleSave() {
        onChangeStatus(selectedStatus)
        setIsModalCancel(false)
    }

    return (
        <div className='mt-4 flex sm:items-center'>

            {isModalCancel &&
                <>
                    <div
                        className='z-50 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white sm:px-6 px-2 py-2 rounded-lg min-w-[250px] sm:min-w-[400px] gradient-border border'>
                        <div className=''>
                            <div className='flex justify-center'>
                                <p className='text-sm sm:text-base'>Примечание:</p>
                            </div>
                            <div className='flex justify-center my-4'>
                                <textarea
                                    className='w-full border border-darkGray px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:border-accentBlue sm:max-h-44 max-h-60'
                                    placeholder='Примечание...'
                                    maxLength={300}/>
                            </div>
                            <div className='flex justify-center'>
                                <button
                                    className='bg-Accent sm:py-3 sm:px-6 sm:text-base text-sm rounded-lg py-1.5 px-2 text-white mr-1'
                                    onClick={handleSave}>
                                    Закрыть
                                </button>
                                <button
                                    className='bg-Accent sm:py-3 sm:px-6 sm:text-base text-sm rounded-lg py-1.5 px-2 text-white ml-1'
                                    onClick={handleSave}>
                                    Сохранить
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className='fixed top-0 left-0 w-full h-full bg-black opacity-50 z-40'></div>
                </>
            }


            <div className='w-full sm:flex'>
                <p className='font-bold text-xs sm:text-base'>Заявка №: {requestNumber}</p>
                <p className='font-bold text-xs sm:text-base sm:ml-4'>От {date}</p>
            </div>
            <div className='w-1/2'>
                <Select options={RepairRequestStatusOptions}
                        defaultValue={RepairRequestStatusOptions.find(x => x.value === status)}
                        onChange={(e) => showModalCancel(e)}/>
            </div>
        </div>
    );
};

export default TitleRepairRequestDetails;