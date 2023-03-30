import React, {Suspense} from 'react';
import ky from "ky";
import {Await, defer, Link, useLoaderData} from "react-router-dom";
import TechEquiepmentIcon from "../TechEquiepmentIcon";
import SkeletonLoader from "../SkeletonLoader";

const RepairRequestList = ({searchText, requestStatus, deviceTypes, sortDateByDesc}) => {
    const {requests} = useLoaderData()

    const getSortFunc = () => {
        if (sortDateByDesc)
            return (a, b) => new Date(b.createdDate) - new Date(a.createdDate)
        else
            return (a, b) => new Date(a.createdDate) - new Date(b.createdDate)
    }

    return (
        <div className='w-full'>
            <Suspense fallback={<SkeletonLoader/>}>
                <Await resolve={requests}>
                    {
                        (resolvedRequests) => (
                            <>
                                {
                                    resolvedRequests.filter
                                    (
                                        request => request.status == requestStatus &&
                                            request.techEquipmentId.includes(searchText) &&
                                            deviceTypes.includes(request.techType)
                                    ).sort(getSortFunc())
                                        .map(request => (
                                                <div className='gap-3 my-2 h-18 py-2 px-2 shadow-formShadow rounded-lg'
                                                     key={request.id}>
                                                    <div className='flex flex-row'>
                                                        <div
                                                            className='bg-gray-100 p-2 rounded-lg flex-shrink-0 flex items-center'>
                                                            <TechEquiepmentIcon techEquipmentType={request.techType}
                                                                                width={70}
                                                                                height={70}/>
                                                        </div>
                                                        <div className='ml-2 flex-1 flex flex-col justify-start'>
                                                            <Link to={`/repair-requests/${request.id}`}
                                                                  className=''>{request.techEquipmentId} |
                                                                № {request.id}</Link>
                                                            <p className='text-xs sm:text-base sm-text-base flex-1'>{request.description.slice(0, 200)}{request.description.length > 200 ? '...' : ''}</p>
                                                            <div
                                                                className='bg-gray-100 rounded-lg py-0.5 mt-1 px-3 hidden sm:block'>
                                                                <div className='flex justify-between'>
                                                                    <p className='text-xs'>Дата создания: </p>
                                                                    <p className='text-xs'>{request.createdDate}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div
                                                        className='flex justify-between bg-gray-100 rounded-lg py-0.5 mt-1 px-3 sm:hidden'>
                                                        <p className='text-xs'>Дата создания: </p>
                                                        <p className='text-xs'>{request.createdDate}</p>
                                                    </div>
                                                </div>
                                            )
                                        )
                                }
                            </>
                        )
                    }
                </Await>
            </Suspense>
        </div>
    );
};

const getRequest = async () => {
    const result = await ky.get('http://192.168.0.107:7119/api/repairrequest', {
        headers: {
            'x-apikey': '59a7ad19f5a9fa0808f11931',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        }
    }).json();

    console.log(result)

    return result
}

const repairRequestsLoader = async () => {

    return defer({
        requests: getRequest()
    })
}

export {RepairRequestList, repairRequestsLoader}