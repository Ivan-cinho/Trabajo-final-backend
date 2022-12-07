-- phpMyAdmin SQL Dump
-- version 3.5.1
-- http://www.phpmyadmin.net
--
-- Servidor: localhost
-- Tiempo de generación: 07-12-2022 a las 16:53:20
-- Versión del servidor: 5.5.24-log
-- Versión de PHP: 5.4.3

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de datos: `trabajofinal`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `agenda`
--

CREATE TABLE IF NOT EXISTS `agenda` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fecha` varchar(250) NOT NULL,
  `local` varchar(250) NOT NULL,
  `ciudad` varchar(250) NOT NULL,
  `img_id` varchar(250) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=30 ;

--
-- Volcado de datos para la tabla `agenda`
--

INSERT INTO `agenda` (`id`, `fecha`, `local`, `ciudad`, `img_id`) VALUES
(3, '16 de octubre', 'Mansion Tifon', 'Ramos Mejia', 's7gqvdsg5wy7vjkfwtci'),
(18, '10 de Diciembre', 'Hoodies', 'Haedo', NULL),
(19, '7 de Enero', 'Aquelarre', 'San Bernardo', NULL),
(20, '13 de Enero', 'Buena Vida', 'San Clemente del Tuyu', NULL),
(21, '21 de Enero', 'Al Mar', 'Villa Gesell', ''),
(22, '29 de Enero', 'Tito''s House', 'Villa Gesell', ''),
(23, 'Otra Prueba', 'Otra Prueba', 'Otra Prueba', ''),
(27, 'Otra Prueba distinta', 'Otra Prueba distinta', 'Otra Prueba distinta', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE IF NOT EXISTS `usuarios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `usuario` varchar(250) NOT NULL,
  `password` varchar(250) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=4 ;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `usuario`, `password`) VALUES
(1, 'Ivan', '81dc9bdb52d04dc20036dbd8313ed055'),
(2, 'otroUsuario', 'd93591bdf7860e1e4ee2fca799911215'),
(3, 'unUltimoUsuario', 'c8dfece5cc68249206e4690fc4737a8d');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
