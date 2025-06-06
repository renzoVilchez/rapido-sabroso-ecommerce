import React from "react";
import { Document, Page, Text, View, StyleSheet, Image, PDFDownloadLink } from "@react-pdf/renderer";
import logo from "../assets/images/logos/logo-original.png";

const styles = StyleSheet.create({
  page: { padding: 20 },
  header: { flexDirection: "row", justifyContent: "space-between", marginBottom: 20 },
  logo: { width: 60, height: 60 },
  title: { fontSize: 18, textAlign: "center", marginBottom: 20, textTransform: "uppercase" },
  section: { marginBottom: 10 },
  table: { display: "table", width: "auto", borderStyle: "solid", borderWidth: 1, borderRightWidth: 0, borderBottomWidth: 0 },
  tableRow: { flexDirection: "row" },
  tableColHeader: { width: "20%", borderStyle: "solid", borderWidth: 1, borderLeftWidth: 0, borderTopWidth: 0, backgroundColor: "#f0f0f0", padding: 4 },
  tableCol: { width: "20%", borderStyle: "solid", borderWidth: 1, borderLeftWidth: 0, borderTopWidth: 0, padding: 4 },
  tableCellHeader: { fontWeight: "bold" },
  tableCell: {},
  totals: { marginTop: 10, textAlign: "right" }
});

const ComprobantePDF = ({ comprobante }) => {
  const cliente = comprobante.cliente || {};
  const totales = comprobante.totales || {};

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Image src={logo} style={styles.logo} />
          <View>
            <Text>Serie y número: {comprobante.numeroSerie}</Text>
            <Text>Fecha: {new Date(comprobante.fechaEmision).toLocaleDateString()}</Text>
          </View>
        </View>

        <Text style={styles.title}>
          {comprobante.tipoComprobante === "boleta" ? "Boleta Electrónica" : "Factura Electrónica"}
        </Text>

        <View style={styles.section}>
          <Text>Cliente: {cliente.nombre || comprobante.razonSocial || "N/A"}</Text>
          <Text>Dirección: {cliente.direccionFiscal || cliente.direccion || "N/A"}</Text>
          {comprobante.tipoComprobante === "boleta" ? (
            <Text>DNI: {cliente.dni || "N/A"}</Text>
          ) : (
            <>
              <Text>RUC: {cliente.ruc || "N/A"}</Text>
              <Text>Razón Social: {comprobante.razonSocial || "N/A"}</Text>
              <Text>Dirección Fiscal: {cliente.direccionFiscal || "N/A"}</Text>
            </>
          )}
        </View>

        <View style={styles.table}>
          <View style={styles.tableRow}>
            <Text style={[styles.tableColHeader, styles.tableCellHeader]}>#</Text>
            <Text style={[styles.tableColHeader, styles.tableCellHeader]}>Producto</Text>
            <Text style={[styles.tableColHeader, styles.tableCellHeader]}>Cantidad</Text>
            <Text style={[styles.tableColHeader, styles.tableCellHeader]}>Precio Unitario (S/)</Text>
            <Text style={[styles.tableColHeader, styles.tableCellHeader]}>Total (S/)</Text>
          </View>
          {comprobante.productos?.map((prod, i) => (
            <View key={i} style={styles.tableRow}>
              <Text style={styles.tableCol}>{i + 1}</Text>
              <Text style={styles.tableCol}>{prod.nombre}</Text>
              <Text style={styles.tableCol}>{prod.cantidad}</Text>
              <Text style={styles.tableCol}>{parseFloat(prod.precioUnit).toFixed(2)}</Text>
              <Text style={styles.tableCol}>{(prod.cantidad * parseFloat(prod.precioUnit)).toFixed(2)}</Text>
            </View>
          ))}
        </View>

        <View style={styles.totals}>
          <Text>Subtotal: S/ {parseFloat(totales.subtotal || 0).toFixed(2)}</Text>
          <Text>IGV: S/ {parseFloat(totales.igv || 0).toFixed(2)}</Text>
          <Text>Descuento: S/ {parseFloat(totales.descuento || 0).toFixed(2)}</Text>
          <Text style={{ fontWeight: "bold" }}>
            Total: S/ {parseFloat(totales.total || 0).toFixed(2)}
          </Text>
        </View>
      </Page>
    </Document>
  );
};

export default ComprobantePDF;