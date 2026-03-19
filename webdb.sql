-- phpMyAdmin SQL Dump
-- version 5.2.3
-- https://www.phpmyadmin.net/
--
-- Host: db:3306
-- Generation Time: Mar 19, 2026 at 03:19 PM
-- Server version: 8.4.8
-- PHP Version: 8.3.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `webdb`
--

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int NOT NULL,
  `user_id` int NOT NULL,
  `total_price` decimal(10,2) NOT NULL,
  `status` varchar(50) DEFAULT 'pending',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `user_id`, `total_price`, `status`, `created_at`) VALUES
(14, 4, 77700.00, 'completed', '2026-03-15 18:43:23'),
(15, 4, 8900.00, 'completed', '2026-03-15 18:50:20'),
(16, 4, 16879.00, 'shipped', '2026-03-15 19:22:20'),
(17, 8, 101980.00, 'completed', '2026-03-15 19:36:04'),
(18, 4, 12870.00, 'cancelled', '2026-03-15 22:31:58'),
(19, 4, 1250.00, 'cancelled', '2026-03-15 22:40:38'),
(23, 10, 451100.00, 'completed', '2026-03-16 09:26:46'),
(24, 10, 5290.00, 'cancelled', '2026-03-16 09:30:52'),
(25, 10, 16470.00, 'cancelled', '2026-03-16 09:35:57'),
(26, 10, 5290.00, 'cancelled', '2026-03-16 09:36:10'),
(27, 10, 5290.00, 'cancelled', '2026-03-16 09:36:23'),
(28, 10, 5690.00, 'completed', '2026-03-16 09:37:51'),
(29, 10, 42990.00, 'shipped', '2026-03-16 09:46:27'),
(30, 10, 5900.00, 'cancelled', '2026-03-16 09:55:02'),
(31, 10, 4990.00, 'cancelled', '2026-03-16 10:01:42'),
(32, 10, 4990.00, 'cancelled', '2026-03-16 10:22:32'),
(33, 11, 446110.00, 'completed', '2026-03-16 10:29:48'),
(34, 11, 419980.00, 'cancelled', '2026-03-16 10:32:11'),
(35, 11, 10900.00, 'completed', '2026-03-16 10:33:36'),
(36, 12, 123600.00, 'shipped', '2026-03-16 12:43:16'),
(37, 12, 5290.00, 'cancelled', '2026-03-16 12:45:24'),
(38, 13, 8900.00, 'shipped', '2026-03-16 13:45:27'),
(39, 14, 114700.00, 'completed', '2026-03-16 17:26:00'),
(40, 14, 4990.00, 'cancelled', '2026-03-16 17:27:57'),
(41, 14, 5290.00, 'cancelled', '2026-03-17 13:41:28'),
(42, 14, 5690.00, 'pending', '2026-03-17 15:04:42'),
(43, 14, 42990.00, 'pending', '2026-03-17 15:10:07'),
(44, 15, 209990.00, 'completed', '2026-03-19 13:45:21'),
(45, 15, 17060.00, 'pending', '2026-03-19 13:49:06');

-- --------------------------------------------------------

--
-- Table structure for table `order_items`
--

