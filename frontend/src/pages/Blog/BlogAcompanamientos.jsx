import acompanamientoImage from '../../assets/images/acompanamientos.jpg';

function BlogAcompanamientos () {
  return (
    <div className="bg-white text-gray-900">
      <header className="bg-red-600 text-white py-5 text-center">
        <a href="blog.html" className="text-white no-underline">
          <h1 className="text-3xl font-bold shadow-md">Blog de Rápido y Sabroso</h1>
        </a>
        <p>¡Todo lo que quieres saber del mundo de las hamburguesas!</p>
      </header>

      <div className="container mx-auto px-4 mt-12">
        <h1 className="text-4xl font-bold text-center mb-8">🍟 ¿Con qué acompañar tu hamburguesa? 🥤</h1>

        <div className="flex flex-wrap gap-8 mb-8">
          <img src={acompanamientoImage} className="w-full md:w-1/2 max-h-96 object-cover rounded-lg" />
          <div className="flex-1">
            <h2 className="text-2xl font-semibold mb-4">Más sobre Hamburguesas</h2>
            <a href="#" className="block text-lg mb-3 p-4 bg-blue-50 rounded-lg hover:bg-blue-200 transition">🔥 Novedades del Menú...</a>
            <a href="#" className="block text-lg mb-3 p-4 bg-blue-50 rounded-lg hover:bg-blue-200 transition">🍔 Volcán de Queso, ¿ya la probaste?</a>
            <a href="#" className="block text-lg mb-3 p-4 bg-blue-50 rounded-lg hover:bg-blue-200 transition">🥗 Alternativas más ligeras</a>
            <a href="#" className="block text-lg mb-3 p-4 bg-blue-50 rounded-lg hover:bg-blue-200 transition">🧊 Bebidas que refrescan</a>
            <a href="#" className="block text-lg mb-3 p-4 bg-blue-50 rounded-lg hover:bg-blue-200 transition">🎉 Combos para toda ocasión</a>
          </div>
        </div>

        <div className="text-lg space-y-6">
          <h2 className="text-2xl font-semibold">Complementos que marcan la diferencia</h2>
          <p>Una hamburguesa puede ser deliciosa por sí sola, pero lo que la acompaña puede convertirla en una experiencia completa. Aquí te contamos nuestras mejores opciones para que cada mordida sea perfecta.</p>

          <h3 className="text-xl font-semibold">Papas clásicas: el favorito de todos</h3>
          <p>Las papas fritas doradas y crocantes son un clásico que nunca falla. Ya sean tradicionales, rústicas o en gajo, son el acompañamiento perfecto para cualquier hamburguesa.</p>

          <h3 className="text-xl font-semibold">Cono de papas con queso cheddar</h3>
          <p>Si quieres algo más atrevido, prueba nuestras papas cubiertas con salsa de queso cheddar derretido. Un éxito total en nuestras promociones.</p>

          <h3 className="text-xl font-semibold">Bebidas refrescantes</h3>
          <p>No hay nada como una bebida fría para equilibrar el sabor de una hamburguesa jugosa. Puedes elegir entre gaseosas, limonada natural o incluso jugos artesanales según tu preferencia.</p>

          <h3 className="text-xl font-semibold">Snacks y extras</h3>
          <p>Aros de cebolla, bastones de camote, nuggets o hasta un mini hot dog para compartir. Porque a veces queremos más de una cosa rica a la vez.</p>

          <h3 className="text-xl font-semibold">¿Algo más saludable?</h3>
          <p>También ofrecemos opciones como ensaladas frescas, chips de vegetales y agua saborizada para quienes buscan algo más ligero sin perder el sabor.</p>

          <p>Lo importante es que cada quien pueda armar su combo ideal. Tú eliges qué va mejor con tu hamburguesa favorita, nosotros nos encargamos de que todo sepa increíble.</p>

          <p className="font-semibold">¡Prueba nuestras combinaciones y encuentra tu favorita!</p>
          <p>Con cariño,<br />Equipo de <strong>Rápido y Sabroso</strong> 🍔🔥</p>
        </div>
      </div>
    </div>
  );
}

export default BlogAcompanamientos;