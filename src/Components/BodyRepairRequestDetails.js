import React from 'react';
import '../index.css'
import TechEquiepmentIcon from "./TechEquiepmentIcon";

const BodyRepairRequestDetails = ({techEquipmentId, ipAddress, techType, description, requestFrom, requestFor}) => {
    return (
        <div className='gradient-border border mt-4 rounded-lg shadow-formShadow px-3 py-2'>

            <div className='flex justify-between my-2'>
                <div className='p-1 bg-gray-100 rounded-lg'>
                    <p className='text-xs'>ID устройства: {techEquipmentId}</p>
                </div>
                <div className='flex justify-end'>
                    <input maxLength={15} className='rounded-lg px-1.5 text-xs py-1 bg-gray-100 w-4/6'
                           placeholder=''/>
                </div>
            </div>

            <div className='sm:flex'>
                <div className='rounded-lg bg-gray-100 mb-1 flex justify-center sm:p-4'>
                    <div className='flex flex-col justify-center'>
                        <TechEquiepmentIcon techEquipmentType={techType}
                                            width={130}
                                            height={130}/>
                    </div>
                </div>

                <div className='text-xs sm:text-sm sm:w-3/4 sm:mx-3'>
                    <p className='text-justify'>{description}</p>
                </div>
            </div>

            <div className='mt-4'>
                <div>
                    <span className='sm:text-sm text-xs text-Accent_light'>Создатель заявки: </span>
                    <span className='sm:text-sm text-xs'>{requestFrom}</span>
                </div>
                <div>
                    <span className='sm:text-sm text-xs text-Accent_light'>Исполнитель заявки: </span>
                    <span className='sm:text-sm text-xs'>{requestFor}</span>
                </div>

                <div className='flex justify-center my-3'>
                    <button className='bg-gray-100 rounded-lg mt-1 text-xs px-3 py-1 sm:text-sm'>
                        Изменить исполнителя
                    </button>
                </div>

            </div>
        </div>
    );
};

export default BodyRepairRequestDetails;