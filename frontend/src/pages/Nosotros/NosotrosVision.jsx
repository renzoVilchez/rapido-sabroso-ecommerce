import misionImage from '../../assets/images/visionImagen.jpg';

function NosotrosVision() {
    return (
        <div className="container max-w-6xl mx-auto my-12 px-4">
            <header className="text-center mb-12">
                <h1 className="text-4xl font-bold text-red-600  drop-shadow-[0_0_2px_rgba(0,0,0,0.8)]">Visión de Rápido y Sabroso E.I.R.L.</h1>
                <p className="mt-4 text-lg">Ser reconocidos como la mejor opción en comida rápida de calidad, con sabor casero, precios accesibles y un servicio rápido y amable que supere las expectativas de nuestros clientes.</p>
            </header>

            <section className="bg-gray-900 p-6 rounded-lg shadow-lg shadow-blue-500">

                <h2 className="text-2xl font-semibold text-blue-300">Nuestra Visión</h2>

                <div className='flex col'>
                    <p className="mt-3 text-lgmt-5 text-white">
                        En <strong>Rápido y Sabroso E.I.R.L.</strong>, es ser un catalizador de cambio positivo. Nos gustaría que nuestra marca sea un referente de cómo se puede hacer un negocio rentable, pero ético, que respete tanto a los seres humanos como al planeta. Queremos ser una empresa que no solo se preocupe por el bienestar de sus clientes, sino que también apoye a las comunidades, mediante programas de responsabilidad social, donaciones de alimentos, y acciones concretas para contribuir a un mundo mejor. En términos de innovación, siempre estaremos buscando maneras de sorprender a nuestros clientes. Si hoy nuestras hamburguesas son las mejores, mañana lo serán aún más, con nuevos sabores, ingredientes frescos y propuestas que nunca antes habías probado.
                    </p>

                    <div className='flex justify-center w-[300vh]'>
                        <img src={misionImage} alt="misionImage" />
                    </div>
                </div>
            </section>

            <div className="mt-15">
                <h3 className="text-2xl font-semibold text-gray-700">¿Dónde nos vemos en el futuro?</h3>
                <p className="mt-4 text-lg">
                    Nos visualizamos como una marca presente en todo el país, con sucursales, franquicias y
                     puntos de venta estratégicos que hagan de Rápido y Sabroso la opción predilecta de cada 
                     vez más personas. Pero lo que realmente nos distingue es que no queremos ser solo una
                      cadena de comida. Queremos ser un estilo de vida, una forma en la que los clientes no
                       solo buscan alimentarse, sino disfrutar y compartir una experiencia enriquecedora. 
                       Imaginamos nuestros locales como lugares vibrantes, modernos y acogedores, con un 
                       ambiente único que refleje la energía positiva de nuestra marca. Y no solo hablamos de
                        locales físicos, sino también de nuestro entorno digital, donde nuestros clientes
                         podrán interactuar con nosotros de manera ágil, divertida y personalizada.
                </p>
            </div>
        </div>
    );
}

export default NosotrosVision;