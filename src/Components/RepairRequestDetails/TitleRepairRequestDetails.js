import React, {useRef, useState} from 'react';
import Select from "../Select";
import {RepairRequestStatusOptions} from "../../Common/SelectOptions";
import useModal from "../../Hooks/useModal";
import ModalWindow from "../ModalWindow";
import {useRepairRequestStore} from "../../Stores/Stores";

const TitleRepairRequestDetails = ({date, requestNumber, status}) => {
    const [selectedStatus, setSelectedStatus] = useState(status) // сохраняем значение выбранного статуса
    const [isOpenModal, toggleModal] = useModal()

    const modalTextArea = useRef()

    const changeStatus = (e) => {

        useRepairRequestStore.setState(prev => ({...prev, status: e}))

        // сохраняем значение выбранного статуса при открытии модального окна
        setSelectedStatus(e)

        if (e === 3 || e === 2) {
            toggleModal()
        }
    }

    const modalButtons = [
        {
            content: 'Сохранить',
            onClick: () => {
                const repairNote = modalTextArea.current.value
                useRepairRequestStore.setState(prev => ({...prev, repairNote}))
                toggleModal()
            },
        },
        {
            content: 'Закрыть',
            onClick: toggleModal,
        }
    ]

    return (
        <div className='mt-4 flex sm:items-center'>

            <ModalWindow title='Примечание' width={250} widthSm={400} buttons={modalButtons} isOpen={isOpenModal}>
                <div className='flex justify-center my-4'>
                    <textarea
                        className='w-full border border-darkGray px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:border-accentBlue sm:max-h-44 max-h-60'
                        placeholder='Примечание...'
                        maxLength={300}
                        ref={modalTextArea}/>
                </div>
            </ModalWindow>

            <div className='w-full sm:flex'>
                <p className='font-bold text-xs sm:text-base'>Заявка №: {requestNumber}</p>
                <p className='font-bold text-xs sm:text-base sm:ml-4'>От {date}</p>
            </div>
            <div className='w-1/2'>
                <Select options={RepairRequestStatusOptions}
                        defaultValue={RepairRequestStatusOptions.find(x => x.value === status)}
                        onChange={(e) => changeStatus(e)}
                        isEnabled={true}/>
            </div>
        </div>
    );
};

export default TitleRepairRequestDetails;