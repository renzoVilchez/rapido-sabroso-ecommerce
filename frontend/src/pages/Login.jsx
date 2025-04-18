import { useState } from 'react';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mensaje, setMensaje] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validación simple
    if (!email || !password) {
      setMensaje('Todos los campos son obligatorios');
      return;
    }

    // Aquí puedes hacer la petición a tu backend
    console.log('Iniciando sesión con:', { email, password });

    // Reset y feedback
    setMensaje('');
    // setEmail('');
    // setPassword('');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-red-600">Iniciar Sesión</h2>

        {mensaje && (
          <div className="mb-4 text-red-600 text-sm font-medium">
            {mensaje}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block mb-1 font-medium">Correo electrónico</label>
            <input
              type="email"
              id="email"
              className="w-full border border-gray-300 rounded-md p-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ejemplo@correo.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block mb-1 font-medium">Contraseña</label>
            <input
              type="password"
              id="password"
              className="w-full border border-gray-300 rounded-md p-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="********"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-md transition"
          >
            Iniciar sesión
          </button>
        </form>

        <p className="text-sm text-center text-gray-500 mt-4">
          ¿No tienes una cuenta? <a href="/registro" className="text-red-500 hover:underline">Regístrate</a>
        </p>
      </div>
    </div>
  );
}

export default Login;