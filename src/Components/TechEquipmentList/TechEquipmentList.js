import React, {Suspense} from 'react';
import SkeletonLoader from "../SkeletonLoader";
import UserCard from "../UserCard";
import {Await,defer, useLoaderData} from "react-router-dom";
import ky from "ky";

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
                                    resolvedEquipment.map(equipment => <UserCard/>)
                                }
                            </>
                        )
                    }
                </Await>
            </Suspense>
        </div>
    );
};

const getTechEquipment = async () => {
    const result = await ky.get(`http://5.128.221.139:7119/api/tech-equipment`, {
        headers: {
            'x-apikey': '59a7ad19f5a9fa0808f11931',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        }
    }).json();

    console.log(result)

    return result
}

const techEquipmentLoader = async () => {

    return defer({
        equipments: getTechEquipment()
    })
}

export {TechEquipmentList, techEquipmentLoader};