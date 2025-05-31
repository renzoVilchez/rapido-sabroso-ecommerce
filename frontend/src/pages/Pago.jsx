import { useState, useEffect } from "react";
import axios from 'axios';
import { motion } from "framer-motion";
import ResumenPedidos from "../components/ResumenPedidos";
import FormularioPago from "../components/FormularioPago";

const Pago = () => {

    const [datos, setDatos] = useState({
        idCliente: "",
        nombre: "",
        apellidos: "",
        direccion: "",
        ruc: "",
        dni: "",
        razonSocial: "",
        direccionFiscal: "",
        metodoPago: ""
    });

    const [metodosPago, setMetodosPago] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [tipoPago, setTipoPago] = useState("boleta");
    const [total, setTotal] = useState(0);
    const [productos, setProductos] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5000/api/metodos-pago")
            .then(response => {
                setMetodosPago(response.data);
                setIsLoading(false);
            })
            .catch(error => {
                console.error("Error al obtener los métodos de pago:", error);
                setIsLoading(false);
            });
    }, []);

    useEffect(() => {
        // Leer carrito y tipo de pago desde localStorage
        const carritoGuardado = localStorage.getItem('carrito');
        const tipoPagoGuardado = localStorage.getItem('tipoPago');

        if (carritoGuardado) {
            try {
                const carritoParseado = JSON.parse(carritoGuardado);
                if (Array.isArray(carritoParseado)) {
                    // Ajustamos para que use las claves que tienes en el localStorage
                    const carritoConNumeros = carritoParseado.map(item => ({
                        ...item,
                        precioProducto: Number(item.precio || item.precioProducto || 0),
                        cantidad: Number(item.cantidad || 0),
                        nombreProducto: item.nombre || item.nombreProducto || "Producto",
                        idProducto: item.idProducto || null,
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
        if (usuario && usuario.email) {
            axios.get(`http://localhost:5000/api/clientes/correo/${usuario.email}`)
                .then(response => {
                    const data = response.data;
                    setDatos(prev => ({
                        ...prev,
                        idCliente: data.id_cliente || "",
                        nombre: data.nombre || "",
                        apellidos: data.apellidos || "",
                        direccion: data.direccion || "",
                        dni: data.dni || "",
                        ruc: data.ruc || "",
                        razonSocial: data.razon_social || "",
                        direccionFiscal: data.direccion_fiscal || ""
                    }));

                })
                .catch(error => {
                    console.error('Error al traer los datos del cliente:', error);
                });
        } else {
            console.log('No hay datos del usuario en localStorage');
        }
    }, []);

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

            <ResumenPedidos />
            <FormularioPago />

        </div>
    );
};

export default Pago;