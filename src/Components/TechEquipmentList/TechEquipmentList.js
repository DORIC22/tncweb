import React, {Suspense} from 'react';
import SkeletonLoader from "../SkeletonLoader";
import {Await, defer, redirect, useLoaderData} from "react-router-dom";
import ExtendedKy from "../../Common/ExtendedKy";
import TechEquipmentCard from "../Cards/TechEquipmentCard";
import {useTechEquipmentStore} from "../../Stores/Stores";
import validator from "validator/es";

const TechEquipmentList = () => {
    const {equipments} = useLoaderData()
    const [title, type, sortTotalRequestsByDesc] = useTechEquipmentStore(s => [s.title, s.type, s.sortTotalRequestsByDesc])

    const getSortFunc = () => {
        if (sortTotalRequestsByDesc)
            return (a, b) => b.totalRepairRequest - a.totalRepairRequest
        else
            return (a, b) => a.totalRepairRequest - b.totalRepairRequest
    }

    return (
        <div className='w-full'>
            <Suspense fallback={<SkeletonLoader/>}>
                <Await resolve={equipments}>
                    {
                        (resolvedEquipment) => (
                            <>
                                {
                                    resolvedEquipment
                                        .filter(tech => tech.id.includes(title) && tech.type === type)
                                        .sort(getSortFunc())
                                        .map(equipment => <TechEquipmentCard title={equipment.id}
                                                                             id={equipment.id}
                                                                             ipAddress={equipment.ipAddress}
                                                                             type={equipment.type}
                                                                             totalRepairRequest={equipment.totalRepairRequest}/>)
                                }
                            </>
                        )
                    }
                </Await>
            </Suspense>
        </div>
    );
};

const techEquipmentsAction = async ({request}) => {
    const formData = await request.formData()
    const errors = {}

    switch (request.method) { //validation
        case 'POST': {
            const newTech = {
                id: formData.get('id'),
                ipAddress: formData.get('ipAddress'),
                type: parseInt(formData.get('type'))
            }

            if (!validator.isIP(newTech.ipAddress)) {
                errors.ipAddress = 'неправильный ip адрес'
                return errors
            }

            const result = await ExtendedKy.post('techequipment', {json: newTech})

            if (result.status === 400) {
                errors.id = 'оборудование уже добавлено в базу данных'
                return errors
            }

            break
        }

        case 'PATCH': { // validation
            const techEquipmentWithNewIp = {
                id: formData.get('id'),
                ipAddress: formData.get('ipAddress')
            }

            if (!validator.isIP(techEquipmentWithNewIp.ipAddress)) {
                errors.ipAddress = 'неправильный ip адрес'
                return errors
            }

            const result = await ExtendedKy.put('techequipment', {json: techEquipmentWithNewIp})
            break
        }

        case 'DELETE': {
            const id = formData.get('id')

            const result = await ExtendedKy.delete(`techequipment/${id}`)
            break
        }
    }

    redirect('/tech-equipment')
    return errors
}

const getTechEquipment = async () => {
    const result = await ExtendedKy.get('techequipment').json();

    return result
}

const techEquipmentLoader = async () => {

    return defer({
        equipments: getTechEquipment()
    })
}

export {TechEquipmentList, techEquipmentLoader, techEquipmentsAction};