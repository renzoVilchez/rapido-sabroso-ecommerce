import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

const tipos = [
  { id: 1, nombre: 'Clásicas', imagen: 'http://localhost:5000/images/clasica.jpg' },
  { id: 2, nombre: 'Con Quesos', imagen: 'http://localhost:5000/images/quesos.jpg' },
  { id: 3, nombre: 'Picantes', imagen: 'http://localhost:5000/images/picante.jpg' },
  { id: 4, nombre: 'Alternativas', imagen: 'http://localhost:5000/images/alternativas.jpg' },
];

function TipoCarousel() {
  return (
    <section className="py-6 px-4">
      <h3 className="text-xl font-semibold mb-4 text-center">Tipos de Hamburguesas</h3>
      <Swiper
        spaceBetween={16}
        slidesPerView={2}
        breakpoints={{
          640: { slidesPerView: 3 },
          768: { slidesPerView: 4 },
        }}
      >
        {tipos.map(tipo => (
          <SwiperSlide key={tipo.id}>
            <div className="rounded overflow-hidden shadow">
              <img src={tipo.imagen} alt={tipo.nombre} className="w-full h-32 object-cover" />
              <div className="text-center py-2 font-medium">{tipo.nombre}</div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}

export default TipoCarousel;