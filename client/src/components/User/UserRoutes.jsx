import React from 'react';
import { Route, Routes } from 'react-router-dom';
import UserNavbar from './UserNavbar';
import UserContenu from './UserContenu';
//import UserDashboard from './UserDashboard';
import UserFooter from './UserFooter';

// Autres imports de composants

function UserRoutes() {
  return (
    <div>
      <UserNavbar />
      <Routes>
        <Route path="/" element={<UserContenu />} />
     {/*     <Route path="/user/profile" component={UserProfile} />
        <Route path="/user/dashboard" component={UserDashboard} />
       Autres routes utilisateur */}
      </Routes>
      <UserFooter />
      
    </div>
  );
}

export default UserRoutes;
