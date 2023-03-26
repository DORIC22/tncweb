import React, {Suspense} from 'react';
import ky from "ky";
import {Await, defer, useLoaderData} from "react-router-dom";
import icon_pc from "../Resources/icon_pc.svg"
import icon_printer from "../Resources/icon_printer.svg"
import icon_camera from "../Resources/icon_camera.svg"

const RepairRequestList = (props) => {
    const {searchText, requestStatus, deviceTypes} = props

    const {requests} = useLoaderData()

    const getIcon = (request) => {
        if (request.techType === 0)
            return <img src={icon_pc} className='w-[70px] h-[70px]'/>
        if (request.techType === 1)
            return <img src={icon_printer} className='w-[70px] h-[70px]'/>
        if (request.techType === 2)
            return <img src={icon_camera} className='w-[70px] h-[70px]'/>
    }

    return (
        <div className=''>
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
                                            deviceTypes.includes(request.techType)
                                    )
                                        .map(request => (
                                        <div className='border-2' key={request.id}>
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