import { useState, useEffect } from "react";
import { EditAddress } from "./EditAddress";
import { DeleteAddress } from "./DeleteAddress";

const MisDirecciones = () => {
  const [poppup, setPoppup] = useState(false)
  const idUser = 1;
  
  
  const [nuevaDireccion, setNuevaDireccion] = useState({
    country: "",
    province: "",
    city: "",
    direction: "",
    zipCode: "",
    telephone: "",
    moreDetails: "",
    type: "",
  });
  
  

  const [direcciones, setDirecciones] = useState(nuevaDireccion);

  const [api, setApi] = useState({
    country: "",
    province: "",
    city: "",
  });

  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [errores, setErrores] = useState({});

  const [paises, setPaises] = useState([]);
  const [provincias, setProvincias] = useState([]);
  const [ciudades, setCiudades] = useState([]);
  const countryIso2 = paises.find(
    (pais) => pais.name === nuevaDireccion.country
  )?.iso2;

  const provinceIso2 = provincias.find(
    (province) => province.name === nuevaDireccion.province
  )?.iso2;

  const apiKey = "UDNxeGQ2SlRsUmxmeHljV3MzWmpwOU5oNFFzU09QWWwwbkE5ZTd4MQ=="; // Reemplaza con tu clave de API
  const baseUrl = "https://api.countrystatecity.in/v1";

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
    if (nuevaDireccion.country) {

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
  }, [nuevaDireccion.country, countryIso2]);

  useEffect(() => {
    if (nuevaDireccion.province) {

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
  }, [countryIso2, provinceIso2, nuevaDireccion.province]);
  useEffect(() => {
    fetch(`http://localhost:8080/v1/user-addres/${idUser}`)
    .then(res => res.json())
    .then(json => {
      setMostrarFormulario(true)
      setDirecciones(json)})

  }, [mostrarFormulario])

  const handleDirectionSubmit = (e) => {
    e.preventDefault();

    const configuration = {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(nuevaDireccion),
    };

    fetch(`http://localhost:8080/v1/user-addres/${idUser}`, configuration)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Error al agregar la direccion");
        }
        return res.json();
      })
      .then((json) => {
        console.log(json)
      })
      .catch((err) => {
        console.error("Error: ", err);
      });

    location.reload();
  };

  

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setNuevaDireccion({
      ...nuevaDireccion,
      //Necesito tomar el nombre
      [name]: value,
    });

    setApi({
      ...api,
      [name]: value,
    });

    console.log(api);
  };

  const validarCampos = () => {
    const nuevosErrores = {};

    if (!nuevaDireccion.country.trim()) {
      nuevosErrores.country = "El país es obligatorio.";
    }
    if (!nuevaDireccion.province.trim()) {
      nuevosErrores.province = "La provincia es obligatoria.";
    }
    if (!nuevaDireccion.city.trim()) {
      nuevosErrores.city = "La ciudad es obligatoria.";
    }
    if (!nuevaDireccion.direction.trim()) {
      nuevosErrores.direction = "La dirección es obligatoria.";
    }
    if (!nuevaDireccion.zipCode.trim()) {
      nuevosErrores.zipCode = "El código postal es obligatorio.";
    }

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  return (
    <div className="flex flex-col items-center justify-center text-center p-8 bg-white rounded-lg w-3/4 mx-auto shadow-lg">
    <h1 className="text-3xl font-bold text-gray-800 my-2">Mis Direcciones</h1>
    <p className="text-gray-500 my-2">Aquí puedes gestionar tus direcciones.</p>

    <div className="w-full max-w-md space-y-4 my-4">
      { mostrarFormulario &&
        direcciones.map((direccion) => (
          <div
            key={direccion.id}
            className="bg-gray-50 p-4 rounded-lg shadow border border-gray-200 my-2"
          >
            <p className="text-sm text-gray-600 my-1">
              <strong>País:</strong> {direccion.country}
            </p>
            <p className="text-sm text-gray-600 my-1">
              <strong>Provincia:</strong> {direccion.province}
            </p>
            <p className="text-sm text-gray-600 my-1">
              <strong>Ciudad:</strong> {direccion.city}
            </p>
            <p className="text-sm text-gray-600 my-1">
              <strong>Dirección:</strong> {direccion.direction}
            </p>
            <p className="text-sm text-gray-600 my-1">
              <strong>Código Postal:</strong> {direccion.zipCode}
            </p>
            <p className="text-sm text-gray-600 my-1">
              <strong>Tipo de Vivienda:</strong> {direccion.type}
            </p>
            <EditAddress address={direccion} />

            <DeleteAddress id={direccion.id}/>
          </div>

        ))}
    </div>

      { poppup && 
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10 h-full">
      <div className="bg-white rounded-lg p-6 w-full max-w-lg space-y-4 shadow-xl overflow-y-auto">
      <form onSubmit={handleDirectionSubmit}>
        <div className="flex flex-col items-center w-full max-w-md mt-5">
          <select
            name="country"
            value={nuevaDireccion.country}
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

          {nuevaDireccion.country && (
            <select
              name="province"
              value={nuevaDireccion.province}
              onChange={handleInputChange}
               className="w-full p-3 border border-gray-300 rounded-lg"
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

          {nuevaDireccion.province && (
            <select
              name="city"
              value={nuevaDireccion.city}
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
            value={nuevaDireccion.direction}
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
            value={nuevaDireccion.zipCode}
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
            value={nuevaDireccion.type}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded mb-2"
          />

          <input
            type="text"
            name="moreDetails"
            placeholder="Danos mas detalles para encontrarte mas rapido"
            value={nuevaDireccion.moreDetails}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded mb-2"
          />

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => setPoppup(false)}
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
      <button
        onClick={() => setPoppup(true)}
        className="my-4 bg-blue-600 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700 transition duration-300"
      >
        Añadir Dirección
      </button>
    
    </div>
  );
};

export default MisDirecciones;
