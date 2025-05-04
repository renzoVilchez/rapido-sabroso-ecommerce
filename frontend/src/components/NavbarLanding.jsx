import { Link } from 'react-router-dom';

const NavbarLanding = () => {
  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      <div className="text-2xl font-bold text-yellow-600">
        Rápido y Sabroso
      </div>
      <div className="space-x-4">
        <Link to="/login" className="text-gray-700 hover:text-yellow-600">
          Iniciar sesión
        </Link>
        <Link to="/register" className="text-gray-700 hover:text-yellow-600">
          Registrarse
        </Link>
        <Link to="/home" className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition">
          Ir al Menú
        </Link>
      </div>
    </nav>
  );
};

export default NavbarLanding;
