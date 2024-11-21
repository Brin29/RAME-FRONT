// src/components/adminPanel/Sidebar.js
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-64 bg-gradient-to-b from-gray-900 to-gray-800 text-white min-h-screen p-6 shadow-lg">
      <h2 className="text-xl font-extrabold mb-6 text-center tracking-wide">
        Admin Panel
      </h2>
      <nav>
        <ul className="space-y-4">
          <li>
            <Link
              to="/admin/dashboard"
              className="flex items-center space-x-3 p-3 rounded-md hover:bg-gray-700 transition ease-in-out duration-200"
            >
              <span className="text-lg font-medium">Inicio</span>
            </Link>
          </li>
          <li>
            <Link
              to="/admin/products"
              className="flex items-center space-x-3 p-3 rounded-md hover:bg-gray-700 transition ease-in-out duration-200"
            >
              <span className="text-lg font-medium">Productos</span>
            </Link>
          </li>
          <li>
            <Link
              to="/admin/sales"
              className="flex items-center space-x-3 p-3 rounded-md hover:bg-gray-700 transition ease-in-out duration-200"
            >
              <span className="text-lg font-medium">Ventas</span>
            </Link>
          </li>
          <li>
            <Link
              to="/admin/users"
              className="flex items-center space-x-3 p-3 rounded-md hover:bg-gray-700 transition ease-in-out duration-200"
            >
              <span className="text-lg font-medium">Usuarios</span>
            </Link>
          </li>
          <li>
            <Link
              to="/"
              className="flex items-center space-x-3 p-3 rounded-md hover:bg-gray-700 transition ease-in-out duration-200"
            >
              <span className="text-lg font-medium">Pagina</span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
