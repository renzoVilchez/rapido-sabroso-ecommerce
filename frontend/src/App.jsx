import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage/LandingPage';
import Layout from './components/Layout';
import AdminLayout from './pages/Admin/AdminLayout';

import Dashboard from './pages/Admin/Dashboard';
import Productos from './pages/Admin/Productos';
import CategoriasProductos from './pages/Admin/CategoriasProductos';
import TiposProductos from './pages/Admin/TiposProductos';
import Pedidos from './pages/Admin/Pedidos';
import Clientes from './pages/Admin/Clientes';
import Admins from './pages/Admin/Administradores';
import Reportes from './pages/Admin/Reportes';
import Ajustes from './pages/Admin/Ajustes';

import Home from './pages/Home';

import Blog from './pages/Blog/Index';
import BlogHistoria from './pages/Blog/BlogHistoria';
import BlogAcompanamientos from './pages/Blog/BlogAcompanamientos';
import BlogBeneficios from './pages/Blog/BlogBeneficios';
import BlogCuriosidades from './pages/Blog/BlogCuriosidades';
import BlogNovedades from './pages/Blog/BlogNovedades';
import Contacto from './pages/Contacto';
import Comprobante from './pages/Comprobante';
import Nosotros from './pages/Nosotros/Index';
import NosotrosMision from './pages/Nosotros/NosotrosMision';
import NosotrosVision from './pages/Nosotros/NosotrosVision';
import NosotrosObjetivos from './pages/Nosotros/NosotrosObjetivos';
import NosotrosValores from './pages/Nosotros/NosotrosValores';
import Ayuda from './pages/Ayuda/index';
import AyudaManual from './pages/Ayuda/AyudaManual';
import AyudaOpinion from './pages/Ayuda/AyudaOpinion';
import Carrito from './pages/Carrito';
import Otros from './pages/Otros/Index';
import OtrosFactura from './pages/Otros/OtrosFactura';
import OtrosBoleta from './pages/Otros/OtrosBoleta';
import OtrosHojasMembretadas from './pages/Otros/OtrosHojasMembretadas';
import OtrosVideos from './pages/Otros/OtrosVideos';
import OtrosTarjetas from './pages/Otros/OtrosTarjetas';
import OtrosLogos from './pages/Otros/OtrosLogos';
import Pago from './pages/Pago';
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './pages/NotFound';

import Menu from './pages/Menu/index';
import MenuProductos from './pages/Menu/TipoProducto';
import TipoMenu from './pages/Menu/TipoMenu';

import HistorialPedido from './pages/HistorialPedidos';

function App() {
  return (
    <Routes>
      {/* Landing fuera del layout */}
      <Route path="/" element={<LandingPage />} />

      {/* Rutas con Layout Admin*/}
      <Route path="/admin/" element={<Login />} />
      <Route element={<AdminLayout />}>
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/productos" element={<Productos />} />
        <Route path="/admin/categoriasProductos" element={<CategoriasProductos />} />
        <Route path="/admin/tiposProductos" element={<TiposProductos />} />
        <Route path="/admin/pedidos" element={<Pedidos />} />
        <Route path="/admin/clientes" element={<Clientes />} />
        <Route path="/admin/Admins" element={<Admins />} />
        <Route path="/admin/reportes" element={<Reportes />} />
        <Route path="/admin/ajustes" element={<Ajustes />} />
        <Route path="/admin/*" element={<NotFound />} />
      </Route>
      {/* Rutas con Layout Cliente */}
      <Route element={<Layout />}>
        <Route path="/home" element={<Home />} />

        <Route path="/menu" element={<Menu />} />
        <Route path="/menu/productos/tipo/:tipo" element={<MenuProductos />} />
        <Route path="menu/tipo/:tipo" element={<TipoMenu />} />

        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/historia" element={<BlogHistoria />} />
        <Route path="/blog/acompanamientos" element={<BlogAcompanamientos />} />
        <Route path="/blog/beneficios" element={<BlogBeneficios />} />
        <Route path="/blog/curiosidades" element={<BlogCuriosidades />} />
        <Route path="/blog/novedades" element={<BlogNovedades />} />

        <Route path="/contacto" element={<Contacto />} />

        <Route path="/nosotros/" element={<Nosotros />} />
        <Route path="/nosotros/mision" element={<NosotrosMision />} />
        <Route path="/nosotros/vision" element={<NosotrosVision />} />
        <Route path="/nosotros/objetivos" element={<NosotrosObjetivos />} />
        <Route path="/nosotros/valores" element={<NosotrosValores />} />

        <Route path="/ayuda/" element={<Ayuda />} />
        <Route path="/ayuda/manual" element={<AyudaManual />} />
        <Route path="/ayuda/opinion" element={<AyudaOpinion />} />

        <Route path="/carrito" element={<Carrito />} />

        <Route path="/historial-pedidos" element={<HistorialPedido />} />

        <Route path="/otros" element={<Otros />} />
        <Route path="/otros/factura" element={<OtrosFactura />} />
        <Route path="/otros/boleta" element={<OtrosBoleta />} />
        <Route path="/otros/hojas-membretadas" element={<OtrosHojasMembretadas />} />
        <Route path="/otros/videos" element={<OtrosVideos />} />
        <Route path="/otros/tarjetas" element={<OtrosTarjetas />} />
        <Route path="/otros/logos" element={<OtrosLogos />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/pago" element={<Pago />} />
        <Route path="/comprobante/:idPedido" element={<Comprobante />} />

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;