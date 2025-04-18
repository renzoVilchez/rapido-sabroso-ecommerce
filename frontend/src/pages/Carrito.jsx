import { useState, useEffect } from 'react';

function Carrito() {
  const [carrito, setCarrito] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const dataGuardada = JSON.parse(localStorage.getItem('carrito')) || [];
    setCarrito(dataGuardada);

    const totalCalculado = dataGuardada.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
    setTotal(totalCalculado);
  }, []);

  const eliminarItem = (id) => {
    const nuevoCarrito = carrito.filter(item => item.id !== id);
    setCarrito(nuevoCarrito);
    localStorage.setItem('carrito', JSON.stringify(nuevoCarrito));
    const nuevoTotal = nuevoCarrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
    setTotal(nuevoTotal);
  };

  const vaciarCarrito = () => {
    setCarrito([]);
    localStorage.removeItem('carrito');
    setTotal(0);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">🛒 Tu Carrito</h1>

      {carrito.length === 0 ? (
        <p className="text-gray-600">Tu carrito está vacío.</p>
      ) : (
        <div className="space-y-4">
          {carrito.map(item => (
            <div key={item.id} className="flex justify-between items-center border-b py-2">
              <div>
                <p className="font-medium">{item.nombre}</p>
                <p className="text-sm text-gray-500">Cantidad: {item.cantidad}</p>
                <p className="text-sm text-gray-500">Precio: S/.{item.precio.toFixed(2)}</p>
              </div>
              <button
                onClick={() => eliminarItem(item.id)}
                className="text-red-500 hover:underline"
              >
                Eliminar
              </button>
            </div>
          ))}

          <div className="text-right mt-6">
            <p className="text-lg font-semibold">Total: S/.{total.toFixed(2)}</p>

            <div className="mt-4 space-x-4">
              <button
                onClick={vaciarCarrito}
                className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300"
              >
                Vaciar Carrito
              </button>
              <button
                onClick={() => alert('Aquí irá el pago o pedido')}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Realizar Pedido
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Carrito;