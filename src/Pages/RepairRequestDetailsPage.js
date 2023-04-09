import React from 'react';
import TitleRepairRequestDetails from "../Components/RepairRequestDetails/TitleRepairRequestDetails";
import BodyRepairRequestDetails from "../Components/RepairRequestDetails/BodyRepairRequestDetails";
import BottomRepairRequestDetails from "../Components/RepairRequestDetails/BottomRepairRequestDetails"
import {defer, useLoaderData} from "react-router-dom";
import ExtendedKy from "../Common/ExtendedKy";

const RepairRequestDetailsPage = () => {
    const {id, request, tech} = useLoaderData()

    const updateRepairRequest = () => {
        console.log(request.status)
        const response = ExtendedKy.put('repairrequest', {json: request})

        console.log(response.status)
    }

    const changeRepairRequestStatus = (newStatus) => {
        request.status = newStatus
    }

    const changeTech = (techId) => {
        request.userToId = techId
    }

    return (
        <div className='sm:mx-32 flex-col sm:flex-1 sm:mt-12'>
            <TitleRepairRequestDetails date={request.createdDate}
                                       requestNumber={id}
                                       status={request.status}
                                       onChangeStatus={changeRepairRequestStatus}/>
            <BodyRepairRequestDetails techEquipmentId={request.techEquipmentId}
                                      ipAddress={request.techIpAddress}
                                      techType={request.techType}
                                      description={request.description}
                                      requestFrom={request.userFrom}
                                      requestFor={request.userTo}
                                      resolvedData={tech}
                                      onChangeTech={changeTech}/>
            <BottomRepairRequestDetails updateRepairRequest={updateRepairRequest}/>
        </div>
    );
};

const getUsersTech = async () => {
    const result = await ExtendedKy.get('users?role=Tech').json()

    console.log(result)

    return result
}

const getRequestById = async (id) => {
    const result = await ExtendedKy.get(`repairrequest?id=${id}`).json()
    result.userFrom = {fullName: ''}
    result.userTo = {fullName: ''}

    try {
        const userFrom = await ExtendedKy.get(`users?id=${result.userFromId}`).json()
        result.userFrom = userFrom
        const userTo = await ExtendedKy.get(`users?id=${result.userToId}`).json()
        result.userTo = userTo

    } catch (e) {
        console.log('Catch')
    }

    return result
}

const repairRequestLoader = async ({params}) => {
    const id = params.id

    return defer({
        id: id,
        request: await getRequestById(id),
        tech: getUsersTech()
    })
}

export {RepairRequestDetailsPage, repairRequestLoader};