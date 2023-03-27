import Header from "./Components/Header";
import Footer from "./Components/Footer";
import RepairRequests from "./Pages/RepairRequests"
import Registration from "./Pages/Registration";
import React from "react";
import {Wrapper} from "./Components/Wrapper";
import {LoginPage} from "./Components/LoginPage";
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import RequireAuth from "./hoc/RequireAuth";
import {repairRequestsLoader} from "./Components/RepairRequestList/RepairRequestList";
import RepairRequestDetails from "./Pages/RepairRequestDetails";

const router = createBrowserRouter([
    {
        path: '/',
        element: <LoginPage/>
    },
    {
        path: '/repair-requests',
        element: (
            <RequireAuth>
                <RepairRequests/>
            </RequireAuth>
        ),
        loader: repairRequestsLoader
    },
    {
        path: '/repair-requests/:id',
        element: (
            <RequireAuth>
                <RepairRequestDetails/>
            </RequireAuth>
        ),
    },
    {
        path: '/registration',
        element: <Registration/>
    },
])

function App() {
    return (
        <div className='flex flex-col min-h-screen'>
            <Header/>
            <Wrapper>
                <RouterProvider router={router}/>
            </Wrapper>
            <Footer/>
        </div>
    )
}

export default App;
