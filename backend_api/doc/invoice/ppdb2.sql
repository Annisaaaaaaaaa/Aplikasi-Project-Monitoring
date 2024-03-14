-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 06, 2024 at 02:14 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.1.17

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ppdb2`
--

-- --------------------------------------------------------

--
-- Table structure for table `asal_kota`
--

CREATE TABLE `asal_kota` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `asal_kota`
--

INSERT INTO `asal_kota` (`id`, `name`, `created_at`, `updated_at`) VALUES
(1, 'Kota Cimahi', '2023-11-05 21:02:17', '2023-11-05 21:02:17'),
(2, 'Kota GBR', '2023-11-05 21:02:22', '2023-11-05 21:02:22'),
(3, 'Kabupaten Bandung Barat (KBB)', '2023-11-05 21:02:37', '2023-11-05 21:02:37');

-- --------------------------------------------------------

--
-- Table structure for table `asal_sekolah`
--

CREATE TABLE `asal_sekolah` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `asal_sekolah`
--

INSERT INTO `asal_sekolah` (`id`, `name`, `created_at`, `updated_at`) VALUES
(1, 'SMP Negeri 4 Ngamprah', '2023-11-05 21:01:05', '2023-11-05 21:01:05'),
(2, 'SMP Negeri 2 Cimahi', '2023-11-05 21:01:24', '2023-11-05 21:01:24'),
(3, 'SMP Negeri 9 Cimahi', '2023-11-05 21:01:57', '2023-11-05 21:01:57');

-- --------------------------------------------------------

--
-- Table structure for table `bukti_ppdb`
--

CREATE TABLE `bukti_ppdb` (
  `id_bukti` bigint(20) UNSIGNED NOT NULL,
  `id_jalur` bigint(20) UNSIGNED NOT NULL,
  `bukti` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `feedback`
--

CREATE TABLE `feedback` (
  `id` int(11) NOT NULL,
  `saran` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `feedback`
--

INSERT INTO `feedback` (`id`, `saran`) VALUES
(1, 'sebaikanya tidak usah ada tugas didunia ini'),
(2, 'saya suka aplikasinya'),
(4, 'bagus banget gile'),
(5, 'Harith Imutnusisisis sjsjjs shehshjsjs jssjsjsu jsjsjsussjus jsjsjs hshsjsj sjsjsjjsjs sjsjsj s shhehe shshs shebshgegshshs'),
(6, 'Harith Imutnusisisis sjsjjs shehshjsjs jssjsjsu jsjsjsussjus jsjsjs hshsjsj sjsjsjjsjs sjsjsj s shhehe shshs shebshgegshshs'),
(7, 'Harith Imutnusisisis sjsjjs shehshjsjs jssjsjsu jsjsjsussjus jsjsjs hshsjsj sjsjsjjsjs sjsjsj s shhehe shshs shebshgegshshs'),
(8, 'Harith Imutnusisisis sjsjjs shehshjsjs jssjsjsu jsjsjsussjus jsjsjs hshsjsj sjsjsjjsjs sjsjsj s shhehe shshs shebshgegshshs'),
(9, 'Harith Imutnusisisis sjsjjs shehshjsjs jssjsjsu jsjsjsussjus jsjsjs hshsjsj sjsjsjjsjs sjsjsj s shhehe shshs shebshgegshshs'),
(10, 'Harith Imutnusisisis sjsjjs shehshjsjs jssjsjsu jsjsjsussjus jsjsjs hshsjsj sjsjsjjsjs sjsjsj s shhehe shshs shebshgegshshs'),
(11, 'Harith Imutnusisisis sjsjjs shehshjsjs jssjsjsu jsjsjsussjus jsjsjs hshsjsj sjsjsjjsjs sjsjsj s shhehe shshs shebshgegshshs'),
(12, 'Harith Imutnusisisis sjsjjs shehshjsjs jssjsjsu jsjsjsussjus jsjsjs hshsjsj sjsjsjjsjs sjsjsj s shhehe shshs shebshgegshshs'),
(13, 'Harith Imutnusisisis sjsjjs shehshjsjs jssjsjsu jsjsjsussjus jsjsjs hshsjsj sjsjsjjsjs sjsjsj s shhehe shshs shebshgegshshs'),
(14, 'Harith Imutnusisisis sjsjjs shehshjsjs jssjsjsu jsjsjsussjus jsjsjs hshsjsj sjsjsjjsjs sjsjsj s shhehe shshs shebshgegshshs'),
(15, 'Harith Imutnusisisis sjsjjs shehshjsjs jssjsjsu jsjsjsussjus jsjsjs hshsjsj sjsjsjjsjs sjsjsj s shhehe shshs shebshgegshshs'),
(16, 'Harith Imutnusisisis sjsjjs shehshjsjs jssjsjsu jsjsjsussjus jsjsjs hshsjsj sjsjsjjsjs sjsjsj s shhehe shshs shebshgegshshs'),
(17, 'Harith Imutnusisisis sjsjjs shehshjsjs jssjsjsu jsjsjsussjus jsjsjs hshsjsj sjsjsjjsjs sjsjsj s shhehe shshs shebshgegshshs'),
(18, 'Harith Imutnusisisis sjsjjs shehshjsjs jssjsjsu jsjsjsussjus jsjsjs hshsjsj sjsjsjjsjs sjsjsj s shhehe shshs shebshgegshshs'),
(19, 'Harith Imutnusisisis sjsjjs shehshjsjs jssjsjsu jsjsjsussjus jsjsjs hshsjsj sjsjsjjsjs sjsjsj s shhehe shshs shebshgegshshs'),
(20, 'Harith Imutnusisisis sjsjjs shehshjsjs jssjsjsu jsjsjsussjus jsjsjs hshsjsj sjsjsjjsjs sjsjsj s shhehe shshs shebshgegshshs'),
(21, 'Harith Imutnusisisis sjsjjs shehshjsjs jssjsjsu jsjsjsussjus jsjsjs hshsjsj sjsjsjjsjs sjsjsj s shhehe shshs shebshgegshshs'),
(22, 'Harith Imutnusisisis sjsjjs shehshjsjs jssjsjsu jsjsjsussjus jsjsjs hshsjsj sjsjsjjsjs sjsjsj s shhehe shshs shebshgegshshs'),
(23, 'Harith Imutnusisisis sjsjjs shehshjsjs jssjsjsu jsjsjsussjus jsjsjs hshsjsj sjsjsjjsjs sjsjsj s shhehe shshs shebshgegshshs'),
(24, 'Harith Imutnusisisis sjsjjs shehshjsjs jssjsjsu jsjsjsussjus jsjsjs hshsjsj sjsjsjjsjs sjsjsj s shhehe shshs shebshgegshshs'),
(25, 'Harith Imutnusisisis sjsjjs shehshjsjs jssjsjsu jsjsjsussjus jsjsjs hshsjsj sjsjsjjsjs sjsjsj s shhehe shshs shebshgegshshs'),
(26, 'Harith Imutnusisisis sjsjjs shehshjsjs jssjsjsu jsjsjsussjus jsjsjs hshsjsj sjsjsjjsjs sjsjsj s shhehe shshs shebshgegshshs'),
(27, 'Harith Imutnusisisis sjsjjs shehshjsjs jssjsjsu jsjsjsussjus jsjsjs hshsjsj sjsjsjjsjs sjsjsj s shhehe shshs shebshgegshshs'),
(28, 'Harith Imutnusisisis sjsjjs shehshjsjs jssjsjsu jsjsjsussjus jsjsjs hshsjsj sjsjsjjsjs sjsjsj s shhehe shshs shebshgegshshs'),
(29, 'Harith Imutnusisisis sjsjjs shehshjsjs jssjsjsu jsjsjsussjus jsjsjs hshsjsj sjsjsjjsjs sjsjsj s shhehe shshs shebshgegshshs'),
(30, 'Harith Imutnusisisis sjsjjs shehshjsjs jssjsjsu jsjsjsussjus jsjsjs hshsjsj sjsjsjjsjs sjsjsj s shhehe shshs shebshgegshshs'),
(31, 'Harith Imutnusisisis sjsjjs shehshjsjs jssjsjsu jsjsjsussjus jsjsjs hshsjsj sjsjsjjsjs sjsjsj s shhehe shshs shebshgegshshs'),
(32, 'Harith Imutnusisisis sjsjjs shehshjsjs jssjsjsu jsjsjsussjus jsjsjs hshsjsj sjsjsjjsjs sjsjsj s shhehe shshs shebshgegshshs'),
(33, 'Harith Imutnusisisis sjsjjs shehshjsjs jssjsjsu jsjsjsussjus jsjsjs hshsjsj sjsjsjjsjs sjsjsj s shhehe shshs shebshgegshshs'),
(34, 'Harith Imutnusisisis sjsjjs shehshjsjs jssjsjsu jsjsjsussjus jsjsjs hshsjsj sjsjsjjsjs sjsjsj s shhehe shshs shebshgegshshs'),
(35, 'Harith Imutnusisisis sjsjjs shehshjsjs jssjsjsu jsjsjsussjus jsjsjs hshsjsj sjsjsjjsjs sjsjsj s shhehe shshs shebshgegshshs'),
(36, 'Harith Imutnusisisis sjsjjs shehshjsjs jssjsjsu jsjsjsussjus jsjsjs hshsjsj sjsjsjjsjs sjsjsj s shhehe shshs shebshgegshshs'),
(37, 'Harith Imutnusisisis sjsjjs shehshjsjs jssjsjsu jsjsjsussjus jsjsjs hshsjsj sjsjsjjsjs sjsjsj s shhehe shshs shebshgegshshs'),
(38, 'Harith Imutnusisisis sjsjjs shehshjsjs jssjsjsu jsjsjsussjus jsjsjs hshsjsj sjsjsjjsjs sjsjsj s shhehe shshs shebshgegshshs'),
(39, 'Harith Imutnusisisis sjsjjs shehshjsjs jssjsjsu jsjsjsussjus jsjsjs hshsjsj sjsjsjjsjs sjsjsj s shhehe shshs shebshgegshshs'),
(40, 'Harith Imutnusisisis sjsjjs shehshjsjs jssjsjsu jsjsjsussjus jsjsjs hshsjsj sjsjsjjsjs sjsjsj s shhehe shshs shebshgegshshs'),
(41, 'Harith Imutnusisisis sjsjjs shehshjsjs jssjsjsu jsjsjsussjus jsjsjs hshsjsj sjsjsjjsjs sjsjsj s shhehe shshs shebshgegshshs'),
(42, 'Harith Imutnusisisis sjsjjs shehshjsjs jssjsjsu jsjsjsussjus jsjsjs hshsjsj sjsjsjjsjs sjsjsj s shhehe shshs shebshgegshshs'),
(43, 'Harith Imutnusisisis sjsjjs shehshjsjs jssjsjsu jsjsjsussjus jsjsjs hshsjsj sjsjsjjsjs sjsjsj s shhehe shshs shebshgegshshs'),
(44, 'Harith Imutnusisisis sjsjjs shehshjsjs jssjsjsu jsjsjsussjus jsjsjs hshsjsj sjsjsjjsjs sjsjsj s shhehe shshs shebshgegshshs'),
(45, 'Harith Imutnusisisis sjsjjs shehshjsjs jssjsjsu jsjsjsussjus jsjsjs hshsjsj sjsjsjjsjs sjsjsj s shhehe shshs shebshgegshshs'),
(46, 'Harith Imutnusisisis sjsjjs shehshjsjs jssjsjsu jsjsjsussjus jsjsjs hshsjsj sjsjsjjsjs sjsjsj s shhehe shshs shebshgegshshs'),
(47, 'Harith Imutnusisisis sjsjjs shehshjsjs jssjsjsu jsjsjsussjus jsjsjs hshsjsj sjsjsjjsjs sjsjsj s shhehe shshs shebshgegshshs'),
(48, 'Harith Imutnusisisis sjsjjs shehshjsjs jssjsjsu jsjsjsussjus jsjsjs hshsjsj sjsjsjjsjs sjsjsj s shhehe shshs shebshgegshshs'),
(49, 'Harith Imutnusisisis sjsjjs shehshjsjs jssjsjsu jsjsjsussjus jsjsjs hshsjsj sjsjsjjsjs sjsjsj s shhehe shshs shebshgegshshs'),
(50, 'Harith Imutnusisisis sjsjjs shehshjsjs jssjsjsu jsjsjsussjus jsjsjs hshsjsj sjsjsjjsjs sjsjsj s shhehe shshs shebshgegshshs'),
(51, 'Harith Imutnusisisis sjsjjs shehshjsjs jssjsjsu jsjsjsussjus jsjsjs hshsjsj sjsjsjjsjs sjsjsj s shhehe shshs shebshgegshshs'),
(52, 'Harith Imutnusisisis sjsjjs shehshjsjs jssjsjsu jsjsjsussjus jsjsjs hshsjsj sjsjsjjsjs sjsjsj s shhehe shshs shebshgegshshs'),
(53, 'Harith Imutnusisisis sjsjjs shehshjsjs jssjsjsu jsjsjsussjus jsjsjs hshsjsj sjsjsjjsjs sjsjsj s shhehe shshs shebshgegshshs'),
(54, 'Harith Imutnusisisis sjsjjs shehshjsjs jssjsjsu jsjsjsussjus jsjsjs hshsjsj sjsjsjjsjs sjsjsj s shhehe shshs shebshgegshshs'),
(55, 'Harith Imutnusisisis sjsjjs shehshjsjs jssjsjsu jsjsjsussjus jsjsjs hshsjsj sjsjsjjsjs sjsjsj s shhehe shshs shebshgegshshs'),
(56, 'Harith Imutnusisisis sjsjjs shehshjsjs jssjsjsu jsjsjsussjus jsjsjs hshsjsj sjsjsjjsjs sjsjsj s shhehe shshs shebshgegshshs'),
(57, 'Harith Imutnusisisis sjsjjs shehshjsjs jssjsjsu jsjsjsussjus jsjsjs hshsjsj sjsjsjjsjs sjsjsj s shhehe shshs shebshgegshshs'),
(58, 'Harith Imutnusisisis sjsjjs shehshjsjs jssjsjsu jsjsjsussjus jsjsjs hshsjsj sjsjsjjsjs sjsjsj s shhehe shshs shebshgegshshs'),
(59, 'Harith Imutnusisisis sjsjjs shehshjsjs jssjsjsu jsjsjsussjus jsjsjs hshsjsj sjsjsjjsjs sjsjsj s shhehe shshs shebshgegshshs'),
(60, 'Harith Imutnusisisis sjsjjs shehshjsjs jssjsjsu jsjsjsussjus jsjsjs hshsjsj sjsjsjjsjs sjsjsj s shhehe shshs shebshgegshshs'),
(61, 'Harith Imutnusisisis sjsjjs shehshjsjs jssjsjsu jsjsjsussjus jsjsjs hshsjsj sjsjsjjsjs sjsjsj s shhehe shshs shebshgegshshs'),
(62, 'Harith Imutnusisisis sjsjjs shehshjsjs jssjsjsu jsjsjsussjus jsjsjs hshsjsj sjsjsjjsjs sjsjsj s shhehe shshs shebshgegshshs'),
(63, 'Harith Imutnusisisis sjsjjs shehshjsjs jssjsjsu jsjsjsussjus jsjsjs hshsjsj sjsjsjjsjs sjsjsj s shhehe shshs shebshgegshshs'),
(64, 'Harith Imutnusisisis sjsjjs shehshjsjs jssjsjsu jsjsjsussjus jsjsjs hshsjsj sjsjsjjsjs sjsjsj s shhehe shshs shebshgegshshs'),
(65, 'Harith Imutnusisisis sjsjjs shehshjsjs jssjsjsu jsjsjsussjus jsjsjs hshsjsj sjsjsjjsjs sjsjsj s shhehe shshs shebshgegshshs'),
(66, 'Harith Imutnusisisis sjsjjs shehshjsjs jssjsjsu jsjsjsussjus jsjsjs hshsjsj sjsjsjjsjs sjsjsj s shhehe shshs shebshgegshshs'),
(67, 'Harith Imutnusisisis sjsjjs shehshjsjs jssjsjsu jsjsjsussjus jsjsjs hshsjsj sjsjsjjsjs sjsjsj s shhehe shshs shebshgegshshs'),
(68, 'Harith Imutnusisisis sjsjjs shehshjsjs jssjsjsu jsjsjsussjus jsjsjs hshsjsj sjsjsjjsjs sjsjsj s shhehe shshs shebshgegshshs'),
(69, 'Harith Imutnusisisis sjsjjs shehshjsjs jssjsjsu jsjsjsussjus jsjsjs hshsjsj sjsjsjjsjs sjsjsj s shhehe shshs shebshgegshshs'),
(70, 'aplikasinya error');

-- --------------------------------------------------------

--
-- Table structure for table `formulir`
--

CREATE TABLE `formulir` (
  `no_pendaftaran` bigint(20) UNSIGNED NOT NULL,
  `namaf` varchar(255) NOT NULL,
  `nikf` varchar(255) NOT NULL,
  `nisnf` varchar(255) NOT NULL,
  `id_pendaftar` bigint(20) UNSIGNED NOT NULL,
  `id_jalur` bigint(20) UNSIGNED DEFAULT NULL,
  `id_keahlian` bigint(20) UNSIGNED DEFAULT NULL,
  `id_kompetensi` bigint(20) UNSIGNED DEFAULT NULL,
  `id_periode` bigint(20) UNSIGNED DEFAULT NULL,
  `id_status` bigint(20) UNSIGNED DEFAULT NULL,
  `skck` varchar(255) DEFAULT NULL,
  `surat_lulus` varchar(255) DEFAULT NULL,
  `skhun` varchar(255) DEFAULT NULL,
  `surat_sehat` varchar(255) DEFAULT NULL,
  `foto` varchar(255) DEFAULT NULL,
  `alamat` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `formulir`
--

INSERT INTO `formulir` (`no_pendaftaran`, `namaf`, `nikf`, `nisnf`, `id_pendaftar`, `id_jalur`, `id_keahlian`, `id_kompetensi`, `id_periode`, `id_status`, `skck`, `surat_lulus`, `skhun`, `surat_sehat`, `foto`, `alamat`, `created_at`, `updated_at`) VALUES
(3, 'uyui', '11111111', '2111115711', 3, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(4, 'Alam Firmansyah', '12121231212123', '12121231212123', 4, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(5, 'aku', '123', '321', 5, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(6, 'meira', '464616', '6465619', 6, 1, NULL, NULL, NULL, NULL, 'cnsfhcvscvd.jpg', 'cnsfhcvscvd.jpg', 'cnsfhcvscvd.jpg', 'cnsfhcvscvd.jpg', 'cnsfhcvscvd.jpg', 'jl. leuwigajah', NULL, NULL),
(7, 'hei', '464659', '646495', 7, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(8, 'akuppdb', '466446', '64656', 8, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(9, 'annisa', '616461', '316461', 9, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(10, 'ndn', '4546', '5455', 10, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(23, 'awugg', '313', '133', 23, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(24, 'how', '16161', '131359', 24, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `informasi`
--

CREATE TABLE `informasi` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `judul` varchar(100) NOT NULL,
  `deskripsi` longtext NOT NULL,
  `foto` text NOT NULL,
  `video` text NOT NULL,
  `jenis` int(10) UNSIGNED NOT NULL,
  `checkbox` tinyint(1) NOT NULL DEFAULT 0,
  `date` date NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `jalur`
--

CREATE TABLE `jalur` (
  `id_jalur` bigint(20) UNSIGNED NOT NULL,
  `nama_jalur` varchar(255) NOT NULL,
  `deskripsi` text NOT NULL,
  `kuota` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `jalur`
--

INSERT INTO `jalur` (`id_jalur`, `nama_jalur`, `deskripsi`, `kuota`, `created_at`, `updated_at`) VALUES
(1, 'Nilai Rapot Unggulan', '1111111', '5', '2023-11-05 11:46:24', '2023-11-05 11:46:24');

-- --------------------------------------------------------

--
-- Table structure for table `jurusan`
--

CREATE TABLE `jurusan` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `nama` varchar(100) NOT NULL,
  `singkatan` varchar(10) NOT NULL,
  `id_kompetensi` bigint(20) UNSIGNED NOT NULL,
  `logo` text NOT NULL,
  `foto` text DEFAULT NULL,
  `deskripsi` longtext DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2014_10_12_000000_create_users_table', 1),
(2, '2014_10_12_100000_create_password_resets_table', 1),
(3, '2019_08_19_000000_create_failed_jobs_table', 1),
(4, '2019_12_14_000001_create_personal_access_tokens_table', 1),
(5, '2023_06_18_072509_roles', 1),
(6, '2023_10_19_014814_informasi_card', 1),
(7, '2023_10_22_174745_jurusan', 1),
(8, '2023_10_22_174956_periode', 1),
(9, '2023_10_22_183217_status_pendaftaran', 1),
(10, '2023_10_22_183908_kompetensi_keahlian', 1),
(11, '2023_10_22_200521_jalur', 1),
(12, '2023_10_23_020034_asal_kota', 1),
(13, '2023_10_23_020104_asal_sekolah', 1),
(14, '2023_10_23_042647_bukti_jalur', 1),
(15, '2023_10_23_042826_data_pendaftar', 1),
(16, '2023_10_25_015128_soal_minat_bakat', 1),
(17, '2023_10_25_235950_login_pendaftar', 1),
(18, '2023_10_26_001046_minat_bakat', 1),
(19, '2023_11_04_073653_semester1', 1),
(20, '2023_11_04_073738_semester2', 1),
(21, '2023_11_04_073803_semester3', 1),
(22, '2023_11_04_073811_semester4', 1),
(23, '2023_11_04_073820_semester5', 1),
(24, '2023_11_04_073828_semester6', 1),
(25, '2023_11_04_073841_nilai_rapot', 1),
(26, '2023_11_05_182735_FormulirPendaftaran', 1);

-- --------------------------------------------------------

--
-- Table structure for table `minat_bakat`
--

CREATE TABLE `minat_bakat` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `id_pendaftar` bigint(20) UNSIGNED NOT NULL,
  `id_kompetensi_keahlian` bigint(20) UNSIGNED NOT NULL,
  `hasil` varchar(255) NOT NULL,
  `id_soal` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `nilai_rapot`
--

CREATE TABLE `nilai_rapot` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `id_pendaftar` bigint(20) UNSIGNED NOT NULL,
  `semester1` bigint(20) UNSIGNED NOT NULL,
  `semester2` bigint(20) UNSIGNED NOT NULL,
  `semester3` bigint(20) UNSIGNED NOT NULL,
  `semester4` bigint(20) UNSIGNED NOT NULL,
  `semester5` bigint(20) UNSIGNED NOT NULL,
  `semester6` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `nilai_rapot`
--

INSERT INTO `nilai_rapot` (`id`, `id_pendaftar`, `semester1`, `semester2`, `semester3`, `semester4`, `semester5`, `semester6`) VALUES
(2, 23, 1, 1, 1, 1, 1, 1),
(3, 6, 2, 2, 2, 2, 2, 2),
(4, 10, 1, 1, 1, 1, 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `password_resets`
--

CREATE TABLE `password_resets` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `pendaftar`
--

CREATE TABLE `pendaftar` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `id_login` bigint(20) UNSIGNED NOT NULL,
  `nama` varchar(255) NOT NULL,
  `nik` varchar(255) NOT NULL,
  `nisn` varchar(255) NOT NULL,
  `tempat_lahir` varchar(50) DEFAULT NULL,
  `tanggal_lahir` date DEFAULT NULL,
  `jenis_kelamin` enum('L','P') DEFAULT NULL,
  `anak_ke` int(11) DEFAULT NULL,
  `jumlah_saudara` int(11) DEFAULT NULL,
  `agama` varchar(15) DEFAULT NULL,
  `hp` varchar(18) DEFAULT NULL,
  `alamat` varchar(255) DEFAULT NULL,
  `kelurahan` varchar(50) DEFAULT NULL,
  `kecamatan` varchar(50) DEFAULT NULL,
  `id_asal_kota` bigint(20) UNSIGNED DEFAULT NULL,
  `provinsi` varchar(50) DEFAULT NULL,
  `kode_pos` varchar(8) DEFAULT NULL,
  `aktakelahiran` varchar(255) NOT NULL,
  `kartukeluarga` varchar(255) NOT NULL,
  `nama_ayah` varchar(100) NOT NULL,
  `nik_ayah` varchar(50) NOT NULL,
  `pekerjaan_ayah` varchar(50) NOT NULL,
  `hp_ayah` varchar(18) NOT NULL,
  `nama_ibu` varchar(100) NOT NULL,
  `nik_ibu` varchar(50) NOT NULL,
  `pekerjaan_ibu` varchar(50) NOT NULL,
  `hp_ibu` varchar(18) NOT NULL,
  `alamat_ortu` varchar(255) DEFAULT NULL,
  `nama_wali` varchar(100) DEFAULT NULL,
  `nik_wali` varchar(50) DEFAULT NULL,
  `pekerjaan_wali` varchar(50) DEFAULT NULL,
  `hp_wali` varchar(15) DEFAULT NULL,
  `alamat_wali` varchar(255) DEFAULT NULL,
  `no_kk` varchar(50) NOT NULL,
  `id_asal_sekolah` bigint(20) UNSIGNED DEFAULT NULL,
  `tahun_lulus` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `pendaftar`
--

INSERT INTO `pendaftar` (`id`, `id_login`, `nama`, `nik`, `nisn`, `tempat_lahir`, `tanggal_lahir`, `jenis_kelamin`, `anak_ke`, `jumlah_saudara`, `agama`, `hp`, `alamat`, `kelurahan`, `kecamatan`, `id_asal_kota`, `provinsi`, `kode_pos`, `aktakelahiran`, `kartukeluarga`, `nama_ayah`, `nik_ayah`, `pekerjaan_ayah`, `hp_ayah`, `nama_ibu`, `nik_ibu`, `pekerjaan_ibu`, `hp_ibu`, `alamat_ortu`, `nama_wali`, `nik_wali`, `pekerjaan_wali`, `hp_wali`, `alamat_wali`, `no_kk`, `id_asal_sekolah`, `tahun_lulus`, `created_at`, `updated_at`) VALUES
(3, 3, 'uyui', '11111111', '2111115711', NULL, NULL, 'P', 5, 77, 'Islam', '11111111111', '11111111111111111111', NULL, NULL, NULL, NULL, NULL, '', '', '', '', '', '', '', '', '', '', NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, 0, NULL, NULL),
(4, 4, 'Alam Firmansyah', '12121231212123', '12121231212123', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', '', '', '', '', '', '', '', '', '', NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, 0, NULL, NULL),
(5, 5, 'aku', '123', '321', 'Cimahi', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, NULL, NULL, '', '', '', '', '', '', '', '', '', '', NULL, NULL, NULL, NULL, NULL, NULL, '', 1, 0, NULL, NULL),
(6, 6, 'meiraira', '9839137', '211115678', 'Bandung', '2005-05-26', 'P', 2, 2, 'Islam', '984792724', 'jalan', 'lurah', 'camat', 1, 'Jawa Barat', '40553', '4287487.jpg', '2785627865.jpg', 'ayah', '345345', 'halodek', '492478', 'ai', '48974385', 'irt', '4253', 'jalanortu', '', '', '', '', '', '53536', 1, 2024, NULL, NULL),
(7, 7, 'hei', '464659', '646495', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', '', '', '', '', '', '', '', '', '', NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, 0, NULL, NULL),
(8, 8, 'akuppdb', '466446', '64656', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', '', '', '', '', '', '', '', '', '', NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, 0, NULL, NULL),
(9, 9, 'annisa', '616461', '316461', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', '', '', '', '', '', '', '', '', '', NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, 0, NULL, NULL),
(10, 10, 'ndn', '4546', '5455', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', '', '', '', '', '', '', '', '', '', NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, 0, NULL, NULL),
(27, 24, 'how', '16161', '131359', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '', '', '', '', '', '', '', '', '', '', NULL, NULL, NULL, NULL, NULL, NULL, '', NULL, 0, NULL, NULL),
(29, 23, 'awugg', '313', '133', 'bandung', '2000-06-18', NULL, 2, 2, 'Islam', '4665', 'jalan', 'lur', 'kec', NULL, NULL, '13465', '', '', 'ayah', '23', 'a', '14', 'whs', '23', 'ws', '164', 'sjus', '', '', '', '', '', '464665', 1, 2024, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `pengumuman`
--

CREATE TABLE `pengumuman` (
  `id` int(11) NOT NULL,
  `id_umum` bigint(20) UNSIGNED DEFAULT NULL,
  `nama_umum` varchar(200) DEFAULT NULL,
  `program_umum` int(11) DEFAULT NULL,
  `score` varchar(5) DEFAULT NULL,
  `print` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `pengumuman`
--

INSERT INTO `pengumuman` (`id`, `id_umum`, `nama_umum`, `program_umum`, `score`, `print`) VALUES
(1, 6, 'awug', 1, '3900', 'cv (2).pdf');

-- --------------------------------------------------------

--
-- Table structure for table `periode`
--

CREATE TABLE `periode` (
  `id_periode` bigint(20) UNSIGNED NOT NULL,
  `tahun` int(11) NOT NULL,
  `tanggal_buka` date NOT NULL,
  `tanggal_tutup` date NOT NULL,
  `aktif` enum('Y','N') NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `periode`
--

INSERT INTO `periode` (`id_periode`, `tahun`, `tanggal_buka`, `tanggal_tutup`, `aktif`, `created_at`, `updated_at`) VALUES
(2, 2019, '2023-11-06', '2023-11-29', 'N', '2023-11-05 11:54:36', '2023-11-05 11:54:36');

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `program_keahlian`
--

CREATE TABLE `program_keahlian` (
  `id_keahlian` bigint(20) UNSIGNED NOT NULL,
  `nama_program` varchar(255) NOT NULL,
  `singkatan` varchar(255) NOT NULL,
  `pelajaran` varchar(255) DEFAULT NULL,
  `deskripsi` text NOT NULL,
  `foto` varchar(255) DEFAULT NULL,
  `program` varchar(255) NOT NULL,
  `kuota` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `program_keahlian`
--

INSERT INTO `program_keahlian` (`id_keahlian`, `nama_program`, `singkatan`, `pelajaran`, `deskripsi`, `foto`, `program`, `kuota`, `created_at`, `updated_at`) VALUES
(1, 'rekayasa ', 'rpl', 'rpl', 'inirpl', 'cv (2).pdf', 'rpl', '70', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `semester1`
--

CREATE TABLE `semester1` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `id_pendaftar` bigint(20) UNSIGNED NOT NULL,
  `agama` decimal(5,2) NOT NULL,
  `indonesia` decimal(5,2) NOT NULL,
  `mtk` decimal(5,2) NOT NULL,
  `inggris` decimal(5,2) NOT NULL,
  `pjok` decimal(5,2) NOT NULL,
  `ipa` decimal(5,2) NOT NULL,
  `ips` decimal(5,2) NOT NULL,
  `pkn` decimal(5,2) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `semester1`
--

INSERT INTO `semester1` (`id`, `id_pendaftar`, `agama`, `indonesia`, `mtk`, `inggris`, `pjok`, `ipa`, `ips`, `pkn`, `created_at`, `updated_at`) VALUES
(1, 24, 80.00, 75.00, 90.00, 85.00, 78.00, 92.00, 88.00, 85.00, '2024-03-05 21:44:06', '2024-03-05 21:44:06'),
(2, 11, 88.00, 90.00, 85.00, 92.00, 80.00, 88.00, 90.00, 86.00, '2024-03-05 21:44:06', '2024-03-05 21:44:06');

-- --------------------------------------------------------

--
-- Table structure for table `semester2`
--

CREATE TABLE `semester2` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `id_pendaftar` bigint(20) UNSIGNED NOT NULL,
  `agama` decimal(5,2) NOT NULL,
  `indonesia` decimal(5,2) NOT NULL,
  `mtk` decimal(5,2) NOT NULL,
  `inggris` decimal(5,2) NOT NULL,
  `pjok` decimal(5,2) NOT NULL,
  `ipa` decimal(5,2) NOT NULL,
  `ips` decimal(5,2) NOT NULL,
  `pkn` decimal(5,2) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `semester2`
--

INSERT INTO `semester2` (`id`, `id_pendaftar`, `agama`, `indonesia`, `mtk`, `inggris`, `pjok`, `ipa`, `ips`, `pkn`, `created_at`, `updated_at`) VALUES
(1, 23, 80.00, 75.00, 90.00, 85.00, 78.00, 92.00, 88.00, 85.00, '2024-03-05 21:44:41', '2024-03-05 21:44:41'),
(2, 6, 88.00, 90.00, 85.00, 92.00, 80.00, 88.00, 90.00, 86.00, '2024-03-05 21:44:41', '2024-03-05 21:44:41');

-- --------------------------------------------------------

--
-- Table structure for table `semester3`
--

CREATE TABLE `semester3` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `id_pendaftar` bigint(20) UNSIGNED NOT NULL,
  `agama` decimal(5,2) NOT NULL,
  `indonesia` decimal(5,2) NOT NULL,
  `mtk` decimal(5,2) NOT NULL,
  `inggris` decimal(5,2) NOT NULL,
  `pjok` decimal(5,2) NOT NULL,
  `ipa` decimal(5,2) NOT NULL,
  `ips` decimal(5,2) NOT NULL,
  `pkn` decimal(5,2) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `semester3`
--

INSERT INTO `semester3` (`id`, `id_pendaftar`, `agama`, `indonesia`, `mtk`, `inggris`, `pjok`, `ipa`, `ips`, `pkn`, `created_at`, `updated_at`) VALUES
(1, 23, 80.00, 75.00, 90.00, 85.00, 78.00, 92.00, 88.00, 85.00, '2024-03-05 21:44:41', '2024-03-05 21:44:41'),
(2, 6, 88.00, 90.00, 85.00, 92.00, 80.00, 88.00, 90.00, 86.00, '2024-03-05 21:44:41', '2024-03-05 21:44:41');

-- --------------------------------------------------------

--
-- Table structure for table `semester4`
--

CREATE TABLE `semester4` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `id_pendaftar` bigint(20) UNSIGNED NOT NULL,
  `agama` decimal(5,2) NOT NULL,
  `indonesia` decimal(5,2) NOT NULL,
  `mtk` decimal(5,2) NOT NULL,
  `inggris` decimal(5,2) NOT NULL,
  `pjok` decimal(5,2) NOT NULL,
  `ipa` decimal(5,2) NOT NULL,
  `ips` decimal(5,2) NOT NULL,
  `pkn` decimal(5,2) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `semester4`
--

INSERT INTO `semester4` (`id`, `id_pendaftar`, `agama`, `indonesia`, `mtk`, `inggris`, `pjok`, `ipa`, `ips`, `pkn`, `created_at`, `updated_at`) VALUES
(1, 23, 80.00, 75.00, 90.00, 85.00, 78.00, 92.00, 88.00, 85.00, '2024-03-05 21:45:05', '2024-03-05 21:45:05'),
(2, 6, 88.00, 90.00, 85.00, 92.00, 80.00, 88.00, 90.00, 86.00, '2024-03-05 21:45:05', '2024-03-05 21:45:05');

-- --------------------------------------------------------

--
-- Table structure for table `semester5`
--

CREATE TABLE `semester5` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `id_pendaftar` bigint(20) UNSIGNED NOT NULL,
  `agama` decimal(5,2) NOT NULL,
  `indonesia` decimal(5,2) NOT NULL,
  `mtk` decimal(5,2) NOT NULL,
  `inggris` decimal(5,2) NOT NULL,
  `pjok` decimal(5,2) NOT NULL,
  `ipa` decimal(5,2) NOT NULL,
  `ips` decimal(5,2) NOT NULL,
  `pkn` decimal(5,2) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `semester5`
--

INSERT INTO `semester5` (`id`, `id_pendaftar`, `agama`, `indonesia`, `mtk`, `inggris`, `pjok`, `ipa`, `ips`, `pkn`, `created_at`, `updated_at`) VALUES
(1, 23, 80.00, 75.00, 90.00, 85.00, 78.00, 92.00, 88.00, 85.00, '2024-03-05 21:45:05', '2024-03-05 21:45:05'),
(2, 6, 88.00, 90.00, 85.00, 92.00, 80.00, 88.00, 90.00, 86.00, '2024-03-05 21:45:05', '2024-03-05 21:45:05');

-- --------------------------------------------------------

--
-- Table structure for table `semester6`
--

CREATE TABLE `semester6` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `id_pendaftar` bigint(20) UNSIGNED NOT NULL,
  `agama` decimal(5,2) NOT NULL,
  `indonesia` decimal(5,2) NOT NULL,
  `mtk` decimal(5,2) NOT NULL,
  `inggris` decimal(5,2) NOT NULL,
  `pjok` decimal(5,2) NOT NULL,
  `ipa` decimal(5,2) NOT NULL,
  `ips` decimal(5,2) NOT NULL,
  `pkn` decimal(5,2) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `semester6`
--

INSERT INTO `semester6` (`id`, `id_pendaftar`, `agama`, `indonesia`, `mtk`, `inggris`, `pjok`, `ipa`, `ips`, `pkn`, `created_at`, `updated_at`) VALUES
(1, 23, 80.00, 75.00, 90.00, 85.00, 78.00, 92.00, 88.00, 85.00, '2024-03-05 21:45:05', '2024-03-05 21:45:05'),
(2, 6, 88.00, 90.00, 85.00, 92.00, 80.00, 88.00, 90.00, 86.00, '2024-03-05 21:45:05', '2024-03-05 21:45:05');

-- --------------------------------------------------------

--
-- Table structure for table `soal_minat_bakat`
--

CREATE TABLE `soal_minat_bakat` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `pertanyaan` varchar(255) NOT NULL,
  `pilihan1` varchar(255) NOT NULL,
  `pilihan2` varchar(255) NOT NULL,
  `pilihan3` varchar(255) NOT NULL,
  `pilihan4` varchar(255) NOT NULL,
  `pilihan5` varchar(255) NOT NULL,
  `jawaban_benar` varchar(255) DEFAULT NULL,
  `skor` int(11) DEFAULT NULL,
  `id_kompetensi_keahlian` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `status_pendaftaran`
--

CREATE TABLE `status_pendaftaran` (
  `id_status` bigint(20) UNSIGNED NOT NULL,
  `status_daftar` varchar(255) NOT NULL,
  `comment` varchar(255) DEFAULT NULL,
  `tanggal_perubahan` timestamp NOT NULL DEFAULT '2023-11-05 11:30:25'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `NUPTK` varchar(255) DEFAULT NULL,
  `no_hp` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `role` int(11) NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `NUPTK`, `no_hp`, `email`, `role`, `email_verified_at`, `password`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'Ira Humanitas', NULL, NULL, 'irahumanitas@gmail.com', 1, NULL, '$2y$10$8Wrf4wuJ5SwgLURfYC8hP.LVI2xjbpPOl.kGcX/vqVNlddh21stLG', NULL, '2023-11-05 11:31:14', '2023-11-05 11:31:14'),
(2, 'Administrator', NULL, NULL, NULL, 0, NULL, '$2y$10$YmO0ay3Emcr6RoefD.kFqeQGl7RZDi662nQRd.YFYl2xR.MnpL/1C', NULL, '2023-11-05 12:08:23', '2023-11-05 12:08:23');

-- --------------------------------------------------------

--
-- Table structure for table `user_pendaftar`
--

CREATE TABLE `user_pendaftar` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `nisn` varchar(50) NOT NULL,
  `nik` varchar(50) NOT NULL,
  `token` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `user_pendaftar`
--

INSERT INTO `user_pendaftar` (`id`, `nisn`, `nik`, `token`, `name`, `username`, `password`, `remember_token`, `created_at`, `updated_at`) VALUES
(3, '2111115711', '11111111', 'admin', 'uyui', NULL, NULL, NULL, '2023-11-07 00:19:31', '2023-11-07 00:19:31'),
(4, '12121231212123', '12121231212123', '12121231212123', 'Alam Firmansyah', NULL, NULL, NULL, '2023-11-07 00:22:04', '2023-11-07 00:22:04'),
(5, '321', '123', '', 'aku', 'akuu', '202cb962ac59075b964b07152d234b70', NULL, NULL, NULL),
(6, '6465619', '464616', '', 'meira', 'harith', 'caf1a3dfb505ffed0d024130f58c5cfa', NULL, NULL, NULL),
(7, '646495', '464659', '', 'hei', 'hei', '202cb962ac59075b964b07152d234b70', NULL, NULL, NULL),
(8, '64656', '466446', '', 'akuppdb', 'ppdb', 'f8f052b1787b968105cb21793b15e57e', NULL, NULL, NULL),
(9, '316461', '616461', '', 'annisa', 'amnis', '827ccb0eea8a706c4c34a16891f84e7b', NULL, NULL, NULL),
(10, '5455', '4546', '', 'ndn', 'mia', '202cb962ac59075b964b07152d234b70', NULL, NULL, NULL),
(11, '654321', '123456', '', 'hamlo', 'saya', '202cb962ac59075b964b07152d234b70', NULL, NULL, NULL),
(23, '133', '313', '', 'awugg', 'awug', '202cb962ac59075b964b07152d234b70', NULL, NULL, NULL),
(24, '131359', '16161', '', 'how', 'why', '202cb962ac59075b964b07152d234b70', NULL, NULL, NULL);

--
-- Triggers `user_pendaftar`
--
DELIMITER $$
CREATE TRIGGER `trg_delete_user_pendaftar` AFTER DELETE ON `user_pendaftar` FOR EACH ROW BEGIN
    -- Menghapus data dari tabel pendaftar
    DELETE FROM pendaftar WHERE id_login = OLD.id;

    -- Menghapus data dari tabel formulir
    DELETE FROM formulir WHERE id_pendaftar = OLD.id;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `trg_insert_user_pendaftar` AFTER INSERT ON `user_pendaftar` FOR EACH ROW BEGIN
    -- Menambahkan data ke tabel pendaftar
    INSERT INTO pendaftar (id_login, nama, nisn, nik)
    VALUES (NEW.id, NEW.name, NEW.nisn, NEW.nik);

    -- Menambahkan data ke tabel formulir
    INSERT INTO formulir (id_pendaftar, nama, nisn, nik)
    VALUES (NEW.id, NEW.name, NEW.nisn, NEW.nik);
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `trg_update_user_pendaftar` AFTER UPDATE ON `user_pendaftar` FOR EACH ROW BEGIN
    -- Mengupdate data di tabel pendaftar
    UPDATE pendaftar
    SET nama = NEW.name, nisn = NEW.nisn, nik = NEW.nik
    WHERE id_login = NEW.id;

    -- Mengupdate data di tabel formulir
    UPDATE formulir
    SET nama = NEW.name, nisn = NEW.nisn, nik = NEW.nik
    WHERE id_pendaftar = NEW.id;
END
$$
DELIMITER ;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `asal_kota`
--
ALTER TABLE `asal_kota`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `asal_sekolah`
--
ALTER TABLE `asal_sekolah`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `bukti_ppdb`
--
ALTER TABLE `bukti_ppdb`
  ADD PRIMARY KEY (`id_bukti`),
  ADD KEY `bukti_ppdb_id_jalur_foreign` (`id_jalur`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `feedback`
--
ALTER TABLE `feedback`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `formulir`
--
ALTER TABLE `formulir`
  ADD PRIMARY KEY (`no_pendaftaran`),
  ADD KEY `formulir_id_pendaftar_foreign` (`id_pendaftar`),
  ADD KEY `formulir_id_jalur_foreign` (`id_jalur`),
  ADD KEY `formulir_id_keahlian_foreign` (`id_keahlian`),
  ADD KEY `formulir_id_kompetensi_foreign` (`id_kompetensi`),
  ADD KEY `formulir_id_periode_foreign` (`id_periode`),
  ADD KEY `formulir_id_status_foreign` (`id_status`);

--
-- Indexes for table `informasi`
--
ALTER TABLE `informasi`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `jalur`
--
ALTER TABLE `jalur`
  ADD PRIMARY KEY (`id_jalur`);

--
-- Indexes for table `jurusan`
--
ALTER TABLE `jurusan`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `jurusan_singkatan_unique` (`singkatan`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `minat_bakat`
--
ALTER TABLE `minat_bakat`
  ADD PRIMARY KEY (`id`),
  ADD KEY `minat_bakat_id_pendaftar_foreign` (`id_pendaftar`),
  ADD KEY `minat_bakat_id_kompetensi_keahlian_foreign` (`id_kompetensi_keahlian`),
  ADD KEY `minat_bakat_id_soal_foreign` (`id_soal`);

--
-- Indexes for table `nilai_rapot`
--
ALTER TABLE `nilai_rapot`
  ADD PRIMARY KEY (`id`),
  ADD KEY `nilai_rapot_id_pendaftar_foreign` (`id_pendaftar`),
  ADD KEY `nilai_rapot_semester1_foreign` (`semester1`),
  ADD KEY `nilai_rapot_semester2_foreign` (`semester2`),
  ADD KEY `nilai_rapot_semester3_foreign` (`semester3`),
  ADD KEY `nilai_rapot_semester4_foreign` (`semester4`),
  ADD KEY `nilai_rapot_semester5_foreign` (`semester5`),
  ADD KEY `nilai_rapot_semester6_foreign` (`semester6`);

--
-- Indexes for table `password_resets`
--
ALTER TABLE `password_resets`
  ADD KEY `password_resets_email_index` (`email`);

--
-- Indexes for table `pendaftar`
--
ALTER TABLE `pendaftar`
  ADD PRIMARY KEY (`id`),
  ADD KEY `pendaftar_id_asal_kota_foreign` (`id_asal_kota`),
  ADD KEY `pendaftar_id_asal_sekolah_foreign` (`id_asal_sekolah`);

--
-- Indexes for table `pengumuman`
--
ALTER TABLE `pengumuman`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_umum` (`id_umum`),
  ADD KEY `program_umum` (`program_umum`);