CREATE TABLE `order_items` (
  `id` int NOT NULL,
  `order_id` int NOT NULL,
  `product_id` int NOT NULL,
  `quantity` int NOT NULL,
  `price` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `order_items`
--

INSERT INTO `order_items` (`id`, `order_id`, `product_id`, `quantity`, `price`) VALUES
(25, 14, 6, 3, 25900.00),
(26, 15, 1, 1, 8900.00),
(27, 16, 1, 1, 7999.00),
(28, 16, 2, 1, 4590.00),
(29, 16, 3, 1, 4290.00),
(30, 17, 12, 2, 50990.00),
(31, 18, 3, 3, 4290.00),
(32, 19, 7, 1, 1250.00),
(33, 23, 1, 2, 4990.00),
(34, 23, 17, 1, 62900.00),
(35, 23, 8, 1, 5990.00),
(36, 23, 35, 1, 10900.00),
(37, 23, 26, 1, 124350.00),
(38, 23, 23, 1, 26990.00),
(39, 23, 29, 1, 209990.00),
(40, 24, 4, 1, 5290.00),
(41, 25, 4, 1, 5290.00),
(42, 25, 3, 1, 5690.00),
(43, 25, 2, 1, 5490.00),
(44, 26, 4, 1, 5290.00),
(45, 27, 4, 1, 5290.00),
(46, 28, 3, 1, 5690.00),
(47, 29, 32, 1, 42990.00),
(48, 30, 22, 1, 5900.00),
(49, 31, 1, 1, 4990.00),
(50, 32, 1, 1, 4990.00),
(51, 33, 1, 1, 4990.00),
(52, 33, 17, 1, 62900.00),
(53, 33, 8, 1, 5990.00),
(54, 33, 35, 1, 10900.00),
(55, 33, 26, 1, 124350.00),
(56, 33, 23, 1, 26990.00),
(57, 33, 29, 1, 209990.00),
(58, 34, 29, 2, 209990.00),
(59, 35, 35, 1, 10900.00),
(60, 36, 17, 1, 62900.00),
(61, 36, 18, 1, 37900.00),
(62, 36, 19, 1, 13900.00),
(63, 36, 20, 1, 8900.00),
(64, 37, 4, 1, 5290.00),
(65, 38, 20, 1, 8900.00),
(66, 39, 17, 1, 62900.00),
(67, 39, 18, 1, 37900.00),
(68, 39, 19, 1, 13900.00),
(69, 40, 1, 1, 4990.00),
(70, 41, 4, 1, 5290.00),
(71, 42, 3, 1, 5690.00),
(72, 43, 32, 1, 42990.00),
(73, 44, 29, 1, 209990.00),
(74, 45, 7, 1, 1290.00),
(75, 45, 6, 1, 5190.00),
(76, 45, 8, 1, 5990.00),
(77, 45, 11, 1, 4590.00);

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `stock` int NOT NULL DEFAULT '0',
  `image_url` varchar(255) DEFAULT 'Logo(2).png'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `price`, `stock`, `image_url`) VALUES
