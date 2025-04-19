import { useState, useEffect } from 'react';

function Carrito() {
  const [carrito, setCarrito] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const dataGuardada = localStorage.getItem('carrito');
    if (dataGuardada) {
      try {
        const carritoParseado = JSON.parse(dataGuardada);
        if (Array.isArray(carritoParseado)) {
          // Convertir precios y cantidades a número
          const carritoConNumeros = carritoParseado.map(item => ({
            ...item,
            precioProducto: Number(item.precioProducto),
            cantidad: Number(item.cantidad)
          }));

          setCarrito(carritoConNumeros);

          const totalCalculado = carritoConNumeros.reduce(
            (acc, item) => acc + item.precioProducto * item.cantidad, 0
          );
          setTotal(totalCalculado);
        }
      } catch (error) {
        console.error("Error al leer el carrito desde localStorage:", error);
      }
    }
  }, []);

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">🛒 Tu Carrito</h1>

      {carrito.length === 0 ? (
        <p className="text-gray-600">Tu carrito está vacío.</p>
      ) : (
        <div className="space-y-4">
          {carrito.map(item => (
            <div key={item.idProducto} className="flex justify-between items-center border-b py-2">
              <div>
                <p className="font-medium">{item.nombreProducto}</p>
                <p className="text-sm text-gray-500">Precio: S/.{item.precioProducto.toFixed(2)}</p>
                <p className="text-sm text-gray-500">Cantidad: {item.cantidad}</p>
              </div>
            </div>
          ))}

          <div className="text-right mt-6">
            <p className="text-lg font-semibold">Total: S/.{total.toFixed(2)}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Carrito;