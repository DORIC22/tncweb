import React, {Suspense} from 'react';
import SkeletonLoader from "../SkeletonLoader";
import {Await, defer, redirect, useLoaderData} from "react-router-dom";
import ExtendedKy from "../../Common/ExtendedKy";
import TechEquipmentCard from "../Cards/TechEquipmentCard";
import {useTechEquipmentStore} from "../../Stores/Stores";

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

    switch (request.method) {
        case 'POST': {
            const newTech = {
                id: formData.get('id'),
                ipAddress: formData.get('ipAddress'),
                type: parseInt(formData.get('type'))
            }

            console.log(newTech)

            const result = await ExtendedKy.post('techequipment', {json: newTech})

            console.log(result)
            break
        }

        case 'PATCH': {
            const techEquipmentWithNewIp = {
                id: formData.get('id'),
                ipAddress: formData.get('ipAddress')
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

    return redirect('/tech-equipment')
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