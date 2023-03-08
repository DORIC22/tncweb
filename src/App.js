import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Auth from "./Components/Auth"
import Home from "./Pages/Home"
import React from "react";
import {Wrapper} from "./Components/Wrapper";
import {MainSection} from "./Components/MainSection";
import {createBrowserRouter, RouterProvider, Switch} from 'react-router-dom'

const router = createBrowserRouter([
    {
        path: '/',
        element: <MainSection/>
    },
    {
        path: '/home',
        element: <Home/>
    }
])

function App(){
    return (
      <Wrapper>
        <Header/>
        <RouterProvider router={router}/>
        <Footer/>
      </Wrapper>
    )
}

export default App;
