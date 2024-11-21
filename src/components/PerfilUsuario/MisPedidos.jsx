import { useContext} from "react";
import { CartContext } from "../carrito/CartContext";


const MisPedidos = () => {
  const { orders, removeOrder } = useContext(CartContext);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">MIS PEDIDOS</h1>
      {orders && orders.length > 0 ? (
        <div className="space-y-6">
          {orders.map((order, index) => (
            <div
              key={index}
              className="bg-gray-100 p-6 mb-6 rounded-lg shadow-md"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Pedido {index + 1}</h2>
                <button
                  onClick={() => removeOrder(index)}
                  className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition"
                >
                  Eliminar Pedido
                </button>
              </div>
              <p>
                <strong>Fecha y Hora:</strong>{" "}
                {new Date(order.date).toLocaleString()}
              </p>
              <p>
                <strong>Total:</strong> ${order.total.toFixed(2)}
              </p>
              <p>
                <strong>Dirección de Envío:</strong>{" "}
                {`${order.address?.direccionEntrega || "Sin dirección"}, ${
                  order.address?.ciudad || "Sin ciudad"
                }, ${order.address?.pais || "Sin país"}`}
              </p>
              <h3 className="mt-4 font-semibold">Artículos:</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-3">
                {order.items.map((item, itemIndex) => (
                  <div
                    key={itemIndex}
                    className="bg-white p-4 border rounded-lg text-center shadow-sm"
                  >
                    <p>{item.name}</p>
                    <p>
                      {item.quantity} x ${item.unitPrice.toFixed(2)}
                    </p>
                    <button
                      onClick={() => openModal(item)}
                      className="bg-blue-500 text-white py-2 px-4 mt-2 rounded-lg hover:bg-blue-600 transition text-sm"
                    >
                      Detalles
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-lg text-gray-500">
          No has realizado ningún pedido.
        </p>
      )}

      {/* Modal para mostrar detalles del producto */}
    </div>
  );
};

export default MisPedidos;
