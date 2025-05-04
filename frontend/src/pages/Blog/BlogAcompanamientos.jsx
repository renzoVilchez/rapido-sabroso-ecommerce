import acompanamientoImage from '../../assets/images/acompanamientos.jpg';

function BlogAcompanamientos() {
  return (
    <div className="bg-gray-50 text-gray-800">
      {/* Header */}
      <header className="text-center">
        <h1 className="bg-red-500 py-8 text-5xl text-white font-bold shadow-md mb-4">Blog de Rápido y Sabroso</h1>
        <p className="text-lg">¡Todo lo que quieres saber sobre el mundo de las hamburguesas!</p>
      </header>

      <div className="bg-white shadow-lg py-16">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-8">🍟 ¿Con qué acompañar tu hamburguesa? 🥤</h1>

          {/* Imagen y enlaces */}
          <div className="flex flex-col lg:flex-row gap-12 mb-12 items-center justify-center">
            <img
              src={acompanamientoImage}
              alt="Acompañamientos"
              className="w-full lg:w-1/2 max-h-96 object-cover rounded-lg shadow-xl"
            />
            <div className="lg:w-1/2 space-y-6">
              <h2 className="text-3xl font-bold text-red-500 mb-4">Más sobre Hamburguesas</h2>
              <a href="#" className="block text-lg p-4 bg-blue-100 rounded-lg hover:bg-blue-200 transition-all">
                🔥 Novedades del Menú...
              </a>
              <a href="#" className="block text-lg p-4 bg-blue-100 rounded-lg hover:bg-blue-200 transition-all">
                🍔 Volcán de Queso, ¿ya la probaste?
              </a>
              <a href="#" className="block text-lg p-4 bg-blue-100 rounded-lg hover:bg-blue-200 transition-all">
                🥗 Alternativas más ligeras
              </a>
              <a href="#" className="block text-lg p-4 bg-blue-100 rounded-lg hover:bg-blue-200 transition-all">
                🧊 Bebidas que refrescan
              </a>
              <a href="#" className="block text-lg p-4 bg-blue-100 rounded-lg hover:bg-blue-200 transition-all">
                🎉 Combos para toda ocasión
              </a>
            </div>
          </div>

          {/* Texto descriptivo */}
          <div className="text-lg space-y-8">
            <h2 className="text-3xl font-bold text-red-500 mb-4">Complementos que marcan la diferencia</h2>
            <p className="text-gray-700">
              Una hamburguesa puede ser deliciosa por sí sola, pero lo que la acompaña puede convertirla en una{' '}
              <strong className="font-bold text-red-600">experiencia completa</strong>. Aquí te contamos nuestras mejores opciones para que cada mordida sea perfecta.
            </p>

            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-900">Papas clásicas: el favorito de todos 🍟</h3>
              <p className="text-gray-700">Las papas fritas doradas y crocantes son un clásico que nunca falla. Ya sean tradicionales, rústicas o en gajo, son el acompañamiento perfecto para cualquier hamburguesa.</p>
            </div>

            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-900">Cono de papas con queso cheddar 🧀</h3>
              <p className="text-gray-700">Si quieres algo más atrevido, prueba nuestras papas cubiertas con salsa de queso cheddar derretido. Un éxito total en nuestras promociones.</p>
            </div>

            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-900">Bebidas refrescantes 🧊</h3>
              <p className="text-gray-700">No hay nada como una bebida fría para equilibrar el sabor de una hamburguesa jugosa. Puedes elegir entre gaseosas, limonada natural o incluso jugos artesanales según tu preferencia.</p>
            </div>

            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-900">Snacks y extras 🍔</h3>
              <p className="text-gray-700">Aros de cebolla, bastones de camote, nuggets o hasta un mini hot dog para compartir. Porque a veces queremos más de una cosa rica a la vez.</p>
            </div>

            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-900">¿Algo más saludable? 🥗</h3>
              <p className="text-gray-700">También ofrecemos opciones como ensaladas frescas, chips de vegetales y agua saborizada para quienes buscan algo más ligero sin perder el sabor.</p>
            </div>

            <p className="text-gray-700">Lo importante es que cada quien pueda armar su combo ideal. Tú eliges qué va mejor con tu hamburguesa favorita, nosotros nos encargamos de que todo sepa increíble.</p>

            <p className="font-semibold text-gray-800">¡Prueba nuestras combinaciones y encuentra tu favorita!</p>

            {/* Texto con negrita abajo */}
            <p className="text-gray-700">
              Con cariño, <strong className="text-red-500 font-bold">Equipo de Rápido y Sabroso</strong> 🍔🔥
            </p>
          </div>

          {/* Bloques de texto resaltado */}
          <div className="bg-red-100 p-4 rounded-lg my-6">
            <p className="text-lg font-semibold text-gray-800">¿Sabías que las papas fritas son el acompañamiento más popular de nuestras hamburguesas? ¡No puedes dejar de probarlas!</p>
          </div>

        </div>
      </div>
    </div>
  );
}

export default BlogAcompanamientos;