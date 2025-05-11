-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 19-04-2025 a las 22:12:37
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `rapido_sabroso`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `admin`
--

CREATE TABLE `admin` (
  `idAdmin` int(11) NOT NULL,
  `nombreAdmin` varchar(100) DEFAULT NULL,
  `correoAdmin` varchar(100) DEFAULT NULL,
  `passwordAdmin` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categoria`
--

CREATE TABLE `categoria` (
  `idCategoria` int(11) NOT NULL,
  `nombreCategoria` varchar(50) DEFAULT NULL,
  `imagenCategoria` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `categoria`
--

INSERT INTO `categoria` (`idCategoria`, `nombreCategoria`, `imagenCategoria`) VALUES
(1, 'Hamburguesas Clásicas', 'HamburguesasClasicas.png'),
(2, 'Hamburguesas Especiales', 'HamburguesasEspeciales.png'),
(3, 'Hamburguesas Veganas', 'HamburguesasVeganas.png'),
(4, 'Hamburguesas Gourmet', 'hamburguesasGourmet.png'),
(5, 'Refrescos', 'refrescos.png'),
(6, 'Jugos Naturales', 'jugosNaturales.png'),
(7, 'Agua', 'agua.png'),
(8, 'Bebidas Tradicionales', 'bebidasTradicionales.png');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cliente`
--

CREATE TABLE `cliente` (
  `idCliente` int(11) NOT NULL,
  `nombreCliente` varchar(100) DEFAULT NULL,
  `correoCliente` varchar(100) DEFAULT NULL,
  `passwordCliente` varchar(255) DEFAULT NULL,
  `puntosCliente` decimal(10,2) DEFAULT NULL,
  `dniCliente` varchar(8) DEFAULT NULL,
  `rucCliente` varchar(11) DEFAULT NULL,
  `razonSocialCliente` varchar(150) DEFAULT NULL,
  `direccionFiscalCliente` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `comprobante`
--

CREATE TABLE `comprobante` (
  `idComprobante` int(11) NOT NULL,
  `idPedido` int(11) NOT NULL,
  `tipoComprobante` enum('boleta','factura') DEFAULT NULL,
  `fechaEmisionComprobante` datetime DEFAULT NULL,
  `dniComprobante` varchar(8) DEFAULT NULL,
  `rucComprobante` varchar(11) DEFAULT NULL,
  `razonSocialComprobante` varchar(150) DEFAULT NULL,
  `direccionFiscalComprobante` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalle_pedido`
--

CREATE TABLE `detalle_pedido` (
  `idDetallePedido` int(11) NOT NULL,
  `idPedido` int(11) NOT NULL,
  `idProducto` int(11) NOT NULL,
  `cantidadDetallePedido` int(11) DEFAULT NULL,
  `precioUnitarioDetallePedido` decimal(10,2) DEFAULT NULL,
  `subtotalDetallePedido` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pedido`
--

CREATE TABLE `pedido` (
  `idPedido` int(11) NOT NULL,
  `idCliente` int(11) NOT NULL,
  `fechaPedido` datetime DEFAULT NULL,
  `totalPedido` decimal(10,2) DEFAULT NULL,
  `puntosGanados` decimal(10,2) DEFAULT 0.00,
  `puntosUsados` decimal(10,2) DEFAULT 0.00
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `producto`
--

CREATE TABLE `producto` (
  `idProducto` int(11) NOT NULL,
  `nombreProducto` varchar(100) DEFAULT NULL,
  `descripcionProducto` text DEFAULT NULL,
  `precioProducto` decimal(10,2) DEFAULT NULL,
  `imagenProducto` varchar(255) DEFAULT NULL,
  `stockProducto` int(11) DEFAULT NULL,
  `idTipoProducto` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `producto`
--

INSERT INTO `producto` (`idProducto`, `nombreProducto`, `descripcionProducto`, `precioProducto`, `imagenProducto`, `stockProducto`, `idTipoProducto`) VALUES
(1, 'Hamburguesa Clásica', 'Carne de res, queso, lechuga, tomate', 12.00, NULL, 0, 1),
(2, 'Hamburguesa con Queso Cheddar', 'Carne de res, queso cheddar, lechuga, tomate', 14.00, NULL, 0, 1),
(3, 'Hamburguesa BBQ', 'Carne de res, cebolla caramelizada, salsa barbacoa', 15.00, NULL, 0, 1),
(4, 'Hamburguesa con Bacon', 'Carne de res, bacon, lechuga, tomate', 16.00, NULL, 0, 1),
(5, 'Hamburguesa Bacon & Cheese', 'Carne de res, bacon, queso cheddar', 18.00, NULL, 0, 1),
(6, 'Hamburguesa Mexicana', 'Carne de res, guacamole, jalapeños, salsa picante', 17.00, NULL, 0, 1),
(7, 'Hamburguesa Hawaiana', 'Carne de res, piña, jamón, queso', 16.50, NULL, 0, 1),
(8, 'Hamburguesa Picante', 'Carne de res, jalapeños, cebolla morada, salsa picante', 17.50, NULL, 0, 1),
(9, 'Hamburguesa Vegana de Tofu', 'Tofu, aguacate, lechuga, tomate', 14.00, NULL, 0, 1),
(10, 'Hamburguesa Vegana de Garbanzos', 'Garbanzos, vegetales, mayonesa vegana', 15.00, NULL, 0, 1),
(11, 'Hamburguesa Vegana de Quinoa', 'Quinoa, aguacate, cebolla caramelizada', 16.00, NULL, 0, 1),
(12, 'Hamburguesa Vegana con Lentejas', 'Lentejas, zanahoria, pepino', 15.50, NULL, 0, 1),
(13, 'Hamburguesa Truffle', 'Carne de res, queso parmesano, trufa, rúcula', 22.00, NULL, 0, 1),
(14, 'Hamburguesa con Foie Gras', 'Carne de res, foie gras, cebolla caramelizada', 24.00, NULL, 0, 1),
(15, 'Hamburguesa Gourmet de Res y Pato', 'Res, pato, cebollas rojas', 25.00, NULL, 0, 1),
(16, 'Hamburguesa Mediterránea', 'Carne de res, feta, aceitunas, tomate seco', 23.00, NULL, 0, 1),
(17, 'Coca-Cola', 'Botella de 500ml de Coca-Cola', 3.00, NULL, 0, 2),
(18, 'Sprite', 'Botella de 500ml de Sprite', 3.00, NULL, 0, 2),
(19, 'Fanta', 'Botella de 500ml de Fanta', 3.00, NULL, 0, 2),
(20, 'Pepsi', 'Botella de 500ml de Pepsi', 3.00, NULL, 0, 2),
(21, 'Jugo de Naranja', 'Vaso de jugo natural de naranja', 4.00, NULL, 0, 2),
(22, 'Jugo de Manzana', 'Vaso de jugo natural de manzana', 4.00, NULL, 0, 2),
(23, 'Jugo de Piña', 'Vaso de jugo natural de piña', 4.00, NULL, 0, 2),
(24, 'Jugo de Maracuyá', 'Vaso de jugo natural de maracuyá', 4.00, NULL, 0, 2),
(25, 'Agua Mineral', 'Botella de agua mineral de 500ml', 2.00, NULL, 0, 2),
(26, 'Agua con Gas', 'Botella de agua con gas de 500ml', 2.50, NULL, 0, 2),
(27, 'Agua de Sabor (limón)', 'Botella de agua de sabor limón de 500ml', 2.50, NULL, 0, 2),
(28, 'Agua de Coco', 'Botella de agua de coco de 500ml', 3.00, NULL, 0, 2),
(29, 'Chicha Morada', 'Vaso de chicha morada', 4.00, NULL, 0, 2),
(30, 'Inca Kola', 'Botella de 500ml de Inca Kola', 3.50, NULL, 0, 2),
(31, 'Emoliente', 'Vaso de emoliente tradicional', 4.00, NULL, 0, 2),
(32, 'Té Helado Casero', 'Vaso de té helado casero (de hierbas o frutas)', 4.50, NULL, 0, 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `producto_categoria`
--

CREATE TABLE `producto_categoria` (
  `idProducto` int(11) NOT NULL,
  `idCategoria` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `producto_categoria`
--

INSERT INTO `producto_categoria` (`idProducto`, `idCategoria`) VALUES
(1, 1),
(2, 1),
(3, 1),
(4, 1),
(5, 2),
(6, 2),
(7, 2),
(8, 2),
(9, 3),
(10, 3),
(11, 3),
(12, 3),
(13, 4),
(14, 4),
(15, 4),
(16, 4),
(17, 5),
(18, 5),
(19, 5),
(20, 5),
(21, 6),
(22, 6),
(23, 6),
(24, 6),
(25, 7),
(26, 7),
(27, 7),
(28, 7),
(29, 8),
(30, 8),
(31, 8),
(32, 8);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipo_producto`
--

CREATE TABLE `tipo_producto` (
  `idTipoProducto` int(11) NOT NULL,
  `nombreTipoProducto` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tipo_producto`
--

INSERT INTO `tipo_producto` (`idTipoProducto`, `nombreTipoProducto`) VALUES
(1, 'Hamburguesas'),
(2, 'Bebidas');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`idAdmin`),
  ADD UNIQUE KEY `correo` (`correoAdmin`);

--
-- Indices de la tabla `categoria`
--
ALTER TABLE `categoria`
  ADD PRIMARY KEY (`idCategoria`);

--
-- Indices de la tabla `cliente`
--
ALTER TABLE `cliente`
  ADD PRIMARY KEY (`idCliente`),
  ADD UNIQUE KEY `correo` (`correoCliente`);

--
-- Indices de la tabla `comprobante`
--
ALTER TABLE `comprobante`
  ADD PRIMARY KEY (`idComprobante`),
  ADD KEY `idPedido` (`idPedido`);

--
-- Indices de la tabla `detalle_pedido`
--
ALTER TABLE `detalle_pedido`
  ADD PRIMARY KEY (`idDetallePedido`),
  ADD KEY `idPedido` (`idPedido`),
  ADD KEY `idProducto` (`idProducto`);

--
-- Indices de la tabla `pedido`
--
ALTER TABLE `pedido`
  ADD PRIMARY KEY (`idPedido`),
  ADD KEY `idCliente` (`idCliente`);

--
-- Indices de la tabla `producto`
--
ALTER TABLE `producto`
  ADD PRIMARY KEY (`idProducto`),
  ADD KEY `idTipoProducto` (`idTipoProducto`);

--
-- Indices de la tabla `producto_categoria`
--
ALTER TABLE `producto_categoria`
  ADD PRIMARY KEY (`idProducto`,`idCategoria`),
  ADD KEY `idCategoria` (`idCategoria`);

--
-- Indices de la tabla `tipo_producto`
--
ALTER TABLE `tipo_producto`
  ADD PRIMARY KEY (`idTipoProducto`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `admin`
--
ALTER TABLE `admin`
  MODIFY `idAdmin` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `categoria`
--
ALTER TABLE `categoria`
  MODIFY `idCategoria` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `cliente`
--
ALTER TABLE `cliente`
  MODIFY `idCliente` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `comprobante`
--
ALTER TABLE `comprobante`
  MODIFY `idComprobante` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `detalle_pedido`
--
ALTER TABLE `detalle_pedido`
  MODIFY `idDetallePedido` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `pedido`
--
ALTER TABLE `pedido`
  MODIFY `idPedido` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `producto`
--
ALTER TABLE `producto`
  MODIFY `idProducto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT de la tabla `tipo_producto`
--
ALTER TABLE `tipo_producto`
  MODIFY `idTipoProducto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `comprobante`
--
ALTER TABLE `comprobante`
  ADD CONSTRAINT `comprobante_ibfk_1` FOREIGN KEY (`idPedido`) REFERENCES `pedido` (`idPedido`);

--
-- Filtros para la tabla `detalle_pedido`
--
ALTER TABLE `detalle_pedido`
  ADD CONSTRAINT `detalle_pedido_ibfk_1` FOREIGN KEY (`idPedido`) REFERENCES `pedido` (`idPedido`),
  ADD CONSTRAINT `detalle_pedido_ibfk_2` FOREIGN KEY (`idProducto`) REFERENCES `producto` (`idProducto`);

--
-- Filtros para la tabla `pedido`
--
ALTER TABLE `pedido`
  ADD CONSTRAINT `pedido_ibfk_1` FOREIGN KEY (`idCliente`) REFERENCES `cliente` (`idCliente`);

--
-- Filtros para la tabla `producto`
--
ALTER TABLE `producto`
  ADD CONSTRAINT `producto_ibfk_1` FOREIGN KEY (`idTipoProducto`) REFERENCES `tipo_producto` (`idTipoProducto`);

--
-- Filtros para la tabla `producto_categoria`
--
ALTER TABLE `producto_categoria`
  ADD CONSTRAINT `producto_categoria_ibfk_1` FOREIGN KEY (`idProducto`) REFERENCES `producto` (`idProducto`),
  ADD CONSTRAINT `producto_categoria_ibfk_2` FOREIGN KEY (`idCategoria`) REFERENCES `categoria` (`idCategoria`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
