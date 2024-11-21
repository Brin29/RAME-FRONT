import { useState } from "react";

function Footer() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");

  const openModal = (content) => {
    setModalContent(content);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalContent("");
  };

  return (
    <footer className="bg-gray-800 text-white py-4 mt-10">
      <div className="container mx-auto px-4">
        {/* Sección del logo, redes sociales y número de celular alineados a la izquierda */}
        <section className="flex items-center mb-4">
          <a href="/" className="mr-4">
            <img
              className="h-20 mb-5"
              src="/resource/img/Logo.jpg"
              alt="Logo"
            />
          </a>
          <div className="flex space-x-4 items-center">
            {/* Redes sociales con animación */}
            <a
              href="https://www.instagram.com/r.rame_/"
              className="transform transition-transform duration-300 hover:scale-125"
            >
              <img
                className="h-8 w-8"
                src="resource/img/ig.png"
                alt="Instagram"
              />
            </a>
            <a
              href="https://wa.me/1234567890"
              className="transform transition-transform duration-300 hover:scale-125"
            >
              <img
                className="h-8 w-8"
                src="resource/img/wa.png"
                alt="WhatsApp"
              />
            </a>
            <span className="ml-4 text-gray-400 text-sm"> +53 3128353872</span>
          </div>
        </section>

        {/* Pie de página con derechos reservados y enlaces a ventanas emergentes */}
        <div className="rounded-lg shadow bg-gray-800">
          <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
            <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
              © 2024{" "}
              <a href="https://flowbite.com/" className="hover:underline">
                RAME™
              </a>
              . Derechos reservados
            </span>
            <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
              <li>
                <button
                  onClick={() => openModal("about")}
                  className="hover:underline me-4 md:me-6"
                >
                  sobre RAME
                </button>
              </li>
              <li>
                <button
                  onClick={() => openModal("privacy")}
                  className="hover:underline me-4 md:me-6"
                >
                  Política de Privacidad
                </button>
              </li>
              <li>
                <button
                  onClick={() => openModal("licenses")}
                  className="hover:underline me-4 md:me-6"
                >
                  Licencias
                </button>
              </li>
              <li>
                <button
                  onClick={() => openModal("contact")}
                  className="hover:underline"
                >
                  Contactos
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Modal para mostrar el contenido al hacer clic en una opción */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full text-gray-800"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={closeModal}
            >
              ×
            </button>
            {modalContent === "about" && (
              <p>
                Fashion RAME - La moda que realza tu esencia Bienvenidas a
                Fashion RAME, tu destino en línea para descubrir prendas
                elegantes y de alta calidad, diseñadas especialmente para
                resaltar la belleza y confianza de cada mujer. Desde estilos
                casuales y modernos hasta piezas sofisticadas para ocasiones
                especiales, en Fashion RAME encontrarás una colección
                cuidadosamente seleccionada que sigue las últimas tendencias de
                moda. Explora nuestra variedad de vestidos, blusas, pantalones y
                accesorios que complementan tu estilo único, con opciones de
                envío rápido y seguro. ¡Haz de Fashion RAME tu elección para
                lucir siempre espectacular!
              </p>
            )}
            {modalContent === "privacy" && (
              <p>
                Política de Privacidad de Fashion RAME En Fashion RAME,
                respetamos tu privacidad y nos comprometemos a proteger tus
                datos personales. Esta política de privacidad explica cómo
                recopilamos, usamos y protegemos tu información cuando visitas
                nuestro sitio web o realizas una compra en nuestra tienda en
                línea. 1. Recopilación de Información Información Personal:
                Recopilamos datos personales como tu nombre, dirección de correo
                electrónico, dirección de envío y número de teléfono cuando
                realizas una compra o te registras en nuestro sitio. Información
                de Navegación: Utilizamos cookies y otras tecnologías para
                mejorar tu experiencia en nuestro sitio y personalizar el
                contenido según tus intereses. Estas herramientas nos ayudan a
                entender mejor cómo navegas por nuestro sitio.
              </p>
            )}
            {modalContent === "licenses" && <p>Licencias y términos...</p>}
            {modalContent === "contact" && (
              <p>
                Contactos:
                <br /> Teléfono: +53 3128365072
                <br /> Email: Rame@gmail.com
              </p>
            )}
          </div>
        </div>
      )}
    </footer>
  );
}

export default Footer;
