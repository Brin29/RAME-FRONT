// src/components/adminPanel/Admin.js
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';
export const Admin = () => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar en el lado izquierdo */}
      <Sidebar />
      
      {/* Contenedor para el contenido de las rutas de administración */}
      <div className="flex-1 p-8 bg-gray-100">
        <Outlet /> {/* Aquí se carga el contenido de las rutas anidadas */}
      </div>
    </div>
  );
};

export default Admin;
