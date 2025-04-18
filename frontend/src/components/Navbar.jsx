import { useState } from 'react';
import { Link } from 'react-router-dom';
import logoImage from '../assets/images/logo.jpg';

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const isLoggedIn = false;
  const cartItemCount = 3;

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const handleLogout = () => {
    // Lógica para cerrar sesión
    console.log('Cerrando sesión...');
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50 px-4" role="navigation">
      <div className="max-w-7xl mx-auto flex items-center justify-between py-4">

        {/* IZQUIERDA: Logo */}
        <div className="flex-shrink-0">
          <Link to="/">
            <img src={logoImage} alt="Logo" className="w-[80px]" />
          </Link>
        </div>

        {/* CENTRO: Menú (solo desktop) */}
        <div className="hidden md:flex gap-6 text-base font-medium text-gray-800">
          <Link to="/" className="hover:text-red-500 hover:scale-125 duration-300">Inicio</Link>

          <div className="relative group">
            <Link to="/nosotros" className="hover:text-red-500 hover:scale-125 duration-300 inline-block">Nosotros</Link>
            <ul className="absolute left-0 top-full w-48 bg-white shadow-lg rounded-md opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition duration-200 z-10">
              <li><Link to="/nosotros/mision" className="block px-4 py-2 hover:bg-gray-100">Misión</Link></li>
              <li><Link to="/nosotros/vision" className="block px-4 py-2 hover:bg-gray-100">Visión</Link></li>
              <li><Link to="/nosotros/objetivos" className="block px-4 py-2 hover:bg-gray-100">Objetivos</Link></li>
              <li><Link to="/nosotros/valores" className="block px-4 py-2 hover:bg-gray-100">Valores</Link></li>
            </ul>
          </div>

          <Link to="/contacto" className="hover:text-red-500 hover:scale-125 duration-300">Contáctanos</Link>
          <Link to="/blog" className="hover:text-red-500 hover:scale-125 duration-300">Blog</Link>

          <div className="relative group">
            <Link to="/ayuda" className="hover:text-red-500 hover:scale-125 duration-300 inline-block">Ayuda</Link>
            <ul className="absolute left-0 top-full w-64 bg-white shadow-lg rounded-md opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition duration-200 z-10">
              <li><Link to="/ayuda/manual" className="block px-4 py-2 hover:bg-gray-100">Manual de Usuario</Link></li>
              <li><Link to="/ayuda/opinion" className="block px-4 py-2 hover:bg-gray-100">Danos tu opinión</Link></li>
            </ul>
          </div>

          <div className="relative group">
            <Link to="/menu" className="hover:text-red-500 hover:scale-125 duration-300 inline-block">Menú</Link>
            <ul className="absolute left-0 top-full w-48 bg-white shadow-lg rounded-md opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition duration-200 z-10">
              <li><Link to="/menu/clasicas" className="block px-4 py-2 hover:bg-gray-100">Clásicas</Link></li>
              <li><Link to="/menu/quesos" className="block px-4 py-2 hover:bg-gray-100">Con Quesos</Link></li>
              <li><Link to="/menu/picantes" className="block px-4 py-2 hover:bg-gray-100">Picantes</Link></li>
              <li><Link to="/menu/alternativas" className="block px-4 py-2 hover:bg-gray-100">Alternativas</Link></li>
            </ul>
          </div>

          <div className="relative group">
            <Link to="/otros" className="hover:text-red-500 hover:scale-125 duration-300 inline-block">Otros</Link>
            <ul className="absolute left-0 top-full w-64 bg-white shadow-lg rounded-md opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition duration-200 z-10">
              <li><Link to="/otros/hojas-membretadas" className="block px-4 py-2 hover:bg-gray-100">Hojas membretadas</Link></li>
              <li><Link to="/otros/boleta" className="block px-4 py-2 hover:bg-gray-100">Boleta de venta</Link></li>
              <li><Link to="/otros/factura" className="block px-4 py-2 hover:bg-gray-100">Factura</Link></li>
            </ul>
          </div>
        </div>

        {/* DERECHA: Carrito + Login + Botón hamburguesa */}
        <div className="flex items-center gap-4">
          <Link to="/carrito" className="hover:text-red-500 text-xl inline-block relative transform transition-all duration-300 hover:scale-125">
            🛒
            {cartItemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-semibold rounded-full px-2 py-0.5 transform transition-all duration-300 hover:scale-125">
                {cartItemCount}
              </span>
            )}
          </Link>

          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="text-black hover:text-red-500 hover:scale-125 duration-300"
            >
              Cerrar sesión
            </button>
          ) : (
            <Link to="/login">
              <button className="text-black hover:text-red-500 hover:scale-125 duration-300">
                Iniciar sesión
              </button>
            </Link>
          )}

          <button className="md:hidden text-2xl ml-2" onClick={toggleMenu}>
            {menuOpen ? '✖' : '☰'}
          </button>
        </div>
      </div>

      {/* MENÚ MÓVIL */}
      {menuOpen && (
        <div className="md:hidden flex flex-col gap-4 py-4 text-center text-base font-medium text-gray-800">
          <Link to="/" onClick={toggleMenu}>Inicio</Link>
          <Link to="/nosotros" onClick={toggleMenu}>Nosotros</Link>
          <Link to="/contacto" onClick={toggleMenu}>Contáctanos</Link>
          <Link to="/blog" onClick={toggleMenu}>Blog</Link>
          <Link to="/ayuda" onClick={toggleMenu}>Ayuda</Link>
          <Link to="/menu" onClick={toggleMenu}>Menú</Link>
          <Link to="/otros" onClick={toggleMenu}>Otros</Link>
          <Link to="/carrito" onClick={toggleMenu}>Carrito</Link>
          {isLoggedIn ? (
            <button onClick={() => { handleLogout(); toggleMenu(); }}>Cerrar sesión</button>
          ) : (
            <Link to="/login" onClick={toggleMenu}>Iniciar sesión</Link>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;