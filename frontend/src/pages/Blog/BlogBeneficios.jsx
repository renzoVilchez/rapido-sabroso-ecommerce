import beneficionImage from '../../assets/images/beneficios.jpg'

function BlogBeneficios () {
    return (
        <div>
            <header className="bg-[#d94f30] text-white p-5 text-center">
                <a href="blog.html" className="text-white no-underline">
                    <h1 className="text-4xl font-bold text-shadow-md">Blog de Rapido y Sabroso</h1>
                </a>
                <p>¡Todo lo que quieres saber del mundo de las hamburguesas!</p>
            </header>

            <div className="container max-w-6xl mx-auto my-12 px-4">
                <h1 className="text-4xl font-bold leading-tight">🍔 Beneficios de Disfrutar una Buena Hamburguesa</h1>

                <div className="flex flex-wrap mt-12 gap-8">
                    <img 
                        src = {beneficionImage}
                        alt="Beneficios de las hamburguesas" 
                        className="flex-1 max-w-full h-auto rounded-lg" 
                        style={{ maxHeight: '447px', maxWidth: '615px' }} 
                    />
                    <div className="flex-1 flex flex-col">
                        <h2 className="text-2xl font-bold">¿Sabías que comer hamburguesa también tiene beneficios?</h2>
                        <a href="#" className="mt-4 py-4 px-3 bg-[#f0f8ff] text-black text-lg rounded-lg hover:bg-[#dbefff] transition duration-300">💪 Aporta energía y proteínas esenciales</a>
                        <a href="#" className="mt-4 py-4 px-3 bg-[#f0f8ff] text-black text-lg rounded-lg hover:bg-[#dbefff] transition duration-300">🍞 Pan, carne y vegetales: una combinación completa</a>
                        <a href="#" className="mt-4 py-4 px-3 bg-[#f0f8ff] text-black text-lg rounded-lg hover:bg-[#dbefff] transition duration-300">😊 Comer algo rico mejora tu estado de ánimo</a>
                        <a href="#" className="mt-4 py-4 px-3 bg-[#f0f8ff] text-black text-lg rounded-lg hover:bg-[#dbefff] transition duration-300">🧠 Ingredientes con nutrientes que ayudan al cerebro</a>
                        <a href="#" className="mt-4 py-4 px-3 bg-[#f0f8ff] text-black text-lg rounded-lg hover:bg-[#dbefff] transition duration-300">⏱️ En Rápido y Sabroso, siempre rápido y sin estrés</a>
                    </div>
                </div>

                <div className="mt-12">
                    <h2 className="text-2xl font-semibold">Más que solo sabor: lo bueno de nuestras hamburguesas</h2>
                    <p className="mt-4 text-lg leading-relaxed">Sabemos que comer debe ser un momento especial, y si además trae beneficios, ¡mucho mejor! Nuestras hamburguesas están pensadas para darte una experiencia completa: sabor, energía y felicidad en cada bocado.</p>

                    <h3 className="text-xl font-semibold mt-6">Comida rápida que alimenta bien</h3>
                    <p className="mt-4 text-lg leading-relaxed">Nuestras carnes son fuente de proteínas, los panes aportan energía, y los vegetales frescos como lechuga, tomate y cebolla suman vitaminas importantes. Todo eso en un solo plato.</p>

                    <h3 className="text-xl font-semibold mt-6">Para el cuerpo... y también para el ánimo</h3>
                    <p className="mt-4 text-lg leading-relaxed">¿Has notado cómo una buena comida puede alegrarte el día? Comer algo que te gusta estimula hormonas como la serotonina. Así que sí, una hamburguesa bien hecha puede hacerte sentir mejor.</p>

                    <h3 className="text-xl font-semibold mt-6">Calidad que se nota</h3>
                    <p className="mt-4 text-lg leading-relaxed">En <strong>Rápido y Sabroso</strong> usamos ingredientes seleccionados para darte lo mejor en cada visita. Nada de comida sin sabor: aquí todo está hecho con cariño.</p>

                    <h3 className="text-xl font-semibold mt-6">Sin complicaciones</h3>
                    <p className="mt-4 text-lg leading-relaxed">Te atendemos rápido, con combos que ya incluyen todo lo que necesitas. Ideal para esos días de mucha hambre y poco tiempo. Ven, come bien y sigue con tu día sin estrés.</p>

                    <p className="mt-6 text-lg font-semibold">Comer rico también puede ser parte de una vida equilibrada. ¡Nosotros nos encargamos del sabor!<br /><br />
                    Con cariño,<br />Equipo de <strong>Rápido y Sabroso</strong> 🍔🔥</p>
                </div>
            </div>
        </div>
    );
};

export default BlogBeneficios;