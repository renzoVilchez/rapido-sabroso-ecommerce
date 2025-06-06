import { Link } from 'react-router-dom';
import './carrusel.css';

function Menu() {
  const menus = [
    { label: 'Menú Personal', path: '/menu/tipo/personal' },
    { label: 'Menú Familiar', path: '/menu/tipo/familiar' },
    { label: 'Menú Ejecutivo', path: '/menu/tipo/ejecutivo' },
  ];

  const hamburguesas = [
    { label: 'Hamburguesas Clásicas', path: '/menu/productos/tipo/hamburguesas-clasicas' },
    { label: 'Hamburguesas Especiales', path: '/menu/productos/tipo/hamburguesas-especiales' },
    { label: 'Hamburguesas Veganas', path: '/menu/productos/tipo/hamburguesas-veganas' },
    { label: 'Hamburguesas Gourmet', path: '/menu/productos/tipo/hamburguesas-gourmet' },
  ];

  const bebidas = [
    { label: 'Refrescos', path: '/menu/productos/tipo/refrescos' },
    { label: 'Jugos Naturales', path: '/menu/productos/tipo/jugos-naturales' },
    { label: 'Agua', path: '/menu/productos/tipo/agua' },
    { label: 'Bebidas Tradicionales', path: '/menu/productos/tipo/bebidas-tradicionales' },
  ];

  const renderGrupo = (titulo, items) => (
    <div className="w-full md:w-1/3 px-2">
      <h2 className="text-xl font-semibold mb-4 text-yellow-700 text-center">{titulo}</h2>
      <div className="grid gap-3">
        {items.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className="block bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 px-4 rounded-2xl text-center shadow transition-transform hover:scale-105"
          >
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center text-yellow-600">Menú</h1>
      <div className="flex flex-col md:flex-row gap-6">
        {renderGrupo('Menús Armados', menus)}
        {renderGrupo('Hamburguesas', hamburguesas)}
        {renderGrupo('Bebidas', bebidas)}
      </div>
    </div>
  );
}

export default Menu;