import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { api } from "../services/api";
import SelectorMetodoPago from "./SelectorMetodoPago";
import FormularioMetodoNuevo from "./FormularioMetodoNuevo";
import { useCarrito } from "../hooks/useCarrito";
import { useCliente } from "../hooks/useCliente";
import { useNavigate } from "react-router-dom";

const FormularioPago = () => {
  const { cliente: datos, actualizarCampo } = useCliente();
  const { carrito, total } = useCarrito();

  const [nuevoMetodo, setNuevoMetodo] = useState({ nombre: "", numero: "" });
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [tipoPago, setTipoPago] = useState("boleta");
  const [isLoading, setIsLoading] = useState(false);
  const [metodos, setMetodos] = useState([]);
  const [metodoSeleccionado, setMetodoSeleccionado] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const cargarMetodos = async () => {
      try {
        const res = await api.getMetodosPago();
        setMetodos(res.data);
      } catch (error) {
        console.error("Error al traer métodos de pago:", error);
      }
    };
    cargarMetodos();
  }, []);

  useEffect(() => {
    setMetodoSeleccionado(datos.metodoPago || "");
  }, [datos.metodoPago]);

  useEffect(() => {
    const tipoPagoLocal = localStorage.getItem("tipoPago");
    if (tipoPagoLocal) setTipoPago(tipoPagoLocal);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    actualizarCampo(name, value);
  };

  const handleNuevoMetodoChange = (e) => {
    const { name, value } = e.target;
    setNuevoMetodo((prev) => ({ ...prev, [name]: value }));
  };

  const handleCrearMetodoPago = async () => {
    try {
      setIsLoading(true);
      const metodoPagoAEnviar = {
        id_cliente: datos.idCliente,
        nombre: nuevoMetodo.nombre,
        numero: nuevoMetodo.numero,
      };
      const res = await api.crearMetodoPago(metodoPagoAEnviar);
      alert("Método de pago creado");
      setNuevoMetodo({ nombre: "", numero: "" });
      setMostrarFormulario(false);
      const resMetodos = await api.getMetodosPago();
      setMetodos(resMetodos.data);
    } catch (error) {
      console.error("Error al crear método de pago:", error);
      alert("Hubo un error al crear el método");
    } finally {
      setIsLoading(false);
    }
  };

  const handleTipoPagoChange = (e) => {
    const tipo = e.target.value;
    setTipoPago(tipo);
    localStorage.setItem("tipoPago", tipo);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (carrito.length === 0) {
      alert("El carrito está vacío.");
      return;
    }

    if (!metodoSeleccionado) {
      alert("Por favor, selecciona un método de pago.");
      return;
    }

    try {
      const pedido = {
        id_cliente: datos.idCliente,
        id_metodo_pago: metodoSeleccionado,
        direccion_entrega: datos.direccion || null,
        metodo_envio: "", // agregar si tienes esta info
        notas: "", // agregar si tienes esta info
        descuento: 0, // agregar si tienes esta info
        puntos_usados: 0, // agregar si tienes esta info
        productos: carrito
          .filter(item => item.tipo !== "menu") // todo lo que NO sea menú
          .map(({ idProducto, cantidad, precio }) => ({
            id_producto: idProducto,
            cantidad,
            precio,
          })),

        menus: carrito
          .filter(item => item.tipo === "menu") // solo menús
          .map(({ idMenu, cantidad, precio }) => ({
            id_menu: idMenu,
            cantidad,
            precio,
          })),
        tipo_comprobante: tipoPago,
        dni: tipoPago === "boleta" ? datos.dni || null : null,
        ruc: tipoPago === "factura" ? datos.ruc || null : null,
        razon_social: tipoPago === "factura" ? datos.razonSocial || null : null,
        direccion_fiscal: tipoPago === "factura" ? datos.direccionFiscal || null : null,
      };

      // Función para limpiar campos nulos o vacíos
      const cleanObject = (obj) =>
        Object.fromEntries(
          Object.entries(obj).filter(([_, v]) => v !== null && v !== "" && v !== undefined)
        );

      const pedidoLimpio = cleanObject(pedido);
      console.log("Pedido a enviar:", pedidoLimpio);
      const pedidoRes = await api.crearPedido(pedidoLimpio);
      
      // Limpia carrito y recarga página o navega según tu lógica
      localStorage.removeItem("carrito");
      navigate("/comprobante/" + pedidoRes.data.id_pedido);
      console.log(pedidoRes.data)
    } catch (error) {
      console.error("Error al registrar el pedido:", error);
      alert("Ocurrió un error al confirmar el pago.");
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.5 }}
      className="bg-[#feefc3] p-6 rounded-xl shadow-sm"
    >
      <SelectorMetodoPago
        metodos={metodos}
        selectedId={metodoSeleccionado}
        onChange={setMetodoSeleccionado}
        onNuevo={() => setMostrarFormulario(true)}
      />

      <FormularioMetodoNuevo
        mostrar={mostrarFormulario}
        nuevoMetodo={nuevoMetodo}
        isLoading={isLoading}
        onChange={handleNuevoMetodoChange}
        onCrear={handleCrearMetodoPago}
        onCancelar={() => setMostrarFormulario(false)}
      />

      <label className="block mb-2 font-semibold text-[#1f1f1f]">Tipo de Comprobante *</label>
      <select
        className="w-full p-2 rounded border border-gray-300 mb-6"
        value={tipoPago}
        onChange={handleTipoPagoChange}
      >
        <option value="boleta">Boleta</option>
        <option value="factura">Factura</option>
      </select>

      {tipoPago === "boleta" ? (
        <>
          <Campo label="Primer Nombre" name="nombre" value={datos.nombre || ""} onChange={handleInputChange} />
          <Campo label="Apellidos" name="apellidos" value={datos.apellidos || ""} onChange={handleInputChange} />
          <Campo label="Dirección" name="direccion" value={datos.direccion || ""} onChange={handleInputChange} />
          <Campo label="DNI" name="dni" value={datos.dni || ""} onChange={handleInputChange} required />
        </>
      ) : (
        <>
          <Campo label="Razón Social" name="razonSocial" value={datos.razonSocial || ""} onChange={handleInputChange} required />
          <Campo label="RUC" name="ruc" value={datos.ruc || ""} onChange={handleInputChange} required />
          <Campo label="Dirección Fiscal" name="direccionFiscal" value={datos.direccionFiscal || ""} onChange={handleInputChange} required />
        </>
      )}

      <button
        type="submit"
        className="bg-[#ebbd34] text-[#1f1f1f] font-semibold py-2 px-4 rounded hover:bg-[#f0d860] transition-colors"
      >
        Confirmar Pago
      </button>
    </motion.form>
  );
};

const Campo = ({ label, name, value, onChange, required = false }) => (
  <>
    <label htmlFor={name} className="block mb-2 font-semibold text-[#1f1f1f]">{label}</label>
    <input
      type="text"
      name={name}
      id={name}
      value={value}
      onChange={onChange}
      required={required}
      className="w-full p-2 rounded border border-gray-300 mb-4"
    />
  </>
);

export default FormularioPago;