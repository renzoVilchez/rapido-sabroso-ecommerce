export function validarDatosPago(datos, tipoPago, productos) {
  if (!datos.idCliente) return "No se pudo obtener el ID del cliente.";
  if (!datos.metodoPago) return "Seleccione un método de pago.";
  if (productos.length === 0) return "El carrito está vacío.";
  if (tipoPago === "boleta" && !datos.dni) return "Ingrese el DNI.";
  if (tipoPago === "factura" && (!datos.ruc || !datos.razonSocial || !datos.direccionFiscal)) {
    return "Complete todos los campos para la factura.";
  }
  return null;
}