import misionImage from '../../assets/images/misionImagen.jpg';

function NosotrosMision() {
    return (
        <div className="container max-w-6xl mx-auto my-12 px-4">
            {/* Título */}
            <header className="text-center mb-12 px-4">
                <h1 className="text-4xl md:text-5xl font-bold text-red-600 drop-shadow-[0_0_3px_rgba(0,0,0,0.8)]">
                    Misión de Rápido y Sabroso E.I.R.L.
                </h1>
                <p className="mt-4 text-lg md:text-xl text-gray-700">
                    Nuestra razón de ser: ofrecer comida rápida de calidad, con sabor casero,
                    a precios accesibles y brindando una atención rápida y amable.
                </p>
            </header>

            {/* Sección principal con imagen y descripción */}
            <section className="bg-gray-900 p-6 md:p-10 rounded-3xl shadow-xl shadow-blue-500 mb-12">
                <h2 className="text-2xl md:text-3xl font-semibold text-blue-300 mb-6 text-center">
                    Nuestra Misión
                </h2>

                <div className="flex flex-col lg:flex-row gap-8 items-center justify-between">
                    <p className="text-white text-lg leading-relaxed">
                        La misión de <strong>Rápido y Sabroso E.I.R.L.</strong> es brindar comida rápida de calidad con sabor casero,
                        a precios accesibles, ofreciendo atención rápida, amable y un ambiente acogedor para todos nuestros clientes.
                        También transformamos la experiencia de la comida rápida, dándole un giro único, en el que la calidad, el sabor y
                        la calidez de atención se convierten en un todo armónico, pensado especialmente para ti, nuestro querido cliente.
                    </p>

                    <div>
                        <img
                            src={misionImage}
                            alt="Nuestra misión"
                            className="rounded-xl shadow-lg w-full object-cover"
                        />
                    </div>

                </div>
            </section>

            {/* Diferenciadores */}
            <div className="px-4">
                <h3 className="text-3xl md:text-4xl font-semibold text-blue-900 mb-4 text-center lg:text-left">
                    ¿Qué nos diferencia de las demás opciones?
                </h3>
                <p className="text-lg leading-relaxed text-gray-800 mb-4">
                    En <strong>Rápido y Sabroso</strong>, entendemos que cada cliente es único. Desde el momento en que entras a uno de
                    nuestros locales o haces tu pedido desde tu móvil, nuestro compromiso es brindarte una experiencia que te haga sentir especial.
                    No solo nos importa lo que comes, sino cómo lo vives. Y esa es nuestra misión: ofrecerte más que un simple platillo, sino
                    un momento memorable, donde la comida no solo sacia el hambre, sino que te hace sonreír.
                </p>
                <p className="text-lg leading-relaxed text-gray-800">
                    Nuestra misión no se limita a llenar estómagos: nos esforzamos por llenar tu día de momentos agradables, de risas, de
                    compartires entre amigos, familia o compañeros de trabajo. Porque creemos que la comida tiene el poder de conectar a
                    las personas, de crear recuerdos, de hacernos sentir bien. Nuestra propuesta es simple: sabores rápidos, pero con alma.
                    Queremos ser parte de tu vida diaria, ser tu elección cuando el hambre llama y, sobre todo, ser ese pequeño respiro que te
                    hace sentir como en casa.
                </p>
            </div>
        </div>
    );
}

export default NosotrosMision;