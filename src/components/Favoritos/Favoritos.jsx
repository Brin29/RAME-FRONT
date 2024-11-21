import { useEffect, useState, useContext } from "react";
import { CartContext } from "../carrito/CartContext"; // Importamos el contexto del carrito
import { useNavigate } from "react-router-dom";
import sin from "../../assets/imagenes/sinprendas.png"; // Asegúrate de que esta imagen exista

function Favoritos({ products }) {
  const [favoriteItems, setFavoriteItems] = useState([]);
  const { addToCart } = useContext(CartContext); // Obtenemos la función para agregar al carrito
  const navigate = useNavigate(); // Usamos navigate para redirigir a la página de detalle del producto

  useEffect(() => {
    try {
      const storedFavorites = JSON.parse(localStorage.getItem("favoriteItems")) || [];
      setFavoriteItems(storedFavorites);
    } catch (error) {
      console.error("Error leyendo productos favoritos desde localStorage", error);
      setFavoriteItems([]);
    }
  }, []);

  // Filtrar los productos que están en favoritos
  const favoriteProducts = products.filter((product) =>
    favoriteItems.includes(product.id)
  );

  // Función para manejar cuando se agrega un producto al carrito
  const handleAddToCart = (product) => {
    addToCart(product); // Agregar producto al carrito
  };

  // Función para eliminar un producto de favoritos
  const handleRemoveFromFavorites = (productId) => {
    const updatedFavorites = favoriteItems.filter((id) => id !== productId);
    setFavoriteItems(updatedFavorites);
    localStorage.setItem("favoriteItems", JSON.stringify(updatedFavorites)); // Actualiza localStorage
  };

  return (
    <div className="container mx-auto py-10 mt-12">
      {favoriteProducts.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {favoriteProducts.map((product) => (
            <div
              key={product.id}
              className="relative group rounded-lg shadow-lg transform transition-transform hover:scale-105 overflow-hidden"
            >
              {/* Imagen del producto ocupando todo el espacio */}
              <img
                src={product.imgPath}
                alt={product.name}
                className="w-full h-full object-cover"
              />

              {/* Información y botones superpuestos */}
              <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                <h2 className="text-lg font-semibold text-white truncate">
                  {product.name}
                </h2>
                <p className="text-xl font-bold text-white">
                  ${product.price.toLocaleString()} ARS
                </p>

                <div className="mt-4 flex flex-col gap-2">
                  <button
                    className="w-full py-2 bg-red-400 text-white rounded-lg hover:bg-red-500 transition-colors"
                    onClick={() =>
                      navigate(`/product/${product.id}`, { state: { product } })
                    }
                  >
                    Ver Detalles
                  </button>
                  <button
                    className="w-full py-2 bg-red-300 text-white rounded-lg hover:bg-red-400 transition-colors"
                    onClick={() => handleAddToCart(product)}
                  >
                    Agregar al Carrito
                  </button>
                  <button
                    className="w-full py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                    onClick={() => handleRemoveFromFavorites(product.id)}
                  >
                    Eliminar de Favoritos
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20">
          <img
            src={sin}
            alt="Sin prendas"
            className="w-80 h-auto opacity-70 mb-4"
          />
          <p className="text-lg font-semibold text-gray-500">
            No tienes productos favoritos aún.
          </p>
        </div>
      )}
    </div>
  );
}

export default Favoritos;
