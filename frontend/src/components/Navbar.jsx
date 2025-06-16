import { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { GlobalContext } from '../context/GlobalContext';
import logoImage from '../assets/images/logo.png';

function normalizeString(str) {
  if (typeof str !== 'string') return '';
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/--+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [menus, setMenus] = useState([]);
  const [productos, setProductos] = useState([]);
  const { cartItemCount, setCartItemCount, isLoggedIn, setIsLoggedIn } = useContext(GlobalContext);

  useEffect(() => {
    axios.get('http://localhost:5000/api/menus')
      .then(res => setMenus(res.data))
      .catch(err => console.error('Error al cargar menús:', err));
  }, []);

  useEffect(() => {
    axios.get('http://localhost:5000/api/productos')
      .then(res => setProductos(res.data))
      .catch(err => console.error('Error al cargar productos:', err));
  }, []);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const handleLogout = () => {
    localStorage.removeItem('usuario');
    setIsLoggedIn(false);
    console.log('Sesión cerrada.');
  };

  const tiposMenuUnicos = [...new Set(menus.map(menu => menu.tipo_menu).filter(Boolean))];
  const tiposProductoUnicos = [...new Set(productos.map(producto => producto.tipoProducto).filter(Boolean))];

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50 px-2" role="navigation">
      <div className="max-w-7xl mx-auto flex items-center justify-between py-2">

        <div className="flex-shrink-0">
          <Link to="/home">
            <img src={logoImage} alt="Logo" className="w-[80px]" />
          </Link>
        </div>

        <div className="hidden md:flex gap-6 text-base font-medium text-gray-700">
          <Link to="/home" className="hover:bg-amber-900 hover:text-white hover:scale-110 transition duration-300 p-3 rounded-2xl">Inicio</Link>

          <div className="relative group">
            <Link
              to="/nosotros"
              className="group-hover:bg-amber-900 group-hover:text-white group-hover:scale-110 hover:bg-amber-900 hover:text-white hover:scale-110 transition duration-300 p-3 inline-block rounded-2xl"
            >
              Nosotros
            </Link>
            <ul className="absolute left-0 top-full w-48 bg-white shadow-lg rounded-md opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition duration-200 z-10">
              <li><Link to="/nosotros/mision" className="block px-4 py-2 hover:bg-amber-900 hover:text-white">Misión</Link></li>
              <li><Link to="/nosotros/vision" className="block px-4 py-2 hover:bg-amber-900 hover:text-white">Visión</Link></li>
              <li><Link to="/nosotros/objetivos" className="block px-4 py-2 hover:bg-amber-900 hover:text-white">Objetivos</Link></li>
              <li><Link to="/nosotros/valores" className="block px-4 py-2 hover:bg-amber-900 hover:text-white">Valores</Link></li>
            </ul>
          </div>

          <div className="relative group">
            <Link
              to="/menu"
              className="group-hover:bg-amber-900 group-hover:text-white group-hover:scale-110 hover:bg-amber-900 hover:text-white hover:scale-110 transition duration-300 p-3 inline-block rounded-2xl"
            >
              Menú
            </Link>

            <ul className="absolute left-0 top-full w-48 bg-white shadow-lg rounded-md opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition duration-200 z-10">
              {tiposMenuUnicos.map((tipo) => (
                <li key={tipo}>
                  <Link
                    to={`/menu/tipo/${normalizeString(tipo)}`}
                    className="block px-4 py-2 hover:bg-amber-900 hover:text-white capitalize"
                    onClick={() => setMenuOpen(false)}
                  >
                    {`Menú ${tipo.replace('_', ' ')}`}
                  </Link>
                </li>
              ))}

              {/* Submenú anidado para productos */}
              <li className="relative group/submenu">
                <Link
                  to="/productos"
                  className="block px-4 py-2 hover:bg-amber-900 hover:text-white group-hover/submenu:bg-amber-900 group-hover/submenu:text-white"
                  onClick={() => setMenuOpen(false)}
                >
                  Productos
                </Link>

                <ul className="absolute top-0 left-full w-48 bg-white shadow-lg rounded-md opacity-0 group-hover/submenu:opacity-100 pointer-events-none group-hover/submenu:pointer-events-auto transition duration-200 z-20 ml-[-1]">

                  {tiposProductoUnicos.map((tipo) => (
                    <li key={tipo}>
                      <Link
                        to={`/menu/productos/tipo/${normalizeString(tipo)}`}
                        className="block px-4 py-2 hover:bg-amber-900 hover:text-white capitalize"
                        onClick={() => setMenuOpen(false)}
                      >
                        {tipo.replace('_', ' ')}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
          </div>

          <Link to="/blog" className="hover:bg-amber-900 hover:text-white hover:scale-110 transition duration-300 p-3  rounded-2xl">Blog</Link>
          <Link to="/vlog" className="hover:bg-amber-900 hover:text-white hover:scale-110 transition duration-300 p-3  rounded-2xl">Vlog</Link>
          <Link to="/contacto" className="hover:bg-amber-900 hover:text-white hover:scale-110 transition duration-300 p-3  rounded-2xl">Contáctanos</Link>

          <div className="relative group">
            <Link to="/ayuda" className="group-hover:bg-amber-900 group-hover:text-white group-hover:scale-110 hover:bg-amber-900 hover:text-white hover:scale-110 transition duration-300 p-3 inline-block rounded-2xl">Ayuda</Link>
            <ul className="absolute left-0 top-full w-64 bg-white shadow-lg rounded-md opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition duration-200 z-10">
              <li><Link to="/ayuda/manual-usuario" className="block px-4 py-2 hover:bg-amber-900 hover:text-white">Manual de Usuario</Link></li>
              <li><Link to="/ayuda/danos-tu-opinion" className="block px-4 py-2 hover:bg-amber-900 hover:text-white">Danos tu opinión</Link></li>
              <li><Link to="/ayuda/preguntas-frecuentes" className="block px-4 py-2 hover:bg-amber-900 hover:text-white">Preguntas Frecuentes</Link></li>
            </ul>
          </div>

          <div className="relative group">
            <Link to="/otros" className="group-hover:bg-amber-900 group-hover:text-white group-hover:scale-110 hover:bg-amber-900 hover:text-white hover:scale-110 transition duration-300 p-3 inline-block rounded-2xl">Galería</Link>
            <ul className="absolute left-0 top-full w-64 bg-white shadow-lg rounded-md opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition duration-200 z-10">
              <li><Link to="/otros/hojas-membretadas" className="block px-4 py-2 hover:bg-amber-900 hover:text-white">Hojas membretadas</Link></li>
              <li><Link to="/otros/boleta" className="block px-4 py-2 hover:bg-amber-900 hover:text-white">Boleta de venta</Link></li>
              <li><Link to="/otros/factura" className="block px-4 py-2 hover:bg-amber-900 hover:text-white">Factura</Link></li>
              <li><Link to="/otros/videos" className="block px-4 py-2 hover:bg-amber-900 hover:text-white">Videos</Link></li>
              <li><Link to="/otros/tarjetas" className="block px-4 py-2 hover:bg-amber-900 hover:text-white">Tarjetas</Link></li>
              <li><Link to="/otros/logos" className="block px-4 py-2 hover:bg-amber-900 hover:text-white">Logos</Link></li>
            </ul>
          </div>

          <Link to="/historial-pedidos" className="hover:bg-amber-900 hover:text-white hover:scale-110 transition duration-300 p-3  rounded-2xl">Historial de Pedidos</Link>
        </div>

        <div className="flex items-center gap-4">
          <Link to="/carrito" className="relative text-xl text-gray-700 hover:text-yellow-600 hover:scale-125 transition-all duration-300">
            🛒
            {cartItemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-yellow-500 text-white text-xs font-semibold rounded-full px-2 py-0.5">
                {cartItemCount}
              </span>
            )}
          </Link>

          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white text-sm font-semibold px-4 py-2 rounded-md hover:bg-red-700 hover:scale-105 transition duration-300"
            >
              Cerrar sesión
            </button>
          ) : (
            <Link to="/login">
              <button className="bg-yellow-500 text-white text-sm font-semibold px-4 py-2 rounded-md hover:bg-yellow-600 hover:scale-105 transition duration-300">
                Iniciar sesión
              </button>
            </Link>
          )}

          <button className="md:hidden text-3xl ml-2 text-gray-700" onClick={toggleMenu}>
            {menuOpen ? '✖' : '☰'}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden flex flex-col gap-4 py-4 text-center text-base font-medium text-gray-700 bg-yellow-50">
          <Link to="/home" onClick={toggleMenu}>Inicio</Link>
          <Link to="/nosotros" onClick={toggleMenu}>Nosotros</Link>
          <Link to="/contacto" onClick={toggleMenu}>Contáctanos</Link>
          <Link to="/blog" onClick={toggleMenu}>Blog</Link>
          <Link to="/ayuda" onClick={toggleMenu}>Ayuda</Link>
          <Link to="/menu" onClick={toggleMenu}>Menú</Link>
          <Link to="/otros" onClick={toggleMenu}>Otros</Link>
          <Link to="/historial-pedidos" onClick={toggleMenu}>Historial de pedidos</Link>
          <Link to="/carrito" onClick={toggleMenu}>Carrito</Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;