import React from 'react';
import DashboardContenu from './DashboardContenu';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function DashboardProvider() {
  const navigate = useNavigate();
  const myProvider = JSON.parse(localStorage.getItem('myProvider'));
  console.log(myProvider.establishments);
  const token = localStorage.getItem('jwtToken');
  useEffect(() => {
    if (myProvider && !myProvider.active) {
      navigate("/");
    }
  }, [myProvider, navigate]);

  return (
    <>
      <DashboardContenu />
    </>
  );
}

export default DashboardProvider;