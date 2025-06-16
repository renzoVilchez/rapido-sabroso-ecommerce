function ProductCard({ producto, onAgregarAlCarrito }) {
  const urlImagen = producto.imagen
    ? `http://localhost:5000/images/${producto.imagen}`
    : 'https://placehold.co/300x200.png';

  return (
    <div className="flex flex-col h-full bg-white rounded-2xl shadow-md p-4 text-center transition-transform hover:scale-105">
      <img
        src={urlImagen}
        alt={producto.nombre}
        className="w-full h-90 mb-4 rounded-lg"
      />

      <h3 className="text-lg font-bold mb-2 text-yellow-600">
        {producto.nombre}
      </h3>

      <p className="text-sm text-gray-600 mb-4">
        {producto.descripcion}
      </p>

      <div className="mt-auto flex justify-between items-center">
        <span className="text-lg font-bold text-yellow-600">
          S/. {producto.precio}
        </span>
        <button
          onClick={() => onAgregarAlCarrito(producto)}
          className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-4 py-2 rounded-2xl transition-all shadow hover:shadow-lg active:scale-90"
        >
          Agregar al carrito 🛒
        </button>
      </div>
    </div>
  );
}

export default ProductCard;