import { Link } from 'react-router-dom';
import Logo from '../assets/images/logo.png';

const NavbarLanding = () => {
  return (
    <nav className="bg-white shadow-md px-6 flex justify-between items-center relative z-10">
      <div className="text-2xl font-bold text-yellow-600 flex items-center">
        <img src={Logo} alt="Logo de rapido y sabroso" width={80} height={80} />
        <p>Rápido y Sabroso</p>
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