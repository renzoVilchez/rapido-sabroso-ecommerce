import { useState, useEffect } from "react";

export function useCarrito() {
  const [carrito, setCarrito] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const raw = localStorage.getItem('carrito');
    if (!raw) return;

    try {
      const parsed = JSON.parse(raw);
      const formateado = parsed.map(p => ({
        ...p,
        precioProducto: Number(p.precio || p.precioProducto || 0),
        cantidad: Number(p.cantidad || 0),
        nombreProducto: p.nombre || p.nombreProducto || "Producto",
        idProducto: p.idProducto || p.id_producto || null,
        precio: Number(p.precio || p.precioProducto || 0),
        id_producto: p.idProducto || p.id_producto || null,
      }));
      setCarrito(formateado);

      const totalCalculado = formateado.reduce(
        (acc, item) => acc + item.precioProducto * item.cantidad,
        0
      );
      setTotal(totalCalculado);

    } catch (err) {
      console.error("Error leyendo carrito:", err);
    }
  }, []);

  return { carrito, total };
}