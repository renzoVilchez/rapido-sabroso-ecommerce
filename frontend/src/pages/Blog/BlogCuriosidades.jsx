import { Link } from 'react-router-dom';
import curiosidadesImage from '../../assets/images/curiosidades.jpg';

function BlogCuriosidades () {
  return (
    <div className="font-sans text-justify text-[#111] bg-white">
      <header className="bg-[#d94f30] text-white p-6 text-center">
        <Link to="/blog">
          <h1 className="text-3xl md:text-4xl font-bold drop-shadow-[4px_3px_2px_rgba(0,0,0,1)]">
            Blog de Rápido y Sabroso
          </h1>
        </Link>
        <p>¡Todo lo que quieres saber del mundo de las hamburguesas!</p>
      </header>

      <main className="max-w-6xl mx-auto mt-12 px-4">
        <h1 className="text-3xl md:text-4xl font-bold leading-snug mb-8">
          🍔 Datos Curiosos Sobre las Hamburguesas
        </h1>

        <section className="flex flex-wrap gap-6 items-start">
          <img
            src={curiosidadesImage}
            alt="Curiosidades sobre hamburguesas"
            className="flex-1 max-w-full rounded-lg max-h-[447px] object-cover"
          />
          <div className="flex-1 flex flex-col gap-4">
            <h2 className="text-2xl font-semibold">¿Sabías que…?</h2>
            <Link to="/dato1" className="bg-blue-50 hover:bg-blue-100 p-5 rounded text-base">
              🍔 La hamburguesa más grande del mundo pesaba más de 1,5 toneladas
            </Link>
            <Link to="/dato2" className="bg-blue-50 hover:bg-blue-100 p-5 rounded text-base">
              🍞 El pan de hamburguesa no siempre fue redondo
            </Link>
            <Link to="/dato3" className="bg-blue-50 hover:bg-blue-100 p-5 rounded text-base">
              🍖 Las hamburguesas fueron inspiradas por la comida alemana
            </Link>
            <Link to="/dato4" className="bg-blue-50 hover:bg-blue-100 p-5 rounded text-base">
              🌎 La hamburguesa es el plato más popular de Estados Unidos
            </Link>
            <Link to="/dato5" className="bg-blue-50 hover:bg-blue-100 p-5 rounded text-base">
              🔥 El ketchup y la mostaza son los condimentos más comunes en una hamburguesa
            </Link>
          </div>
        </section>

        <section className="mt-16 bg-gray-50 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">Curiosidades sobre el origen y la popularidad de las hamburguesas</h2>
          <p className="mb-6">
            La hamburguesa es uno de los platos más icónicos del mundo, pero ¿sabías que su historia está llena de sorpresas? Desde sus orígenes hasta convertirse en el favorito global, las hamburguesas tienen historias fascinantes.
          </p>

          <h3 className="text-xl font-bold mb-2">La hamburguesa más grande</h3>
          <p className="mb-4">
            En 2017, se cocinó la hamburguesa más grande del mundo, que pesaba más de 1,5 toneladas. ¡Imagina lo que se necesitaría para cocinar una hamburguesa de ese tamaño!
          </p>

          <h3 className="text-xl font-bold mb-2">Un pan poco común</h3>
          <p className="mb-4">
            Originalmente, el pan de hamburguesa no era redondo. Se usaban otros tipos de pan, pero la forma redonda se hizo popular por ser más fácil de manejar y comer.
          </p>

          <h3 className="text-xl font-bold mb-2">Inspiración alemana</h3>
          <p className="mb-4">
            La idea de la hamburguesa viene de los inmigrantes alemanes en los Estados Unidos. Trajeron consigo la costumbre de comer carne picada, y fue allí donde la carne molida se empezó a servir entre panes.
          </p>

          <h3 className="text-xl font-bold mb-2">Un fenómeno mundial</h3>
          <p className="mb-4">
            Hoy en día, las hamburguesas son el plato más popular en los Estados Unidos y se disfrutan en todo el mundo. Cada país tiene su propia versión, ¡y las combinaciones no tienen fin!
          </p>

          <h3 className="text-xl font-bold mb-2">Condimentos favoritos</h3>
          <p className="mb-4">
            Ketchup y mostaza son los condimentos que más se usan en las hamburguesas. Cada uno le da un sabor único, pero también hay muchas otras combinaciones para darle un toque personal.
          </p>

          <p className="mt-6 font-semibold">
            La hamburguesa es mucho más que solo comida, ¡es una tradición mundial llena de historia y sabor!<br /><br />
            Con pasión,<br />
            El equipo de <span className="font-bold">Rápido y Sabroso</span> 🍔🔥
          </p>
        </section>
      </main>
    </div>
  );
};

export default BlogCuriosidades;