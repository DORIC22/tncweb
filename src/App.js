import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Home from "./Pages/Home"
import Registration from "./Pages/Registration";
import React from "react";
import { Wrapper } from "./Components/Wrapper";
import { LoginPage } from "./Components/LoginPage";
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import RequireAuth from "./hoc/RequireAuth";

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
        )
    },
    {
      path: '/registration',
      element: <Registration/>
    }
])

function App(){
    return (
      <Wrapper>
        <Header/>
        <RouterProvider router={router} />
        <Footer/>
      </Wrapper>
    )
}

export default App;
