import { Link } from 'react-router-dom';

function Menu() {
  const opciones = [
    { label: 'Menú Personal', path: '/menu/tipo/personal' },
    { label: 'Menú Familiar', path: '/menu/tipo/familiar' },
    { label: 'Menú Ejecutivo', path: '/menu/tipo/ejecutivo' },
    { label: 'Productos Individuales', path: '/menu/productos' },
  ];

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center text-yellow-600">Menú</h1>

      <div className="grid gap-4">
        {opciones.map((opcion) => (
          <Link
            key={opcion.path}
            to={opcion.path}
            className="block bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 px-4 rounded-2xl text-center shadow transition-transform hover:scale-105"
          >
            {opcion.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Menu;