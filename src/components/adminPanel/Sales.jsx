
const Sales = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Ventas</h1>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="px-4 py-2 border-b">Producto</th>
            <th className="px-4 py-2 border-b">Cantidad</th>
            <th className="px-4 py-2 border-b">Precio Total</th>
            <th className="px-4 py-2 border-b">Fecha</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="px-4 py-2 border-b">Blusa floral</td>
            <td className="px-4 py-2 border-b">2</td>
            <td className="px-4 py-2 border-b">$40</td>
            <td className="px-4 py-2 border-b">20/10/2024</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Sales;
