import React, {Suspense} from 'react';
import {Await, defer, redirect, useLoaderData} from "react-router-dom";
import SkeletonLoader from "../SkeletonLoader";
import UserCard from "../Cards/UserCard";
import ExtendedKy from "../../Common/ExtendedKy";
import sha256 from "js-sha256";
import validator from "validator/es";

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
    const errors = {}

    switch (request.method) {
        case 'POST': {
            const newUser = {
                id: 0,
                email: formData.get('email'),
                password: sha256('Passw0rd'),
                firstName: formData.get('firstName'),
                lastName: formData.get('lastName'),
                patronymic: formData.get('patronymic'),
                phone: formData.get('phone').replace(/\D/g, ''),
                role: parseInt(formData.get('role'))
            }

            if (!newUser.firstName)
                errors.firstName = 'Имя обязательно'

            if (!newUser.lastName)
                errors.lastName = 'Фамилия обязательна'

            if (!validator.isEmail(newUser.email))
                errors.email = 'Некоректый адрес электронной почты'

            if (newUser.phone.length != 11)
                errors.phone = 'Некоректный номер телефона'

            if (Object.keys(errors).length > 0)
                return errors

            const result = await ExtendedKy.post('users', {json: newUser})

            if (result.status === 400)
                errors.email = 'Сотрудник с таким email уже зарегистрирован'

            break
        }

        case 'PATCH': {
            const userWithNewPass = {
                id: formData.get('id'),
                newPassword: sha256('Passw0rd')
            }

            const result = await ExtendedKy.patch('users', {json: userWithNewPass})
            break
        }

        case 'DELETE': {
            const result = await ExtendedKy.delete('users/' + formData.get('id'))
            break
        }
    }

    redirect('/users')
    return errors
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