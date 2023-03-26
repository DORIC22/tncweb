import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Home from "./Pages/Home"
import Registration from "./Pages/Registration";
import React from "react";
import { Wrapper } from "./Components/Wrapper";
import { LoginPage } from "./Components/LoginPage";
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import RequireAuth from "./hoc/RequireAuth";
import Users from "./Pages/Users";
import {repairRequestsLoader} from "./Components/RepairRequestList";

const router = createBrowserRouter([
    {
        path: '/',
        element: <LoginPage/>
    },
    {
        path: '/home',
        element: (
            <RequireAuth>
                <Home/>
            </RequireAuth>
        ),
        loader: repairRequestsLoader
    },
    {
      path: '/registration',
      element: <Registration/>
    }
])

function App(){
    return (
        <div className='flex flex-col min-h-screen'>
            <Header/>
            <Wrapper>
                <RouterProvider router={router} />
            </Wrapper>
            <Footer/>
        </div>
    )
}

export default App;
