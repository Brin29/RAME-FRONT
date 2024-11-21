// Importar imágenes
import imagen1 from "../../assets/imagenes/imagen1.jpg";
import imagen2 from "../../assets/imagenes/imagen2.jpg";
import imagen3 from "../../assets/imagenes/imagen3.jpg";
import imagen4 from "../../assets/imagenes/imagen4.jpg";
import imagen5 from "../../assets/imagenes/imagen5.jpg";
import imagen6 from "../../assets/imagenes/imagen6.jpg";
import imagen7 from "../../assets/imagenes/imagen7.jpg";
import imagen8 from "../../assets/imagenes/imagen8.jpg";
import imagen9 from "../../assets/imagenes/imagen9.jpg";
import imagen10 from "../../assets/imagenes/imagen10.jpg";
import imagen11 from "../../assets/imagenes/imagen11.jpg";
import imagen12 from "../../assets/mainImg/pantalon.jpg"

// Productos importados
const products = [
  {
    id: 1,
    name: "Blusa con botones",
    price: 3000,
    imgPath: imagen1,
    category: "camisa",
    colors: ["blanco", "rojo"],
    sizes: ["S","M","L","XL"],
    description: "Una blusa con botones de color blanco, ideal para ocasiones informales.",
    quantity: 1
  },
  {
    id: 2,
    name: "Croptop botones",
    price: 2000,
    imgPath: imagen2,
    category: "croptop",
    colors: ["blanco"],
    sizes: ["S","M","L","XL"],
    description: "Un croptop con botones de color blanco, perfecto para el verano.",
    quantity: 1
  },
  {
    id: 3,
    name: "Camisa elegante",
    price: 10000,
    imgPath: imagen3,
    category: "camisa",
    colors: ["rojo"],
    sizes: ["S","M","L","XL"],
    description: "Camisa elegante de color rojo, ideal para eventos formales."
  },
  {
    id: 4,
    name: "Camiseta casual",
    price: 20000,
    imgPath: imagen4,
    category: "camisa",
    colors: ["beige"],
    sizes: ["S","M","L","XL"],
    description: "Camiseta casual de color beige, perfecta para un look relajado.",
    quantity: 1
  },
  {
    id: 5,
    name: "Camisa clásica",
    price: 40000,
    imgPath: imagen5,
    category: "camisa",
    colors: ["blanco"],
    sizes: ["S","M","L","XL"],
    description: "Una camisa clásica blanca que nunca pasa de moda.",
    quantity: 1
  },
  {
    id: 6,
    name: "Blusón con botones",
    price: 50000,
    imgPath: imagen6,
    category: "camisa",
    colors: ["rosado"],
    sizes: ["S","M","L","XL"],
    description: "Blusón rosado con botones, ideal para un look cómodo y elegante.",
    quantity: 1
  },
  {
    id: 7,
    name: "Corset de jeans",
    price: 30000,
    imgPath: imagen7,
    category: "corset",
    colors: ["azul"],
    sizes: ["S","M","L","XL"],
    description: "Corset de jeans que ajusta perfectamente y da forma al cuerpo."
  },
  {
    id: 8,
    name: "Corset elegante",
    price: 20000,
    imgPath: imagen8,
    category: "corset",
    colors: ["azul"],
    sizes: ["S","M","L","XL"],
    description: "Corset elegante que resalta la figura, ideal para salir de noche.",
    quantity: 1
  },
  {
    id: 9,
    name: "Croptop",
    price: 40000,
    imgPath: imagen9,
    category: "croptop",
    colors: ["naranja"],
    sizes: ["S","M","L","XL"],
    description: "Croptop de color naranja, fresco y juvenil para el día a día.",
    quantity: 1
  },
  {
    id: 10,
    name: "Buzo de tela",
    price: 35000,
    imgPath: imagen10,
    category: "chaqueta",
    colors: ["rosado"],
    sizes: ["S","M","L","XL"],
    description: "Buzo de tela suave, ideal para los días fríos.",
    quantity: 1
  },
  {
    id: 11,
    name: "Traje de baño",
    price: 40000,
    imgPath: imagen11,
    category: "vestido-baño",
    colors: ["azul"],
    sizes: ["S","M","L","XL"],
    description: "Traje de baño azul, perfecto para disfrutar del sol y la playa.",
    quantity: 1
  },
  {
    id: 12,
    name: "Chaqueta casual",
    price: 45000,
    imgPath: imagen10,
    category: "chaqueta",
    colors: ["azul","negro","naranja"],
    sizes: ["S","M","L","XL"],
    description: "Chaqueta casual azul, ideal para complementar cualquier outfit.",
    quantity: 1
  },
  // Nuevos productos
  {
    id: 13,
    name: "Vestido de verano",
    price: 60000,
    imgPath: imagen1, // Cambia la imagen si es necesario
    category: "vestido",
    colors: ["floral"],
    sizes: ["M"],
    description: "Vestido de verano con estampado floral, ligero y cómodo.",
    quantity: 1
  },
  {
    id: 14,
    name: "Sudadera básica",
    price: 25000,
    imgPath: imagen2, // Cambia la imagen si es necesario
    category: "pantalon",
    colors: ["gris"],
    sizes: ["L"],
    description: "Sudadera básica gris, perfecta para un look casual."
    , quantity: 1
  },
  {
    id: 15,
    name: "Falda midi",
    price: 35000,
    imgPath: imagen3, // Cambia la imagen si es necesario
    category: "falda",
    colors: ["negro"],
    sizes: ["S"],
    description: "Falda midi negra, versátil y fácil de combinar.",
    quantity: 1
  },
  {
    id: 16,
    name: "Pantalon",
    price: 55000,
    imgPath: imagen12, // Cambia la imagen si es necesario
    category: "pantalon",
    colors: ["negro","gris"],
    sizes: ["S","M"],
    description: "Pantalon corto para mas facil de clima y para todo momento",
    quantity: 1
  },
];

export default products;
