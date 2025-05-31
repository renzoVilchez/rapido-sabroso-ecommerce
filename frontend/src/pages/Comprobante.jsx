import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../services/api";

const Comprobante = () => {
  const { idPedido } = useParams();
  const [comprobante, setComprobante] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargarComprobante = async () => {
      try {
        const res = await api.getComprobantePorPedido(idPedido);
        setComprobante(res.data);
      } catch (error) {
        console.error("Error al cargar comprobante:", error);
      } finally {
        setLoading(false);
      }
    };

    cargarComprobante();
  }, [idPedido]);

  if (loading) return <p>Cargando comprobante...</p>;
  if (!comprobante) return <p>No se encontró el comprobante.</p>;

  // Datos cliente y comprobante
  const cliente = comprobante.cliente || {};
  const totales = comprobante.totales || {};

  return (
    <div className="p-6 max-w-xl mx-auto bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">
        {comprobante.tipoComprobante === "boleta" ? "Boleta" : "Factura"}
      </h1>

      <p><strong>Cliente:</strong> {cliente.nombre || comprobante.razonSocial || "N/A"}</p>
      <p><strong>Dirección:</strong> {cliente.direccionFiscal || cliente.direccion || "N/A"}</p>

      {comprobante.tipoComprobante === "boleta" ? (
        <p><strong>DNI:</strong> {cliente.dni || "N/A"}</p>
      ) : (
        <>
          <p><strong>RUC:</strong> {cliente.ruc || "N/A"}</p>
          <p><strong>Razón Social:</strong> {comprobante.razonSocial || "N/A"}</p>
          <p><strong>Dirección Fiscal:</strong> {cliente.direccionFiscal || "N/A"}</p>
        </>
      )}

      <hr className="my-4" />

      <p><strong>Fecha de emisión:</strong> {new Date(comprobante.fechaEmision).toLocaleDateString()}</p>

      <h2 className="text-lg font-semibold mt-4 mb-2">Productos</h2>
      <ul className="list-disc list-inside">
        {comprobante.productos?.map((prod, index) => (
          <li key={index}>
            {prod.nombre} — {prod.cantidad} x S/ {parseFloat(prod.precioUnit).toFixed(2)} = S/ {(prod.cantidad * parseFloat(prod.precioUnit)).toFixed(2)}
          </li>
        ))}
      </ul>

      <div className="mt-4">
        <p><strong>Subtotal:</strong> S/ {parseFloat(totales.subtotal || 0).toFixed(2)}</p>
        <p><strong>IGV:</strong> S/ {parseFloat(totales.igv || 0).toFixed(2)}</p>
        <p><strong>Descuento:</strong> S/ {parseFloat(totales.descuento || 0).toFixed(2)}</p>
        <p><strong>Total:</strong> <span className="font-bold">S/ {parseFloat(totales.total || 0).toFixed(2)}</span></p>
      </div>
    </div>
  );
};

export default Comprobante;