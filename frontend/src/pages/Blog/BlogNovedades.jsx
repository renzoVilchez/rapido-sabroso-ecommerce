import novedadesImage from "../../assets/images/novedades.jpg";

const BlogNovedades = () => {
  return (
    <div className="bg-white text-gray-900">
      <header className="bg-red-600 text-white p-6 text-center">
        <a href="blog.html" className="text-white no-underline">
          <h1 className="text-4xl font-bold text-shadow-lg">Blog de Rápido y Sabroso</h1>
        </a>
        <p>¡Todo lo que quieres saber del mundo de las hamburguesas!</p>
      </header>

      <div className="max-w-screen-xl mx-auto my-12 px-6">
        <h1 className="text-3xl font-bold text-center leading-snug mb-12">
          🔥 ¡Descubre las Novedades Más Deliciosas del Menú! 🔥
        </h1>

        <div className="flex flex-wrap gap-12 mb-8">
          <img src={novedadesImage} alt="Novedades del menú" className="w-full sm:w-1/2 max-h-[447px] object-cover rounded-lg" />
          <div className="w-full sm:w-1/2 flex flex-col">
            <h2 className="text-xl font-semibold mb-4">Más sobre Hamburguesas</h2>
            <a href="#" className="text-lg mb-3 px-6 py-3 bg-blue-100 text-black rounded-lg hover:bg-blue-200 transition duration-300">
              🍔 Nuestra nueva Hamburguesa “Volcán de Queso”
            </a>
            <a href="#" className="text-lg mb-3 px-6 py-3 bg-blue-100 text-black rounded-lg hover:bg-blue-200 transition duration-300">
              🌶️ El regreso de la Doble Picante
            </a>
            <a href="#" className="text-lg mb-3 px-6 py-3 bg-blue-100 text-black rounded-lg hover:bg-blue-200 transition duration-300">
              🍄 Opción Veggie con champiñones a la parrilla
            </a>
            <a href="#" className="text-lg mb-3 px-6 py-3 bg-blue-100 text-black rounded-lg hover:bg-blue-200 transition duration-300">
              🧀 Combos con papas cheddar y bebida
            </a>
            <a href="#" className="text-lg mb-3 px-6 py-3 bg-blue-100 text-black rounded-lg hover:bg-blue-200 transition duration-300">
              👨‍🍳 ¿Sabías que ahora puedes personalizar tu hamburguesa?
            </a>
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Sabores Nuevos que Te Harán Repetir</h2>
          <p className="text-lg leading-relaxed mb-8">
            Nos encanta innovar, y este mes lanzamos varias novedades pensadas para sorprenderte. Escuchamos lo que más te gusta
            y lo convertimos en nuevas combinaciones. ¡Prepárate para saborear algo único!
          </p>

          <h3 className="text-xl font-semibold mb-3">Hamburguesa “Volcán de Queso”</h3>
          <p className="text-lg mb-6">
            Una explosión de sabor. Con doble carne, relleno de queso derretido en el centro, tocino crocante y una salsa especial secreta que te dejará con ganas de más.
          </p>

          <h3 className="text-xl font-semibold mb-3">La Doble Picante: edición limitada</h3>
          <p className="text-lg mb-6">
            De regreso por tiempo limitado. Dos carnes, jalapeños frescos, cebolla crispy y nuestra famosa salsa picante artesanal. Solo para valientes.
          </p>

          <h3 className="text-xl font-semibold mb-3">Nueva opción vegetariana</h3>
          <p className="text-lg mb-6">
            Porque todos merecen disfrutar de algo sabroso. Ahora tenemos una opción veggie con champiñones salteados, pan integral y aderezo a base de yogur natural.
          </p>

          <h3 className="text-xl font-semibold mb-3">Combos mejorados</h3>
          <p className="text-lg mb-6">
            Incluyen nuevas papas con cheddar, crocantes y llenas de sabor, acompañadas de gaseosa o limonada natural. Perfecto para compartir o disfrutar solo.
          </p>

          <h3 className="text-xl font-semibold mb-3">Personaliza tu combo</h3>
          <p className="text-lg mb-6">
            Ahora puedes armar tu hamburguesa como quieras desde nuestra carta. Elige el tipo de pan, el tipo de carne, extras, salsas y acompañamientos.
          </p>

          <p className="text-lg font-bold">
            Sabemos que te gusta probar cosas nuevas, por eso seguimos trabajando para mejorar y traerte lo mejor en cada visita.
          </p>

          <p className="mt-8 text-lg">
            <strong>¡Ven y prueba nuestras novedades antes que se acaben!</strong><br /><br />
            Con cariño,<br />
            El equipo de <strong>Rápido y Sabroso</strong> 🍔🔥
          </p>
        </div>
      </div>
    </div>
  );
};

export default BlogNovedades;