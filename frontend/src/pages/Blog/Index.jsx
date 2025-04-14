import { Link } from 'react-router-dom';

const blogPosts = [
  { title: 'Historia de cómo surgió nuestro sueño', path: '/blog/historia' },
  { title: '¿Con qué acompañar tu hamburguesa?', path: '/blog/acompanamientos' },
  { title: 'Beneficios de disfrutar una buena hamburguesa', path: '/blog/beneficios' },
  { title: 'Datos curiosos sobre las hamburguesas', path: '/blog/curiosidades' },
  { title: '¡Descubre las novedades más deliciosas del menú!', path: '/blog/novedades' },
];

function Blog() {
  return (
    <section className="p-6">
      <h1 className="text-2xl font-bold mb-4">Nuestro Blog</h1>
      <div className="grid md:grid-cols-2 gap-4">
        {blogPosts.map((post, index) => (
          <Link key={index} to={post.path} className="block p-4 border rounded shadow hover:bg-gray-100 transition">
            <h2 className="text-lg font-semibold">{post.title}</h2>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default Blog;