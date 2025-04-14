import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-white shadow-md">
      <ul className="flex flex-wrap items-center justify-center gap-6 py-4 text-gray-800 text-base font-medium">
        <li><Link to="/" className="hover:text-red-500 transition">Inicio</Link></li>

        <li className="relative group">
          <Link to="/menu" className="hover:text-red-500 transition">Menú</Link>
          <ul className="absolute left-0 top-full w-48 bg-white shadow-lg rounded-md opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition duration-200 z-10">
            <li><Link to="/menu/clasicas" className="block px-4 py-2 hover:bg-gray-100">Clásicas</Link></li>
            <li><Link to="/menu/quesos" className="block px-4 py-2 hover:bg-gray-100">Con Quesos</Link></li>
            <li><Link to="/menu/picantes" className="block px-4 py-2 hover:bg-gray-100">Picantes</Link></li>
            <li><Link to="/menu/alternativas" className="block px-4 py-2 hover:bg-gray-100">Alternativas</Link></li>
          </ul>
        </li>

        <li className="relative group">
          <Link to="/nosotros" className="hover:text-red-500 transition">Nosotros</Link>
          <ul className="absolute left-0 top-full w-48 bg-white shadow-lg rounded-md opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition duration-200 z-10">
            <li><Link to="/nosotros/mision" className="block px-4 py-2 hover:bg-gray-100">Misión</Link></li>
            <li><Link to="/nosotros/vision" className="block px-4 py-2 hover:bg-gray-100">Visión</Link></li>
            <li><Link to="/nosotros/objetivos" className="block px-4 py-2 hover:bg-gray-100">Objetivos</Link></li>
            <li><Link to="/nosotros/valores" className="block px-4 py-2 hover:bg-gray-100">Valores</Link></li>
          </ul>
        </li>

        <li><Link to="/blog" className="hover:text-red-500 transition">Blog</Link></li>
        <li><Link to="/contacto" className="hover:text-red-500 transition">Contáctanos</Link></li>

        <li className="relative group">
          <Link to="/ayuda" className="hover:text-red-500 transition">Ayuda</Link>
          <ul className="absolute left-0 top-full w-64 bg-white shadow-lg rounded-md opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition duration-200 z-10">
            <li><Link to="/ayuda/manual" className="block px-4 py-2 hover:bg-gray-100">Manual de Usuario</Link></li>
            <li><Link to="/ayuda/opinion" className="block px-4 py-2 hover:bg-gray-100">Danos tu opinion</Link></li>
          </ul>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;