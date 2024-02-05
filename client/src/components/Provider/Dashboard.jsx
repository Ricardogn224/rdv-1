import React from 'react';
import NavbarAdmin from '../admin/Navbar';
import HeaderAdmin from '../admin/Header';
import Dashboard_content from '../admin/Dashboard_content';

import Footer from '../Footer';

function Home() {
  return (
      <>
        <NavbarAdmin />
        <HeaderAdmin />
        <Dashboard_content />

      </>
  );
}

export default Home;