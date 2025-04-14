import historiaImage from "../../assets/images/historia.jpg";

function BlogHistoria() {
    return (
      <div className="bg-white text-gray-900">
        <header className="bg-[#d94f30] text-white py-6 text-center">
          <h1 className="text-3xl font-bold drop-shadow-md">Blog de Rápido y Sabroso</h1>
          <p className="mt-2 text-lg">¡Todo lo que quieres saber del mundo de las hamburguesas!</p>
        </header>
  
        <div className="max-w-5xl mx-auto px-4 py-10">
          <h1 className="text-3xl font-bold mb-6">Historia de cómo surgió nuestro sueño llamado "Rápido y Sabroso"</h1>
  
          <div className="flex flex-col lg:flex-row gap-6 mb-10">
            <img
              src={historiaImage}
              alt="Historia"
              className="w-full lg:w-1/2 rounded-lg shadow-md"
            />
            <div className="flex flex-col gap-3 w-full lg:w-1/2">
              <h2 className="text-xl font-semibold">Más sobre Hamburguesas</h2>
              <a href="/blog/novedades" className="bg-blue-50 hover:bg-blue-100 p-4 rounded-md transition">
                🔥 Novedades del Menú...
              </a>
              <a href="/blog/acompanamientos" className="bg-blue-50 hover:bg-blue-100 p-4 rounded-md transition">
                🍟 ¿Con qué acompañar tu hamburguesa? 🥤...
              </a>
              <a href="/blog/beneficios" className="bg-blue-50 hover:bg-blue-100 p-4 rounded-md transition">
                👀 Beneficios de comer bien y con gusto...
              </a>
              <a href="/blog/curiosidades" className="bg-blue-50 hover:bg-blue-100 p-4 rounded-md transition">
                🍔 Datos curiosos sobre hamburguesas...
              </a>
            </div>
          </div>
  
          <div className="prose max-w-none text-justify">
            <h2>Nuestra Historia: De una Idea Casera a un Sabor que Conquista Trujillo</h2>
            <p>
              Todo comenzó con una conversación entre amigos en una cocina pequeña en Trujillo...
              [Aquí va el mismo contenido que tú ya tienes. Para mantenerlo corto aquí no lo repito, pero se puede pegar tal cual].
            </p>
  
            <h3>El inicio (2021 - 2022): cocinando en casa y repartiendo en moto</h3>
            <p>
              En pleno 2021, cuando la ciudad todavía se recuperaba del golpe de la pandemia...
            </p>
  
            <h3>El primer local (2023): todo con esfuerzo, nada regalado</h3>
            <p>
              En 2023 dimos el salto: alquilamos un pequeño local en una esquina transitada de Trujillo...
            </p>
  
            <h3>Innovar, crecer, escuchar (2024 en adelante)</h3>
            <p>
              Hoy, ya con un equipo más grande y más experiencia, seguimos con la misma filosofía...
            </p>
  
            <h3>¿Por qué contamos esto?</h3>
            <p>
              Porque cada combo que vendemos tiene detrás una historia de esfuerzo...
            </p>
  
            <p>
              <strong>Esto recién empieza.</strong><br />
              Equipo de <strong>Rápido y Sabroso</strong> 🍔🔥
            </p>
          </div>
        </div>
      </div>
    );
  }
  
  export default BlogHistoria;  