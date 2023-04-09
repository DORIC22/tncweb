import React from 'react';
import Header from "./Header";
import Footer from "./Footer";
import {Outlet} from "react-router-dom";
import {Wrapper} from "../Wrapper";

const Layout = () => {
    return (
        <>
            <Header/>

            <Wrapper>
                <Outlet/>
            </Wrapper>

            <Footer/>
        </>
    );
};

export default Layout;