import React, { useContext, useState } from "react";
import { CartContext } from "../carrito/CartContext";
import sin from "../../assets/imagenes/sinprendas.png";
import fondo from '../../components/catalogo/fondo.mp4';

function Carrito() {
  const {
    cartItems,
    decreaseQuantity,
    addToCart,
    removeFromCart,
    totalPrice,
    removeAllFromCart,
    placeOrder,
  } = useContext(CartContext);

  const [selectedAddress, setSelectedAddress] = useState(null);
  const [viewMode, setViewMode] = useState("list"); // Estado para alternar entre lista y cuadrícula
  const savedAddresses = JSON.parse(localStorage.getItem("direcciones")) || [];

  const handlePlaceOrder = () => {
    if (selectedAddress) {
      placeOrder(selectedAddress);
      alert("Pedido realizado con éxito");
    } else {
      alert("Por favor selecciona una dirección de envío");
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="relative w-full h-full">
        {/* Video de fondo */}
        <video src={fondo} autoPlay muted loop className="fixed top-0 left-0 w-full h-full object-cover z-[-1]" />

        {/* Contenedor para la imagen de carrito vacío */}
        <div className="flex flex-col items-center justify-center p-10 w-full h-full bg-opacity-5 ">
          <div className="text-center">
            <img src={sin} alt="Sin prendas" className="w-90 h-auto opacity-70" />
            <p className="mt-4 text-lg text-gray-500">Tu carrito está vacío.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full">
      {/* Video de fondo */}
      <video src={fondo} autoPlay muted loop className="fixed top-0 left-0 w-full h-full object-cover z-[-1]" />

      {/* Contenedor principal con fondo transparente */}
      <div className="container mx-auto p-8 max-w-lg bg-white bg-opacity-70 rounded-lg shadow-lg mt-12">
        <h1 className="text-2xl font-semibold text-center text-red-400 mb-6">Tu Carrito</h1>

        {/* Contenedor con desplazamiento y vista adaptable */}
        <div className={`space-y-4 ${viewMode === "grid" ? "grid grid-cols-2 gap-4" : ""} overflow-hidden`}>
          {cartItems.map((item) => (
            <div
              key={item.id}
              className={`flex ${viewMode === "grid" ? "flex-col items-center" : "justify-between items-center"} bg-gray-50 p-4 rounded-lg shadow-sm transition-transform duration-200 transform hover:scale-105`}
            >
              <img
                src={item.imgPath}
                alt={item.name}
                className={`object-cover rounded-md ${viewMode === "grid" ? "w-24 h-24" : "w-16 h-16"}`} // Hacer la imagen más pequeña
              />

              <div className={`flex-1 ml-4 ${viewMode === "grid" ? "text-center" : ""}`}>
                <h2 className="text-md font-medium text-gray-700">{item.name}</h2>
                <p className="text-gray-600 text-sm">
                  Precio: ${item.price && !isNaN(item.price) ? item.price.toFixed(2) : "N/A"}
                </p>
                <p className="text-gray-600 text-sm">
                  Total: ${item.price && !isNaN(item.price) ? (item.price * item.quantity).toFixed(2) : "N/A"}
                </p>

                <div className="flex items-center mt-2 space-x-2 justify-center">
                  <button
                    onClick={() => decreaseQuantity(item.id)}
                    disabled={item.quantity === 1}
                    className="bg-red-400 text-white rounded-full w-8 h-8 flex items-center justify-center"
                  >
                    -
                  </button>
                  <span className="text-gray-700 text-lg">{item.quantity}</span>
                  <button
                    onClick={() => addToCart(item)}
                    className="bg-red-400 text-white rounded-full w-8 h-8 flex items-center justify-center"
                  >
                    +
                  </button>
                </div>
              </div>

              {viewMode === "list" && (
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-400 text-sm hover:text-pink-700 transition ml-4"
                >
                  Eliminar
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Botones para cambiar de vista debajo de los productos */}
        <div className="flex justify-center mt-4">
          <button
            onClick={() => setViewMode("list")}
            className={`px-3 py-1 mx-2 rounded-lg text-sm ${viewMode === "list" ? "bg-red-400 text-white" : "bg-gray-200 text-gray-600"}`}
          >
            Lista
          </button>
          <button
            onClick={() => setViewMode("grid")}
            className={`px-3 py-1 mx-2 rounded-lg text-sm ${viewMode === "grid" ? "bg-red-400 text-white" : "bg-gray-200 text-gray-600"}`}
          >
            Cuadrícula
          </button>
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-700">Selecciona tu dirección de envío</h3>
          <select
            value={selectedAddress ? JSON.stringify(selectedAddress) : ""}
            onChange={(e) => {
              const address = e.target.value ? JSON.parse(e.target.value) : null;
              setSelectedAddress(address);
            }}
            className="mt-2 p-2 border border-gray-300 rounded-md w-full"
          >
            <option value="">Selecciona una dirección</option>
            {savedAddresses.map((address, index) => (
              <option key={index} value={JSON.stringify(address)}>
                {`${address.direccionEntrega}, ${address.ciudad}, ${address.pais}`}
              </option>
            ))}
          </select>

          {selectedAddress && (
            <p className="mt-2 text-gray-700 text-sm">
              Dirección seleccionada: {`${selectedAddress.direccionEntrega}, ${selectedAddress.ciudad}, ${selectedAddress.pais}`}
            </p>
          )}
        </div>

        <div className="flex justify-between items-center mt-6 bg-white p-4 rounded-lg shadow-sm">
          <span className="text-lg font-bold text-red-400">Total: ${totalPrice.toFixed(2)}</span>
          <div className="flex space-x-4">
            <button
              onClick={handlePlaceOrder}
              className="bg-red-400 text-white py-2 px-4 rounded-lg hover:bg-pink-600 transition"
            >
              Comprar
            </button>
            <button
              onClick={removeAllFromCart}
              className="bg-gray-300 text-red-700 py-2 px-4 rounded-lg hover:bg-gray-400 transition"
            >
              Vaciar Carrito
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Carrito;
