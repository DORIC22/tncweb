import React, {Suspense} from 'react';
import {Await, defer, useLoaderData} from "react-router-dom";
import SkeletonLoader from "../SkeletonLoader";
import RepairRequestCard from "../Cards/RepairRequestCard";
import ExtendedKy from "../../Common/ExtendedKy";

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
    const result = await ExtendedKy.get('repairrequest').json();

    console.log(result)

    return result
}

const repairRequestsLoader = async () => {

    return defer({
        requests: getRequest()
    })
}

export {RepairRequestList, repairRequestsLoader}