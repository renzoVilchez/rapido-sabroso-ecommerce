import { useState, useEffect } from "react";
import axios from 'axios';
import { motion } from "framer-motion";

const Pago = () => {
    const [tipoPago, setTipoPago] = useState("boleta");
    const [datos, setDatos] = useState({
        idCliente: "",
        nombre: "",
        direccion: "",
        ruc: "",
        dni: "",
        razonSocial: "",
        direccionFiscal: "",
    });
    const [productos, setProductos] = useState([]);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        // Leer carrito y tipo de pago desde localStorage
        const carritoGuardado = localStorage.getItem('carrito');
        const tipoPagoGuardado = localStorage.getItem('tipoPago');

        if (carritoGuardado) {
            try {
                const carritoParseado = JSON.parse(carritoGuardado);
                if (Array.isArray(carritoParseado)) {
                    const carritoConNumeros = carritoParseado.map(item => ({
                        ...item,
                        precioProducto: Number(item.precioProducto),
                        cantidad: Number(item.cantidad),
                    }));

                    setProductos(carritoConNumeros);
                    const totalCalculado = carritoConNumeros.reduce(
                        (acc, item) => acc + item.precioProducto * item.cantidad, 0
                    );
                    setTotal(totalCalculado);
                } else {
                    console.error("El carrito no es un arreglo válido");
                }
            } catch (error) {
                console.error("Error al leer el carrito desde localStorage:", error);
            }
        }

        if (tipoPagoGuardado) {
            setTipoPago(tipoPagoGuardado);
        }
    }, []);

    useEffect(() => {
        const usuario = JSON.parse(localStorage.getItem('usuario'));
        if (usuario && usuario.correoCliente) {
            axios.get(`http://localhost:5000/api/clientes/correo/${usuario.correoCliente}`)
                .then(response => {
                    setDatos(prevDatos => ({
                        ...prevDatos,
                        idCliente: response.data.idCliente || "",
                        nombre: response.data.nombreCliente || "",
                        direccion: response.data.direccionEnvio || "",
                        dni: response.data.dniCliente || "",
                        ruc: response.data.rucCliente || "",
                        razonSocial: response.data.razonSocialCliente || "",
                        direccionFiscal: response.data.direccionFiscalCliente || "",
                    }));
                })
                .catch(error => {
                    console.error('Error al traer los datos del cliente:', error);
                });
        } else {
            console.log('No hay datos del usuario en localStorage');
        }
    }, []);

    const handleTipoPagoChange = (e) => {
        setTipoPago(e.target.value);
        localStorage.setItem("tipoPago", e.target.value);  // Guardar tipo de pago en localStorage
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setDatos({ ...datos, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validaciones
        if (tipoPago === "factura" && (!datos.ruc || !datos.razonSocial || !datos.direccionFiscal)) {
            alert("Por favor, complete todos los campos de la factura.");
            return;
        }
        if (tipoPago === "boleta" && !datos.dni) {
            alert("Por favor, ingrese su DNI.");
            return;
        }

        // Guardar los datos de pago en el localStorage para recuperación futura
        localStorage.setItem('datosPago', JSON.stringify(datos));

        // Crear pedido primero
        axios.post("http://localhost:5000/api/pedidos", {
            idCliente: datos.idCliente,
            fechaPedido: new Date(),
            productos: productos,
            puntosGanados: 0,  // O usar una lógica para calcular los puntos ganados
            puntosUsados: 0    // Lo mismo para puntos usados
        })
            .then(response => {
                const idPedido = response.data.idPedido;  // Obtener el idPedido generado

                // Crear detalles de pedido en paralelo
                Promise.all(
                    productos.map(producto =>
                        axios.post("http://localhost:5000/api/detalles-pedido", {
                            idPedido,
                            idProducto: producto.idProducto,
                            cantidadDetallePedido: producto.cantidad,
                            precioUnitarioDetallePedido: producto.precioProducto
                        })
                    )
                )
                    .then(() => {
                        // Después de insertar todos los detalles, crear el comprobante
                        axios.post("http://localhost:5000/api/comprobantes", {
                            idPedido,
                            tipoComprobante: tipoPago,
                            dniComprobante: datos.dni,
                            rucComprobante: datos.ruc,
                            razonSocialComprobante: datos.razonSocial,
                            direccionFiscalComprobante: datos.direccionFiscal
                        })
                            .then(() => {
                                alert("Pago exitoso!");
                                // Limpiar carrito después de pago exitoso
                                localStorage.removeItem('carrito');
                                // Redirigir o hacer lo que necesites aquí (ejemplo: window.location.href = '/');
                            })
                            .catch(error => {
                                console.error("Error al crear comprobante:", error);
                                alert("Hubo un error al crear el comprobante.");
                            });
                    })
                    .catch(error => {
                        console.error("Error al crear detalle de pedido:", error);
                        alert("Hubo un error al procesar el detalle del pedido.");
                    });
            })
            .catch(error => {
                console.error("Error al crear pedido:", error);
                alert("Hubo un error al procesar su pedido.");
            });
    };

    const calcularSubtotal = () => {
        return productos.reduce((acc, producto) => acc + producto.precioProducto * producto.cantidad, 0);
    };

    const calcularTotal = () => {
        return calcularSubtotal();
    };

    const calcularIGV = (precioTotal) => {
        return precioTotal - (precioTotal / 1.18); // IGV es 18%
    };

    const calcularMontoBase = (precioTotal) => {
        return precioTotal / 1.18;
    };

    const precioTotal = calcularTotal();
    const igv = calcularIGV(precioTotal);
    const montoBase = calcularMontoBase(precioTotal);

    return (
            <div className="p-6 max-w-3xl mx-auto">
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-2xl font-bold mb-6 text-[#1f1f1f]"
                >
                    Formulario de Pago
                </motion.h1>

                {/* Resumen de productos */}
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
                                        <td className="border p-2">S/ {producto.precioProducto}</td>
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
                        <p>S/ {calcularSubtotal().toFixed(2)}</p>
                    </div>

                    <div className="flex justify-between mt-2 text-[#1f1f1f]">
                        <p className="font-semibold">Monto Base:</p>
                        <p>S/ {montoBase.toFixed(2)}</p>
                    </div>

                    <div className="flex justify-between mt-2 text-[#1f1f1f]">
                        <p className="font-semibold">IGV (18%):</p>
                        <p>S/ {igv.toFixed(2)}</p>
                    </div>

                    <div className="flex justify-between font-semibold mt-4 text-[#1f1f1f]">
                        <p>Total a Pagar:</p>
                        <p>S/ {precioTotal.toFixed(2)}</p>
                    </div>
                </motion.div>

                {/* Selección de tipo de pago */}
                <div className="mb-4">
                    <label htmlFor="tipoPago" className="font-medium text-[#1f1f1f]">Tipo de Pago:</label>
                    <select
                        id="tipoPago"
                        value={tipoPago}
                        onChange={handleTipoPagoChange}
                        className="ml-2 p-2 border rounded bg-[#fff] text-[#1f1f1f]"
                    >
                        <option value="boleta">Boleta</option>
                        <option value="factura">Factura</option>
                    </select>
                </div>

                {/* Formulario */}
                <motion.form
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                    className="space-y-4"
                >
                    {[
                        { id: 'nombre', label: 'Nombre completo', placeholder: 'Nombre completo' },
                        { id: 'direccion', label: 'Dirección', placeholder: 'Dirección' },
                        ...(tipoPago === 'factura'
                            ? [
                                { id: 'razonSocial', label: 'Razón Social', placeholder: 'Razón Social' },
                                { id: 'direccionFiscal', label: 'Dirección Fiscal', placeholder: 'Dirección Fiscal' },
                                { id: 'ruc', label: 'RUC', placeholder: 'RUC' }
                            ]
                            : []),
                        { id: 'dni', label: 'DNI', placeholder: 'DNI' }
                    ].map((field) => (
                        <motion.div
                            key={field.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <label htmlFor={field.id} className="font-medium text-[#1f1f1f]">
                                {field.label}:
                            </label>
                            <input
                                type="text"
                                id={field.id}
                                name={field.id}
                                value={datos[field.id] || ''}
                                onChange={handleInputChange}
                                required
                                className="w-full p-2 border rounded bg-[#fff] text-[#1f1f1f]"
                                placeholder={field.placeholder}
                            />
                        </motion.div>
                    ))}

                    <motion.div
                        className="flex justify-center"
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.6, duration: 0.4 }}
                    >
                        <button
                            type="submit"
                            className="px-6 py-2 bg-[#eea539] hover:bg-[#f0b750] text-white font-semibold rounded transition-colors"
                        >
                            Realizar pago
                        </button>
                    </motion.div>
                </motion.form>
            </div>

            );
};

            export default Pago;