import RepairRequestsPage from "./Pages/RepairRequestsPage"
import RegistrationPage from "./Pages/RegistrationPage";
import React from "react";
import {LoginPage} from "./Pages/LoginPage";
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import RequireAuth from "./hoc/RequireAuth";
import {repairRequestsLoader} from "./Components/RepairRequestList/RepairRequestList";
import {RepairRequestDetailsPage, repairRequestLoader} from "./Pages/RepairRequestDetailsPage";
import Layout from "./Components/Layouts/Layout";
import UsersPage from "./Pages/UsersPage";
import {usersAction, usersLoader} from "./Components/UsersList/UsersList";
import NotFoundPage from "./Pages/NotFoundPage";
import TechEquipmentPage from "./Pages/TechEquipmentPage";
import {techEquipmentLoader, techEquipmentsAction} from "./Components/TechEquipmentList/TechEquipmentList";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout/>,
        children: [
            {
                path: 'login',
                element: <LoginPage/>
            },
            {
                path: 'registration',
                element: <RegistrationPage/>
            },
            {
                index: true,
                element: (
                    <RequireAuth>
                        <RepairRequestsPage/>
                    </RequireAuth>
                ),
                loader: repairRequestsLoader,
            },
            {
                path: 'repair-requests/:id',
                element: (
                    <RequireAuth>
                        <RepairRequestDetailsPage/>
                    </RequireAuth>
                ),
                loader: repairRequestLoader
            },
            {
                path: 'users',
                element: (
                    <RequireAuth>
                        <UsersPage/>
                    </RequireAuth>
                ),
                loader: usersLoader,
                action: usersAction
            },
            {
                path: 'tech-equipment',
                element: (
                    <RequireAuth>
                        <TechEquipmentPage/>
                    </RequireAuth>
                ),
                loader: techEquipmentLoader,
                action: techEquipmentsAction
            },
            {
                path: '*',
                element: <NotFoundPage/>
            }
        ]
    },
])

function App() {
    return (
        <div className='flex flex-col min-h-screen'>
            <RouterProvider router={router}/>
        </div>
    )
}

export default App;
