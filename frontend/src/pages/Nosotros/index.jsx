import { Link } from 'react-router-dom';
import { Target, Eye, ListChecks, HeartHandshake } from 'lucide-react';
import { motion } from 'framer-motion';

const sections = [
  { path: 'mision',     label: 'Misión',     icon: <Target className="w-8 h-8 mb-2 text-[#5C3D2E]" /> },
  { path: 'vision',     label: 'Visión',     icon: <Eye    className="w-8 h-8 mb-2 text-[#5C3D2E]" /> },
  { path: 'objetivos',  label: 'Objetivos',  icon: <ListChecks className="w-8 h-8 mb-2 text-[#5C3D2E]" /> },
  { path: 'valores',    label: 'Valores',    icon: <HeartHandshake className="w-8 h-8 mb-2 text-[#5C3D2E]" /> },
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

      </div>
    </div>
  );
}

export default Nosotros;