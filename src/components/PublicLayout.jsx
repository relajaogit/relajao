import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

export default function PublicLayout() {
  return (
    <>
      <Navbar /> {/* El menú global de Relajao */}
      
      <main>
        <Outlet /> {/* Aquí React Router meterá dinámicamente la página que el usuario visite */}
      </main>
      
      <Footer /> {/* El pie de página global de Relajao */}
    </>
  );
}
