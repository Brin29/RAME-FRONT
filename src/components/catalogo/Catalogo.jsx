import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CartContext } from "../carrito/CartContext";
import products from "./products";
import video from "../catalogo/fondo.mp4";

const filterOptions = {
  category: ["camisa", "chaqueta", "croptop", "corset", "vestido-baño", "vestido","pantalon"],
  color: ["blanco", "negro", "azul", "rosado", "gris", "naranja", "rojo", "beige"],
  size: ["S", "M", "L", "XL"],
};

function Catalogo() {
  const location = useLocation();
  const navigate = useNavigate();
  const { addToCart, removeFromCart, cartItems } = useContext(CartContext);
  const [filters, setFilters] = useState(() => {
    const savedFilters = JSON.parse(localStorage.getItem("filters"));
    return savedFilters || {
      category: [],
      color: [],
      size: [],
      priceRange: [0, 1000000],
    };
  });
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const category = params.get('category');
    if (category) {
      setFilters((prevFilters) => ({
        ...prevFilters,
        category: [category], // Aplica el filtro de categoría
      }));
    }
  }, [location]);

  const [favoriteItems, setFavoriteItems] = useState(() => {
    return JSON.parse(localStorage.getItem("favoriteItems")) || [];
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [currentPage, setCurrentPage] = useState(
    JSON.parse(localStorage.getItem("currentPage")) || 1
  );
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const productsPerPage = 8;

  useEffect(() => {
    fetch("http://localhost:8080/v1/products")
    .then(res => res.json())
    .then(json => {
      setProduct(json)
      setLoading(false)
    })
    .catch(err => {
      console.error("Error en la imagenes: ", err)
      setLoading(false)
    })
  }, [loading])

  if (loading){
    return <p>Cargando...</p>
  }
  useEffect(() => {
    localStorage.setItem("filters", JSON.stringify(filters));
  }, [filters]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favoriteItems")) || [];
    setFavoriteItems(storedFavorites);
  }, []);

  const toggleFavorite = (productId) => {
    const updatedFavorites = favoriteItems.includes(productId)
      ? favoriteItems.filter((id) => id !== productId)
      : [...favoriteItems, productId];

    setFavoriteItems(updatedFavorites);
    localStorage.setItem("favoriteItems", JSON.stringify(updatedFavorites));

    toast[updatedFavorites.includes(productId) ? 'success' : 'error'](
      updatedFavorites.includes(productId) ? "Agregado a favoritos" : "Eliminado de favoritos"
    );
  };

  const toggleFilter = (type, value) => {
    setFilters((prev) => {
      const updatedFilters = {
      ...prev,
      [type]: prev[type].includes(value)
        ? prev[type].filter((item) => item !== value)
        : [...prev[type], value],
    };
    handleFilterChange(updatedFilters);
    return updatedFilters;
    });
  };

  const handlePriceChange = (e) => {
    const updatedFilters = {
      ...filters,
      priceRange: [filters.priceRange[0], Number(e.target.value)],
    };
    handleFilterChange(updatedFilters);
  };
  

  const handleClearFilters = () => {
    const defaultFilters = {
      category: [],
      color: [],
      size: [],
      priceRange: [0, 1000000],
    };
    handleFilterChange(defaultFilters);
  };
  const filteredProducts = products.filter((product) => {
    const matchesCategory = !filters.category.length || filters.category.includes(product.category);
    const matchesColor = !filters.color.length || filters.color.some((color) => product.colors.includes(color));
    const matchesSize = !filters.size.length || filters.size.some((size) => product.sizes.includes(size));
    const matchesPrice = product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1];
    return matchesCategory && matchesColor && matchesSize && matchesPrice;
  });

  const isProductInCart = (productId) => {
    const product = cartItems.find((item) => item.id === productId);
    return product ? product.quantity : 0;
  };

  const handleCartButtonClick = (product) => {
    if (isProductInCart(product.id)) {
      removeFromCart(product.id);
      toast.error(`${product.name} eliminado del carrito.`);
    } else {
      addToCart(product);
      toast.success(`${product.name} añadido al carrito.`);
    }
  };
