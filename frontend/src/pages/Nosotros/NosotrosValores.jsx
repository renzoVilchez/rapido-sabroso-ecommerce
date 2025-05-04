import valoresImagen from '../../assets/images/valoresImagen.jpg';

function NosotrosValores() {
  return (
    <div className="container max-w-6xl mx-auto my-12 px-4">
      {/* Encabezado */}
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold text-red-600 drop-shadow-[0_0_2px_rgba(0,0,0,0.8)]">
          Valores de Rápido y Sabroso E.I.R.L.
        </h1>
        <p className="mt-4 text-lg text-gray-700">
          Nuestros valores guían nuestras acciones diarias y son el fundamento de nuestra cultura empresarial.
        </p>
      </header>

      {/* Sección principal */}
      <section className="bg-gray-900 p-6 md:p-10 rounded-3xl shadow-xl shadow-blue-500">
        <h2 className="text-2xl md:text-3xl font-semibold text-blue-300 mb-6 text-center">
          Principios y Valores del Negocio
        </h2>

        <div className="flex flex-col lg:flex-row gap-8 items-center justify-between">
          <p className="text-white text-lg leading-relaxed">
            En <strong>Rápido y Sabroso E.I.R.L.</strong>, trabajamos bajo principios que aseguran la calidad de nuestros productos y servicios,
            y valores que reflejan nuestra cultura organizacional y compromiso con la sociedad. Creemos que lo que realmente nos hace diferentes
            no son solo nuestros productos, sino también los valores que compartimos y practicamos en cada interacción. Estos valores son la base
            de nuestra cultura, el reflejo de lo que somos y de lo que queremos transmitir a nuestros clientes. Son la esencia de nuestra marca,
            y guían todas nuestras acciones.
          </p>

          <div>
            <img
              src={valoresImagen}
              alt="Valores de Rápido y Sabroso"
              className="max-w-xs md:max-w-md mx-auto rounded-xl shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Principios */}
      <div className="mt-12">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">Principios</h3>
        <ul className="list-inside list-disc mt-4 text-lg text-gray-800">
          <li><strong>Calidad constante:</strong> Usamos ingredientes frescos, naturales y procesos higiénicos en la preparación de nuestros productos.</li>
          <li><strong>Rapidez en el servicio:</strong> Valoramos el tiempo del cliente y buscamos servirlo en el menor tiempo posible sin comprometer la calidad.</li>
          <li><strong>Atención cordial:</strong> Promovemos el respeto y la amabilidad en cada interacción.</li>
          <li><strong>Responsabilidad social y legal:</strong> Cumplimos con las normas sanitarias y laborales, actuando con ética en todos nuestros procesos.</li>
        </ul>
      </div>

      {/* Valores */}
      <div className="mt-12">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">Valores</h3>
        <ul className="list-inside list-disc mt-4 text-lg text-gray-800">
          <li><strong>Innovación:</strong> Renovamos constantemente nuestro menú según los gustos y tendencias actuales.</li>
          <li><strong>Trabajo en equipo:</strong> Impulsamos un ambiente de colaboración y apoyo entre todos los colaboradores.</li>
          <li><strong>Compromiso:</strong> Nos esforzamos cada día por ofrecer lo mejor, desde la cocina hasta la atención al cliente.</li>
          <li><strong>Transparencia:</strong> Mantenemos relaciones claras y honestas con proveedores, colaboradores y clientes.</li>
        </ul>
      </div>
    </div>
  );
}

export default NosotrosValores;