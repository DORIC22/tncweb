import Header from "./Components/Header";
import Footer from "./Components/Footer";
import React from "react";
import {Wrapper} from "./Components/Wrapper";
import {MainSection} from "./Components/MainSection";

function App(){
    return (
      <Wrapper>
        <Header/>
        <MainSection/>
        <Footer/>
      </Wrapper>
    )
}

export default App;
