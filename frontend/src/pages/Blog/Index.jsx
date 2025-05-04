import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const blogPosts = [
  { title: 'Historia de cómo surgió nuestro sueño', path: '/blog/historia' },
  { title: '¿Con qué acompañar tu hamburguesa?', path: '/blog/acompanamientos' },
  { title: 'Beneficios de disfrutar una buena hamburguesa', path: '/blog/beneficios' },
  { title: 'Datos curiosos sobre las hamburguesas', path: '/blog/curiosidades' },
  { title: '¡Descubre las novedades más deliciosas del menú!', path: '/blog/novedades' },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.4 },
  }),
};

function Blog() {
  return (
    <motion.section
      className="p-6 max-w-4xl mx-auto"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {},
      }}
    >
      <motion.h1
        className="text-3xl font-bold mb-6 text-yellow-600 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Nuestro Blog
      </motion.h1>

      <div className="grid md:grid-cols-2 gap-6">
        {blogPosts.map((post, index) => (
          <motion.div
            key={index}
            custom={index}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
          >
            <Link
              to={post.path}
              className="block bg-white rounded-2xl shadow-md p-6 hover:bg-yellow-100 transition-all transform hover:scale-[1.02]"
            >
              <h2 className="text-lg font-semibold text-yellow-600">{post.title}</h2>
            </Link>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}

export default Blog;