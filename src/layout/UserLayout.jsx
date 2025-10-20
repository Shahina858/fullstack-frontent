import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/User/Navbar'; // Your existing Navbar
// import Footer from '../components/User/Footer'; // You can add a footer here later

const UserLayout = () => {
  return (
    <div>
      <Navbar />
      <main>
        {/* The Outlet component renders the matched child route from App.jsx */}
        <Outlet /> 
      </main>
      {/* <Footer /> */}
    </div>
  );
};

export default UserLayout;