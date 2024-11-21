import React, { useContext } from "react";
import logo from "../../assets/imagenes/logo.jpg";
import { Link } from "react-router-dom";
import { CartContext } from "../carrito/CartContext"; // Importa el CartContext

function Header() {
  // Accede a la cantidad total de productos en el carrito desde el contexto
  const { cartItems } = useContext(CartContext);

  // Calcula la cantidad total de productos en el carrito
  const totalItemsInCart = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="bg-[#ee8b8b] text-white py-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center px-6 lg:px-12">
        {/* Logo */}
        <div className="flex items-center">
          <Link to="/">
            <img
              className="w-12 md:w-20 lg:w-36 rounded-lg shadow-md transition-all duration-300 transform hover:scale-105"
              src={logo}
              alt="logo_img"
            />
          </Link>
        </div>

        {/* Navegación */}
        <nav className="flex space-x-6">
          <ul className="flex space-x-6">
            {/* Inicio */}
            <li>
              <Link
                to="/"
                className="text-xl md:text-2xl font-semibold hover:text-gray-300 transition-colors duration-200"
              >
                Inicio
              </Link>
            </li>
            {/* Catalogo */}
            <li>
              <Link
                to="/catalogo"
                className="text-xl md:text-2xl font-semibold hover:text-gray-300 transition-colors duration-200"
              >
                Catálogo
              </Link>
            </li>
            {/* Usuario */}
            <li>
              <Link
                to="/usuario"
                className="text-3xl hover:text-gray-300 transition-all duration-200"
              >
                <span className="material-symbols-outlined">account_circle</span>
              </Link>
            </li>
            {/* Carrito */}
            <li className="relative">
              <Link
                to="/carrito"
                className="text-3xl hover:text-gray-300 transition-all duration-200"
              >
                <span className="material-symbols-outlined">shopping_cart</span>
                {/* Muestra la cantidad de productos en el carrito */}
                {totalItemsInCart > 0 && (
                  <span className="absolute top-0 right-0 bg-red-600 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
                    {totalItemsInCart}
                  </span>
                )}
              </Link>
            </li>
            {/* Favorito */}
            <li>
              <Link
                to="/favorito"
                className="text-3xl hover:text-gray-300 transition-all duration-200"
              >
                <span className="material-symbols-outlined">favorite</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
