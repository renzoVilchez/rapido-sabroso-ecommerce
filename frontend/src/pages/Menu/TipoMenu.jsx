import { useEffect, useState, useContext, useRef } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { GlobalContext } from '../../context/GlobalContext';
import MenuCard from '../../components/MenuCard';

function TipoMenu() {
  const { tipo } = useParams();
  const [menus, setMenus] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { cartItemCount, setCartItemCount } = useContext(GlobalContext);
  const hasLoadedLocalStorage = useRef(false);

  useEffect(() => {
    async function fetchMenus() {
      try {
        const res = await axios.get('http://localhost:5000/api/menus');
        setMenus(res.data);
      } catch (err) {
        setError(err.message || 'Error al cargar los menús');
      } finally {
        setLoading(false);
      }
    }

    fetchMenus();
  }, []);

  const agregarAlCarrito = (menu) => {
    const carritoActual = JSON.parse(localStorage.getItem('carrito')) || [];

    const idMenu = Number(menu.id_menu);

    const existe = carritoActual.find(item => item.tipo === 'menu' && item.idMenu === idMenu);

    let nuevoCarrito;
    if (existe) {
      nuevoCarrito = carritoActual.map(item =>
        item.tipo === 'menu' && item.idMenu === idMenu
          ? { ...item, cantidad: item.cantidad + 1 }
          : item
      );
    } else {
      const nuevoItem = {
        idMenu,
        nombre: menu.nombre,
        descripcion: menu.descripcion,
        precio: Number(menu.precio),
        imagen: menu.imagen || '',
        cantidad: 1,
        tipo: 'menu',
      };
      nuevoCarrito = [...carritoActual, nuevoItem];
    }

    localStorage.setItem('carrito', JSON.stringify(nuevoCarrito));
    const total = nuevoCarrito.reduce((acc, item) => acc + item.cantidad, 0);
    setCartItemCount(total);
  };

  if (loading) return <p className="text-center mt-8">Cargando menús...</p>;
  if (error) return <p className="text-center text-red-500 mt-8">Error: {error}</p>;

  const menusFiltrados = menus.filter(menu => menu.tipo_menu === tipo);

  if (menusFiltrados.length === 0) {
    return <p className="text-center mt-8">No hay menús para el tipo "{tipo}"</p>;
  }

  return (
    <div className='max-w-7xl m-auto mt-8 mb-8 px-4'>
      <h1 className="text-2xl font-bold mb-4 text-yellow-700 text-center">
        Menús {tipo}
      </h1>
      <div className="flex flex-wrap justify-center gap-6">
        {menusFiltrados.map(menu => (
          <MenuCard
            key={menu.id_menu}
            menu={menu}
            onAgregarAlCarrito={agregarAlCarrito}
          />
        ))}
      </div>
    </div>
  );
}

export default TipoMenu;