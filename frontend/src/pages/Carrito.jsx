import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GlobalContext } from '../context/GlobalContext';

function Carrito() {
  const navigate = useNavigate();
  const { cartItemCount, setCartItemCount, isLoggedIn } = useContext(GlobalContext);

  const [carrito, setCarrito] = useState([]);
  const [total, setTotal] = useState(0);

  // Cargar carrito desde localStorage
  useEffect(() => {
    const dataGuardada = localStorage.getItem('carrito');
    if (dataGuardada) {
      try {
        const carritoParseado = JSON.parse(dataGuardada);
        if (Array.isArray(carritoParseado)) {
          const carritoConNumeros = carritoParseado.map(item => ({
            ...item,
            precioProducto: Number(item.precioProducto),
            cantidad: Number(item.cantidad)
          }));
          setCarrito(carritoConNumeros);
        }
      } catch (error) {
        console.error("Error al leer el carrito desde localStorage:", error);
      }
    }
  }, []);

  // Actualizar localStorage y total cuando cambie el carrito
  useEffect(() => {
    if (carrito.length > 0) {
      localStorage.setItem('carrito', JSON.stringify(carrito));
    } else {
      localStorage.removeItem('carrito');
    }

    const totalCalculado = carrito.reduce(
      (acc, item) => acc + item.precioProducto * item.cantidad, 0
    );
    setTotal(totalCalculado);

    const cantidadTotal = carrito.reduce((acc, item) => acc + item.cantidad, 0);
    setCartItemCount(cantidadTotal);
  }, [carrito, setCartItemCount]);

  const aumentarCantidad = (idProducto) => {
    setCarrito(prev =>
      prev.map(item =>
        item.idProducto === idProducto
          ? { ...item, cantidad: item.cantidad + 1 }
          : item
      )
    );
  };

  const disminuirCantidad = (idProducto) => {
    setCarrito(prev =>
      prev.map(item =>
        item.idProducto === idProducto && item.cantidad > 1
          ? { ...item, cantidad: item.cantidad - 1 }
          : item
      )
    );
  };

  const eliminarProducto = (idProducto) => {
    setCarrito(prev => prev.filter(item => item.idProducto !== idProducto));
  };

  const irAPagar = () => {
    if (!isLoggedIn) {
      navigate('/login');
    } else if (carrito.length === 0) {
      alert('Tu carrito está vacío. Agrega productos antes de pagar.');
    } else {
      navigate('/pago');
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 bg-[#feefc3] rounded-xl shadow-sm">
      <h1 className="text-3xl font-bold mb-6 text-center text-yellow-600">🛒 Tu Carrito</h1>

      {carrito.length === 0 ? (
        <p className="text-[#1f1f1f] text-center">Tu carrito está vacío.</p>
      ) : (
        <div className="space-y-4">
          {carrito.map(item => (
            <div
              key={item.idProducto}
              className="flex justify-between items-center border-b border-yellow-400 pb-4 bg-white/60 p-3 rounded-lg"
            >
              <div className="flex-1  ">
                <p className="font-semibold text-lg text-[#1f1f1f]">{item.nombreProducto}</p>
                <p className="text-sm text-[#4f4f4f]">Precio: S/.{item.precioProducto.toFixed(2)}</p>
                <p className="text-sm text-[#4f4f4f]">Cantidad: {item.cantidad}</p>
              </div>
              <div className="flex items-center space-x-2 ml-4">
                <button
                  onClick={() => aumentarCantidad(item.idProducto)}
                  className="px-3 py-1 bg-[#eea539] hover:bg-[#f0b750] text-white rounded"
                >
                  +
                </button>
                <button
                  onClick={() => disminuirCantidad(item.idProducto)}
                  className={`px-3 py-1 ${item.cantidad > 1
                      ? 'bg-[#d8851e] hover:bg-[#c97417]'
                      : 'bg-gray-300 cursor-not-allowed'
                    } text-white rounded`}
                  disabled={item.cantidad <= 1}
                >
                  -
                </button>
                <button
                  onClick={() => eliminarProducto(item.idProducto)}
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}

          <div className="text-right mt-6">
            <p className="text-lg font-semibold text-[#1f1f1f]">
              Total: S/.{total.toFixed(2)}
            </p>
          </div>
        </div>
      )}

      <div className="mt-6 text-center">
        <Link
          to="/menu"
          className="text-[#eea539] hover:underline font-medium block mb-4"
        >
          Continuar comprando
        </Link>

        {carrito.length > 0 && (
          <button
            onClick={irAPagar}
            className="px-6 py-3 bg-[#e53935] hover:bg-red-600 text-white font-bold rounded-lg shadow-md transition duration-300"
          >
            Pagar
          </button>
        )}
      </div>
    </div>
  );
}

export default Carrito;