--
-- Indexes for table `periode`
--
ALTER TABLE `periode`
  ADD PRIMARY KEY (`id_periode`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Indexes for table `program_keahlian`
--
ALTER TABLE `program_keahlian`
  ADD PRIMARY KEY (`id_keahlian`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `semester1`
--
ALTER TABLE `semester1`
  ADD PRIMARY KEY (`id`),
  ADD KEY `semester1_id_pendaftar_foreign` (`id_pendaftar`);

--
-- Indexes for table `semester2`
--
ALTER TABLE `semester2`
  ADD PRIMARY KEY (`id`),
  ADD KEY `semester2_id_pendaftar_foreign` (`id_pendaftar`);

--
-- Indexes for table `semester3`
--
ALTER TABLE `semester3`
  ADD PRIMARY KEY (`id`),
  ADD KEY `semester3_id_pendaftar_foreign` (`id_pendaftar`);

--
-- Indexes for table `semester4`
--
ALTER TABLE `semester4`
  ADD PRIMARY KEY (`id`),
  ADD KEY `semester4_id_pendaftar_foreign` (`id_pendaftar`);

--
-- Indexes for table `semester5`
--
ALTER TABLE `semester5`
  ADD PRIMARY KEY (`id`),
  ADD KEY `semester5_id_pendaftar_foreign` (`id_pendaftar`);

--
-- Indexes for table `semester6`
--
ALTER TABLE `semester6`
  ADD PRIMARY KEY (`id`),
  ADD KEY `semester6_id_pendaftar_foreign` (`id_pendaftar`);

--
-- Indexes for table `soal_minat_bakat`
--
ALTER TABLE `soal_minat_bakat`
  ADD PRIMARY KEY (`id`),
  ADD KEY `soal_minat_bakat_id_kompetensi_keahlian_foreign` (`id_kompetensi_keahlian`);

--
-- Indexes for table `status_pendaftaran`
--
ALTER TABLE `status_pendaftaran`
  ADD PRIMARY KEY (`id_status`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_nuptk_unique` (`NUPTK`),
  ADD UNIQUE KEY `users_no_hp_unique` (`no_hp`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- Indexes for table `user_pendaftar`
--
ALTER TABLE `user_pendaftar`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `user_pendaftar_nisn_unique` (`nisn`),
  ADD UNIQUE KEY `user_pendaftar_nik_unique` (`nik`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `asal_kota`
--
ALTER TABLE `asal_kota`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `asal_sekolah`
--
ALTER TABLE `asal_sekolah`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `bukti_ppdb`
--
ALTER TABLE `bukti_ppdb`
  MODIFY `id_bukti` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `feedback`
--
ALTER TABLE `feedback`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=71;

--
-- AUTO_INCREMENT for table `formulir`
--
ALTER TABLE `formulir`
  MODIFY `no_pendaftaran` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `informasi`
--
ALTER TABLE `informasi`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `jalur`
--
ALTER TABLE `jalur`
  MODIFY `id_jalur` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `jurusan`
--
ALTER TABLE `jurusan`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT for table `minat_bakat`
--
ALTER TABLE `minat_bakat`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `nilai_rapot`
--
ALTER TABLE `nilai_rapot`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `pendaftar`
--
ALTER TABLE `pendaftar`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT for table `pengumuman`
--
ALTER TABLE `pengumuman`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `periode`
--
ALTER TABLE `periode`
  MODIFY `id_periode` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `program_keahlian`
--
ALTER TABLE `program_keahlian`
  MODIFY `id_keahlian` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `semester1`
--
ALTER TABLE `semester1`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `semester2`
--
ALTER TABLE `semester2`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `semester3`
--
ALTER TABLE `semester3`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `semester4`
--
ALTER TABLE `semester4`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `semester5`
--
ALTER TABLE `semester5`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `semester6`
--
ALTER TABLE `semester6`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `soal_minat_bakat`
--
ALTER TABLE `soal_minat_bakat`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `status_pendaftaran`
--
ALTER TABLE `status_pendaftaran`
  MODIFY `id_status` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `user_pendaftar`
--
ALTER TABLE `user_pendaftar`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `bukti_ppdb`
--
ALTER TABLE `bukti_ppdb`
  ADD CONSTRAINT `bukti_ppdb_id_jalur_foreign` FOREIGN KEY (`id_jalur`) REFERENCES `jalur` (`id_jalur`);

--
-- Constraints for table `formulir`
--
ALTER TABLE `formulir`
  ADD CONSTRAINT `formulir_id_jalur_foreign` FOREIGN KEY (`id_jalur`) REFERENCES `jalur` (`id_jalur`) ON DELETE CASCADE,
  ADD CONSTRAINT `formulir_id_keahlian_foreign` FOREIGN KEY (`id_keahlian`) REFERENCES `program_keahlian` (`id_keahlian`) ON DELETE CASCADE,
  ADD CONSTRAINT `formulir_id_kompetensi_foreign` FOREIGN KEY (`id_kompetensi`) REFERENCES `program_keahlian` (`id_keahlian`) ON DELETE CASCADE,
  ADD CONSTRAINT `formulir_id_periode_foreign` FOREIGN KEY (`id_periode`) REFERENCES `periode` (`id_periode`) ON DELETE CASCADE,
  ADD CONSTRAINT `formulir_id_status_foreign` FOREIGN KEY (`id_status`) REFERENCES `status_pendaftaran` (`id_status`) ON DELETE CASCADE;

--
-- Constraints for table `minat_bakat`
--
ALTER TABLE `minat_bakat`
  ADD CONSTRAINT `minat_bakat_id_kompetensi_keahlian_foreign` FOREIGN KEY (`id_kompetensi_keahlian`) REFERENCES `program_keahlian` (`id_keahlian`),
  ADD CONSTRAINT `minat_bakat_id_pendaftar_foreign` FOREIGN KEY (`id_pendaftar`) REFERENCES `pendaftar` (`id`),
  ADD CONSTRAINT `minat_bakat_id_soal_foreign` FOREIGN KEY (`id_soal`) REFERENCES `soal_minat_bakat` (`id`);

--
-- Constraints for table `nilai_rapot`
--
ALTER TABLE `nilai_rapot`
  ADD CONSTRAINT `nilai_rapot_id_pendaftar_foreign` FOREIGN KEY (`id_pendaftar`) REFERENCES `user_pendaftar` (`id`),
  ADD CONSTRAINT `nilai_rapot_semester1_foreign` FOREIGN KEY (`semester1`) REFERENCES `semester1` (`id`),
  ADD CONSTRAINT `nilai_rapot_semester2_foreign` FOREIGN KEY (`semester2`) REFERENCES `semester2` (`id`),
  ADD CONSTRAINT `nilai_rapot_semester3_foreign` FOREIGN KEY (`semester3`) REFERENCES `semester3` (`id`),
  ADD CONSTRAINT `nilai_rapot_semester4_foreign` FOREIGN KEY (`semester4`) REFERENCES `semester4` (`id`),
  ADD CONSTRAINT `nilai_rapot_semester5_foreign` FOREIGN KEY (`semester5`) REFERENCES `semester5` (`id`),
  ADD CONSTRAINT `nilai_rapot_semester6_foreign` FOREIGN KEY (`semester6`) REFERENCES `semester6` (`id`);

--
-- Constraints for table `pendaftar`
--
ALTER TABLE `pendaftar`
  ADD CONSTRAINT `pendaftar_id_asal_kota_foreign` FOREIGN KEY (`id_asal_kota`) REFERENCES `asal_kota` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `pendaftar_id_asal_sekolah_foreign` FOREIGN KEY (`id_asal_sekolah`) REFERENCES `asal_sekolah` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `semester1`
--
ALTER TABLE `semester1`
  ADD CONSTRAINT `semester1_id_pendaftar_foreign` FOREIGN KEY (`id_pendaftar`) REFERENCES `user_pendaftar` (`id`);

--
-- Constraints for table `semester2`
--
ALTER TABLE `semester2`
  ADD CONSTRAINT `semester2_id_pendaftar_foreign` FOREIGN KEY (`id_pendaftar`) REFERENCES `user_pendaftar` (`id`);

--
-- Constraints for table `semester3`
--
ALTER TABLE `semester3`
  ADD CONSTRAINT `semester3_id_pendaftar_foreign` FOREIGN KEY (`id_pendaftar`) REFERENCES `user_pendaftar` (`id`);

--
-- Constraints for table `semester4`
--
ALTER TABLE `semester4`
  ADD CONSTRAINT `semester4_id_pendaftar_foreign` FOREIGN KEY (`id_pendaftar`) REFERENCES `user_pendaftar` (`id`);

--
-- Constraints for table `semester5`
--
ALTER TABLE `semester5`
  ADD CONSTRAINT `semester5_id_pendaftar_foreign` FOREIGN KEY (`id_pendaftar`) REFERENCES `user_pendaftar` (`id`);

--
-- Constraints for table `semester6`
--
ALTER TABLE `semester6`
  ADD CONSTRAINT `semester6_id_pendaftar_foreign` FOREIGN KEY (`id_pendaftar`) REFERENCES `user_pendaftar` (`id`);

--
-- Constraints for table `soal_minat_bakat`
--
ALTER TABLE `soal_minat_bakat`
  ADD CONSTRAINT `soal_minat_bakat_id_kompetensi_keahlian_foreign` FOREIGN KEY (`id_kompetensi_keahlian`) REFERENCES `program_keahlian` (`id_keahlian`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
