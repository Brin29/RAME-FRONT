import { useContext, useEffect, useState} from "react";
import { CartContext } from "../carrito/CartContext";


const MisPedidos = () => {
  const { orders, removeOrder } = useContext(CartContext);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8080/getPreference');
        
        if (!response.ok) {
          throw new Error('Error al obtener los datos');
        }

        const data = await response.json();
        setProducts(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">MIS PEDIDOS</h1>
      <ul>
        {products.map((item) => (
          <li key={item.id}>
            {item.product ? (
              <div>
                <h2>{item.product.name}</h2>
                <img src={item.product.imgPath} alt={item.product.name} width={200} />
                <p>{item.product.description}</p>
                <p>Precio: ${item.product.price}</p>
                <p>Cantidad disponible: {item.product.quantity}</p>
                <p>Colores: {item.product.colors.join(', ')}</p>
                <p>Tamaños: {item.product.sizes.join(', ')}</p>
              </div>
            ) : (
              <p>No hay producto asociado.</p>
            )}
          </li>
        ))}
      </ul>

      {/* Modal para mostrar detalles del producto */}
    </div>
  );
};

export default MisPedidos;
