-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2023. Jan 16. 18:34
-- Kiszolgáló verziója: 10.4.22-MariaDB
-- PHP verzió: 8.0.13

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `mezidb`
--

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `checkdata`
--

CREATE TABLE `checkdata` (
  `checkid` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `iranyitoszam2` varchar(11) NOT NULL,
  `varos2` varchar(100) NOT NULL,
  `cim2` varchar(255) NOT NULL,
  `telefonszam2` varchar(255) NOT NULL,
  `kname2` varchar(255) NOT NULL,
  `vname2` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- A tábla adatainak kiíratása `checkdata`
--

INSERT INTO `checkdata` (`checkid`, `user_id`, `iranyitoszam2`, `varos2`, `cim2`, `telefonszam2`, `kname2`, `vname2`) VALUES
(368, 49, '4002', 'Tesz-Vesz', 'Richard Scarry utca 11', '06 52 165 165', 'Tekergő', 'Sajtkukac'),
(369, 50, '4002', 'Tesz-Vesz', 'Richard Scarry utca 12. ', '06 52 706 444', 'Hilda', 'Hyppo'),
(370, 51, '4002', 'Tesz-Vesz', 'Richard Scarry utca 25.  ', '06 52 706 445', 'Úr', 'Bukdács'),
(371, 53, '4002', 'Tesz-Vesz', 'Richard Scarry utca 31.', '06 52 706 500', 'Mester', 'Bütyköl');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `finishorder`
--

CREATE TABLE `finishorder` (
  `id` int(11) NOT NULL,
  `orderid` int(11) NOT NULL,
  `checkId` int(11) NOT NULL,
  `shippingId` int(11) NOT NULL,
  `adozo` varchar(100) NOT NULL,
  `pay` varchar(50) NOT NULL,
  `shipping` varchar(255) NOT NULL,
  `adoszam` varchar(50) NOT NULL,
  `EUadoszam` varchar(50) NOT NULL,
  `comment` text NOT NULL,
  `total` int(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- A tábla adatainak kiíratása `finishorder`
--

INSERT INTO `finishorder` (`id`, `orderid`, `checkId`, `shippingId`, `adozo`, `pay`, `shipping`, `adoszam`, `EUadoszam`, `comment`, `total`) VALUES
(1, 131, 368, 10, 'Magánszemély', 'utalás', 'HÁZHOZSZÁLLÍTÁS GLS FUTÁRSZOLGÁLATTAL (+1600FT utánvét, +1200 FT előre utalás esetén)', '', '', 'A futár érkezés előtt fél órával csörgessen.', 3500),
(2, 132, 368, 10, 'Magánszemély', 'Utanvétel', 'HÁZHOZSZÁLLÍTÁS GLS FUTÁRSZOLGÁLATTAL (+1600FT utánvét, +1200 FT előre utalás esetén)', '', '', '', 3500),
(3, 134, 369, 11, 'Jogi személy', 'utalás', 'HÁZHOZSZÁLLÍTÁS GLS FUTÁRSZOLGÁLATTAL (+1600FT utánvét, +1200 FT előre utalás esetén)', '12345678', '11-112563', '', 27600),
(4, 135, 369, 11, 'Jogi személy', 'utalás', 'HÁZHOZSZÁLLÍTÁS GLS FUTÁRSZOLGÁLATTAL (+1600FT utánvét, +1200 FT előre utalás esetén)', '12345678', '11-112563', '', 14599),
(5, 137, 370, 12, 'Magánszemély', 'Utanvétel', 'Személyes átvétel', '', '', '', 10596),
(6, 138, 370, 12, 'Magánszemély', 'Utanvétel', 'Személyes átvétel', '', 'Az 16 óra után tudom átvenni.', 'Az átvétel csak 16 óra után. ', 4700),
(7, 136, 369, 11, 'Magánszemély', 'Utanvétel', 'HÁZHOZSZÁLLÍTÁS GLS FUTÁRSZOLGÁLATTAL (+1600FT utánvét, +1200 FT előre utalás esetén)', '', '', '', 26199),
(8, 140, 369, 11, 'Magánszemély', 'Utanvétel', 'HÁZHOZSZÁLLÍTÁS GLS FUTÁRSZOLGÁLATTAL (+1600FT utánvét, +1200 FT előre utalás esetén)', '', '', 'A futár érkezés előtt 30 perccel csörgessen!', 13500),
(9, 140, 369, 11, 'Magánszemély', 'Utanvétel', 'HÁZHOZSZÁLLÍTÁS GLS FUTÁRSZOLGÁLATTAL (+1600FT utánvét, +1200 FT előre utalás esetén)', '', '', 'A futár érkezés előtt 30 perccel csörgessen!', 13500),
(10, 140, 369, 11, 'Magánszemély', 'Utanvétel', 'HÁZHOZSZÁLLÍTÁS GLS FUTÁRSZOLGÁLATTAL (+1600FT utánvét, +1200 FT előre utalás esetén)', '', '', 'A futár érkezés előtt 30 perccel csörgessen!', 13500),
(11, 140, 369, 11, 'Magánszemély', 'Utanvétel', 'HÁZHOZSZÁLLÍTÁS GLS FUTÁRSZOLGÁLATTAL (+1600FT utánvét, +1200 FT előre utalás esetén)', '', '', 'A futár érkezés előtt 30 perccel csörgessen!', 13500),
(12, 140, 369, 11, 'Magánszemély', 'Utanvétel', 'HÁZHOZSZÁLLÍTÁS GLS FUTÁRSZOLGÁLATTAL (+1600FT utánvét, +1200 FT előre utalás esetén)', '', '', 'A futár érkezés előtt 30 perccel csörgessen!', 13500),
(13, 140, 369, 11, 'Magánszemély', 'Utanvétel', 'HÁZHOZSZÁLLÍTÁS GLS FUTÁRSZOLGÁLATTAL (+1600FT utánvét, +1200 FT előre utalás esetén)', '', '', 'A futár érkezés előtt 30 perccel csörgessen!', 13500),
(14, 140, 369, 11, 'Magánszemély', 'Utanvétel', 'HÁZHOZSZÁLLÍTÁS GLS FUTÁRSZOLGÁLATTAL (+1600FT utánvét, +1200 FT előre utalás esetén)', '', '', 'A futár érkezés előtt 30 perccel csörgessen!', 13500),
(15, 140, 369, 11, 'Magánszemély', 'Utanvétel', 'HÁZHOZSZÁLLÍTÁS GLS FUTÁRSZOLGÁLATTAL (+1600FT utánvét, +1200 FT előre utalás esetén)', '', '', 'A futár érkezés előtt 30 perccel csörgessen!', 13500),
(16, 140, 369, 11, 'Magánszemély', 'Utanvétel', 'HÁZHOZSZÁLLÍTÁS GLS FUTÁRSZOLGÁLATTAL (+1600FT utánvét, +1200 FT előre utalás esetén)', '', '', 'A futár érkezés előtt 30 perccel csörgessen!', 13500),
(17, 140, 369, 11, 'Magánszemély', 'Utanvétel', 'HÁZHOZSZÁLLÍTÁS GLS FUTÁRSZOLGÁLATTAL (+1600FT utánvét, +1200 FT előre utalás esetén)', '', '', 'A futár érkezés előtt 30 perccel csörgessen!', 13500),
(18, 140, 369, 11, 'Magánszemély', 'Utanvétel', 'HÁZHOZSZÁLLÍTÁS GLS FUTÁRSZOLGÁLATTAL (+1600FT utánvét, +1200 FT előre utalás esetén)', '', '', '', 13500),
(19, 140, 369, 11, 'Magánszemély', 'Utanvétel', 'HÁZHOZSZÁLLÍTÁS GLS FUTÁRSZOLGÁLATTAL (+1600FT utánvét, +1200 FT előre utalás esetén)', '', '', '', 13500),
(20, 140, 369, 11, 'Magánszemély', 'Utanvétel', 'HÁZHOZSZÁLLÍTÁS GLS FUTÁRSZOLGÁLATTAL (+1600FT utánvét, +1200 FT előre utalás esetén)', '', '', 'A futár érkezés előtt 30 perccel csörgessen!', 13500),
(21, 140, 369, 11, 'Magánszemély', 'Utanvétel', 'HÁZHOZSZÁLLÍTÁS GLS FUTÁRSZOLGÁLATTAL (+1600FT utánvét, +1200 FT előre utalás esetén)', '', '', 'A futár érkezés előtt 30 perccel csörgessen!', 13500),
(22, 140, 369, 11, 'Magánszemély', 'Utanvétel', 'HÁZHOZSZÁLLÍTÁS GLS FUTÁRSZOLGÁLATTAL (+1600FT utánvét, +1200 FT előre utalás esetén)', '', '', 'A futár érkezés előtt 30 perccel csörgessen!', 13500),
(23, 140, 369, 11, 'Magánszemély', 'Utanvétel', 'HÁZHOZSZÁLLÍTÁS GLS FUTÁRSZOLGÁLATTAL (+1600FT utánvét, +1200 FT előre utalás esetén)', '', '', 'A futár érkezés előtt 30 perccel csörgessen!', 13500),
(24, 140, 369, 11, 'Magánszemély', 'Utanvétel', 'HÁZHOZSZÁLLÍTÁS GLS FUTÁRSZOLGÁLATTAL (+1600FT utánvét, +1200 FT előre utalás esetén)', '', '', 'A futár érkezés előtt 30 perccel csörgessen!', 13500),
(25, 141, 369, 11, 'Magánszemély', 'Utanvétel', 'HÁZHOZSZÁLLÍTÁS GLS FUTÁRSZOLGÁLATTAL (+1600FT utánvét, +1200 FT előre utalás esetén)', '', '', '', 4500),
(26, 143, 371, 13, 'Magánszemély', 'Utanvétel', 'Személyes átvétel', '', '', '16 óra után tudom átvenni.', 9000);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `level`
--

CREATE TABLE `level` (
  `id` int(11) NOT NULL,
  `level` varchar(10) NOT NULL,
  `code` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- A tábla adatainak kiíratása `level`
--

INSERT INTO `level` (`id`, `level`, `code`) VALUES
(1, 'users', 2000),
(2, 'admin', 2001);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `level_user`
--

CREATE TABLE `level_user` (
  `id` int(11) NOT NULL,
  `level_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- A tábla adatainak kiíratása `level_user`
--

INSERT INTO `level_user` (`id`, `level_id`, `user_id`) VALUES
(1, 1, 47),
(2, 1, 48),
(3, 1, 49),
(4, 2, 47),
(5, 2, 48),
(6, 1, 50),
(7, 1, 51),
(9, 1, 53);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `messagetb`
--

CREATE TABLE `messagetb` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `msg` text NOT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- A tábla adatainak kiíratása `messagetb`
--

INSERT INTO `messagetb` (`id`, `email`, `msg`, `date`) VALUES
(1, 'bukdacs@gmail.com', 'Személyes átvétel esetén milyen időszakban vehető át a rendelés?', '2023-01-15 17:42:44'),
(2, 'charlie@gmail.com', 'Ezek kézműves termékek?', '2023-01-15 17:43:50'),
(3, 'berci@gmail.com', 'Mennyi idő a kiszállítás?', '2023-01-15 17:44:39'),
(4, 'billy@gmail.com', 'Mekkora a legkisebb rendelhető mennyiség?', '2023-01-15 17:46:51'),
(5, 'hilda@gmail.com', 'Hány nap alatt várható a kiszállítás?', '2023-01-15 17:48:30'),
(6, 'mester@gmail.com', 'A rendelésemet várhatóan hány napon belül tudom átvenni?', '2023-01-16 14:05:58');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `orderstatus`
--

CREATE TABLE `orderstatus` (
  `id` int(11) NOT NULL,
  `userid` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `status` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- A tábla adatainak kiíratása `orderstatus`
--

INSERT INTO `orderstatus` (`id`, `userid`, `email`, `status`) VALUES
(131, 49, 'tekergo@gmail.com', 'lezárt'),
(132, 49, 'tekergo@gmail.com', 'kiszállításra vár'),
(133, 49, 'tekergo@gmail.com', 'folyamatban'),
(134, 50, 'hilda@gmail.com', 'lezárt'),
(135, 50, 'hilda@gmail.com', 'lezárt'),
(136, 50, 'hilda@gmail.com', 'lezárt'),
(137, 51, 'bukdacs@gmail.com', 'lezárt'),
(138, 51, 'bukdacs@gmail.com', 'kiszállításra vár'),
(139, 51, 'bukdacs@gmail.com', 'folyamatban'),
(140, 50, 'hilda@gmail.com', 'lezárt'),
(141, 50, 'hilda@gmail.com', 'kiszállításra vár'),
(143, 53, 'mester@gmail.com', 'kiszállításra vár'),
(144, 53, 'mester@gmail.com', 'folyamatban');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `product`
--

CREATE TABLE `product` (
  `id` int(11) NOT NULL,
  `termeknev` varchar(255) NOT NULL,
  `mennyiseg` varchar(100) NOT NULL,
  `ar` int(55) NOT NULL,
  `img` text NOT NULL,
  `status` varchar(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- A tábla adatainak kiíratása `product`
--

INSERT INTO `product` (`id`, `termeknev`, `mennyiseg`, `ar`, `img`, `status`) VALUES
(1, 'Virágméz', '200 g', 3500, '1_viragmez.jpg', 'active'),
(2, 'Méhpempő', '150 g', 3500, '2_mehpempo.jpg', 'active'),
(3, 'Méhviaszgyertya', '2 db', 3500, '3_mehviaszgyertya.jpg', 'active'),
(4, 'Virágpor', '200 g', 1200, '2_virágpor.jpg', 'active'),
(5, 'Manuka méz', '250 g', 5500, '5_manukamez.jpg', 'active'),
(6, 'Mézes-levendulás cukor', '100 g', 899, '5_mezes-levendulas-cukorkak.jpg', 'active'),
(7, 'Propolisz csepp', '20 ml', 3600, '6_propoliszcsepp.jpg', 'active'),
(8, 'Akácméz', '500 g', 2500, '6_akacmez.jpg', 'active'),
(9, 'Mézes keksz', '5 db', 1000, '10_mezeskeksz.jpg', 'active'),
(10, 'Mézes szappan', '1 db', 4500, '18_mezesszappan.jpg', 'active');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `rendeles`
--

CREATE TABLE `rendeles` (
  `id` int(11) NOT NULL,
  `email` varchar(80) NOT NULL,
  `userid` int(11) NOT NULL,
  `termekid` int(11) NOT NULL,
  `termeknev` varchar(255) NOT NULL,
  `db` int(11) NOT NULL,
  `ar` int(55) NOT NULL,
  `img` text NOT NULL,
  `orderid` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- A tábla adatainak kiíratása `rendeles`
--

INSERT INTO `rendeles` (`id`, `email`, `userid`, `termekid`, `termeknev`, `db`, `ar`, `img`, `orderid`) VALUES
(1, 'tekergo@gmail.com', 49, 2, 'Méhpempő', 1, 3500, 'http://localhost/mezi_be/images/2_mehpempo.jpg', 131),
(2, 'tekergo@gmail.com', 49, 1, 'Virágméz', 1, 3500, 'http://localhost/mezi_be/images/1_viragmez.jpg', 132),
(3, 'tekergo@gmail.com', 49, 10, 'Mézes szappan', 1, 4500, 'http://localhost/mezi_be/images/18_mezesszappan.jpg', 133),
(4, 'hilda@gmail.com', 50, 1, 'Virágméz', 2, 3500, 'http://localhost/mezi_be/images/1_viragmez.jpg', 134),
(5, 'hilda@gmail.com', 50, 4, 'Virágpor', 2, 1200, 'http://localhost/mezi_be/images/2_virágpor.jpg', 134),
(6, 'hilda@gmail.com', 50, 5, 'Manuka méz', 2, 5500, 'http://localhost/mezi_be/images/5_manukamez.jpg', 134),
(7, 'hilda@gmail.com', 50, 7, 'Propolisz csepp', 2, 3600, 'http://localhost/mezi_be/images/6_propoliszcsepp.jpg', 134),
(8, 'hilda@gmail.com', 50, 2, 'Méhpempő', 1, 3500, 'http://localhost/mezi_be/images/2_mehpempo.jpg', 135),
(9, 'hilda@gmail.com', 50, 3, 'Méhviaszgyertya', 1, 3500, 'http://localhost/mezi_be/images/3_mehviaszgyertya.jpg', 135),
(10, 'hilda@gmail.com', 50, 4, 'Virágpor', 1, 1200, 'http://localhost/mezi_be/images/2_virágpor.jpg', 135),
(11, 'hilda@gmail.com', 50, 5, 'Manuka méz', 1, 5500, 'http://localhost/mezi_be/images/5_manukamez.jpg', 135),
(12, 'hilda@gmail.com', 50, 6, 'Mézes-levendulás cukor', 1, 899, 'http://localhost/mezi_be/images/5_mezes-levendulas-cukorkak.jpg', 135),
(13, 'hilda@gmail.com', 50, 3, 'Méhviaszgyertya', 1, 3500, 'http://localhost/mezi_be/images/3_mehviaszgyertya.jpg', 136),
(14, 'hilda@gmail.com', 50, 9, 'Mézes keksz', 1, 1000, 'http://localhost/mezi_be/images/10_mezeskeksz.jpg', 136),
(15, 'hilda@gmail.com', 50, 10, 'Mézes szappan', 1, 4500, 'http://localhost/mezi_be/images/18_mezesszappan.jpg', 136),
(16, 'bukdacs@gmail.com', 51, 1, 'Virágméz', 1, 3500, 'http://localhost/mezi_be/images/1_viragmez.jpg', 137),
(17, 'bukdacs@gmail.com', 51, 2, 'Méhpempő', 1, 3500, 'http://localhost/mezi_be/images/2_mehpempo.jpg', 137),
(18, 'bukdacs@gmail.com', 51, 6, 'Mézes-levendulás cukor', 4, 899, 'http://localhost/mezi_be/images/5_mezes-levendulas-cukorkak.jpg', 137),
(19, 'bukdacs@gmail.com', 51, 2, 'Méhpempő', 1, 3500, 'http://localhost/mezi_be/images/2_mehpempo.jpg', 138),
(20, 'bukdacs@gmail.com', 51, 4, 'Virágpor', 1, 1200, 'http://localhost/mezi_be/images/2_virágpor.jpg', 138),
(21, 'bukdacs@gmail.com', 51, 5, 'Manuka méz', 1, 5500, 'http://localhost/mezi_be/images/5_manukamez.jpg', 139),
(22, 'bukdacs@gmail.com', 51, 9, 'Mézes keksz', 1, 1000, 'http://localhost/mezi_be/images/10_mezeskeksz.jpg', 139),
(23, 'hilda@gmail.com', 50, 1, 'Virágméz', 1, 3500, 'http://localhost/mezi_be/images/1_viragmez.jpg', 136),
(24, 'hilda@gmail.com', 50, 4, 'Virágpor', 1, 1200, 'http://localhost/mezi_be/images/2_virágpor.jpg', 136),
(25, 'hilda@gmail.com', 50, 5, 'Manuka méz', 1, 5500, 'http://localhost/mezi_be/images/5_manukamez.jpg', 136),
(26, 'hilda@gmail.com', 50, 6, 'Mézes-levendulás cukor', 1, 899, 'http://localhost/mezi_be/images/5_mezes-levendulas-cukorkak.jpg', 136),
(27, 'hilda@gmail.com', 50, 7, 'Propolisz csepp', 1, 3600, 'http://localhost/mezi_be/images/6_propoliszcsepp.jpg', 136),
(28, 'hilda@gmail.com', 50, 8, 'Akácméz', 1, 2500, 'http://localhost/mezi_be/images/6_akacmez.jpg', 136),
(31, 'hilda@gmail.com', 50, 10, 'Mézes szappan', 3, 4500, 'http://localhost/mezi_be/images/18_mezesszappan.jpg', 140),
(41, 'hilda@gmail.com', 50, 10, 'Mézes szappan', 1, 4500, 'http://localhost/mezi_be/images/18_mezesszappan.jpg', 141),
(45, 'mester@gmail.com', 53, 10, 'Mézes szappan', 2, 4500, 'http://localhost/mezi_be/images/18_mezesszappan.jpg', 143),
(47, 'mester@gmail.com', 53, 2, 'Méhpempő', 1, 3500, 'http://localhost/mezi_be/images/2_mehpempo.jpg', 144),
(48, 'mester@gmail.com', 53, 3, 'Méhviaszgyertya', 1, 3500, 'http://localhost/mezi_be/images/3_mehviaszgyertya.jpg', 144),
(49, 'mester@gmail.com', 53, 4, 'Virágpor', 1, 1200, 'http://localhost/mezi_be/images/2_virágpor.jpg', 144),
(50, 'mester@gmail.com', 53, 5, 'Manuka méz', 1, 5500, 'http://localhost/mezi_be/images/5_manukamez.jpg', 144);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `shippingdata`
--

CREATE TABLE `shippingdata` (
  `shipid` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `iranyitoszam` varchar(11) NOT NULL,
  `varos` varchar(100) NOT NULL,
  `cim` varchar(255) NOT NULL,
  `telefonszam` varchar(65) NOT NULL,
  `vname1` varchar(255) NOT NULL,
  `kname1` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- A tábla adatainak kiíratása `shippingdata`
--

INSERT INTO `shippingdata` (`shipid`, `user_id`, `iranyitoszam`, `varos`, `cim`, `telefonszam`, `vname1`, `kname1`) VALUES
(10, 49, '4002', 'Tesz-Vesz', 'Richard Scarry utca 11', '06 52 165 165', 'Sajtkukac', 'Tekergő'),
(11, 50, '4002', 'Tesz-Vesz', 'Richard Scarry utca 12. ', '06 52 706 444', 'Hyppo', 'Hilda'),
(12, 51, '', '', '', '', '', ''),
(13, 53, '', '', '', '', '', '');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(80) COLLATE utf8_hungarian_ci NOT NULL,
  `password` text COLLATE utf8_hungarian_ci NOT NULL,
  `accsesToken` varchar(100) COLLATE utf8_hungarian_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `users`
--

INSERT INTO `users` (`id`, `email`, `password`, `accsesToken`) VALUES
(47, 'cico@gmail.com', '$2y$10$19Exbsl.7CEbctyVugCRsukB9G.f/4NJ29/N/UkdgdOgT0TWpbZe.', '421d4e752b'),
(48, 'cicus@gmail.com', '$2y$10$qZ3YaF1Cj83CpOhKyQRuIu8cTmJyH06GRhpxJgw6emL9DaRkeBUy.', 'd9b44eb1fb'),
(49, 'tekergo@gmail.com', '$2y$10$NX7Wt.gpvjA9dGHTREk.0.u2zavmZ3rwtIeSQp8pzf.vAIpWAfTJy', 'db9752a6d6'),
(50, 'hilda@gmail.com', '$2y$10$.BHqgXI4B/TRk4qmswgBp./Iuf0865w5PGVFGwQXF6swRo/uJREfK', 'e9c4c7f77d'),
(51, 'bukdacs@gmail.com', '$2y$10$PBz2h3P4VRKVl6FVXa2Wz.lB3hVQFbZvDzNbM3J3Vd1cc8f6/kkPi', '4319a5e669'),
(53, 'mester@gmail.com', '$2y$10$41YB7TpjJKsfxHqtOc4tsuWTk0rN2G9e3cBP.KCyfRSlf1QJoApY2', 'e402f078ec');

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `checkdata`
--
ALTER TABLE `checkdata`
  ADD PRIMARY KEY (`checkid`),
  ADD KEY `user_id` (`user_id`);

--
-- A tábla indexei `finishorder`
--
ALTER TABLE `finishorder`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id` (`orderid`),
  ADD KEY `shippingId` (`shippingId`),
  ADD KEY `checkId` (`checkId`);

--
-- A tábla indexei `level`
--
ALTER TABLE `level`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `level_user`
--
ALTER TABLE `level_user`
  ADD PRIMARY KEY (`id`),
  ADD KEY `level_id` (`level_id`),
  ADD KEY `user_id` (`user_id`);

--
-- A tábla indexei `messagetb`
--
ALTER TABLE `messagetb`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `orderstatus`
--
ALTER TABLE `orderstatus`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userid` (`userid`);

--
-- A tábla indexei `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `rendeles`
--
ALTER TABLE `rendeles`
  ADD PRIMARY KEY (`id`),
  ADD KEY `orderid` (`orderid`),
  ADD KEY `userid` (`userid`);

--
-- A tábla indexei `shippingdata`
--
ALTER TABLE `shippingdata`
  ADD PRIMARY KEY (`shipid`),
  ADD KEY `user_id` (`user_id`);

--
-- A tábla indexei `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `checkdata`
--
ALTER TABLE `checkdata`
  MODIFY `checkid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=372;

--
-- AUTO_INCREMENT a táblához `finishorder`
--
ALTER TABLE `finishorder`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT a táblához `level`
--
ALTER TABLE `level`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT a táblához `level_user`
--
ALTER TABLE `level_user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT a táblához `messagetb`
--
ALTER TABLE `messagetb`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT a táblához `orderstatus`
--
ALTER TABLE `orderstatus`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=145;

--
-- AUTO_INCREMENT a táblához `product`
--
ALTER TABLE `product`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT a táblához `rendeles`
--
ALTER TABLE `rendeles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- AUTO_INCREMENT a táblához `shippingdata`
--
ALTER TABLE `shippingdata`
  MODIFY `shipid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT a táblához `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=54;

--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `checkdata`
--
ALTER TABLE `checkdata`
  ADD CONSTRAINT `checkdata_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Megkötések a táblához `finishorder`
--
ALTER TABLE `finishorder`
  ADD CONSTRAINT `finishorder_ibfk_1` FOREIGN KEY (`orderid`) REFERENCES `orderstatus` (`id`),
  ADD CONSTRAINT `finishorder_ibfk_2` FOREIGN KEY (`shippingId`) REFERENCES `shippingdata` (`shipid`),
  ADD CONSTRAINT `finishorder_ibfk_3` FOREIGN KEY (`checkId`) REFERENCES `checkdata` (`checkid`);

--
-- Megkötések a táblához `level_user`
--
ALTER TABLE `level_user`
  ADD CONSTRAINT `level_user_ibfk_1` FOREIGN KEY (`level_id`) REFERENCES `level` (`id`),
  ADD CONSTRAINT `level_user_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Megkötések a táblához `orderstatus`
--
ALTER TABLE `orderstatus`
  ADD CONSTRAINT `orderstatus_ibfk_1` FOREIGN KEY (`userid`) REFERENCES `users` (`id`);

--
-- Megkötések a táblához `rendeles`
--
ALTER TABLE `rendeles`
  ADD CONSTRAINT `rendeles_ibfk_1` FOREIGN KEY (`orderid`) REFERENCES `orderstatus` (`id`),
  ADD CONSTRAINT `rendeles_ibfk_2` FOREIGN KEY (`userid`) REFERENCES `users` (`id`);

--
-- Megkötések a táblához `shippingdata`
--
ALTER TABLE `shippingdata`
  ADD CONSTRAINT `shippingdata_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
