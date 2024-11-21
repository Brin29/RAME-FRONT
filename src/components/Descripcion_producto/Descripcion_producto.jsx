import { useState, useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CartContext } from "../carrito/CartContext";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProductImageZoom from "./ProductImageZoom";
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';
import axios from "axios";

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { addToCart, removeFromCart, cartItems } = useContext(CartContext);
  const { product } = location.state || {};

  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [preferenceId, setPreferenceId] = useState(null);
  const [isBuying, setIsBuying] = useState(false);

  initMercadoPago('APP_USR-b30657e4-3ea9-458a-a04a-14cd19f10b61', {
    locale: "es-AR"
  });

  
  const createPreference = async () => { 
    console.log(product)
    try {
      const response = await axios.post("http://localhost:8080/create-preference/1", {
        name: product.name,
        price: product.price,
        quantity: 1
      });
      return response.data;
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (product) {
      setSelectedSize(product.sizes?.[0] || null);
      setSelectedColor(product.colors?.[0] || null);
    }
  }, [product]);

  const isInCart = cartItems.some(
    (item) =>
      item.id === product.id &&
      item.selectedSize === selectedSize &&
      item.selectedColor === selectedColor
  );

  const handleBuyNow = async () => {
    if (!selectedSize || !selectedColor) {
      toast.error("Por favor, selecciona una talla y un color.");
      return;    
    }

    setIsBuying(true);

    const id = await createPreference();
    if (id) {
      setPreferenceId(id);
    } else {
      setIsBuying(false);
      toast.error("Error al iniciar el pago. Intente nuevamente.");
    }
  };

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      toast.error("Por favor, selecciona una talla y un color.");
      return;
    }

    const cartItem = { ...product, selectedSize, selectedColor };
    if (isInCart) {
      removeFromCart(cartItem.id);
      toast.error("Producto eliminado del carrito!");
    } else {
      addToCart(cartItem);
      toast.success("Producto añadido al carrito!");
    }
  };

  const toggleSizeSelection = (size) => {
    setSelectedSize(size);
  };

  const toggleColorSelection = (color) => {
    setSelectedColor(color);
  };

  if (!product) {
    return <div>Producto no encontrado</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-7 bg-gray-100 rounded-lg shadow-md max-w-5xl mx-auto min-h-[80vh] animate-fadeIn mt-6">
      <div className="flex justify-center items-center">
        <ProductImageZoom imgSrc={product.imgPath} imgAlt={product.name} />
      </div>

      <div className="flex flex-col justify-center gap-4 p-6 bg-white rounded-lg shadow-lg border border-gray-300">
        <h2 className="text-4xl font-semibold text-gray-900 mb-2">{product.name}</h2>
        <p className="text-2xl text-green-600 mb-2">Precio: ${product.price}</p>

        <div className="mb-2">
          <label className="font-medium text-red-600 text-3xl">Descripción:</label>
          <p className="text-base text-gray-800 mt-1">{product.description}</p>
        </div>

        <div className="mb-2">
          <label className="font-medium text-red-600 text-lg">Tallas:</label>
          <div className="flex gap-1 mt-1">
            {product.sizes?.map((size) => (
              <button
                key={size}
                className={`border rounded-md px-3 py-1 text-sm transition-colors duration-300 ${selectedSize === size ? 'bg-red-600 text-white' : 'bg-white text-gray-800 border-gray-300 hover:bg-red-100'}`}
                onClick={() => toggleSizeSelection(size)}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-2">
          <label className="font-medium text-red-600 text-lg">Colores:</label>
          <div className="flex gap-1 mt-1">
            {product.colors?.map((color) => (
              <button
                key={color}
                className={`border rounded-md px-3 py-1 text-sm transition-colors duration-300 ${selectedColor === color ? 'bg-red-600 text-white' : 'bg-white text-gray-800 border-gray-300 hover:bg-red-100'}`}
                onClick={() => toggleColorSelection(color)}
              >
                {color}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col justify-center mt-4 gap-2">
          {isBuying && preferenceId ? (
            <div className="mb-4">
              <Wallet initialization={{ preferenceId }} /> 
            </div>
          ) : (
            <button className="bg-green-500 text-white py-4 px-3 rounded-md text-sm transition duration-300 hover:bg-green-600 transform hover:scale-105" onClick={handleBuyNow}>
              Comprar ahora
            </button>
          )}

          <div className="flex justify-between mt-4">
            <button className="bg-gray-400 text-white py-2 px-4 rounded-md text-sm transition duration-300 hover:bg-gray-500 transform hover:scale-105" onClick={() => navigate("/catalogo")}>
              <span className="material-symbols-outlined">arrow_back</span> Regresar
            </button>

            <button className={`py-2 px-6 rounded-md text-sm transition duration-300 transform hover:scale-105 ${isInCart ? 'bg-red-600 text-white hover:bg-red-700' : 'bg-red-400 text-white hover:bg-red-500'}`} onClick={handleAddToCart}>
              <span className="material-symbols-outlined">shopping_cart</span> {isInCart ? 'Quitar' : 'Añadir'}
            </button>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default PaymentPage;
