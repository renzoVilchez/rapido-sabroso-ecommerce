import NavbarLanding from '../../components/NavbarLanding';
import FooterLanding from '../../components/FooterLanding';
import { Link } from 'react-router-dom';
import './LandingPage.css';
import { Typewriter } from 'react-simple-typewriter';
import hamburguesaLanding from '../../assets/images/hamburguesaLanding.png';

const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Fondo animado con burbujas */}
      <div className="bg_animate flex-grow relative">
        <NavbarLanding />
        <div className="burbujas">
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={i} className="burbuja"></div>
          ))}
        </div>

        {/* Hero Section */}
        <section className="relative bg_animate flex-grow flex items-center justify-center text-center text-gray-800 overflow-hidden">
          <div className="z-10 p-8 flex flex-col items-center">
            <h1 className="text-4xl md:text-5xl font-bold text-yellow-700 mb-6">
              <Typewriter
                words={[
                  '¡Tu hamburguesa favorita en minutos!',
                  'Ordena fácil y rápido',
                  '¡Sabores irresistibles te esperan!',
                ]}
                loop={0} // 0 es infinito
                cursor
                cursorStyle="_"
                typeSpeed={60}
                deleteSpeed={30}
                delaySpeed={1200}
              />
            </h1>
            <div className="relative z-10">
              <img src={hamburguesaLanding} alt="Hamburguesa" className="w-72" />
            </div>
            <p className="text-xl max-w-2xl text-gray-700 mb-4">
              Disfruta de hamburguesas deliciosas, bebidas refrescantes y un sistema de pedidos rápido y sencillo.
            </p>
            <Link
              to="/home"
              className="bg-yellow-500 text-white px-8 py-4 rounded-full text-lg hover:bg-yellow-600 transition"
            >
              Ver menú
            </Link>
          </div>

          {/* Burbujas animadas */}
          <div className="burbujas">
            {Array.from({ length: 10 }).map((_, i) => (
              <span key={i} className="burbuja" />
            ))}
          </div>
        </section>

      </div>

      {/* Beneficios */}
      <section className="py-16 px-8 bg-white text-center">
        <h2 className="text-3xl font-bold mb-8">¿Por qué elegirnos?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-yellow-50 p-6 rounded-xl shadow">
            <img src="/icons/fast.svg" alt="Rápido" className="w-12 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Pedidos Rápidos</h3>
            <p>Tu pedido estará listo en minutos. ¡Rápido y sin complicaciones!</p>
          </div>
          <div className="bg-yellow-50 p-6 rounded-xl shadow">
            <img src="/icons/fresh.svg" alt="Fresco" className="w-12 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Ingredientes Frescos</h3>
            <p>Usamos solo los mejores ingredientes para que disfrutes al máximo.</p>
          </div>
          <div className="bg-yellow-50 p-6 rounded-xl shadow">
            <img src="/icons/reward.svg" alt="Recompensas" className="w-12 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Sistema de Recompensas</h3>
            <p>Gana puntos con cada compra y obtén descuentos especiales.</p>
          </div>
        </div>
      </section>

      {/* Menú destacado */}
      <section className="py-16 px-8 bg-yellow-50 text-center">
        <h2 className="text-3xl font-bold mb-8">Nuestras Estrellas</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {['Clásica', 'BBQ Doble', 'Pollo Crocante', 'Veggie'].map((name, i) => (
            <div key={i} className="bg-white p-4 rounded-xl shadow">
              <img src={`/menu/${name.toLowerCase().replace(/ /g, '-')}.png`} alt={name} className="w-full h-40 object-cover mb-4 rounded" />
              <h3 className="text-xl font-semibold">{name}</h3>
              <p className="text-yellow-700 font-bold">S/ {19 + i * 2}.90</p>
            </div>
          ))}
        </div>
        <Link to="/menu" className="mt-8 inline-block bg-yellow-600 text-white px-6 py-3 rounded-full hover:bg-yellow-700 transition">
          Ver todo el menú
        </Link>
      </section>

      {/* Recompensas */}
      <section className="py-16 px-8 bg-white text-center">
        <h2 className="text-3xl font-bold mb-6">Gana recompensas con cada compra</h2>
        <p className="max-w-xl mx-auto mb-6 text-lg">
          Por cada S/10 que gastes, te devolvemos S/1 en puntos. ¡Acumula y canjea por productos gratis!
        </p>
        <div className="flex flex-col md:flex-row justify-center gap-6">
          <div className="bg-yellow-50 p-6 rounded-xl shadow w-full md:w-1/3">
            <h3 className="font-bold mb-2">1. Haz tu pedido</h3>
            <p>Compra hamburguesas como siempre.</p>
          </div>
          <div className="bg-yellow-50 p-6 rounded-xl shadow w-full md:w-1/3">
            <h3 className="font-bold mb-2">2. Acumula puntos</h3>
            <p>Te regalamos S/1 por cada S/10.</p>
          </div>
          <div className="bg-yellow-50 p-6 rounded-xl shadow w-full md:w-1/3">
            <h3 className="font-bold mb-2">3. Canjea</h3>
            <p>Usa tus puntos en tu próxima compra.</p>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-16 px-8 bg-yellow-600 text-white text-center">
        <h2 className="text-4xl font-bold mb-4">Haz tu primer pedido y recibe un cupón 🎁</h2>
        <p className="text-lg mb-6">Únete a la familia Rápido y Sabroso y empieza a ganar desde hoy.</p>
        <Link to="/register" className="bg-white text-yellow-700 px-8 py-4 rounded-full font-bold hover:bg-gray-100 transition">
          Empezar ahora
        </Link>
      </section>

      <FooterLanding />
    </div>
  );
};

export default LandingPage;