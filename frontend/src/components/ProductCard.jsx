function ProductCard({ productName, productDescription, productPrice, productImage }) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col h-full">
      <img 
        src={`http://localhost:5000/images/${productImage}`} 
        alt={productName} 
        className="w-full h-40 object-cover"
      />
      <div className="p-4 flex flex-col justify-between flex-grow">
        <div>
          <h3 className="text-lg font-semibold mb-1">{productName}</h3>
          <p className="text-sm text-gray-600 mb-2">{productDescription}</p>
        </div>
        <div className="mt-auto">
          <p className="text-base font-semibold mb-3">Precio: S/ {productPrice}</p>
          <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
            Ordenar
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;