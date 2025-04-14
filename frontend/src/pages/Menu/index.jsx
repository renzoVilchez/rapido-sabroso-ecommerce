import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from '../../components/ProductCard';
import { Link } from 'react-router-dom';

function Menu() {
  const [hamburguesas, setHamburguesas] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/hamburguesas')
      .then(response => {
        setHamburguesas(response.data);
      })
      .catch(error => {
        console.error('Hubo un error al obtener las hamburguesas:', error);
      });
  }, []);

  const groupByType = (items) => {
    return items.reduce((acc, item) => {
      const type = item.categoryName || 'Otros';
      if (!acc[type]) acc[type] = [];
      acc[type].push(item);
      return acc;
    }, {});
  };

  const groupedHamburguesas = groupByType(hamburguesas);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-8 text-center">Menú</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {Object.entries(groupedHamburguesas).map(([tipo, items]) => (
          <div
            key={tipo}
            className="bg-white shadow-lg rounded-xl p-4 flex flex-col justify-between"
          >
            <h2 className="text-lg font-semibold mb-4 text-center capitalize border-b pb-2">{tipo}</h2>

            <div className="flex flex-col gap-4">
              {items.slice(0, 4).map(hamburguesa => (
                <ProductCard
                  key={hamburguesa.productId}
                  productName={hamburguesa.productName}
                  productDescription={hamburguesa.productDescription}
                  productPrice={hamburguesa.productPrice}
                  productImage={hamburguesa.productImage || 'default_image.jpg'}
                />
              ))}
            </div>

            {items.length > 4 && (
              <div className="mt-4 text-center">
                <Link
                  to={`/menu/${tipo.toLowerCase()}`}
                  className="text-blue-600 hover:underline font-medium"
                >
                  Ver más {tipo}
                </Link>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Menu;