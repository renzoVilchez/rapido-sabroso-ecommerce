import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { GlobalContext } from '../context/GlobalContext';
import logoImage from '../assets/images/logo.png';

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { cartItemCount, setCartItemCount, isLoggedIn, setIsLoggedIn } = useContext(GlobalContext);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const handleLogout = () => {
    localStorage.removeItem('usuario');
    setIsLoggedIn(false);
    console.log('Sesión cerrada.');
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50 px-2" role="navigation">
      <div className="max-w-7xl mx-auto flex items-center justify-between py-2">

        {/* IZQUIERDA: Logo */}
        <div className="flex-shrink-0">
          <Link to="/home">
            <img src={logoImage} alt="Logo" className="w-[80px]" />
          </Link>
        </div>

        {/* CENTRO: Menú (solo desktop) */}
        <div className="hidden md:flex gap-6 text-base font-medium text-gray-700">
          <Link to="/home" className="hover:text-yellow-600 hover:scale-110 transition duration-300">Inicio</Link>

          <div className="relative group">
            <Link to="/nosotros" className="hover:text-yellow-600 hover:scale-110 transition duration-300 inline-block">Nosotros</Link>
            <ul className="absolute left-0 top-full w-48 bg-white shadow-lg rounded-md opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition duration-200 z-10">
              <li><Link to="/nosotros/mision" className="block px-4 py-2 hover:bg-yellow-100">Misión</Link></li>
              <li><Link to="/nosotros/vision" className="block px-4 py-2 hover:bg-yellow-100">Visión</Link></li>
              <li><Link to="/nosotros/objetivos" className="block px-4 py-2 hover:bg-yellow-100">Objetivos</Link></li>
              <li><Link to="/nosotros/valores" className="block px-4 py-2 hover:bg-yellow-100">Valores</Link></li>
            </ul>
          </div>

          <Link to="/menu" className="hover:text-yellow-600 hover:scale-110 transition duration-300">Menú</Link>
          <Link to="/blog" className="hover:text-yellow-600 hover:scale-110 transition duration-300">Blog</Link>
          <Link to="/contacto" className="hover:text-yellow-600 hover:scale-110 transition duration-300">Contáctanos</Link>

          <div className="relative group">
            <Link to="/ayuda" className="hover:text-yellow-600 hover:scale-110 transition duration-300 inline-block">Ayuda</Link>
            <ul className="absolute left-0 top-full w-64 bg-white shadow-lg rounded-md opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition duration-200 z-10">
              <li><Link to="/ayuda/manual" className="block px-4 py-2 hover:bg-yellow-100">Manual de Usuario</Link></li>
              <li><Link to="/ayuda/opinion" className="block px-4 py-2 hover:bg-yellow-100">Danos tu opinión</Link></li>
            </ul>
          </div>

          <div className="relative group">
            <Link to="/otros" className="hover:text-yellow-600 hover:scale-110 transition duration-300 inline-block">Otros</Link>
            <ul className="absolute left-0 top-full w-64 bg-white shadow-lg rounded-md opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition duration-200 z-10">
              <li><Link to="/otros/hojas-membretadas" className="block px-4 py-2 hover:bg-yellow-100">Hojas membretadas</Link></li>
              <li><Link to="/otros/boleta" className="block px-4 py-2 hover:bg-yellow-100">Boleta de venta</Link></li>
              <li><Link to="/otros/factura" className="block px-4 py-2 hover:bg-yellow-100">Factura</Link></li>
              <li><Link to="/otros/videos" className="block px-4 py-2 hover:bg-yellow-100">Videos</Link></li>
              <li><Link to="/otros/tarjetas" className="block px-4 py-2 hover:bg-yellow-100">Tarjetas</Link></li>
              <li><Link to="/otros/logos" className="block px-4 py-2 hover:bg-yellow-100">Logos</Link></li>
            </ul>
          </div>
        </div>

        {/* DERECHA: Carrito + Login + Botón hamburguesa */}
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
              className="bg-yellow-500 text-white text-sm font-semibold px-4 py-2 rounded-md hover:bg-yellow-600 hover:scale-105 transition duration-300"
            >
              Cerrar sesión
            </button>
          ) : (
            <Link to="/login">
              <button className="bg-yellow-500 text-gray-700 text-sm font-semibold px-4 py-2 rounded-md hover:bg-yellow-600 hover:scale-105 transition duration-300">
                Iniciar sesión
              </button>
            </Link>
          )}

          <button className="md:hidden text-3xl ml-2 text-gray-700" onClick={toggleMenu}>
            {menuOpen ? '✖' : '☰'}
          </button>
        </div>
      </div>

      {/* MENÚ MÓVIL */}
      {menuOpen && (
        <div className="md:hidden flex flex-col gap-4 py-4 text-center text-base font-medium text-gray-700 bg-yellow-50">
          <Link to="/home" onClick={toggleMenu}>Inicio</Link>
          <Link to="/nosotros" onClick={toggleMenu}>Nosotros</Link>
          <Link to="/contacto" onClick={toggleMenu}>Contáctanos</Link>
          <Link to="/blog" onClick={toggleMenu}>Blog</Link>
          <Link to="/ayuda" onClick={toggleMenu}>Ayuda</Link>
          <Link to="/menu" onClick={toggleMenu}>Menú</Link>
          <Link to="/otros" onClick={toggleMenu}>Otros</Link>
          <Link to="/carrito" onClick={toggleMenu}>Carrito</Link>

          {isLoggedIn ? (
            <button
              onClick={() => { handleLogout(); toggleMenu(); }}
              className="bg-yellow-500 text-white text-sm font-semibold px-4 py-2 rounded-md hover:bg-yellow-600 hover:scale-105 transition duration-300 mx-auto"
            >
              Cerrar sesión
            </button>
          ) : (
            <Link to="/login" onClick={toggleMenu}>
              <button className="bg-yellow-500 text-gray-700 text-sm font-semibold px-4 py-2 rounded-md hover:bg-yellow-600 hover:scale-105 transition duration-300 mx-auto">
                Iniciar sesión
              </button>
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;