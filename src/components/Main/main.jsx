import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { useRef, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import products from '../catalogo/products';
import fondo from '../../components/catalogo/fondo.mp4';
import camisa from '../../assets/mainImg/casuales.jpg';
import cropTop from '../../assets/mainImg/croptop.jpg';
import vestidos from '../../assets/mainImg/vestidos.jpg';
import pantalon from '../../assets/mainImg/pantalon.jpg';
import mainVideo1 from '../../components/Main/video1.mp4';
import mainVideo2 from '../../components/Main/video2.mp4';
import mainVideo3 from '../../components/Main/video3.mp4';

function Index() {
  const navigate = useNavigate();
  const location = useLocation();
  const productRef = useRef(null);
  const [currentProductIndex, setCurrentProductIndex] = useState(0);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [codeGoogle, setCodeGoogle] = useState('');
  const productsPerPage = 5; // Número máximo de productos visibles
  const videos = [mainVideo1, mainVideo2, mainVideo3]; // Array de videos
  const [saveUser, setSaveUser] = useState({
    username: '',
    password: '',
    firstName: '',
    lastName: '',
  });

  // Navegación en productos (flechas izquierda/derecha)
  const handlePrevProductClick = () => {
    setCurrentProductIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : products.length - productsPerPage));
  };

  const handleNextProductClick = () => {
    setCurrentProductIndex((prevIndex) => (prevIndex < products.length - productsPerPage ? prevIndex + 1 : 0));
  };

  // Navegación en videos (flechas izquierda/derecha)
  const handlePrevVideoClick = () => {
    setCurrentVideoIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : videos.length - 1));
  };

  const handleNextVideoClick = () => {
    setCurrentVideoIndex((prevIndex) => (prevIndex < videos.length - 1 ? prevIndex + 1 : 0));
  };

  // Cambio automático de video cada 10 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentVideoIndex((prevIndex) => (prevIndex < videos.length - 1 ? prevIndex + 1 : 0));
    }, 10000);

    return () => clearInterval(interval); // Limpiar intervalo al desmontar
  }, [videos.length]);

  // Manejo del código en la URL para autenticación
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    if (code) {
      fetch(`http://localhost:8080/auth/callback?code=${code}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.token) {
            setCodeGoogle(data.token);
            localStorage.setItem('token', data.token);
          } else {
            console.error('No se recibió un token');
          }
        })
        .catch((error) => console.error('Error al obtener el token:', error));
    }
  }, []);

  // Restablecer el scroll al cambiar de ruta
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <main className="w-full bg-transparent overflow-x-hidden relative">
      {/* Video de fondo */}
      <video
        src={fondo}
        autoPlay
        muted
        loop
        className="fixed top-0 left-0 w-full h-full object-cover z-[-1]"
      />

      {/* Carrusel de videos */}
      <section className="relative w-full h-[700px] overflow-hidden">
        <div className="w-full h-full relative">
          {videos.map((video, index) => (
            <video
              key={index}
              src={video}
              autoPlay
              loop
              muted
              className={`w-full h-full object-cover absolute top-0 left-0 transition-opacity duration-500 ease-in-out ${
                index === currentVideoIndex ? 'opacity-100' : 'opacity-0'
              }`}
            />
          ))}
          {/* Flechas de navegación para videos */}
          <FontAwesomeIcon
            onClick={handlePrevVideoClick}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-2xl cursor-pointer mx-4 text-gray-500 hover:text-gray-800 transition"
            icon={faChevronLeft}
          />
          <FontAwesomeIcon
            onClick={handleNextVideoClick}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-2xl cursor-pointer mx-4 text-gray-500 hover:text-gray-800 transition"
            icon={faChevronRight}
          />
        </div>
      </section>

      {/* Productos recientes */}
      <section className="mt-16">
        <h2 className="text-3xl md:text-4xl font-light text-center mb-8 md:mb-12 text-gray-700">
          Más Recientes
        </h2>
        <div className="flex items-center justify-between md:justify-center relative">
          <FontAwesomeIcon
            onClick={handlePrevProductClick}
            className="hidden md:block text-2xl cursor-pointer mx-2 md:mx-4 text-gray-500 hover:text-gray-800 transition"
            icon={faChevronLeft}
          />

          <div
            className="flex overflow-x-auto md:overflow-hidden w-full gap-4 px-4 md:px-0 max-w-full md:max-w-[1350px] snap-x"
            ref={productRef}
          >
            {products
              .slice(currentProductIndex, currentProductIndex + productsPerPage)
              .map((product) => (
                <div
                  className="min-w-[200px] w-[250px] md:w-[300px] flex-shrink-0 flex flex-col bg-white shadow-md rounded-lg overflow-hidden mx-2 cursor-pointer hover:scale-105 transition-transform duration-300 relative group"
                  key={product.id}
                >
                  <img
                    onClick={() => navigate(`/product/${product.id}`, { state: { product } })}
                    className="w-full h-[250px] md:h-[350px] object-cover"
                    src={product.imgPath}
                    alt={product.name}
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4 transition-all duration-300 transform translate-y-full group-hover:translate-y-0 group-hover:opacity-100 opacity-0">
                    <h2 className="text-sm md:text-lg font-medium">{product.name}</h2>
                    <p className="mt-2 text-sm md:text-base">${product.price.toFixed(2)} ARS</p>
                  </div>
                </div>
              ))}
          </div>

          <FontAwesomeIcon
            onClick={handleNextProductClick}
            className="hidden md:block text-2xl cursor-pointer mx-2 md:mx-4 text-gray-500 hover:text-gray-800 transition"
            icon={faChevronRight}
          />
        </div>
      </section>

      {/* Categorías destacadas */}
      <section className="mt-24">
        <h2 className="text-4xl font-light text-center text-gray-700">Nuestros Productos</h2>
        <div className="flex flex-wrap items-center justify-center w-full gap-8 mt-12">
          {[{ src: pantalon, alt: 'pantalon' }, { src: cropTop, alt: 'croptop' }, { src: vestidos, alt: 'vestido' }, { src: camisa, alt: 'camisa' }].map(
            (category, index) => (
              <div
                key={index}
                className="relative group w-[100px] h-[100px] md:w-[300px] md:h-[600px] overflow-hidden rounded-md cursor-pointer"
                onClick={() => {
                  navigate(`/catalogo?category=${category.alt.toLowerCase()}`, { state: { category } });
                  window.scrollTo(0, 0);
                }}
              >
                <img
                  className="w-full h-full object-cover transition-all duration-500 ease-in-out group-hover:scale-105"
                  src={category.src}
                  alt={category.alt}
                />
                <div className="absolute inset-0 bg-black bg-opacity-30 rounded-md opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all">
                  <p className="text-white text-2xl font-semibold">{category.alt}</p>
                </div>
              </div>
            )
          )}
        </div>
      </section>
    </main>
  );
}

export default Index;
