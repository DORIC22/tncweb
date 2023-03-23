import React, {useEffect, useState, Suspense} from 'react';
import ky from "ky";
import {Await, defer, useLoaderData} from "react-router-dom";

const RepairRequestList = (props) => {
    const {searchText, requestStatus, deviceTypes} = props

    const {requests} = useLoaderData()

    return (
        <div>
            <Suspense fallback={<h2>Загрузка данных...</h2>}>
                <Await resolve={requests}>
                    {
                        (resolvedRequests) => (
                            <>
                                {
                                    resolvedRequests.filter
                                    (
                                        request => request.status == requestStatus &&
                                        request.techEquipmentId.includes(searchText) &&
                                        deviceTypes.includes(request.techType.toString())
                                    )
                                        .map(request => (
                                        <div className='mt-3' key={request.id}>
                                            <p>{request.techEquipmentId}</p>
                                            <p>{request.description}</p>
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

export { RepairRequestList, repairRequestsLoader}