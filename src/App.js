import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Auth from "./Components/Auth";
import React from "react";
function App(){
    return (
    <div className="wrapper">
      <Header/>
      <Auth />
      <Footer/>
    </div>
    )
}

export default App;
