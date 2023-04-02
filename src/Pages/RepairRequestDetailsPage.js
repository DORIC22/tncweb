import React from 'react';
import TitleRepairRequestDetails from "../Components/TitleRepairRequestDetails";
import BodyRepairRequestDetails from "../Components/BodyRepairRequestDetails";
import BottomRepairRequestDetails from "../Components/BottomRepairRequestDetails"
import ky from "ky";
import {defer, useLoaderData} from "react-router-dom";

const RepairRequestDetailsPage = () => {
    const {id, request} = useLoaderData()
    console.log(request)

    return (
        <div className='sm:mx-32 flex-col sm:flex-1 sm:mt-12'>
            <TitleRepairRequestDetails date={request.createdDate}
                                       requestNumber={id}
                                       status={request.status}/>
            <BodyRepairRequestDetails techEquipmentId={request.techEquipmentId}
                                      ipAddress={request.techIpAddress}
                                      techType={request.techType}
                                      description={request.description}
                                      requestFrom={request.userFromId}
                                      requestFor={request.userToId}/>
            <BottomRepairRequestDetails/>
        </div>
    );
};

const getRequestById = async (id) => {
    const result = await ky.get(`http://5.128.221.139:7119/api/repairrequest?id=${id}`, {
        headers: {
            'x-apikey': '59a7ad19f5a9fa0808f11931',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        }
    }).json();

    return result
}

const repairRequestLoader = async ({params}) => {
    const id = params.id

    return defer({
        id: id,
        request: await getRequestById(id)
    })
}

export {RepairRequestDetailsPage, repairRequestLoader};