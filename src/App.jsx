import "./App.css";
import Index from "./components/Main/main";
import Header from "./components/Header/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PerfilUsuario from "./components/PerfilUsuario/PerfilUsuario";
import Footer from "./components/footer/Footer";
import Catalogo from "./components/catalogo/Catalogo";
import PaymentPage from "./components/Descripcion_producto/Descripcion_producto";
import Carrito from "./components/carrito/Carrito";
import { CartProvider } from "./components/carrito/CartContext";
import Favoritos from "./components/Favoritos/Favoritos";
import products from "./components/catalogo/products"; 
import { ProtectedRoute } from "./protected/ProtectedRoute";
import { Login } from "./components/login/Login";
import { Register } from "./components/register/Register";
import { Admin } from "./components/adminPanel/Admin";
import Dashboard from "./components/adminPanel/Dashboard";
import Products from "./components/adminPanel/Products";
import Sales from "./components/adminPanel/Sales";
import Users from "./components/adminPanel/Users";
import Sidebar from "./components/adminPanel/Sidebar";

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        {/* Rutas generales con Header y Footer */}
        <Routes>
          <Route path="/" element={<><Header /><Index /><Footer /></>} />
          <Route path="/catalogo" element={<><Header /><Catalogo /><Footer /></>} />
          <Route path="/login" element={<><Header /><Login /><Footer /></>} />
          <Route path="/register" element={<><Header /><Register /><Footer /></>} />
          <Route element={<ProtectedRoute />}>
            <Route path="/usuario" element={<><Header /><PerfilUsuario /><Footer /></>} />
          </Route>
          <Route path="/product/:id" element={<><Header /><PaymentPage /><Footer /></>} />
          <Route path="/carrito" element={<><Header /><Carrito /><Footer /></>} />
          <Route path="/favorito" element={<><Header /><Favoritos products={products} /><Footer /></>} />
        </Routes>

        {/* Rutas de administración con Admin como layout */}
        <Routes>

          <Route path="/admin" element={<Admin />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="products" element={<Products />} />
            <Route path="sales" element={<Sales />} />
            <Route path="users" element={<Users />} />
          </Route>
        </Routes>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;
