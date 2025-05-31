import { useEffect, useState, useRef, useContext } from 'react';
import axios from 'axios';
import ProductCard from '../../components/ProductCard';
import { Link } from 'react-router-dom';
import { GlobalContext } from '../../context/GlobalContext';

function Productos() {
  const [productos, setProductos] = useState([]);
  const [error, setError] = useState(null);
  const { cartItemCount, setCartItemCount } = useContext(GlobalContext);
  const hasLoadedLocalStorage = useRef(false);

  useEffect(() => {
    // Cargar carrito desde localStorage solo una vez
    if (!hasLoadedLocalStorage.current) {
      const carritoGuardado = JSON.parse(localStorage.getItem('carrito')) || [];
      const totalCarrito = carritoGuardado.reduce((acc, item) => acc + item.cantidad, 0);
      setCartItemCount(totalCarrito);
      hasLoadedLocalStorage.current = true;
    }

    // Obtener productos desde la API
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
      })
      .catch(error => {
        console.error('Hubo un error al obtener los productos:', error);
        setError('No se pudo cargar el menú. Intenta nuevamente más tarde.');
      });
  }, [setCartItemCount]);

  // Agrupar productos por categoría y tipo
  const groupByCategoryAndType = (items) => {
    return items.reduce((acc, item) => {
      const category = item.categoriaProducto || 'Sin categoría';
      const type = item.tipoProducto || 'Otros';

      if (!acc[category]) acc[category] = {};
      if (!acc[category][type]) acc[category][type] = [];

      acc[category][type].push(item);
      return acc;
    }, {});
  };

  const groupedProductos = groupByCategoryAndType(productos);

  // Agregar producto al carrito
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

  return (
    <div className="bg-white min-h-screen p-6">
      <h1 className="text-3xl font-bold mb-8 text-center text-yellow-600">Menú</h1>

      {error && (
        <div className="bg-red-100 text-red-700 border border-red-300 p-4 rounded-lg text-center font-semibold mb-6">
          {error}
        </div>
      )}

      {Object.entries(groupedProductos).map(([categoria, tipos]) => (
        <div key={categoria}>
          <h2 className="text-2xl font-semibold mb-6 text-center capitalize text-yellow-600">{categoria}</h2>

          {Object.entries(tipos).map(([tipo, items]) => (
            <div key={tipo} className="bg-yellow-50 shadow-md rounded-2xl p-6 mb-10">
              <h3 className="text-xl font-bold mb-6 text-center capitalize text-yellow-600 border-b-2 border-yellow-500 pb-3">
                {tipo}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {items.slice(0, 4).map(producto => (
                  <ProductCard
                    key={producto.idProducto}
                    producto={producto}
                    onAgregarAlCarrito={agregarAlCarrito}
                  />
                ))}
              </div>

              {items.length > 4 && (
                <div className="mt-6 text-center">
                  <Link
                    to={`/menu/${categoria.toLowerCase()}/${tipo.toLowerCase()}`}
                    className="text-yellow-600 hover:underline font-semibold transition-colors"
                  >
                    Ver más {tipo}
                  </Link>
                </div>
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Productos;