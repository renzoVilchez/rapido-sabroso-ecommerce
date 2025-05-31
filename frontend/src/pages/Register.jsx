import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre: '',
    apellidos: '',
    correo: '',
    password: '',
    tipoPersona: 'natural',
    documento: '',
    razonSocial: '',
    direccionFiscal: '',
    distrito: '',
    calle: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    const direccionCompuesta = `Trujillo - ${formData.distrito} - ${formData.calle}`;

    const datosFinales = {
      nombre: formData.nombre,
      apellidos: formData.apellidos,
      email: formData.correo,
      password: formData.password,
      tipo_documento: formData.tipoPersona === 'natural' ? 'DNI' : 'RUC',
      dni: formData.tipoPersona === 'natural' ? formData.documento : null,
      ruc: formData.tipoPersona === 'juridica' ? formData.documento : null,
      razon_social: formData.tipoPersona === 'juridica' ? formData.razonSocial || null : null,
      direccion_fiscal: formData.tipoPersona === 'juridica' ? formData.direccionFiscal || null : null,
      direccion: `Trujillo - ${formData.distrito} - ${formData.calle}`
    };


    try {
      const response = await axios.post('http://localhost:5000/api/clientes/registro', datosFinales);
      navigate('/login');
    } catch (error) {
      const respuesta = error.response?.data;
      console.error("Error en el registro:", respuesta);

      if (respuesta?.detalle?.includes("Duplicate entry")) {
        const correoDuplicado = respuesta.detalle.split("'")[1];
        setError(`El correo ${correoDuplicado} ya está registrado.`);
      } else if (respuesta?.errores && typeof respuesta.errores === 'object') {
        const mensajes = Object.values(respuesta.errores).flat();
        setError(mensajes.join(" "));
      } else if (respuesta?.mensaje) {
        setError(respuesta.mensaje);
      } else {
        setError("Ocurrió un error al registrar. Intenta nuevamente.");
      }
    }

  };

  const [error, setError] = useState('');

  const validateForm = () => {
    if (!formData.nombre.trim()) {
      return 'El nombre es obligatorio';
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.correo)) {
      return 'El correo no es válido';
    }

    if (formData.password.length < 6) {
      return 'La contraseña debe tener al menos 6 caracteres';
    }

    if (formData.tipoPersona === 'natural' && !/^\d{8}$/.test(formData.documento)) {
      return 'El DNI debe tener 8 dígitos';
    }

    if (formData.tipoPersona === 'juridica' && !/^\d{11}$/.test(formData.documento)) {
      return 'El RUC debe tener 11 dígitos';
    }

    if (formData.tipoPersona === 'juridica') {
      if (!formData.razonSocial.trim()) return 'La razón social es obligatoria';
      if (!formData.direccionFiscal.trim()) return 'La dirección fiscal es obligatoria';
    }

    if (!formData.distrito.trim() || !formData.calle.trim()) {
      return 'La dirección de envío es obligatoria';
    }

    return null;
  };


  return (
    <div className="flex justify-center flex-col items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleRegister}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Registro de Cliente</h2>

        {/* Nombre */}
        <div className="mb-4">
          <label className="block text-gray-600 mb-1">Nombre</label>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Apellidos */}
        <div className="mb-4">
          <label className="block text-gray-600 mb-1">Apellidos</label>
          <input
            type="text"
            name="apellidos"
            value={formData.apellidos}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

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
        <div className="mb-4">
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

        {/* Tipo de persona */}
        <div className="mb-4">
          <label className="block text-gray-600 mb-1">Tipo de persona</label>
          <select
            name="tipoPersona"
            value={formData.tipoPersona}
            onChange={handleChange}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="natural">Natural</option>
            <option value="juridica">Jurídica</option>
          </select>
        </div>

        {/* Documento */}
        <div className="mb-4">
          <label className="block text-gray-600 mb-1">
            {formData.tipoPersona === 'natural' ? 'DNI' : 'RUC'}
          </label>
          <input
            type="text"
            name="documento"
            value={formData.documento}
            onChange={(e) => {
              const { value } = e.target;
              const maxLength = formData.tipoPersona === 'natural' ? 8 : 11;
              if (/^\d*$/.test(value) && value.length <= maxLength) {
                setFormData((prev) => ({ ...prev, documento: value }));
              }
            }}
            required
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

        </div>

        {/* Razón Social (solo para jurídica) */}
        {formData.tipoPersona === 'juridica' && (
          <>
            <div className="mb-4">
              <label className="block text-gray-600 mb-1">Razón Social</label>
              <input
                type="text"
                name="razonSocial"
                value={formData.razonSocial}
                onChange={handleChange}
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {/* Dirección Fiscal */}
            <div className="mb-4">
              <label className="block text-gray-600 mb-1">Dirección Fiscal</label>
              <input
                type="text"
                name="direccionFiscal"
                value={formData.direccionFiscal}
                onChange={handleChange}
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          </>
        )}

        {/* Dirección de Envío */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Dirección de Envío</h3>
          <label className="block text-gray-600 mb-1">Distrito</label>
          <select
            name="distrito"
            value={formData.distrito}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">Selecciona un distrito</option>
            <option value="Trujillo">Trujillo</option>
            <option value="La Esperanza">La Esperanza</option>
            <option value="Florencia de Mora">Florencia de Mora</option>
            <option value="El Porvenir">El Porvenir</option>
            <option value="Huanchaco">Huanchaco</option>
            <option value="Víctor Larco">Víctor Larco</option>
            <option value="Laredo">Laredo</option>
            <option value="Moche">Moche</option>
            <option value="Salaverry">Salaverry</option>
          </select>
        </div>

        <div className="mb-6">
          <label className="block text-gray-600 mb-1">Calle / Dirección exacta</label>
          <input
            type="text"
            name="calle"
            value={formData.calle}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>


        {/* Botón */}
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-md transition duration-300"
        >
          Registrarse
        </button>
      </form>
      {error && (
        <div className="mb-4 text-red-600 bg-red-100 border border-red-400 p-2 rounded">
          {error}
        </div>
      )}
    </div>
  );
};

export default Register;