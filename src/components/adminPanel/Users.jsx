import { useEffect, useState } from "react";
import { AddresUser } from "./AddresUser";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://proud-blessing-production.up.railway.app/v1/users');

        if (!response.ok) {
          throw new Error('Error al obtener los usuarios');
        }

        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [loading]);


  
  if (loading) return <p className="text-center text-gray-600">Cargando usuarios...</p>;

  return (
    <div className="p-8 bg-gray-50 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-4xl">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Lista de Usuarios</h1>
        <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md overflow-hidden">
          <thead className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            <tr>
              <th className="px-6 py-3 border-b-2 text-left">Nombre</th>
              <th className="px-6 py-3 border-b-2 text-left">Email</th>
              <th className="px-6 py-3 border-b-2 text-left">Direcciones</th>
              <th className="px-6 py-3 border-b-2 text-left">Compras</th>
              <th className="px-6 py-3 border-b-2 text-left">Rol</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm">
            {users.map((user, index) => (
              <tr
                key={index}
                className={`border-b ${index % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-gray-100 transition duration-200`}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  {user.firstName} {user.lastName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{user.username}</td>
                <td className="px-6 py-4 whitespace-nowrap"><AddresUser idUser={user}/></td>
                <td className="px-6 py-4 whitespace-nowrap"></td>
                <td className="px-6 py-4 whitespace-nowrap">{user.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
