import useForm from "../../hooks/useForm";
import { useNavigate } from "react-router-dom";
import animal from "../../assets/avatares/register.png";
import fondo from '../../components/catalogo/fondo.mp4';

export const Register = () => {
  const initialData = {
    username: "",
    password: "",
    firstName: "",
    lastName: "",
  };

  const navigate = useNavigate();

  const onValidate = (form) => {
    let errors = {};
    let regexName = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;
    let regexEmail = /^(\w+[/./-]?){1,}@[a-z]+[/.]\w{2,}$/;
    let regexPassword =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*.,]).{8,}$/;

    if (!form.username.trim()) {
      errors.username = "El campo 'Correo' no debe ser vacío";
    } else if (!regexEmail.test(form.username)) {
      errors.username = "El 'Correo' ingresado no es válido";
    }

    if (!form.password.trim()) {
      errors.password = "El campo 'Contraseña' no debe ser vacío";
    } else if (!regexPassword.test(form.password)) {
      errors.password =
        "La 'contraseña' ingresada no es válida. " +
        " La contraseña debe tener 8 caracteres, entre los cuales " +
        " haya al menos una mayúscula, una minúscula, un numero y un " +
        " carácter especial";
    }

    if (!form.firstName.trim()) {
      errors.firstName = "El campo 'Nombre' no debe ser vacío";
    } else if (!regexName.test(form.firstName)) {
      errors.firstName = "El 'Nombre' ingresado no es válido";
    }

    if (!form.lastName.trim()) {
      errors.lastName = "El campo 'Apellido' no debe ser vacío";
    } else if (!regexName.test(form.lastName)) {
      errors.lastName = "El 'Apellido' ingresado no es válido";
    }

    return errors;
  };

  const onSuccess = () => {
    navigate("/login");
  };

  const { form, errors, loading, handleChange, handleSubmit } = useForm(
    initialData,
    onValidate,
    onSuccess,
    "/auth/register"
  );

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200 relative bg-opacity-10">
       <video src={fondo} autoPlay muted loop className="fixed top-0 left-0 w-full h-full object-cover z-[-1]" />
      <div className="bg-white rounded-2xl shadow-lg max-w-4xl w-full flex">
        {/* Sección de la imagen */}
        <div className="w-1/2 hidden md:block">
          <img
            src={animal}
            alt="Imagen decorativa"
            className="w-full h-full object-cover rounded-l-2xl"
          />
        </div>

        {/* Sección del formulario */}
        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-2xl font-bold text-[#F98080]">Registrarse</h2>
          <p className="text-sm mt-4 text-[#000000]">
            Crea una nueva cuenta para empezar
          </p>

          <form onSubmit={handleSubmit} className="mt-6">
            <div className="mb-4">
              <label htmlFor="firstName" className="block text-gray-700">
                Nombre
              </label>
              <input
                value={form.firstName}
                onChange={handleChange}
                type="text"
                name="firstName"
                className="w-full px-4 py-2 rounded-lg bg-gray-200 mt-2 border focus:border-red-500 focus:bg-white focus:outline-none"
                placeholder="Nombre"
              />
              {errors.firstName && (
                <div className="text-red-500 text-sm mt-2">
                  {errors.firstName}
                </div>
              )}
            </div>

            <div className="mb-4">
              <label htmlFor="lastName" className="block text-gray-700">
                Apellido
              </label>
              <input
                value={form.lastName}
                onChange={handleChange}
                type="text"
                name="lastName"
                className="w-full px-4 py-2 rounded-lg bg-gray-200 mt-2 border focus:border-red-500 focus:bg-white focus:outline-none"
                placeholder="Apellido"
              />
              {errors.lastName && (
                <div className="text-red-500 text-sm mt-2">
                  {errors.lastName}
                </div>
              )}
            </div>

            <div className="mb-4">
              <label htmlFor="username" className="block text-gray-700">
                Correo Electrónico
              </label>
              <input
                value={form.username}
                onChange={handleChange}
                type="text"
                name="username"
                className="w-full px-4 py-2 rounded-lg bg-gray-200 mt-2 border focus:border-red-500 focus:bg-white focus:outline-none"
                placeholder="Correo Electrónico"
              />
              {errors.username && (
                <div className="text-red-500 text-sm mt-2">
                  {errors.username}
                </div>
              )}
            </div>

            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-700">
                Contraseña
              </label>
              <input
                value={form.password}
                onChange={handleChange}
                type="password"
                name="password"
                className="w-full px-4 py-2 rounded-lg bg-gray-200 mt-2 border focus:border-red-500 focus:bg-white focus:outline-none"
                placeholder="Contraseña"
              />
              {errors.password && (
                <div className="text-red-500 text-sm mt-2">
                  {errors.password}
                </div>
              )}
            </div>

            <button
              type="submit"
              className={`w-full bg-red-400 hover:bg-gray-500 text-white font-semibold rounded-lg px-4 py-2 mt-6 ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={loading}
            >
              {loading ? "Registrando..." : "Registrarse"}
            </button>
          </form>

          <p className="text-sm mt-4 text-center text-gray-500">
            ¿Ya tienes una cuenta?
            <a href="/login" className="text-red-400 hover:text-red-700 ml-1">
              Iniciar sesión
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};
