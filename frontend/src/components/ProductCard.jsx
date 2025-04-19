import React from 'react';

function ProductCard({ producto, onAgregarAlCarrito }) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-4 text-center">
      <img src={producto.productImage || 'default_image.jpg'} alt={producto.nombreProducto} className="w-full h-40 object-cover mb-4 rounded" />
      <h3 className="text-lg font-semibold mb-2">{producto.nombreProducto}</h3>
      <p className="text-sm text-gray-600 mb-2">{producto.descripcionProducto}</p>
      <div className="flex justify-between items-center">
        <span className="font-bold">S/. {producto.precioProducto}</span>
        <button
          onClick={() => onAgregarAlCarrito(producto)}
          className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700"
        >
          Agregar al carrito
        </button>
      </div>
    </div>
  );
}

export default ProductCard;