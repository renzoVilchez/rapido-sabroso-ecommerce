import { useEffect, useState, useRef, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ProductCard from '../../components/ProductCard';
import { GlobalContext } from '../../context/GlobalContext';

function normalizeString(str) {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/--+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function TipoProducto() {
  const { tipo } = useParams();
  const [productos, setProductos] = useState([]);
  const [error, setError] = useState(null);
  const { cartItemCount, setCartItemCount } = useContext(GlobalContext);
  const hasLoadedLocalStorage = useRef(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!hasLoadedLocalStorage.current) {
      const carritoGuardado = JSON.parse(localStorage.getItem('carrito')) || [];
      const totalCarrito = carritoGuardado.reduce((acc, item) => acc + item.cantidad, 0);
      setCartItemCount(totalCarrito);
      hasLoadedLocalStorage.current = true;
    }

    axios.get('http://localhost:5000/api/productos')
      .then(response => {
        const productosCamelCase = response.data.map(p => ({
          idProducto: p.id_producto,
          nombre: p.nombre,
          descripcion: p.descripcion,
          precio: p.precio,
          stock: p.stock,
          imagen: p.imagen,
          tipoProducto: p.tipoProducto,
          categoriaProducto: p.categoriaProducto,
        }));
        setProductos(productosCamelCase);
        setLoading(false);
      })
      .catch(error => {
        setError('No se pudo cargar el menú. Intenta nuevamente más tarde.');
        setLoading(false);
      });
  }, [setCartItemCount]);

  // Obtener el tipoProducto original para mostrar en título y filtrar productos
  const tipoOriginal = productos.find(p => normalizeString(p.tipoProducto) === tipo.toLowerCase())?.tipoProducto || tipo;

  // Filtrar productos por tipoProducto que coincida con el slug de la URL
  const productosFiltrados = productos.filter(p => normalizeString(p.tipoProducto) === tipo.toLowerCase());

  // Función para agregar al carrito
  const agregarAlCarrito = (producto) => {
    const carritoActual = JSON.parse(localStorage.getItem('carrito')) || [];
    const idProducto = Number(producto.idProducto);

    const existe = carritoActual.find(p => p.idProducto === idProducto);
    let nuevoCarrito;

    const nuevoItem = {
      idProducto,
      nombre: producto.nombre,
      descripcion: producto.descripcion,
      precio: Number(producto.precio),
      imagen: producto.imagen,
      cantidad: 1,
      tipo: 'producto',
      tipoProducto: producto.tipoProducto || 'otro',
    };

    if (existe) {
      nuevoCarrito = carritoActual.map(p =>
        p.idProducto === idProducto
          ? { ...p, cantidad: p.cantidad + 1 }
          : p
      );
    } else {
      nuevoCarrito = [...carritoActual, nuevoItem];
    }

    localStorage.setItem('carrito', JSON.stringify(nuevoCarrito));

    const total = nuevoCarrito.reduce((acc, item) => acc + item.cantidad, 0);
    setCartItemCount(total);
  };

  if (loading) return <p>Cargando productos...</p>;

  return (
    <div className="bg-white min-h-screen p-6">
      <h1 className="text-3xl font-bold mb-8 text-center text-yellow-600">{tipoOriginal}</h1>

      {error && (
        <div className="bg-red-100 text-red-700 border border-red-300 p-4 rounded-lg text-center font-semibold mb-6">
          {error}
        </div>
      )}

      {productosFiltrados.length === 0 && (
        <p className="text-center text-gray-500">No hay productos para esta categoría.</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {productosFiltrados.map(producto => (
          <ProductCard
            key={producto.idProducto}
            producto={producto}
            onAgregarAlCarrito={agregarAlCarrito}
          />
        ))}
      </div>
    </div>
  );
}

export default TipoProducto;