const handleFilterChange = (updatedFilters) => {
  setFilters(updatedFilters);
  setCurrentPage(1); // Restablece a la página 1
};
  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    if (term) {
      const newSuggestions = products.filter((product) =>
        product.name.toLowerCase().includes(term.toLowerCase())
      );
      setSuggestions(newSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (product) => {
    setSearchTerm('');
    setSuggestions([]);
    navigate(`/product/${product.id}`, { state: { product } });
  };

  const handlePageChange = (page) => setCurrentPage(page);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  return (
    <div className="flex flex-col gap-6 p-6 min-h-screen relative mx-12">
      <ToastContainer />
      <video src={video} autoPlay muted loop className="fixed top-0 left-0 w-full h-full object-cover z-[-1]" />

      <div className="flex justify-between gap-8 flex-wrap">
      <div
  className="w-80 bg-white p-6 rounded-lg shadow-md transform transition-transform hover:scale-105 overflow-hidden"
>
  <h3 className="text-xl font-semibold text-gray-700 mb-4">Buscar y Filtrar</h3>
  
  {/* Campo de búsqueda */}
  <div className="mb-6 relative">
    <input
      type="text"
      value={searchTerm}
      onChange={handleSearchChange}
      placeholder="Buscar productos..."
      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
    />
    {suggestions.length > 0 && (
      <div className="absolute bg-white border border-red-300 mt-2 rounded-lg shadow-lg w-full max-h-60 overflow-y-auto z-10">
        {suggestions.map((product) => (
          <div
            key={product.id}
            onClick={() => handleSuggestionClick(product)}
            className="p-2 cursor-pointer hover:bg-gray-100"
          >
            {product.name}
          </div>
        ))}
      </div>
    )}
  </div>

  {/* Filtros por tipo */}
  <div>
    <h3 className="text-lg font-medium text-gray-700 mb-2">Filtrar por:</h3>
    {Object.keys(filterOptions).map((type) => (
      <div key={type} className="mb-4">
        <h4 className="text-base font-medium text-gray-600 mb-2">
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </h4>
        {filterOptions[type].map((option) => (
          <button
            key={option}
            onClick={() => toggleFilter(type, option)}
            className={`inline-block px-3 py-2 border rounded-full mr-2 mb-2 text-sm font-medium 
              ${
                filters[type].includes(option)
                  ? 'bg-red-400 text-white shadow-md'
                  : 'bg-gray-200 text-gray-600 hover:bg-red-200'
              }`}
          >
            {option.charAt(0).toUpperCase() + option.slice(1)}
          </button>
        ))}
      </div>
    ))}
  </div>

  {/* Rango de precios */}
  <div className="mb-6">
    <h4 className="text-base font-medium text-gray-600 mb-2">Rango de Precios</h4>
    <input
      type="range"
      min="0"
      max="100000"
      value={filters.priceRange[1]}
      onChange={handlePriceChange}
      className="w-full bg-red-200 h-2 rounded-lg appearance-none cursor-pointer"
    />
    <span className="block text-sm text-gray-500 mt-2">Hasta ${filters.priceRange[1]}</span>
  </div>

  {/* Botón de borrar filtros */}
  <button
    className="w-full py-2 bg-red-400 text-white rounded-lg font-semibold shadow-md hover:bg-red-500 transition-colors"
    onClick={handleClearFilters}
  >
    Borrar Filtros
  </button>
</div>


{/*productos*/}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 flex-1">
  {currentProducts.map((product) => {
    const inCart = isProductInCart(product.id) > 0;
    return (
      <div
        key={product.id}
        className={`relative group rounded-lg shadow-md transform transition-transform hover:scale-105 overflow-hidden 
          ${inCart ? 'opacity-80' : 'opacity-100'}`}
        style={{ height: '450px', width: '100%' }}
        onClick={() => navigate(`/product/${product.id}`, { state: { product } })}
      >
        {/* Imagen del producto con efecto dinámico */}
        <img
          src={product.imgPath}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />

        {/* Información del producto */}
        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4 transition-transform duration-300 group-hover:translate-y-0 translate-y-[70%]">
          {/* Nombre del producto */}
          <h3 className="text-lg font-medium">{product.name}</h3>

          {/* Información adicional (se muestra al hover) */}
          <div className="mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <p className="text-lg">${product.price.toLocaleString()}</p>
            <button
              className={`mt-4 w-full flex items-center justify-center p-2 rounded bg-black bg-opacity-50 hover:bg-opacity-75 transition-all 
                ${favoriteItems.includes(product.id) ? 'text-red-500' : 'text-gray-300'}`}
              onClick={(e) => {
                e.stopPropagation(); // Evitar navegación
                toggleFavorite(product.id);
              }}
            >
              <span className="material-symbols-outlined text-2xl">
                {favoriteItems.includes(product.id) ? 'favorite' : 'favorite_border'}
              </span>
            </button>
          </div>
        </div>
      </div>
    );
  })}
</div>



      </div>
      <div className="flex justify-center mt-8">
        <div className="flex gap-2">
          {Array.from({ length: Math.ceil(filteredProducts.length / productsPerPage) }).map((_, index) => (
            <button
              key={index}
              className={`px-3 py-2 border rounded-lg text-sm 
                ${index + 1 === currentPage ? 'bg-red-400 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Catalogo;
