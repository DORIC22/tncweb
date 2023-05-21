import React, {Suspense} from 'react';
import SkeletonLoader from "../SkeletonLoader";
import {Await, defer, redirect, useLoaderData} from "react-router-dom";
import ExtendedKy from "../../Common/ExtendedKy";
import TechEquipmentCard from "../Cards/TechEquipmentCard";

const TechEquipmentList = () => {
    const {equipments} = useLoaderData()

    return (
        <div className='w-full'>
            <Suspense fallback={<SkeletonLoader/>}>
                <Await resolve={equipments}>
                    {
                        (resolvedEquipment) => (
                            <>
                                {
                                    resolvedEquipment.map(equipment => <TechEquipmentCard title={equipment.id}
                                                                                          id={equipment.id}
                                                                                          ipAddress={equipment.ipAddress}/>)
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
    console.log('RotEbal')

    switch (request.method) {
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
            console.log(id)

            const result = await ExtendedKy.delete(`techequipment/${id}`)
            break
        }
    }

    return redirect('/tech-equipment')
}


const getTechEquipment = async () => {
    const result = await ExtendedKy.get('techequipment').json();

    console.log(result)

    return result
}

const techEquipmentLoader = async () => {

    return defer({
        equipments: getTechEquipment()
    })
}

export {TechEquipmentList, techEquipmentLoader, techEquipmentsAction};