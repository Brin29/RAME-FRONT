import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import {useEffect, useState} from "react"

const DatosPersonales = ({formData, handleInputChange, handleSubmit,showPassword, togglePasswordVisibility,}) => {

  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:8080/v1/users');
        
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
  }, []);
  
  if (loading) return <p>Cargando usuarios...</p>;

  return (
  
  <div className="max-w-lg mx-auto bg-white p-8 shadow-lg rounded-lg">
    <h1 className="text-2xl font-bold mb-6">SUS DATOS PERSONALES</h1>
    <form onSubmit={handleSubmit}>
      {
          users.map(user => (
            <>
      <div className="mb-4">
          
        <label className="block text-sm font-medium text-gray-700">
          Nombre
        </label>
        <input
          type="text"
          name="firstName"
          value={user.firstName}
          onChange={handleInputChange}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-500"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Apellido
        </label>
        <input
          type="text"
          name="lastName"
          value={user.lastName}
          onChange={handleInputChange}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-500"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Correo electrónico
        </label>
        <input
          type="email"
          name="email"
          value={user.username}
          onChange={handleInputChange}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-500"
        />
      </div>
      {/* <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Fecha de Nacimiento
        </label>
        <input
          type="date"
          name="birthDate"
          value={formData.birthDate}
          onChange={handleInputChange}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-500"
        />
      </div> */}
      {["currentPassword", "newPassword", "confirmPassword"].map((field) => (
        <div className="mb-4" key={field}>
          <label className="block text-sm font-medium text-gray-700">
            {field === "currentPassword"
              ? "Contraseña Actual"
              : field === "newPassword"
              ? "Nueva Contraseña"
              : "Confirmación"}
          </label>
          <div className="relative">
            <input
              type={showPassword[field] ? "text" : "password"}
              name={field}
              value={formData[field]}
              onChange={handleInputChange}
              required={field === "currentPassword"}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-500"
            />
            <FontAwesomeIcon
              icon={showPassword[field] ? faEyeSlash : faEye}
              onClick={() => togglePasswordVisibility(field)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer hover:text-indigo-500"
            />
          </div>
        </div>
      ))}
      <button
        type="submit"
        className="w-full bg-black text-white py-2 px-4 rounded-md shadow hover:bg-gray-800 transition duration-200"
      >
        Guardar
      </button>
      {/* Botón Editar debajo del botón Guardar */}
      <button
        type="button" // Cambiado a "button" para evitar el envío del formulario
        className="w-full bg-gray-300 text-black py-2 px-4 mt-4 rounded-md shadow hover:bg-gray-400 transition duration-200"
        onClick={() => alert("Modo de edición activado")} // Puedes agregar la funcionalidad que necesites aquí
      >
        Editar
      </button>
      </>
      ))}
    </form>
  </div>
    )
  }

export default DatosPersonales;
