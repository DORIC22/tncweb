import React, {Suspense} from 'react';
import {Await, defer, redirect, useLoaderData} from "react-router-dom";
import SkeletonLoader from "../SkeletonLoader";
import UserCard from "../Cards/UserCard";
import ExtendedKy from "../../Common/ExtendedKy";
import sha256 from "js-sha256";

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
                                                               registrationDate={user.registrationDate} id={user.id}
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

const usersAction = async ({request}) => {
    const formData = await request.formData()

    switch (request.method) {
        case 'POST': {
            const newUser = {
                id: 0,
                email: formData.get('email'),
                password: sha256(formData.get('password')),
                firstName: formData.get('firstName'),
                lastName: formData.get('lastName'),
                patronymic: formData.get('patronymic'),
                phone: formData.get('phone'),
                role: parseInt(formData.get('role'))
            }

            const result = await ExtendedKy.post('users', {json: newUser})
            break
        }

        case 'PATCH': {
            const userWithNewPass = {
                id: formData.get('id'),
                newPassword: sha256(formData.get('password'))
            }

            const result = await ExtendedKy.patch('users', {json: userWithNewPass})
            break
        }

        case 'DELETE': {
            const result = await ExtendedKy.delete('users/' + formData.get('id'))
            break
        }
    }

    return redirect('/users')
}

const getUsers = async () => {
    const result = await ExtendedKy.get('users').json();
    return result
}

const usersLoader = async () => {

    return defer({
        users: getUsers()
    })
}

export {UsersList, usersLoader, usersAction};