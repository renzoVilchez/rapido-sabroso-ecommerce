import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from '../../components/ProductCard';
import { Link } from 'react-router-dom';

function Menu() {
  const [productos, setProductos] = useState([]);
  const [carrito, setCarrito] = useState([]);

  // Cargar carrito desde localStorage cuando el componente se monta
  useEffect(() => {
    const carritoGuardado = JSON.parse(localStorage.getItem('carrito')) || [];
    setCarrito(carritoGuardado); // Cargar el carrito guardado en el estado

    // Cargar productos desde la API
    axios.get('http://localhost:5000/api/productos')
      .then(response => {
        setProductos(response.data);
      })
      .catch(error => {
        console.error('Hubo un error al obtener los productos:', error);
      });
  }, []); // Este useEffect se ejecuta una sola vez al montar el componente

  // Guardar carrito en localStorage cada vez que cambie
  useEffect(() => {
    if (carrito.length > 0) {
      // Guardar en localStorage solo si el carrito tiene productos
      localStorage.setItem('carrito', JSON.stringify(carrito));
    }
  }, [carrito]); // Este useEffect se ejecuta cuando el carrito cambia

  // Agrupar los productos por tipo y categoría
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

  // Función para agregar un producto al carrito
  const agregarAlCarrito = (producto) => {
    setCarrito((prevCarrito) => {
      const productoExistente = prevCarrito.find((item) => item.idProducto === producto.idProducto);

      if (productoExistente) {
        // Si el producto ya está en el carrito, aumentar la cantidad
        return prevCarrito.map((item) =>
          item.idProducto === producto.idProducto
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      } else {
        // Si el producto no está en el carrito, agregarlo con cantidad 1
        return [...prevCarrito, { ...producto, cantidad: 1 }];
      }
    });
  };

  // Función para eliminar un producto del carrito
  const eliminarDelCarrito = (idProducto) => {
    setCarrito((prevCarrito) => prevCarrito.filter((item) => item.idProducto !== idProducto));
  };

  // Función para calcular el total del carrito
  const calcularTotal = () => {
    return carrito.reduce((total, item) => total + parseFloat(item.precioProducto) * item.cantidad, 0);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-8 text-center">Menú</h1>

      {Object.entries(groupedProductos).map(([tipo, categorias]) => (
        <div key={tipo}>
          <h2 className="text-xl font-bold mb-4 text-center capitalize">{tipo}</h2>

          {/* Para cada categoría dentro del tipo */}
          {Object.entries(categorias).map(([categoria, items]) => (
            <div key={categoria} className="bg-white shadow-lg rounded-xl p-4 mb-8">
              <h3 className="text-lg font-semibold mb-4 text-center capitalize border-b pb-2">{categoria}</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {/* Mostrar los productos (hasta 4 por categoría) */}
                {items.slice(0, 4).map(producto => (
                  <ProductCard
                    key={producto.idProducto}
                    producto={producto}
                    onAgregarAlCarrito={agregarAlCarrito}
                  />
                ))}
              </div>

              {/* Si hay más de 4 productos, mostrar un enlace */}
              {items.length > 4 && (
                <div className="mt-4 text-center">
                  <Link
                    to={`/menu/${tipo.toLowerCase()}/${categoria.toLowerCase()}`}
                    className="text-blue-600 hover:underline font-medium"
                  >
                    Ver más {categoria}
                  </Link>
                </div>
              )}
            </div>
          ))}
        </div>
      ))}

      {/* Mostrar el carrito */}
      <div className="mt-8 bg-white p-6 shadow-lg rounded-lg">
        <h2 className="text-xl font-bold mb-4">Carrito</h2>
        <div>
          {carrito.length > 0 ? (
            carrito.map((item) => (
              <div key={item.idProducto} className="flex justify-between mb-4">
                <span>{item.nombreProducto} x {item.cantidad}</span>
                <span>S/. {parseFloat(item.precioProducto) * item.cantidad}</span>
                <button
                  onClick={() => eliminarDelCarrito(item.idProducto)}
                  className="text-red-500"
                >
                  Eliminar
                </button>
              </div>
            ))
          ) : (
            <p>No hay productos en el carrito.</p>
          )}
        </div>
        <div className="flex justify-between mt-4 font-bold">
          <span>Total:</span>
          <span>S/. {calcularTotal().toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}

export default Menu;