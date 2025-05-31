import { useState, useEffect } from "react";

export const useCliente = () => {
    const [cliente, setCliente] = useState({
        idCliente: "",
        nombre: "",
        apellidos: "",
        direccion: "",
        ruc: "",
        dni: "",
        razonSocial: "",
        direccionFiscal: "",
        metodoPago: "",
    });

    useEffect(() => {
        const usuario = JSON.parse(localStorage.getItem("usuario"));

        if (usuario) {
            setCliente({
                idCliente: usuario.id_cliente || "",
                nombre: usuario.nombre || "",
                apellidos: usuario.apellidos || "",
                direccion: usuario.direccion || "",
                ruc: usuario.ruc || "",
                dni: usuario.dni || "",
                razonSocial: usuario.razon_social || "",
                direccionFiscal: usuario.direccion_fiscal || "",
                metodoPago: usuario.metodo_pago || "",
            });
        }
    }, []);

    const actualizarCampo = (name, value) => {
        setCliente(prev => ({ ...prev, [name]: value }));
    };

    return {
        cliente,
        actualizarCampo,
        setCliente,
    };
};