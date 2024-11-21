import { useState, useEffect } from 'react'

export const EditAddress = ({address}) => {
  const [editAddress, setEditAddress] = useState(address);
  const [api, setApi] = useState({
    country: "",
    province: "",
    city: "",
  });
  const [poppup, setPopup] = useState(false)
  const [paises, setPaises] = useState([]);
  const [provincias, setProvincias] = useState([]);
  const [ciudades, setCiudades] = useState([]);
  const [errores, setErrores] = useState({});
  const userId = 1;

  const apiKey = "UDNxeGQ2SlRsUmxmeHljV3MzWmpwOU5oNFFzU09QWWwwbkE5ZTd4MQ=="; // Reemplaza con tu clave de API
  const baseUrl = "https://api.countrystatecity.in/v1";

  const countryIso2 = paises.find(
    (pais) => pais.name === editAddress.country
  )?.iso2;

  const provinceIso2 = provincias.find(
    (province) => province.name === editAddress.province
  )?.iso2;

  // Obtener la lista de países
  useEffect(() => {
    fetch(`${baseUrl}/countries`, {
      headers: { "X-CSCAPI-KEY": apiKey },
    })
      .then((response) => response.json())
      .then((data) => setPaises(data))
      .catch((error) => console.error("Error al obtener países:", error));
  }, []);

  // Obtener la lista de provincias cuando se selecciona un país
  useEffect(() => {
    if (editAddress.country) {

      // Validar que no este vacia
      if (countryIso2) {
        fetch(`${baseUrl}/countries/${countryIso2}/states`, {
          headers: { "X-CSCAPI-KEY": apiKey },
        })
        .then((response) => response.json())
        .then((data) => setProvincias(data))
        .catch((error) => console.error("Error al obtener provincias:", error));
      }
    }
  }, [editAddress.country, countryIso2]);

  useEffect(() => {
    if (editAddress.province) {

      if (provinceIso2){
        fetch(
          `${baseUrl}/countries/${countryIso2}/states/${provinceIso2}/cities`,
          {
            headers: { "X-CSCAPI-KEY": apiKey },
          }
        )
        .then((response) => response.json())
        .then((data) => setCiudades(data))
        .catch((error) => console.error("Error al obtener ciudades:", error));
      }
    }
  }, [countryIso2, provinceIso2, editAddress.province]);

  const editDirection = (e) => {
    e.preventDefault()
    const configuration = {
      method: "PUT",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(editAddress)
    }

    const addressId = editAddress.id;
    fetch(`http://localhost:8080/v1/directions/${addressId}/${userId}`, configuration)
    .then(res => res.json())
    .then(json => console.log(json))
    .catch(err =>  console.error(err))

    location.reload()
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setEditAddress({
      ...editAddress,
      //Necesito tomar el nombre
      [name]: value,
    });

    setApi({
      ...api,
      [name]: value,
    });

    console.log(api);
  };


  return (
    <>
    <button onClick={() => setPopup(true)}
      className="bg-green-500 text-white py-1 px-3 rounded mr-2 hover:bg-green-700">
      Editar
    </button>
    {
      poppup &&
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10 h-full">
      <div className="bg-white rounded-lg p-6 w-full max-w-lg space-y-4 shadow-xl overflow-y-auto">
      <form onSubmit={editDirection}>
        <div className="flex flex-col items-center w-full max-w-md mt-5">
          <select
            name="country"
            value={editAddress.country}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded mb-2"
          >
            <option value="">Seleccione un país</option>
            {paises.map((pais) => (
              <option key={pais.iso2} value={pais.name}>
                {pais.name}
              </option>
            ))}
          </select>
          {errores.country && (
            <p className="text-red-500 text-sm">{errores.country}</p>
          )}

          {editAddress.country && (
            <select
              name="province"
              value={editAddress.province}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded mb-2"
            >
              <option value="">Seleccione una provincia</option>
              {provincias.map((provincia) => (
                <option key={provincia.iso2} value={provincia.name}>
                  {provincia.name}
                </option>
              ))}
            </select>
          )}
          {errores.province && (
            <p className="text-red-500 text-sm">{errores.province}</p>
          )}

          {editAddress.province && (
            <select
              name="city"
              value={editAddress.city}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded mb-2"
            >
              <option value="">Seleccione una ciudad</option>
              {ciudades.map((ciudad) => (
                <option key={ciudad.id} value={ciudad.name}>
                  {ciudad.name}
                </option>
              ))}
            </select>
          )}
          {errores.city && (
            <p className="text-red-500 text-sm">{errores.city}</p>
          )}

          <input
            type="text"
            name="direction"
            placeholder="Dirección"
            value={editAddress.direction}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded mb-2"
          />
          {errores.direction && (
            <p className="text-red-500 text-sm">{errores.direction}</p>
          )}

          <input
            type="text"
            name="zipCode"
            placeholder="Código Postal"
            value={editAddress.zipCode}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded mb-2"
          />
          {errores.zipCode && (
            <p className="text-red-500 text-sm">{errores.zipCode}</p>
          )}

          <input
            type="text"
            name="type"
            placeholder="Tipo de Vivienda (piso, casa, etc.)"
            value={editAddress.type}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded mb-2"
          />

          <input
            type="text"
            name="moreDetails"
            placeholder="Danos mas detalles para encontrarte mas rapido"
            value={editAddress.moreDetails}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded mb-2"
          />
          
          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={() => setPopup(false)}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700 transition duration-300"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300"
            >
              Guardar Dirección
            </button>
          </div>
        </div>
      </form>
      </div>
      </div>
    }
    </>
  )
}
