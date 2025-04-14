function NosotrosObjetivos() {
    return (
        <div className="container max-w-6xl mx-auto my-12 px-4">
            <header className="text-center mb-12">
                <h1 className="text-4xl font-bold text-blue-600">Objetivos de Rápido y Sabroso E.I.R.L.</h1>
                <p className="mt-4 text-lg">Nuestros objetivos reflejan nuestra visión de crecimiento y compromiso con la calidad y el servicio.</p>
            </header>

            <section className="bg-gray-100 p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold text-blue-500">Objetivos Empresariales</h2>
                <p className="mt-4 text-lg">
                    Los objetivos de <strong>Rápido y Sabroso E.I.R.L.</strong> están enfocados en el crecimiento sostenible, 
                    la satisfacción del cliente y la expansión regional. Nos hemos planteado metas claras para el corto, mediano y largo plazo.
                </p>
            </section>

            <div className="mt-12">
                <h3 className="text-xl font-semibold text-gray-700">Corto Plazo (0-1 año)</h3>
                <ul className="list-inside list-disc mt-4 text-lg">
                    <li>Incrementar las ventas mensuales en un 15% durante el primer semestre.</li>
                    <li>Mejorar la visibilidad de la marca a través de redes sociales y alianzas locales.</li>
                    <li>Implementar un sistema digital simple de pedidos para agilizar la atención.</li>
                </ul>
            </div>

            <div className="mt-12">
                <h3 className="text-xl font-semibold text-gray-700">Mediano Plazo (1-2 años)</h3>
                <ul className="list-inside list-disc mt-4 text-lg">
                    <li>Abrir un segundo local en la ciudad de Trujillo u otra provincia cercana.</li>
                    <li>Introducir al menos dos nuevos productos al menú cada año, de acuerdo con las preferencias del mercado.</li>
                    <li>Desarrollar un programa de fidelización para clientes frecuentes.</li>
                </ul>
            </div>

            <div className="mt-12">
                <h3 className="text-xl font-semibold text-gray-700">Largo Plazo (3-5 años)</h3>
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