function ProductCard({ producto, onAgregarAlCarrito }) {
  const urlImagen = producto.imagenProducto
  ? `http://localhost:5000/images/${producto.imagenProducto}`
  : 'https://placehold.co/300x200.png';

  return (
    <div className="flex flex-col h-full bg-white rounded-2xl shadow-md p-4 text-center transition-transform hover:scale-105">
      {/* Imagen del producto */}
      <img
        src={urlImagen}
        alt={producto.nombreProducto}
        className="w-full h-40 object-cover mb-4 rounded-lg"
      />

      {/* Nombre del producto */}
      <h3 className="text-lg font-bold mb-2 text-yellow-600">
        {producto.nombreProducto}
      </h3>

      {/* Descripción */}
      <p className="text-sm text-gray-600 mb-4">
        {producto.descripcionProducto}
      </p>

      {/* Precio + Botón */}
      <div className="mt-auto flex justify-between items-center">
        <span className="text-lg font-bold text-yellow-600">
          S/. {producto.precioProducto}
        </span>
        <button
          onClick={() => onAgregarAlCarrito(producto)}
          className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-4 py-2 rounded-2xl transition-all shadow hover:shadow-lg active:scale-95"
        >
          Agregar
        </button>
      </div>
    </div>
  );
}

export default ProductCard;