import React from 'react';
import Card from "./Card";
import ModalWindow from "../ModalWindow";
import {Form} from "react-router-dom";
import useModal from "../../Hooks/useModal";
import TechEquipmentIcon from "../Icons/TechEquiepmentIcon";

const TechEquipmentCard = ({title, id, ipAddress, type, totalRepairRequest}) => {
    const [isOpenChangeIpModal, toggleChangeIpModal] = useModal()
    const [isOpenDeleteTechModal, toggleDeleteTechModal] = useModal()

    const changeIpModalButtons = [
        {
            content: 'изменить ip',
            isSubmit: true,
            onClick: () => toggleChangeIpModal
        },
        {
            content: 'отменить',
            onClick: () => {
                toggleChangeIpModal()
            }
        }
    ]

    const deleteTechModalButtons = [
        {
            content: 'Удалить',
            isSubmit: true,
            className: `bg-Accent px-6 w-2/3 text-white sm:py-2 py-1 rounded-lg shadow-formShadow sm:w-2/5 sm:my-5 my-3 mx-1`
        },
        {
            content: 'Отмена',
            onClick: toggleDeleteTechModal
        }
    ]

    return (
        <Card title={title} footerTitle={'Общие количество заявок на ремонт:'} footerValue={totalRepairRequest}
              image={<TechEquipmentIcon techEquipmentType={type} width={70} height={70}/>}>
            <div className='flex-1'>
                <p>{ipAddress}</p>
                <div className='flex sm:gap-16 gap-1 my-2 justify-between'>
                    <button className='text-xs py-1 sm:text-base w-1/2 bg-Accent text-white rounded-lg max-w-[250px]'
                            onClick={toggleChangeIpModal}>
                        Изменить ip адрес
                    </button>
                    <button className='w-1/2 text-xs sm:text-base bg-Accent text-white rounded-lg max-w-[250px]'
                            onClick={toggleDeleteTechModal}>
                        Удалить
                    </button>
                </div>

                <ModalWindow title={`Изменить ip адрес для: ${title}`} isOpen={isOpenChangeIpModal}
                             width={250} widthSm={400} buttons={changeIpModalButtons}>
                    <Form method='PATCH' action='/tech-equipment'>
                        <div className='my-3 flex-col'>
                            <input
                                className='w-full border border-darkGray px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:border-Accent_light mb-2'
                                placeholder='Введите новый ip адрес'
                                type='text'
                                autoComplete='new-ip'
                                name='ipAddress'/>
                            <input name='id' defaultValue={id} type='hidden'/>
                        </div>
                    </Form>
                </ModalWindow>

                <ModalWindow title={`Удалить ${title}?`} isOpen={isOpenDeleteTechModal}
                             width={250} widthSm={400} buttons={deleteTechModalButtons}>
                    <Form method='DELETE' action='/tech-equipment'>
                        <input name='id' defaultValue={id} type='hidden'/>
                    </Form>
                </ModalWindow>
            </div>
        </Card>
    );
};

export default TechEquipmentCard;