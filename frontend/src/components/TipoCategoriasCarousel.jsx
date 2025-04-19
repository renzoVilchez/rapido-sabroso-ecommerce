import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

const TipoCategoriasCarousel = () => {
  const [categoriasPorTipo, setCategoriasPorTipo] = useState([]);

  useEffect(() => {
    const fetchCategoriasPorTipo = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/producto-categoria/categorias-por-tipo");
        const data = await res.json();
        setCategoriasPorTipo(data);
      } catch (error) {
        console.error("Error al cargar categorías por tipo:", error);
      }
    };

    fetchCategoriasPorTipo();
  }, []);

  return (
    <div className="space-y-10 px-4 py-8">
      {categoriasPorTipo.map((tipo) => (
        <div key={tipo.tipoProducto}>
          <h2 className="text-2xl font-bold mb-4">{tipo.tipoProducto}</h2>
          <Swiper
            slidesPerView={2}
            spaceBetween={16}
            breakpoints={{
              640: { slidesPerView: 2 },
              768: { slidesPerView: 3 },
              1024: { slidesPerView: 4 },
            }}
            navigation
            modules={[Navigation]}
            className="mySwiper"
          >
            {tipo.categorias.map((nombreCategoria) => (
              <SwiperSlide key={nombreCategoria}>
                <div className="bg-white rounded-2xl shadow p-4 h-full text-center">
                  <h3 className="text-lg font-semibold">{nombreCategoria}</h3>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      ))}
    </div>
  );
};

export default TipoCategoriasCarousel;