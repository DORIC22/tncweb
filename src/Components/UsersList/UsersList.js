import React, {Suspense} from 'react';
import {Await, defer, useLoaderData} from "react-router-dom";
import SkeletonLoader from "../SkeletonLoader";
import UserCard from "../Cards/UserCard";
import ExtendedKy from "../../Common/ExtendedKy";

const UsersList = ({searchText, role, sortDateByDesc}) => {
    const {users} = useLoaderData()

    const getSortFunc = () => {
        if (sortDateByDesc)
            return (a, b) => new Date(b.registrationDate) - new Date(a.registrationDate)
        else
            return (a, b) => new Date(a.registrationDate) - new Date(b.registrationDate)
    }

    return (
        <div className='w-full'>
            <Suspense fallback={<SkeletonLoader/>}>
                <Await resolve={users}>
                    {
                        (resolvedUsers) => (
                            <>
                                {
                                    resolvedUsers
                                        .filter(user => user.fullName.includes(searchText) && user.role === role)
                                        .sort(getSortFunc())
                                        .map(user => <UserCard title={user.fullName} role={user.role}
                                                               registrationDate={'05-05-2023'} id={user.id}
                                                               phone={user.phone} email={user.email}/>)
                                }
                            </>
                        )
                    }
                </Await>
            </Suspense>
        </div>
    );
};

const getUsers = async () => {
    const result = await ExtendedKy.get('users').json();

    console.log(result)

    return result
}

const usersLoader = async () => {

    return defer({
        users: getUsers()
    })
}

export {UsersList, usersLoader};