import React from 'react';
import NavbarAdmin from 'Navbar.jsx';
import HeaderAdmin from 'Header.jsx';
import Dashboard_content from 'Dashboard_content.jsx';


function DashboardProvider() {
  return (
      <>
        <NavbarAdmin />
        <HeaderAdmin />
        <Dashboard_content />

      </>
  );
}

export default DashboardProvider;