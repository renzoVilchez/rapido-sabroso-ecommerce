import { useEffect, useState } from 'react';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

function ToppingCarousel() {
  const [toppings, setToppings] = useState([]);

  useEffect(() => {
    const fetchToppings = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/toppings');
        setToppings(res.data);
      } catch (err) {
        console.error('Error al cargar los toppings', err);
      }
    };

    fetchToppings();
  }, []);

  return (
    <section className="py-6 px-4">
      <h3 className="text-xl font-semibold mb-4 text-center">Agregados Populares</h3>
      <Swiper
        spaceBetween={16}
        slidesPerView={2}
        breakpoints={{
          640: { slidesPerView: 3 },
          768: { slidesPerView: 4 },
        }}
      >
        {toppings.map((topping) => (
          <SwiperSlide key={topping.toppingId}>
            <div className="rounded overflow-hidden shadow">
              <img
                src={`http://localhost:5000/images/${topping.toppingImage}`}
                alt={topping.toppingName}
                className="w-full h-32 object-cover"
              />
              <div className="text-center py-1 font-medium">{topping.toppingName}</div>
              <div className="text-center text-sm text-gray-600">S/ {topping.toppingPrice}</div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}

export default ToppingCarousel;