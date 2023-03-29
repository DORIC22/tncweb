import React, {useState} from 'react';
import '../index.css'
import TechEquipmentIcon from "./TechEquiepmentIcon";

const BodyRepairRequestDetails = ({techEquipmentId, ipAddress, techType, description, requestFrom, requestFor}) => {
    const [isModal, setIsModal] = useState(false);
    const [ipAddressValue, setIpAddressValue] = useState(ipAddress);

    function changeModal() {
        setIsModal(!isModal);
    }

    function handleIpAddressChange(event) {
        setIpAddressValue(event.target.value);
    }


    return (
        <div className='gradient-border border mt-4 rounded-lg shadow-formShadow px-3 py-2'>

            { isModal &&
                <>
                    <div className='z-50 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white sm:px-6 px-2 py-2 rounded-lg min-w-[250px] sm:min-w-[400px] gradient-border border'>
                        <div className=''>
                            <div className='flex justify-center'>
                                <p className='text-sm sm:text-base'>Изменение исполнителя</p>
                            </div>
                            <div className='flex justify-center my-4'>
                                <input className='w-full border border-darkGray px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:border-accentBlue'
                                placeholder='Введите ФИО'/>
                            </div>
                            <div className='flex justify-center'>
                                <button className='bg-Accent sm:py-3 sm:px-6 sm:text-base text-sm rounded-lg py-1.5 px-2 text-white' onClick={changeModal}>
                                    Сохранить
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className='fixed top-0 left-0 w-full h-full bg-black opacity-50 z-40'></div>
                </>
            }


            <div className='flex justify-between my-2'>
                <div className='p-1 bg-gray-100 rounded-lg flex'>
                    <p className='text-xs'>ID устройства: {techEquipmentId}</p>
                </div>
                <div className='flex justify-end'>
                    <input maxLength={15} className='rounded-lg px-1.5 text-xs py-1 bg-gray-100 w-4/6'
                           placeholder='IP'
                        value={ipAddressValue}
                    onChange={handleIpAddressChange}/>
                </div>
            </div>

            <div className='sm:flex'>
                <div className='rounded-lg bg-gray-100 mb-1 flex justify-center sm:p-4'>
                    <div className='flex flex-col justify-center'>
                        <TechEquipmentIcon techEquipmentType={techType}
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
                    <button className='bg-gray-100 rounded-lg mt-1 text-xs px-3 py-1 sm:text-sm' onClick={changeModal}>
                        Изменить исполнителя
                    </button>
                </div>

            </div>
        </div>
    );
};

export default BodyRepairRequestDetails;