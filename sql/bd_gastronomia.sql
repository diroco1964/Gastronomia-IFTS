-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 28-11-2025 a las 13:02:08
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `bd_gastronomia`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `calculo_menu`
--

CREATE TABLE `calculo_menu` (
  `id` int(11) NOT NULL,
  `costo_porcion` float DEFAULT NULL,
  `costo_total` float DEFAULT NULL,
  `id_menu` int(11) NOT NULL,
  `id_receta` varchar(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ficha_tecnica`
--

CREATE TABLE `ficha_tecnica` (
  `nombre_receta` varchar(20) DEFAULT NULL,
  `descripcion` char(1) DEFAULT NULL,
  `codigo` varchar(10) NOT NULL,
  `categoria` varchar(15) DEFAULT NULL,
  `factor_correccion` float DEFAULT NULL,
  `proporcion_estandar` int(11) DEFAULT NULL,
  `presentacion` char(1) DEFAULT NULL,
  `costo_porcion` float DEFAULT NULL,
  `notas` char(1) DEFAULT NULL,
  `id_materia_prima` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `historial`
--

CREATE TABLE `historial` (
  `id` int(11) NOT NULL,
  `id_menu` int(11) NOT NULL,
  `id_recetas` varchar(15) NOT NULL,
  `id_materias_primas` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `resultado_costo` int(11) DEFAULT NULL,
  `fecha` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `materias_primas`
--

CREATE TABLE `materias_primas` (
  `id` int(11) NOT NULL,
  `nombre` varchar(20) DEFAULT NULL,
  `unidad_medida` varchar(10) DEFAULT NULL,
  `precio_unitario` float DEFAULT NULL,
  `stock` int(11) DEFAULT NULL,
  `proveedor` varchar(15) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `materias_primas_proveedor`
--

CREATE TABLE `materias_primas_proveedor` (
  `id` int(11) NOT NULL,
  `nombre` varchar(20) DEFAULT NULL,
  `contacto` varchar(15) DEFAULT NULL,
  `fecha_actualizacion` date DEFAULT NULL,
  `id_prima` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `menu`
--

CREATE TABLE `menu` (
  `id` int(11) NOT NULL,
  `id_usuario` int(11) DEFAULT NULL,
  `nombre_evento` varchar(20) DEFAULT NULL,
  `fecha_evento` date DEFAULT NULL,
  `fecha_presupuesto` date DEFAULT NULL,
  `numero_comensales` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `menu_recetas`
--

CREATE TABLE `menu_recetas` (
  `id` int(11) NOT NULL,
  `nombre` varchar(20) DEFAULT NULL,
  `porciones` int(11) DEFAULT NULL,
  `id_receta` varchar(15) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `recetas_ingredientes`
--

CREATE TABLE `recetas_ingredientes` (
  `id` int(11) NOT NULL,
  `cantidad_bruta` float DEFAULT NULL,
  `factor_correccion` float DEFAULT NULL,
  `cantidad_neta` float DEFAULT NULL,
  `unidad_medida` varchar(10) DEFAULT NULL,
  `id_receta` int(11) NOT NULL,
  `id_materias_primas` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `id` int(11) NOT NULL,
  `rol` enum('administrador','estudiante') DEFAULT NULL,
  `fecha_creacion` datetime DEFAULT NULL,
  `activo` tinyint(1) DEFAULT NULL,
  `nombre` varchar(20) NOT NULL,
  `apellido` varchar(20) NOT NULL,
  `id_materia_prima` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `calculo_menu`
--
ALTER TABLE `calculo_menu`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_menu` (`id_menu`),
  ADD KEY `id_receta` (`id_receta`);

--
-- Indices de la tabla `ficha_tecnica`
--
ALTER TABLE `ficha_tecnica`
  ADD PRIMARY KEY (`codigo`),
  ADD KEY `id_materia_prima` (`id_materia_prima`);

--
-- Indices de la tabla `historial`
--
ALTER TABLE `historial`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_menu` (`id_menu`),
  ADD KEY `id_primas` (`id_materias_primas`),
  ADD KEY `id_user` (`id_usuario`),
  ADD KEY `id_recetas` (`id_recetas`);

--
-- Indices de la tabla `materias_primas`
--
ALTER TABLE `materias_primas`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `materias_primas_proveedor`
--
ALTER TABLE `materias_primas_proveedor`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_materias_primas` (`id_prima`);

--
-- Indices de la tabla `menu`
--
ALTER TABLE `menu`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_usuario` (`id_usuario`);

--
-- Indices de la tabla `menu_recetas`
--
ALTER TABLE `menu_recetas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_recetas` (`id_receta`);

--
-- Indices de la tabla `recetas_ingredientes`
--
ALTER TABLE `recetas_ingredientes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `menu_recetas` (`id_receta`),
  ADD KEY `id_materias_primas` (`id_materias_primas`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idPrima` (`id_materia_prima`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `calculo_menu`
--
ALTER TABLE `calculo_menu`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `historial`
--
ALTER TABLE `historial`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `materias_primas`
--
ALTER TABLE `materias_primas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `materias_primas_proveedor`
--
ALTER TABLE `materias_primas_proveedor`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `menu`
--
ALTER TABLE `menu`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `menu_recetas`
--
ALTER TABLE `menu_recetas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `recetas_ingredientes`
--
ALTER TABLE `recetas_ingredientes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `calculo_menu`
--
ALTER TABLE `calculo_menu`
  ADD CONSTRAINT `calculo_menu_ibfk_1` FOREIGN KEY (`id_menu`) REFERENCES `menu` (`id`),
  ADD CONSTRAINT `calculo_menu_ibfk_2` FOREIGN KEY (`id_receta`) REFERENCES `ficha_tecnica` (`codigo`);

--
-- Filtros para la tabla `ficha_tecnica`
--
ALTER TABLE `ficha_tecnica`
  ADD CONSTRAINT `ficha_tecnica_ibfk_1` FOREIGN KEY (`id_materia_prima`) REFERENCES `materias_primas` (`id`);

--
-- Filtros para la tabla `historial`
--
ALTER TABLE `historial`
  ADD CONSTRAINT `historial_ibfk_1` FOREIGN KEY (`id_recetas`) REFERENCES `ficha_tecnica` (`codigo`),
  ADD CONSTRAINT `id_menu` FOREIGN KEY (`id_menu`) REFERENCES `menu` (`id`),
  ADD CONSTRAINT `id_primas` FOREIGN KEY (`id_materias_primas`) REFERENCES `materias_primas` (`id`),
  ADD CONSTRAINT `id_user` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id`);

--
-- Filtros para la tabla `materias_primas_proveedor`
--
ALTER TABLE `materias_primas_proveedor`
  ADD CONSTRAINT `id_materias_primas` FOREIGN KEY (`id_prima`) REFERENCES `materias_primas` (`id`);

--
-- Filtros para la tabla `menu`
--
ALTER TABLE `menu`
  ADD CONSTRAINT `menu_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id`);

--
-- Filtros para la tabla `menu_recetas`
--
ALTER TABLE `menu_recetas`
  ADD CONSTRAINT `id_recetas` FOREIGN KEY (`id_receta`) REFERENCES `ficha_tecnica` (`codigo`);

--
-- Filtros para la tabla `recetas_ingredientes`
--
ALTER TABLE `recetas_ingredientes`
  ADD CONSTRAINT `menu_recetas` FOREIGN KEY (`id_receta`) REFERENCES `menu_recetas` (`id`);

--
-- Filtros para la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD CONSTRAINT `usuario_ibfk_1` FOREIGN KEY (`id_materia_prima`) REFERENCES `materias_primas` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
