import axios from 'axios';
const API_URL = "http://localhost:5000/api";

export const api = {
  getMetodosPago: () => axios.get(`${API_URL}/metodos-pago`),
  crearMetodoPago: (data) => axios.post(`${API_URL}/metodos-pago`, data),
  getClientePorCorreo: (email) => axios.get(`${API_URL}/clientes/correo/${email}`),
  crearPedido: (data) => axios.post(`${API_URL}/pedidos`, data),
  getPedido: (id) => axios.get(`${API_URL}/pedidos/${id}`),
  crearComprobante: (data) => axios.post(`${API_URL}/comprobantes`, data),
  getComprobantePorPedido: (id) => axios.get(`${API_URL}/comprobantes/pedido/${id}`),
};