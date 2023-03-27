import RepairRequests from "./Pages/RepairRequests"
import Registration from "./Pages/Registration";
import React from "react";
import {LoginPage} from "./Pages/LoginPage";
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import RequireAuth from "./hoc/RequireAuth";
import {repairRequestsLoader} from "./Components/RepairRequestList/RepairRequestList";
import {RepairRequestDetails, repairRequestLoader} from "./Pages/RepairRequestDetails";
import Layout from "./Components/Layout";
import Users from "./Pages/Users";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout/>,
        children: [
            {
                index: true,
                element: <LoginPage/>
            },
            {
                path: 'registration',
                element: <Registration/>
            },
            {
                path: 'repair-requests',
                element: (
                    <RequireAuth>
                        <RepairRequests/>
                    </RequireAuth>
                ),
                loader: repairRequestsLoader,
            },
            {
                path: 'repair-requests/:id',
                element: (
                    <RequireAuth>
                        <RepairRequestDetails/>
                    </RequireAuth>
                ),
                loader: repairRequestLoader
            },
            {
                path: 'users',
                element: (
                    <RequireAuth>
                        <Users/>
                    </RequireAuth>
                ),
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
