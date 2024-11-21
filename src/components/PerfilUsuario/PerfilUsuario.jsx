import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DatosPersonales from "./DatosPersonales";
import MisDirecciones from "./MisDirecciones";
import MisPedidos from "./MisPedidos";
import avatar1 from "../../assets/avatares/avatar1.png";
import avatar2 from "../../assets/avatares/avatar2.png";
import avatar3 from "../../assets/avatares/avatar3.png";
import avatar4 from "../../assets/avatares/avatar4.png";
// import "./PerfilUsuario.css";

const avatars = [avatar1, avatar2, avatar3, avatar4];

const PerfilUsuario = () => {
  const navigate = useNavigate();

  const getInitialFormData = () => {
    return (
      JSON.parse(localStorage.getItem("formData")) || {
        firstName: "",
        lastName: "",
        email: "",
        birthDate: "",
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
        avatar: "",
      }
    );
  };

  const [formData, setFormData] = useState(getInitialFormData());
  const [avatarSelection, setAvatarSelection] = useState(false);
  const [showPassword, setShowPassword] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
  });
  const [showLogoutModal, setShowLogoutModal] = useState(false); // Estado para mostrar el modal de cierre de sesión

  const getInitialActiveSection = () => {
    return localStorage.getItem("activeSection") || "datos-personales";
  };

  const [activeSection, setActiveSection] = useState(getInitialActiveSection());

  useEffect(() => {
    const savedFormData = localStorage.getItem("formData");
    if (savedFormData) setFormData(JSON.parse(savedFormData));
  }, []);

  useEffect(() => {
    localStorage.setItem("activeSection", activeSection);
  }, [activeSection]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const updatedFormData = { ...formData, [name]: value };
    setFormData(updatedFormData);
    localStorage.setItem("formData", JSON.stringify(updatedFormData));
  };

  const handleAvatarChange = (selectedAvatar) => {
    const updatedFormData = { ...formData, avatar: selectedAvatar };
    setFormData(updatedFormData);
    setAvatarSelection(false);
    localStorage.setItem("formData", JSON.stringify(updatedFormData));
  };

  const togglePasswordVisibility = (field) => {
    setShowPassword({ ...showPassword, [field]: !showPassword[field] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  const handleLogout = () => {
    localStorage.removeItem("token"); // Eliminar token
    navigate("/"); // Redirigir a la página principal después de cerrar sesión
  };

  const renderActiveSection = () => {
    switch (activeSection) {
      case "mis-direcciones":
        return <MisDirecciones />;
      case "mis-pedidos":
        return <MisPedidos />;
      case "datos-personales":
      default:
        return (
          <DatosPersonales
            formData={formData}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
            showPassword={showPassword}
            togglePasswordVisibility={togglePasswordVisibility}
          />
        );
    }
  };

  return (
    <div className="flex flex-col md:flex-row p-6 gap-6">
      <div className="w-full md:w-1/4 bg-gray-100 p-6 flex flex-col gap-4">
        <h1 className="text-xl font-bold">Mi cuenta</h1>

        <button
          className="w-full bg-white border border-gray-300 p-3 text-left hover:bg-gray-200 rounded"
          onClick={() => setActiveSection("datos-personales")}
        >
          Mis Datos Personales
        </button>
        <button
          className="w-full bg-white border border-gray-300 p-3 text-left hover:bg-gray-200 rounded"
          onClick={() => setActiveSection("mis-pedidos")}
        >
          Mis pedidos
        </button>
        <button
          className="w-full bg-white border border-gray-300 p-3 text-left hover:bg-gray-200 rounded"
          onClick={() => setActiveSection("mis-direcciones")}
        >
          Mis direcciones
        </button>
        <button
          className="w-full bg-white border border-gray-300 p-3 text-left hover:bg-gray-200 rounded"
          onClick={() => navigate("/favorito")}
        >
          Mis favoritos
        </button>
        {/*cerrar seccion */}
        <button
          className="w-full bg-white border border-gray-300 p-3 text-left hover:bg-gray-200 rounded"
          onClick={() => setShowLogoutModal(true)} // Mostrar el modal al hacer clic en "Cerrar sesión"
        >
          Cerrar sesión
        </button>

        <div className="flex flex-col items-center mt-4">
          <div className="relative">
            <img
              src={formData.avatar || "/default-avatar.png"}
              alt="Avatar"
              className="w-24 h-24 rounded-full cursor-pointer mb-3 object-cover"
              onClick={() => setAvatarSelection(!avatarSelection)}
            />
            <span className="text-lg font-bold">
              {formData.firstName} {formData.lastName}
            </span>
          </div>

          <div className="text-md text-gray-600">
            ¡Hola {formData.firstName || "Usuario"}!
          </div>

          {avatarSelection && (
            <div className="absolute bg-white border border-gray-300 p-3 shadow-lg rounded mt-2 flex flex-col items-center z-10">
              {avatars.map((avatar, index) => (
                <img
                  key={index}
                  src={avatar}
                  alt={`Avatar ${index + 1}`}
                  onClick={() => handleAvatarChange(avatar)}
                  className="w-14 h-14 rounded-full cursor-pointer mb-2"
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="w-full md:w-3/4 p-6">
        {renderActiveSection()}
        <a
          href="#"
          onClick={() => navigate("/")}
          className="block mt-4 text-black text-lg hover:underline"
        >
          ← Volver a la página principal
        </a>
      </div>

      {/* ventana de confirmación de cierre de sesión */}
      {showLogoutModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">¿Estás seguro de que deseas cerrar sesión?</h2>
            <div className="flex justify-end gap-4">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                onClick={handleLogout}
              >
                Sí, cerrar sesión
              </button>
              <button
                className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
                onClick={() => setShowLogoutModal(false)} // Cerrar el modal
              >
                No, cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PerfilUsuario;
