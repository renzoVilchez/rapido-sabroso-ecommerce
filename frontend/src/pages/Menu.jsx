import React, { useEffect, useState, useRef, useContext } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import { Link } from 'react-router-dom';
import { GlobalContext } from '../context/GlobalContext';

function Menu() {
  const [productos, setProductos] = useState([]);
  const { cartItemCount, setCartItemCount } = useContext(GlobalContext);

  const hasLoadedLocalStorage = useRef(false);

  // Cargar productos desde el backend y el carrito desde localStorage
  useEffect(() => {
    if (!hasLoadedLocalStorage.current) {
      // Cargar carrito desde localStorage
      const carritoGuardado = JSON.parse(localStorage.getItem('carrito')) || [];
      const totalCarrito = carritoGuardado.reduce((acc, item) => acc + item.cantidad, 0);
      setCartItemCount(totalCarrito);
      hasLoadedLocalStorage.current = true;
    }

    // Obtener productos desde el backend
    axios.get('http://localhost:5000/api/productos')
      .then(response => setProductos(response.data))
      .catch(error => console.error('Hubo un error al obtener los productos:', error));
  }, [setCartItemCount]);

  // Agrupar productos por tipo y categoría
  const groupByTypeAndCategory = (items) => {
    return items.reduce((acc, item) => {
      const type = item.tipoProducto || 'Otros';
      const category = item.categoriaProducto || 'Sin categoría';

      if (!acc[type]) acc[type] = {};
      if (!acc[type][category]) acc[type][category] = [];

      acc[type][category].push(item);
      return acc;
    }, {});
  };

  const groupedProductos = groupByTypeAndCategory(productos);

  // Función para agregar producto al carrito
  const agregarAlCarrito = (producto) => {
    const carritoActual = JSON.parse(localStorage.getItem('carrito')) || [];
    const existe = carritoActual.find(p => p.idProducto === producto.idProducto);

    let nuevoCarrito;
    if (existe) {
      nuevoCarrito = carritoActual.map(p =>
        p.idProducto === producto.idProducto
          ? { ...p, cantidad: p.cantidad + 1 }
          : p
      );
    } else {
      nuevoCarrito = [...carritoActual, { ...producto, cantidad: 1 }];
    }

    // Guardar carrito actualizado en localStorage
    localStorage.setItem('carrito', JSON.stringify(nuevoCarrito));

    // Actualizar el contador global del carrito
    const total = nuevoCarrito.reduce((acc, item) => acc + item.cantidad, 0);
    setCartItemCount(total);
  };

  return (
    <div className="bg-white min-h-screen p-6">
      <h1 className="text-3xl font-bold mb-8 text-center text-yellow-600">Menú</h1>

      {Object.entries(groupedProductos).map(([tipo, categorias]) => (
        <div key={tipo}>
          <h2 className="text-2xl font-semibold mb-6 text-center capitalize text-yellow-600">{tipo}</h2>

          {Object.entries(categorias).map(([categoria, items]) => (
            <div key={categoria} className="bg-yellow-50 shadow-md rounded-2xl p-6 mb-10">
              <h3 className="text-xl font-bold mb-6 text-center capitalize text-yellow-600 border-b-2 border-yellow-500 pb-3">
                {categoria}
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
                    to={`/menu/${tipo.toLowerCase()}/${categoria.toLowerCase()}`}
                    className="text-yellow-600 hover:underline font-semibold transition-colors"
                  >
                    Ver más {categoria}
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

export default Menu;