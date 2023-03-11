import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Auth from "./Components/Auth"
import Home from "./Pages/Home"
import Registration from "./Pages/Registration";
import React from "react";
import {Wrapper} from "./Components/Wrapper";
import {LoginPage} from "./Components/LoginPage";
import {BrowserRouter, createBrowserRouter, Route, RouterProvider, Routes, Switch} from 'react-router-dom'
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
          <BrowserRouter>
              <Routes>
                  <Route path="/" element={<LoginPage />} />
                  <Route path="/home" element={<RequireAuth><Home /></RequireAuth>} />
                  <Route path="/registration" element= {<Registration/>} />
              </Routes>
          </BrowserRouter>
        <Footer/>
      </Wrapper>
    )
}

export default App;
