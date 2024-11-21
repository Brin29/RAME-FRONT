import { useState } from "react";

export const AddresUser = ({ idUser }) => {
  const addresUser = idUser.directions;
  const [poppup, setPoppup] = useState(false);

  return (
    <>
      <span
        className="text-cyan-600 cursor-pointer hover:underline transition duration-200"
        onClick={() => setPoppup(true)}
      >
        Direcciones
      </span>

      {poppup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10 h-full">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg space-y-4 shadow-xl overflow-hidden relative h-5/6">
            {/* Botón de cierre en la esquina superior derecha */}
            <button
              onClick={() => setPoppup(false)}
              className="absolute top-4 right-10 bg-gray-200 text-gray-600 rounded-full p-1 hover:bg-gray-300 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <div className="w-full max-h-96 overflow-y-auto p-4">
              {addresUser.map((address) => (
                <div
                  key={address.id}
                  className="bg-gray-50 p-4 rounded-lg shadow border border-gray-200 my-2"
                >
                  <p className="text-sm text-gray-600 my-1">
                    <strong>Id:</strong> {address.id}
                  </p>
                  <p className="text-sm text-gray-600 my-1">
                    <strong>País:</strong> {address.country}
                  </p>
                  <p className="text-sm text-gray-600 my-1">
                    <strong>Provincia:</strong> {address.province}
                  </p>
                  <p className="text-sm text-gray-600 my-1">
                    <strong>Ciudad:</strong> {address.city}
                  </p>
                  <p className="text-sm text-gray-600 my-1">
                    <strong>Dirección:</strong> {address.direction}
                  </p>
                  <p className="text-sm text-gray-600 my-1">
                    <strong>Código Postal:</strong> {address.zipCode}
                  </p>
                  <p className="text-sm text-gray-600 my-1">
                    <strong>Tipo de Vivienda:</strong> {address.type}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
