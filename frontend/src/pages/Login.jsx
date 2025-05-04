import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { GlobalContext } from '../context/GlobalContext';

const Login = () => {
  const navigate = useNavigate();
  const { setIsLoggedIn } = useContext(GlobalContext);
  const [formData, setFormData] = useState({
    correo: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const { correo, password } = formData;

      const response = await axios.post('http://localhost:5000/api/clientes/login', formData);

      if (response.data.success) {
        console.log('Login exitoso:', response.data.cliente);

        // Guarda el usuario en el localStorage
        localStorage.setItem('usuario', JSON.stringify(response.data.cliente));

        // Actualiza el estado de isLoggedIn en el contexto global
        setIsLoggedIn(true);

        // Redirige al usuario a la página de inicio
        navigate('/home');
      } else {
        setError('Correo o contraseña incorrectos');
      }

    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError('Error en el servidor o en la conexión');
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Iniciar Sesión</h2>

        {/* Correo */}
        <div className="mb-4">
          <label className="block text-gray-600 mb-1">Correo electrónico</label>
          <input
            type="email"
            name="correo"
            value={formData.correo}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Password */}
        <div className="mb-6">
          <label className="block text-gray-600 mb-1">Contraseña</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Mostrar error si hay */}
        {error && (
          <div className="mb-4 text-red-500 text-sm text-center">{error}</div>
        )}

        {/* Botón */}
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-md transition duration-300"
        >
          Entrar
        </button>
        <p className="mt-4 text-center text-sm text-gray-600">
          ¿No tienes una cuenta?{' '}
          <Link to="/register" className="text-blue-500 hover:underline">
            Dale clic aquí
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;