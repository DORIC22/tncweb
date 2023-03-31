import React, {Suspense} from 'react';
import ky from "ky";
import {Await, defer, useLoaderData} from "react-router-dom";
import SkeletonLoader from "../SkeletonLoader";
import UserCard from "../UserCard";

const UsersList = () => {
    const {users} = useLoaderData()

    return (
        <div className='w-full'>
            <Suspense fallback={<SkeletonLoader/>}>
                <Await resolve={users}>
                    {
                        (resolvedUsers) => (
                            <>
                                {
                                    resolvedUsers.map(user => <UserCard title={'111'}/>)
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
    const result = await ky.get(`http://192.168.0.107:7119/api/users`, {
        headers: {
            'x-apikey': '59a7ad19f5a9fa0808f11931',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        }
    }).json();

    console.log(result)

    return result
}

const usersLoader = async () => {

    return defer({
        users: getUsers()
    })
}

export {UsersList, usersLoader};