(1, 'Razer Viper V2 Pro', 4990.00, 12, '1773648259387.jpg'),
(2, 'Razer DeathAdder V3 Pro', 5490.00, 9, '1773648331116.jpg'),
(3, 'Logitech G Pro X Superlight 2', 5690.00, 17, '1773648392534.jpg'),
(4, 'ZOWIE FK2', 5290.00, 5, '1773649560108.jpg'),
(6, 'GRAVASTAR MERCURY X PRO', 5190.00, 5, '1773649640377.jpg'),
(7, 'Ajazz AJ199', 1290.00, 7, '1773566027316.jpg'),
(8, 'ALIENWARE AW420K', 5990.00, 7, '1773649273266.jpg'),
(11, 'RAZER VIPER V3 PRO', 4590.00, 4, '1773649789401.jpg'),
(12, 'CORSAIR K65 PLUS WIRELESS', 5990.00, 11, '1773649847052.jpg'),
(14, 'AULA AG60 PRO', 4190.00, 12, '1773649925328.jpg'),
(15, 'CHERRY K5V2 COMPACT AMNIS BLUE', 4990.00, 12, '1773650003705.jpg'),
(16, 'AULA AG60 PRO', 4890.00, 10, '1773650068163.jpg'),
(17, 'Samsung Odyssey 3D G90XF LS27FG900XEXXT - 27 Inch IPS 4K 165Hz', 62900.00, 10, '1773650158582.jpg'),
(18, 'Benq Zowie XL2586X PLUS - 24.1 Inch TN 600Hz Dyac', 37900.00, 3, '1773650495363.jpg'),
(19, 'MSI MAG 272QP QD-OLED X24 - 26.5 Inch QD-OLED 2K 240Hz', 13900.00, 8, '1773650703751.jpg'),
(20, 'LG Ultragear 32GS85Q-B - 31.5 Inch Nano IPS 2K 180Hz', 8700.00, 10, '1773650751359.jpg'),
(21, 'MSI MAG 274QPF E20 - 27 Inch IPS 2K 200Hz', 6900.00, 5, '1773650814426.jpg'),
(22, 'Msi Mag 27Cq6F - 27 Inch Rapid Va 2K 180Hz Curved ', 5900.00, 4, '1773650927564.jpg'),
(23, 'AMD RYZEN 9 9950X3D', 26990.00, 10, '1773651037529.jpg'),
(24, 'AMD RYZEN THREADRIPPER PRO 9995WX', 469000.00, 12, '1773651097347.jpg'),
(25, 'INTEL CORE I9-14900', 21300.00, 10, '1773651163222.jpg'),
(26, 'ZOTAC GAMING GEFORCE RTX 5090 SOLID OC - 32GB ', 124350.00, 3, '1773651232852.jpg'),
(27, 'ASUS ROG ASTRAL GEFORCE RTX 5080 16GB', 59500.00, 4, '1773651329019.jpg'),
(28, 'GIGABYTE AORUS GEFORCE RTX 5080 MASTER 16G - 16GB', 57900.00, 5, '1773651378919.jpg'),
(29, 'MSI TITAN 18 HX AI A2XWJG-288TH - CORE BLACK', 209990.00, 1, '1773651454969.jpg'),
(30, 'ASUS TUF GAMING A14 FA401EA-RG007WA - JAEGER GRAY', 59990.00, 12, '1773651495666.jpg'),
(31, 'HP OMEN 16-AP0128AX - SHADOW BLACK', 57990.00, 5, '1773651532024.jpg'),
(32, 'ACER NITRO V 16S AI ANV16S-41-R7HF', 42990.00, 2, '1773651591074.jpg'),
(33, 'MSI KATANA 17 B13VEK-1256TH', 42990.00, 5, '1773651628723.jpg'),
(34, 'ASUS ZENBOOK S 14 OLED U', 51990.00, 3, '1773651709209.jpg'),
(35, 'AZER BLACKSHARK V3 PRO 2XKO EDITION', 10900.00, 4, '1773651825228.jpg'),
(36, 'STEELSERIES ARCTIS NOVA 7P WIRELESS GEN 2 - PLAYSTATION MAGENTA', 8790.00, 5, '1773652004783.jpg'),
(37, 'HYPERX CLOUD III S WIRELESS - BLACK-RED', 5490.00, 5, '1773652098602.jpg'),
(38, ' RAZER BARRACUDA X CHROMA - PHANTOM GREEN ', 4790.00, 5, '1773652152537.jpg'),
(39, 'RAZER KRAKEN V3 X POKEMON PIKACHU EDITION', 2990.00, 4, '1773652267329.jpg'),
(40, ' CORSAIR VOID WIRELESS V2 - WHITE', 3990.00, 6, '1773652305686.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `firstname` varchar(100) NOT NULL,
  `lastname` varchar(100) NOT NULL,
  `role` varchar(20) DEFAULT 'user'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `firstname`, `lastname`, `role`) VALUES
(1, 'admin', 'admin123za', 'Super', 'Admin', 'admin'),
(2, 'testuser', '123456', 'Somchai', 'Jaidee', 'user'),
(3, 'TanZ4826', 'password', 'Tan', 'Z', 'user'),
(4, 'TenZ', 'asd12345', 'Sentinal', 'TenZ', 'user'),
(8, 'thnnadon', 'asd12345za', 'thandon', 'sawasdiroj', 'user'),
(9, 'aaaaa', 'asd12345', 'aaa', 'aaa', 'user'),
(10, 'test1234', 'asd1234', 'test ', 'user', 'user'),
(11, 'test2', 'asd146225za', 'test', '2', 'user'),
(12, 'vvvv', 'asd12345', 'tan', 'x', 'user'),
(13, 'qqqqq', 'asd12345za', 'tan', 'x', 'user'),
(14, 'hut', 'asd1150', 'hut', 'real', 'user'),
(15, 'New', '12345', 'Thanadol', 'dad', 'user');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `order_items`
--
ALTER TABLE `order_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_id` (`order_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;

--
-- AUTO_INCREMENT for table `order_items`
--
ALTER TABLE `order_items`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=78;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `order_items`
--
ALTER TABLE `order_items`
  ADD CONSTRAINT `order_items_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `order_items_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
