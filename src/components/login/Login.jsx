import { Link, useNavigate } from "react-router-dom";
import useForm from "../../hooks/useForm";
import imagen from "../../assets/avatares/inicio.png";
import fondo from '../../components/catalogo/fondo.mp4';
import { useEffect } from "react";

export const Login = () => {
  const initialData = {
    username: "",
    password: ""
  };

  const navigate = useNavigate();

  const onValidate = (form) => {
    let errors = {};
    let regexEmail = /^(\w+[/./-]?){1,}@[a-z]+[/.]\w{2,}$/;
    let regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*.,]).{8,}$/;

    if (!form.username.trim()) {
      errors.username = "El campo 'correo' no debe ser vacío";
    } else if (!regexEmail.test(form.username)) {
      errors.username = "El 'correo' ingresado no es válido";
    }

    if (!form.password.trim()) {
      errors.password = "El campo 'contraseña' no debe ser vacío";
    } else if (!regexPassword.test(form.password)) {
      errors.password = "La 'contraseña' ingresada no es válida";
    }

    return errors;
  };

  const onSuccess = () => {
    navigate("/usuario");
  };

  const loginWithGoogle = () => {
    fetch("http://localhost:8080/auth/url").then(res => res.json())
    .then(json => {
      location.href = json.url;
    })
  }


 



  const { form, errors, loading, handleChange, handleSubmit } = useForm(initialData, onValidate, onSuccess, "/auth/login");

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200 relative bg-opacity-10">
      {/* Video de fondo */}
      <video src={fondo} autoPlay muted loop className="fixed top-0 left-0 w-full h-full object-cover z-[-1]" />

      <div className="bg-white rounded-2xl shadow-lg max-w-4xl w-full flex bg-opacity-80"> {/* Fondo semi-transparente */}
        
        {/* Sección del formulario */}
        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-2xl font-bold text-[#F98080]">Iniciar Sesión</h2>
          <p className="text-sm mt-4 text-[#000000]">Si ya tienes una cuenta, por favor inicia sesión</p>

          <form onSubmit={handleSubmit} className="mt-6">
            <div>
              <label htmlFor="username" className="block text-gray-700">Correo Electrónico</label>
              <input
                className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-red-500 focus:bg-white focus:outline-none"
                id="username"
                onChange={handleChange}
                placeholder="Correo Electrónico"
                type="text"
                name="username"
                value={form.username}
                required
              />
              {errors.username && (
                <div className="text-red-500 text-sm mt-2">{errors.username}</div>
              )}
            </div>

            <div className="mt-4">
              <label htmlFor="password" className="block text-gray-700">Contraseña</label>
              <input
                className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-red-500 focus:bg-white focus:outline-none"
                id="password"
                onChange={handleChange}
                placeholder="Contraseña"
                type="password"
                name="password"
                value={form.password}
                required
              />
              {errors.password && (
                <div className="text-red-500 text-sm mt-2">{errors.password}</div>
              )}
            </div>

            <div className="text-right mt-2">
              <a href="#" className="text-sm font-semibold text-gray-700 hover:text-red-400 focus:text-red-400">
                ¿Olvidaste tu contraseña?
              </a>
            </div>

            <button
              type="submit"
              className={`w-full block bg-red-400 hover:bg-gray-500 focus:bg-gray-400 text-white font-semibold rounded-lg px-4 py-3 mt-6 ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
              disabled={loading}
            >
              {loading ? "Ingresando..." : "Iniciar Sesión"}
            </button>
          </form>

          <div className="mt-7 grid grid-cols-3 items-center text-gray-500">
            <hr className="border-gray-500" />
            <p className="text-center text-sm">O</p>
            <hr className="border-gray-500" />
          </div>

          <button
            className="bg-white border py-2 w-full rounded-xl mt-5 flex justify-center items-center text-sm hover:scale-105 duration-300"
          >
            <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
              <path fill="#4285F4" d="M...Z" />
              <path fill="#34A853" d="M...Z" />
              <path fill="#FBBC05" d="M...Z" />
              <path fill="#EA4335" d="M...Z" />
            </svg>
            <span onClick={loginWithGoogle} className="ml-4">Iniciar sesión con Google</span>
          </button>

          <div className="text-sm flex justify-between items-center mt-40">
            <p>¿No tienes una cuenta?</p>
            <Link to="/register" className="py-2 px-5 ml-4 bg-white border rounded-xl hover:scale-110 duration-300 border-red-400">
              Regístrate
            </Link>
          </div>
        </div>

        {/* Sección de la imagen */}
        <div className="w-1/2 hidden md:block">
          <img src={imagen} alt="Imagen de login" className="w-full h-full object-cover rounded-r-2xl" />
        </div>
      </div>
    </div>
  );
};
