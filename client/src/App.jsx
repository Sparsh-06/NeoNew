import React from "react";
import Navbar from "./components/Navbar";
import Header from "./components/Header";
import Service from "./components/Service";
import TestInomials from "./components/TestInomials";
import Steps from "./components/Steps";
import Stats from "./components/Stats";
import Wait from "./components/Wait";
import Footer from "./components/Footer";
import Pricing from "./components/Pricing.jsx";

const App = () => {
    return (
        <div>
            <div
                className="fixed inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1.4px,transparent_1.4px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
            <Navbar/>
            <div className="max-w-[85vw] mx-auto mt-16">
                <Header/>
                <Stats/>
                <Service/>
                <TestInomials/>
                <Steps/>
                <Pricing/>
                <Wait/>
            </div>
            <Footer/>
        </div>
    );
};

export default App;
