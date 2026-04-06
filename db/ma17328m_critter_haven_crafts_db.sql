-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Apr 05, 2026 at 08:25 PM
-- Server version: 5.7.44-48
-- PHP Version: 8.3.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ma17328m_critter_haven_crafts_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `product_name` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `category` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `price` float NOT NULL,
  `description` text COLLATE utf8_unicode_ci,
  `image` text COLLATE utf8_unicode_ci,
  `featured` tinyint(1) DEFAULT NULL,
  `in_stock` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `product_name`, `category`, `price`, `description`, `image`, `featured`, `in_stock`) VALUES
(0, 'test', 'cards', 15, 'TEST DESC', NULL, 1, 1),
(1, 'Assorted Cards', 'cards', 10, 'Assorted greeting cards with unique designs.', 'images/product_placeholder.png', 1, 1),
(2, 'Papercraft Item', 'papercrafts', 15, 'Handmade papercraft items with intricate designs.', 'images/product_placeholder.png', 1, 1),
(3, 'Alcohol Ink Flower', 'ink-flowers', 30, 'Stunning alcohol ink flower artwork on canvas.', 'images/product_placeholder.png', 0, 1),
(4, 'Alcohol Ink Tile', 'ink-flowers', 25, 'Alcohol ink flower designs on decorative tiles.', 'images/product_placeholder.png', 0, 1),
(5, 'Shadowbox', 'shadowboxes', 40, 'Elegant shadowbox displays for your cherished items.', 'images/product_placeholder.png', 0, 1),
(6, 'Cardinal Lantern', 'papercrafts', 25, 'A beautiful handmade cardinal lantern, perfect for home decor.', 'images/product_placeholder.png', 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `user_name` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `user_email` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(100) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `user_name`, `user_email`, `password`) VALUES
(0, 'meghan', 'meghan.andrews14@gmail.com', 'test'),
(1, 'john_doe', 'john@example.com', 'password123'),
(2, 'jane_smith', 'jane@example.com', 'securepass456'),
(3, 'mike_ross', 'mike@example.com', 'letmein789');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
