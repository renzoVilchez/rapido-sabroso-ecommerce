import objetivoImagen from '../../assets/images/objetivoImagen.jpg';

function NosotrosObjetivos() {
    return (
        <div className="container max-w-6xl mx-auto my-12 px-4">
            <header className="text-center mb-12">
                <h1 className="text-4xl font-bold text-red-600  drop-shadow-[0_0_2px_rgba(0,0,0,0.8)]">Objetivos de Rápido y Sabroso E.I.R.L.</h1>
                <p className="mt-4 text-lg">Nuestros objetivos reflejan nuestra visión de crecimiento y compromiso con la calidad y el servicio.</p>
            </header>

            <section className="bg-gray-900 p-6 rounded-lg shadow-lg shadow-blue-500">

                <h2 className="text-2xl font-semibold text-blue-300">Objetivos Empresariales</h2>

                <div className='flex col'>
                    <p className="mt-3 text-lgmt-5 text-white">
                        Los objetivos de <strong>Rápido y Sabroso E.I.R.L.</strong> están enfocados en el crecimiento sostenible,
                        la satisfacción del cliente y la expansión regional. Nos hemos planteado metas claras para el corto, mediano y largo plazo.
                        Nuestros objetivos están diseñados para asegurar que nuestra visión 
                        de ser la referencia en comida rápida de calidad y accesible se haga realidad.
                         Cada objetivo refleja nuestro compromiso con el crecimiento sostenible, la innovación
                          constante, y la satisfacción total de nuestros clientes. A continuación, te presentamos 
                          los objetivos clave que guiarán nuestro crecimiento y éxito en los próximos años:
                    </p>

                    <div className='flex justify-center w-[200vh]'>
                        <img src={objetivoImagen} alt="objetivoImagen" />
                    </div>
                </div>
            </section>

            <div className="mt-12">
                <h3 className="text-2xl font-semibold text-gray-700">Corto Plazo (0-1 año)</h3>
                <ul className="list-inside list-disc mt-4 text-lg">
                    <li>Incrementar las ventas mensuales en un 15% durante el primer semestre.</li>
                    <li>Mejorar la visibilidad de la marca a través de redes sociales y alianzas locales.</li>
                    <li>Implementar un sistema digital simple de pedidos para agilizar la atención.</li>
                </ul>
            </div>

            <div className="mt-12">
                <h3 className="text-2xl font-semibold text-gray-700">Mediano Plazo (1-2 años)</h3>
                <ul className="list-inside list-disc mt-4 text-lg">
                    <li>Abrir un segundo local en la ciudad de Trujillo u otra provincia cercana.</li>
                    <li>Introducir al menos dos nuevos productos al menú cada año, de acuerdo con las preferencias del mercado.</li>
                    <li>Desarrollar un programa de fidelización para clientes frecuentes.</li>
                </ul>
            </div>

            <div className="mt-12">
                <h3 className="text-2xl font-semibold text-gray-700">Largo Plazo (3-5 años)</h3>
                <ul className="list-inside list-disc mt-4 text-lg">
                    <li>Convertirse en una microcadena regional de comida rápida con presencia en diversas ciudades del norte del país.</li>
                    <li>Mantener una tasa de satisfacción del cliente superior al 90% según encuestas y comentarios.</li>
                    <li>Participar en ferias gastronómicas y eventos locales para consolidar la marca.</li>
                </ul>
            </div>
        </div>
    );
}

export default NosotrosObjetivos;