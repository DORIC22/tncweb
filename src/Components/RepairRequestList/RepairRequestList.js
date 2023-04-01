import React, {Suspense} from 'react';
import ky from "ky";
import {Await, defer, useLoaderData} from "react-router-dom";
import SkeletonLoader from "../SkeletonLoader";
import RepairRequestCard from "../RepairRequestCard";

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
                                                <RepairRequestCard title={`${request.techEquipmentId} | № ${request.id}`}
                                                                   description={request.description}
                                                                   descriptionLength={200}
                                                                   type={request.techType}
                                                                   id={request.id}
                                                                   createdDate={request.createdDate}
                                                />
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
    const result = await ky.get('http://5.128.221.139:7119/api/repairrequest', {
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