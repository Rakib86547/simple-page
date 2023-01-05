import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../pages/Share/Footer/Footer';
import Navbar from '../pages/Share/Navbar/Navbar';

const Main = () => {
    return (
        <div>
            <Navbar />
            <Outlet />
            <Footer />
        </div>
    );
};

export default Main;