import React, {useState} from 'react';
import Select from "../Select";
import {DeviceOptions} from "../../Common/SelectOptions";
import SearchBar from "../SearchBar";
import {useTechEquipmentStore} from "../../Stores/Stores";
import useModal from "../../Hooks/useModal";
import ModalWindow from "../ModalWindow";
import {Form} from "react-router-dom";

const FilterTechEquipmentList = () => {
    const [title, setTitle] = useTechEquipmentStore((s) => [s.title, s.setTitle])
    const [sortTotalRequestsByDesc, setSortTotalRequestByDesc] =
        useTechEquipmentStore((s) => [s.sortTotalRequestsByDesc, s.setSortTotalRequestsByDesc])
    const [type, setType] = useTechEquipmentStore((s) => [s.type, s.setType])

    const [addTechType, setAddTechType] = useState(DeviceOptions[0])
    const [isOpenAddModal, toggleAddModal] = useModal()

    const addModalButtons = [
        {
            content: 'добавить',
            isSubmit: true,
            onClick: () => toggleAddModal
        },
        {
            content: 'отменить',
            onClick: () => toggleAddModal()
        }
    ]

    return (
        <div className='mb-2'>
            <ModalWindow title='Добавление оборудования' isOpen={isOpenAddModal} width={350} widthSm={350}
                         buttons={addModalButtons}>
                <Form method='POST' action='/tech-equipment'>
                    <div className='flex flex-col gap-3'>
                        <input placeholder='Доменное имя'
                               name='id'
                               required/>
                        <input placeholder='Ip адрес'
                               name='ipAddress'
                               required/>
                        <Select options={DeviceOptions} defaultValue={DeviceOptions[0]}
                                onChange={(item) => setAddTechType(item)}/>
                        <input value={addTechType} name='type' hidden/>
                    </div>
                </Form>
            </ModalWindow>
            <SearchBar className={'mt-4'}
                       onChangeSearchText={setTitle} searchText={title}
                       onChangeDateSorting={setSortTotalRequestByDesc} sortDateByDesc={sortTotalRequestsByDesc}/>
            <div className='flex justify-between mt-2'>
                <div className='sm:w-2/3 w-1/2'>
                    <Select options={DeviceOptions} defaultValue={DeviceOptions[0]} onChange={setType}/>
                </div>
                <button
                    className='bg-Accent sm:px-6 sm:base text-sm rounded-lg py-0 px-2 text-white sm:ml-5 ml-1 sm:w-1/3 w-1/2'
                    onClick={toggleAddModal}>
                    Добавить
                </button>
            </div>
        </div>
    );
};

export default FilterTechEquipmentList;