import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { useNavigate } from "react-router-dom";

const TipoCategoriasCarousel = () => {
  const navigate = useNavigate();
  const [categoriasPorTipo, setCategoriasPorTipo] = useState([]);

  useEffect(() => {
    const fetchCategoriasPorTipo = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/producto-categorias/categorias-por-tipo");
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
          <h2 className="text-2xl font-bold mb-8 text-center">{tipo.tipoProducto}</h2>

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
            {tipo.categorias.map((categoria) => (
              <SwiperSlide key={categoria.nombreCategoria}>
                <div
                  onClick={() => navigate("/menu")}
                  className="bg-yellow-500 text-white rounded-2xl shadow-md p-4 h-full text-center cursor-pointer hover:shadow-2xl transition"
                >
                  {/* Imagen con efecto de agrandar */}
                  <div className="overflow-hidden rounded-xl mb-4">
                    <img
                      src={categoria.imagenCategoria ? `http://localhost:5000/images/${categoria.imagenCategoria}` : "https://placehold.co/300x200.png"}
                      alt={categoria.nombreCategoria}
                      className="w-full h-32 object-cover rounded-xl transform hover:scale-110 transition duration-300"
                    />
                  </div>

                  <h3 className="text-lg font-semibold">{categoria.nombreCategoria}</h3>
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