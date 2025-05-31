import { motion } from "framer-motion";
import { useEffect, useState } from "react";

function ResumenPedidos() {
    const [productos, setProductos] = useState([]);

    useEffect(() => {
        const carritoGuardado = localStorage.getItem('carrito');
        if (carritoGuardado) {
            try {
                const carritoParseado = JSON.parse(carritoGuardado);
                const carritoConNumeros = carritoParseado.map(item => ({
                    ...item,
                    precioProducto: Number(item.precio || item.precioProducto || 0),
                    cantidad: Number(item.cantidad || 0),
                    nombreProducto: item.nombre || item.nombreProducto || "Producto",
                    idProducto: item.idProducto || null,
                }));
                setProductos(carritoConNumeros);
            } catch (error) {
                console.error("Error al leer el carrito desde localStorage:", error);
            }
        }
    }, []);

    const calcularSubtotal = () => productos.reduce((acc, p) => acc + p.precioProducto * p.cantidad, 0);
    const calcularIGV = (total) => total - (total / 1.18);
    const calcularMontoBase = (total) => total / 1.18;

    const subtotal = calcularSubtotal();
    const igv = calcularIGV(subtotal);
    const montoBase = calcularMontoBase(subtotal);

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mb-6 bg-[#feefc3] p-4 rounded-xl shadow-sm"
        >
            <h2 className="text-xl font-semibold mb-4 text-[#1f1f1f]">
                Resumen de Productos
            </h2>

            {productos.length > 0 ? (
                <motion.table
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="w-full table-auto mb-4 bg-white rounded-lg overflow-hidden"
                >
                    <thead className="bg-[#ebebeb] text-[#1f1f1f]">
                        <tr>
                            <th className="border p-2">Producto</th>
                            <th className="border p-2">Cantidad</th>
                            <th className="border p-2">Precio Unitario</th>
                            <th className="border p-2">Subtotal</th>
                        </tr>
                    </thead>
                    <tbody>
                        {productos.map((producto, index) => (
                            <tr key={index} className="text-[#1f1f1f]">
                                <td className="border p-2">{producto.nombreProducto}</td>
                                <td className="border p-2">{producto.cantidad}</td>
                                <td className="border p-2">S/ {producto.precioProducto.toFixed(2)}</td>
                                <td className="border p-2">S/ {(producto.precioProducto * producto.cantidad).toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>
                </motion.table>
            ) : (
                <p>No hay productos en el carrito.</p>
            )}

            <div className="flex justify-between text-[#1f1f1f]">
                <p className="font-semibold">Subtotal:</p>
                <p>S/ {subtotal.toFixed(2)}</p>
            </div>

            <div className="flex justify-between mt-2 text-[#1f1f1f]">
                <p className="font-semibold">Monto Base:</p>
                <p>S/ {montoBase.toFixed(2)}</p>
            </div>

            <div className="flex justify-between mt-2 text-[#1f1f1f]">
                <p className="font-semibold">IGV (18%):</p>
                <p>S/ {igv.toFixed(2)}</p>
            </div>
        </motion.div>
    );
}

export default ResumenPedidos;