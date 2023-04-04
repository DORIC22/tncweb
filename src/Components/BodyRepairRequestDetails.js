import React, {Suspense, useState} from 'react';
import '../index.css'
import TechEquipmentIcon from "./TechEquiepmentIcon";
import AutoSuggestBox from "./AutoSuggestBox";
import {Await} from "react-router-dom";

const BodyRepairRequestDetails = ({
                                      techEquipmentId,
                                      ipAddress,
                                      techType,
                                      description,
                                      requestFrom,
                                      requestFor,
                                      resolvedData,
                                      onChangeTech
                                  }) => {
    const [isModal, setIsModal] = useState(false);
    const [ipAddressValue, setIpAddressValue] = useState(ipAddress);

    function changeModal() {
        setIsModal(!isModal);
    }

    function handleIpAddressChange(event) {
        setIpAddressValue(event.target.value);
    }

    const changeTech = (newTech) => {
        onChangeTech(newTech)
    }

    return (
        <div className='gradient-border border mt-4 rounded-lg shadow-formShadow px-6 py-3'>

            {isModal &&
                <>
                    <div
                        className='z-50 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white sm:px-6 px-2 py-2 rounded-lg min-w-[250px] sm:min-w-[400px] gradient-border border'>
                        <div className=''>
                            <div className='flex justify-center'>
                                <p className='text-sm sm:text-base'>Изменение исполнителя</p>
                            </div>
                            <div className='flex justify-center my-4'>
                                <input
                                    className='w-full border border-darkGray px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:border-accentBlue'
                                    placeholder='Введите ФИО'/>
                            </div>
                            <div className='flex justify-center'>
                                <button
                                    className='bg-Accent sm:py-3 sm:px-6 sm:text-base text-sm rounded-lg py-1.5 px-2 text-white'
                                    onClick={changeModal}>
                                    Сохранить
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className='fixed top-0 left-0 w-full h-full bg-black opacity-50 z-40'></div>
                </>
            }

            <div className='flex justify-between my-2'>
                <div className='p-1 bg-gray-100 rounded-lg flex mr-1'>
                    <p className='text-xs'>ID устройства: <p className='block md:inline'>{techEquipmentId}</p>
                    </p>
                </div>
                <div className='flex justify-end ml-1'>
                    <p className='rounded-lg px-1.5 text-xs py-1 bg-gray-100 w-full'>
                        IP устройства:
                        <p className='block md:inline'> {ipAddress}</p>
                    </p>

                </div>
            </div>

            <div className='sm:flex'>
                <div className='rounded-lg bg-gray-100 mb-1 flex justify-center sm:p-4 h-[110px]'>
                    <div className='flex flex-col justify-center'>
                        <TechEquipmentIcon techEquipmentType={techType}
                                           width={60}
                                           height={70}/>
                    </div>
                </div>

                <div className='text-xs sm:text-sm sm:w-3/4 sm:mx-3'>
                    <p className='text-justify'>{description}</p>
                </div>
            </div>

            <div className='mt-4'>
                <div>
                    <span className='sm:text-sm text-xs text-Accent_light'>Создатель заявки: </span>
                    <span className='sm:text-sm text-xs'>{requestFrom.fullName || 'Не назначено'}</span>
                </div>
                <div className='flex items-center gap-1'>
                    <span className='sm:text-sm text-xs text-Accent_light'>Исполнитель заявки: </span>
                    <Suspense
                        fallback=
                            {(
                                <div className='flex gap-1'>
                                    <input
                                        className={`flex-1 w-full text-sm sm:text-base border border-gray-900 rounded-lg pl-1 focus:outline-none focus:border-Accent_light `}
                                        placeholder='Не назначено'
                                        type='search'
                                        value={requestFor.fullName || 'Не назчаненно'}
                                        readOnly={true}/>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                         stroke-width="1.5" stroke="currentColor" className="animate-spin w-6 h-6">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                              d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"/>
                                    </svg>
                                </div>

                            )}>
                        <Await resolve={resolvedData}>
                            {
                                (resolvedData) => {
                                    console.log(resolvedData)
                                    return <AutoSuggestBox itemSource={resolvedData}
                                                           displayMember='fullName'
                                                           defaultText={requestFor.fullName || ''}
                                                           onChangeTech={changeTech}
                                    />
                                }
                            }
                        </Await>
                    </Suspense>
                </div>

            </div>
        </div>
    );
};

export default BodyRepairRequestDetails;