import { Link } from 'react-router-dom';
import { Target, Eye, ListChecks, HeartHandshake } from 'lucide-react';
import { motion } from 'framer-motion';

const sections = [
  { path: 'mision', label: 'Misión', icon: <Target className="w-8 h-8 mb-2 text-[#5C3D2E]" /> },
  { path: 'vision', label: 'Visión', icon: <Eye className="w-8 h-8 mb-2 text-[#5C3D2E]" /> },
  { path: 'objetivos', label: 'Objetivos', icon: <ListChecks className="w-8 h-8 mb-2 text-[#5C3D2E]" /> },
  { path: 'valores', label: 'Valores', icon: <HeartHandshake className="w-8 h-8 mb-2 text-[#5C3D2E]" /> },
];

function Nosotros() {
  return (
    <div className="bg-[#FFF8DC] min-h-screen py-10 px-4">
      <div className="container mx-auto">

        {/* 🎬 Header con animación única */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center mb-12 z-10"
        >
          <h2 className="text-4xl font-bold text-yellow-600">Nosotros</h2>
          <p className="mt-4 text-lg font-medium text-gray-800 max-w-2xl">
            Conoce más sobre quiénes somos, nuestra misión, visión, objetivos y valores.
          </p>
        </motion.header>

        {/* 🃏 Tarjetas animadas al hacer scroll */}
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mb-16 px-4">
          {sections.map(({ path, label, icon }, index) => (
            <motion.div
              key={path}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
              className="w-full"
            >
              <Link
                to={`/nosotros/${path}`}
                className="block w-full bg-[#FDD835] text-[#5C3D2E] p-6 rounded-2xl shadow-lg text-center transform hover:scale-105 hover:bg-[#A67C52] hover:text-white transition duration-300"
              >
                {icon}
                <h3 className="text-xl font-semibold">{label}</h3>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* 📜 Texto final */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="text-center z-10"
        >
          <p className="text-lg text-gray-800 max-w-3xl mx-auto">
            En <strong className="text-[#5C3D2E]">Rápido y Sabroso</strong>, trabajamos con pasión y compromiso
            para ofrecerte lo mejor de la comida rápida. Descubre qué nos motiva y por qué somos tu mejor opción.
          </p>
        </motion.div>

        {/* 👥 Personal Ficticio */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="mt-20"
        >
          <h2 className="text-3xl font-bold text-yellow-600 text-center mb-10">Nuestro Equipo</h2>

          <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 px-4">
            {[
              {
                nombre: "Lucía Ramírez",
                cargo: "Gerente General",
                descripcion: "Lidera al equipo con visión estratégica, manteniendo altos estándares de calidad y servicio.",
              },
              {
                nombre: "Carlos Gutiérrez",
                cargo: "Chef Ejecutivo",
                descripcion: "Creador de nuestras deliciosas hamburguesas, siempre innovando en sabor y presentación.",
              },
              {
                nombre: "Andrea Torres",
                cargo: "Cajera Principal",
                descripcion: "Amable y eficiente, garantiza una atención rápida y cordial a todos nuestros clientes.",
              },
              {
                nombre: "Diego Salinas",
                cargo: "Repartidor Estrella",
                descripcion: "Responsable de entregar tu pedido caliente y a tiempo, siempre con una sonrisa.",
              },
            ].map((persona, index) => (
              <motion.div
                key={persona.nombre}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: index * 0.2, duration: 0.5 }}
                className="bg-white rounded-2xl shadow-lg p-6 text-center border border-yellow-100"
              >
                <div className="w-16 h-16 mx-auto mb-4 bg-yellow-400 rounded-full flex items-center justify-center text-white font-bold text-xl">
                  {persona.nombre.split(" ")[0][0]}{persona.nombre.split(" ")[1][0]}
                </div>
                <h3 className="text-xl font-semibold text-[#5C3D2E]">{persona.nombre}</h3>
                <p className="text-sm text-yellow-700 font-medium">{persona.cargo}</p>
                <p className="text-sm text-gray-700 mt-2">{persona.descripcion}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  );
}

export default Nosotros;