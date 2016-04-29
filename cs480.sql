-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Apr 29, 2016 at 02:35 PM
-- Server version: 10.1.9-MariaDB
-- PHP Version: 7.0.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `djt_sp`
--

-- --------------------------------------------------------

--
-- Table structure for table `activity_info`
--

CREATE TABLE `activity_info` (
  `id` int(11) NOT NULL,
  `summary` varchar(512) NOT NULL,
  `created` datetime NOT NULL,
  `color` varchar(32) DEFAULT NULL,
  `note` text,
  `reminder` datetime DEFAULT NULL,
  `priority` enum('normal','low','high') NOT NULL,
  `attachment` text NOT NULL,
  `recurrence` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `activity_info`
--

INSERT INTO `activity_info` (`id`, `summary`, `created`, `color`, `note`, `reminder`, `priority`, `attachment`, `recurrence`) VALUES
(133, 'Within a week, but not today', '2016-04-13 00:00:00', NULL, NULL, NULL, 'normal', '', 0),
(134, 'Really, really, really, really, really, really, really, really, really, really, really, really, really, really, really, really, really, really, really, really, really, really, really, really, really, really, really, really long task name', '2016-04-13 00:00:00', NULL, 'testing note again', NULL, '', 'api/upload/files/146100431257152818d320d.jpg', 0),
(198, 'Completed', '2016-04-16 01:00:43', NULL, 'hi', NULL, 'high', '', 0),
(202, 'Subtasks', '2016-04-16 02:21:39', NULL, NULL, NULL, 'normal', '', 1),
(208, 'test', '2016-04-17 01:48:22', NULL, NULL, NULL, 'normal', '', 0),
(209, 'super test go', '2016-04-17 02:13:20', NULL, NULL, NULL, 'normal', '', 0),
(212, 'another test', '2016-04-17 02:25:21', NULL, NULL, NULL, 'normal', '', 0),
(213, 'needed more tests', '2016-04-17 02:54:58', NULL, NULL, NULL, 'normal', '', 0),
(214, 'ah yes another test', '2016-04-17 03:09:15', NULL, NULL, NULL, 'normal', '', 0),
(215, 'Next month', '2016-04-19 23:03:03', NULL, NULL, NULL, 'normal', '', 0),
(216, 'an event in another month how fancy', '2016-04-20 05:18:40', NULL, NULL, NULL, 'normal', '', 0),
(242, 'In "Test" label', '2016-04-26 19:34:18', NULL, NULL, NULL, 'normal', '', 0),
(244, 'in the past', '2016-04-28 18:47:55', NULL, NULL, NULL, 'normal', '', 0),
(245, 'yes me', '2016-04-28 18:49:38', NULL, NULL, NULL, 'normal', '', 0),
(246, 'wonk ;)', '2016-04-28 18:49:43', NULL, NULL, NULL, 'normal', '', 0),
(247, 'totes the coolest', '2016-04-28 18:50:01', NULL, NULL, NULL, 'normal', '', 0),
(248, 'message from the future', '2016-04-28 18:51:13', NULL, 'hoi!!! you done now!!! grats!!!', NULL, 'normal', '', 0),
(277, 'another cool test', '2016-04-29 06:36:24', NULL, NULL, NULL, 'normal', '', 0),
(279, 'demotwo''s task', '2016-04-29 13:50:54', NULL, 'with notes!', NULL, 'high', 'api/upload/files/146193071757234addd6efb.jpg', 0),
(280, 'Demotwo''s task in another label', '2016-04-29 13:53:16', NULL, NULL, NULL, 'normal', '', 0),
(281, 'demotwo''s other task', '2016-04-29 13:53:51', NULL, NULL, NULL, 'normal', '', 0),
(282, 'Demotwo''s event', '2016-04-29 13:54:59', NULL, 'it''s all day!', NULL, 'normal', 'api/upload/files/146193105757234c314f5a9.png', 0),
(284, 'Demotwo''s other event', '2016-04-29 13:57:05', NULL, NULL, NULL, 'normal', '', 0),
(285, 'By demo, in demotwo''s "Yet Another Label"', '2016-04-29 14:00:52', NULL, ':)', NULL, 'normal', '', 0),
(286, 'Due today', '2016-04-29 14:01:25', NULL, NULL, NULL, 'normal', '', 0),
(287, 'Due yesterday', '2016-04-29 14:01:41', NULL, NULL, NULL, 'normal', '', 0),
(288, 'Due within a week', '2016-04-29 14:02:02', NULL, NULL, NULL, 'normal', '', 0),
(289, 'Due next month', '2016-04-29 14:02:29', NULL, 'oh BOY', NULL, 'normal', '', 0),
(290, 'In "Work"', '2016-04-29 14:03:29', NULL, NULL, NULL, 'normal', '', 0),
(291, 'Presentation!!', '2016-04-29 14:04:26', NULL, 'how EXCITING', NULL, 'normal', 'api/upload/files/146193152057234e007f5eb.png', 0),
(292, 'In the past', '2016-04-29 14:05:36', NULL, NULL, NULL, 'normal', '', 0),
(293, 'In the future', '2016-04-29 14:05:42', NULL, NULL, NULL, 'normal', '', 0),
(294, 'In the super future', '2016-04-29 14:05:53', NULL, NULL, NULL, 'normal', '', 0),
(295, 'In the super past', '2016-04-29 14:06:01', NULL, NULL, NULL, 'normal', '', 0),
(296, 'In the super, duper past', '2016-04-29 14:06:08', NULL, NULL, NULL, 'normal', '', 0),
(297, 'In the super, duper future', '2016-04-29 14:06:31', NULL, 'we have flying cards now', NULL, 'normal', '', 0),
(298, 'In "Appointments"', '2016-04-29 14:12:21', NULL, NULL, NULL, 'normal', '', 0),
(303, 'Test', '2016-04-29 14:19:28', NULL, NULL, NULL, 'normal', 'api/upload/files/14619323655723514dc72f0.png', 0),
(304, 'demotwo''s task in "Yet Another Label"', '2016-04-29 14:24:03', NULL, NULL, NULL, 'normal', '', 0),
(305, 'All day events are at the top', '2016-04-29 14:25:10', NULL, NULL, NULL, 'normal', '', 0),
(306, 'Then it''s sorted by which starts next', '2016-04-29 14:25:47', NULL, NULL, NULL, 'normal', '', 0),
(307, 'More events!', '2016-04-29 14:26:56', NULL, NULL, NULL, 'normal', '', 0),
(308, 'demothree''s task', '2016-04-29 14:32:51', NULL, NULL, NULL, 'normal', '', 0);

-- --------------------------------------------------------

--
-- Table structure for table `calendar`
--

CREATE TABLE `calendar` (
  `id` int(11) NOT NULL,
  `person_id` int(11) NOT NULL,
  `name` varchar(64) NOT NULL,
  `visible` tinyint(1) DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `calendar`
--

INSERT INTO `calendar` (`id`, `person_id`, `name`, `visible`) VALUES
(35, 1, 'Calendar', 1),
(36, 1, 'Appointments', 1),
(37, 2, 'Calendar', 1),
(38, 121, 'Calendar', 1),
(39, 122, 'Calendar', 1),
(40, 3, 'Calendar', 1);

-- --------------------------------------------------------

--
-- Table structure for table `calendar_person`
--

CREATE TABLE `calendar_person` (
  `calendar_id` int(11) NOT NULL,
  `person_id` int(11) NOT NULL,
  `id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `calendar_person`
--

INSERT INTO `calendar_person` (`calendar_id`, `person_id`, `id`) VALUES
(37, 1, 2);

-- --------------------------------------------------------

--
-- Table structure for table `cal_event`
--

CREATE TABLE `cal_event` (
  `id` int(11) NOT NULL,
  `calendar_id` int(11) NOT NULL,
  `activity_info_id` int(11) NOT NULL,
  `dt_start` datetime DEFAULT NULL,
  `dt_end` datetime DEFAULT NULL,
  `location` varchar(256) DEFAULT NULL,
  `all_day` tinyint(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `cal_event`
--

INSERT INTO `cal_event` (`id`, `calendar_id`, `activity_info_id`, `dt_start`, `dt_end`, `location`, `all_day`) VALUES
(120, 37, 282, '2016-04-30 00:00:00', '2016-04-30 23:59:00', 'in a place!', 1),
(122, 37, 284, '2016-04-30 07:00:00', '2016-04-30 08:30:00', NULL, 1),
(123, 35, 291, '2016-04-29 13:00:00', '2016-04-29 14:00:00', NULL, 0),
(124, 35, 292, '2016-03-28 00:00:00', '2016-03-28 23:59:00', NULL, 1),
(125, 35, 293, '2016-05-07 00:00:00', '2016-05-07 23:59:00', NULL, 1),
(126, 35, 294, '2016-05-24 00:00:00', '2016-05-24 23:59:00', NULL, 1),
(127, 35, 295, '2016-03-09 00:00:00', '2016-03-09 23:59:00', NULL, 1),
(128, 35, 296, '2016-02-28 00:00:00', '2016-02-28 23:59:00', NULL, 1),
(129, 35, 297, '2016-06-10 00:00:00', '2016-06-10 23:59:00', NULL, 1),
(130, 36, 298, '2016-04-30 00:00:00', '2016-04-30 23:59:00', NULL, 1),
(133, 35, 303, '2016-04-06 08:00:00', '2016-04-06 09:00:00', NULL, 0),
(134, 35, 305, '2016-04-23 00:00:00', '2016-04-23 23:59:00', NULL, 1),
(135, 35, 306, '2016-04-23 01:00:00', '2016-04-23 09:00:00', NULL, 0),
(136, 35, 307, '2016-04-30 00:00:00', '2016-04-30 23:59:00', NULL, 1);

-- --------------------------------------------------------

--
-- Table structure for table `label`
--

CREATE TABLE `label` (
  `id` int(11) NOT NULL,
  `person_id` int(11) NOT NULL,
  `name` varchar(64) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `label`
--

INSERT INTO `label` (`id`, `person_id`, `name`) VALUES
(35, 1, 'Inbox'),
(36, 1, 'Work'),
(37, 2, 'Inbox'),
(38, 2, 'Other Label'),
(39, 2, 'Yet Another Label'),
(40, 121, 'Inbox'),
(41, 122, 'Inbox'),
(42, 3, 'Inbox');

-- --------------------------------------------------------

--
-- Table structure for table `label_person`
--

CREATE TABLE `label_person` (
  `label_id` int(11) NOT NULL,
  `person_id` int(11) NOT NULL,
  `id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `label_person`
--

INSERT INTO `label_person` (`label_id`, `person_id`, `id`) VALUES
(37, 1, 2),
(39, 1, 3),
(42, 1, 4),
(42, 2, 5);

-- --------------------------------------------------------

--
-- Table structure for table `person`
--

CREATE TABLE `person` (
  `id` int(11) NOT NULL,
  `name` varchar(32) NOT NULL,
  `password` varchar(512) NOT NULL,
  `admin` tinyint(1) DEFAULT '0',
  `theme` enum('light','dark') NOT NULL,
  `avatar` text,
  `email` varchar(64) DEFAULT NULL,
  `phone_number` int(11) DEFAULT NULL,
  `notify_email` tinyint(1) DEFAULT NULL,
  `notify_text` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `person`
--

INSERT INTO `person` (`id`, `name`, `password`, `admin`, `theme`, `avatar`, `email`, `phone_number`, `notify_email`, `notify_text`) VALUES
(1, 'demo', '$2y$10$aBn2Mu.52ncW3XcYmpvr2uYHmXTYfp9Za4h4.OOJ9p8jNvbhpx8Zm', 1, 'light', 'api/upload/files/146193034357234967306b8.jpg', 'demo@demo.com', NULL, NULL, NULL),
(2, 'demotwo', '$2y$10$RJjCs4OHOzTZDTiHLFV2geRPmsjXWvgvenqeW0F84J42H9oHYtJBW', 0, 'light', 'api/upload/files/146193057157234a4b225da.png', 'demo@two.com', NULL, NULL, NULL),
(3, 'demothree', '$2y$10$YVjhnTzMh8qheRESEMwvcOAiLlkgL8h.47p26.K9FWA7CmoHtTcoG', 0, 'light', NULL, 'demo@three.com', NULL, NULL, NULL),
(121, 'fellowadmin', '$2y$10$2JdsfI3IuwwxX6MZ01D97urrSzxTeTlidjDT/eV9iDBg48agWOBy2', 1, 'light', 'api/upload/files/14619329305723538226f7d.png', 'test@test.com', NULL, NULL, NULL),
(122, 'nerd', '$2y$10$gFXXuEatditKCx7aRiVjzebKtds1UDDokbxQ0ToT06WPdpkJyMbna', 0, 'light', NULL, 'totes@nerd.com', NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `recurrence`
--

CREATE TABLE `recurrence` (
  `id` int(11) NOT NULL,
  `activity_info_id` int(11) NOT NULL,
  `freq` enum('daily','secondly','minutely','hourly','weekly','monthly','yearly') NOT NULL,
  `until` date DEFAULT NULL,
  `count` int(11) DEFAULT NULL,
  `repeat_interval` int(11) NOT NULL DEFAULT '1',
  `by_second` text,
  `by_minute` text,
  `by_hour` text,
  `by_day` text,
  `by_month_day` text,
  `by_year_day` text,
  `by_week_no` text,
  `by_month` text,
  `by_set_pos` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `recurrence`
--

INSERT INTO `recurrence` (`id`, `activity_info_id`, `freq`, `until`, `count`, `repeat_interval`, `by_second`, `by_minute`, `by_hour`, `by_day`, `by_month_day`, `by_year_day`, `by_week_no`, `by_month`, `by_set_pos`) VALUES
(64, 198, 'daily', NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(68, 202, 'daily', NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(74, 208, 'daily', NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(75, 209, 'daily', NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(78, 212, 'daily', NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(79, 213, 'daily', NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(80, 214, 'daily', NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(81, 215, 'daily', NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(82, 216, 'daily', NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(108, 242, 'daily', NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(110, 244, 'daily', NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(111, 245, 'daily', NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(112, 246, 'daily', NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(113, 247, 'daily', NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(114, 248, 'daily', NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(143, 277, 'daily', NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(145, 279, 'daily', NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(146, 280, 'daily', NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(147, 281, 'daily', NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(148, 282, 'daily', NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(150, 284, 'daily', NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(151, 285, 'daily', NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(152, 286, 'daily', NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(153, 287, 'daily', NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(154, 288, 'daily', NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(155, 289, 'daily', NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(156, 290, 'daily', NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(157, 291, 'daily', NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(158, 292, 'daily', NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(159, 293, 'daily', NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(160, 294, 'daily', NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(161, 295, 'daily', NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(162, 296, 'daily', NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(163, 297, 'daily', NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(164, 298, 'daily', NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(169, 303, 'daily', NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(170, 304, 'daily', NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(171, 305, 'daily', NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(172, 306, 'daily', NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(173, 307, 'daily', NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(174, 308, 'daily', NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `session`
--

CREATE TABLE `session` (
  `id` varchar(32) NOT NULL,
  `last_accessed` datetime DEFAULT NULL,
  `data` text
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `session`
--

INSERT INTO `session` (`id`, `last_accessed`, `data`) VALUES
('p8q8i9mks84iuv90vf00juevf3', '2016-04-29 14:34:45', 'id|s:1:"1";name|s:4:"demo";admin|s:1:"1";theme|s:5:"light";avatar|s:44:"api/upload/files/146193034357234967306b8.jpg";email|s:13:"demo@demo.com";phone_number|N;notify_email|N;notify_text|N;');

-- --------------------------------------------------------

--
-- Table structure for table `task`
--

CREATE TABLE `task` (
  `id` int(11) NOT NULL,
  `label_id` int(11) NOT NULL,
  `activity_info_id` int(11) NOT NULL,
  `due` datetime DEFAULT NULL,
  `completed` tinyint(1) DEFAULT '0',
  `subtasks` text
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `task`
--

INSERT INTO `task` (`id`, `label_id`, `activity_info_id`, `due`, `completed`, `subtasks`) VALUES
(127, 37, 279, NULL, 0, 'YToyOntzOjk6ImN1cnJlbnRJZCI7aToyO3M6NDoibGlzdCI7YToxOntpOjA7YTozOntzOjc6InN1bW1hcnkiO3M6MTM6ImFuZCBzdWJ0YXNrcyEiO3M6MjoiaWQiO2k6MTtzOjk6ImNvbXBsZXRlZCI7YjowO319fQ=='),
(128, 38, 280, NULL, 0, NULL),
(129, 37, 281, '2016-04-30 15:00:00', 0, NULL),
(130, 39, 285, NULL, 0, NULL),
(131, 35, 286, '2016-04-29 15:00:00', 0, NULL),
(132, 35, 287, '2016-04-28 15:00:00', 0, NULL),
(133, 35, 288, '2016-05-03 13:00:00', 0, NULL),
(134, 35, 289, '2016-05-20 11:00:00', 0, NULL),
(135, 36, 290, NULL, 0, NULL),
(136, 39, 304, NULL, 0, NULL),
(137, 42, 308, '2016-05-03 15:00:00', 0, 'YToyOntzOjk6ImN1cnJlbnRJZCI7aToyO3M6NDoibGlzdCI7YToxOntpOjA7YTozOntzOjc6InN1bW1hcnkiO3M6MTk6ImRlbW90aHJlZSdzIHN1YnRhc2siO3M6MjoiaWQiO2k6MTtzOjk6ImNvbXBsZXRlZCI7YjowO319fQ==');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `activity_info`
--
ALTER TABLE `activity_info`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `calendar`
--
ALTER TABLE `calendar`
  ADD PRIMARY KEY (`id`),
  ADD KEY `person_id` (`person_id`);

--
-- Indexes for table `calendar_person`
--
ALTER TABLE `calendar_person`
  ADD PRIMARY KEY (`calendar_id`,`person_id`),
  ADD UNIQUE KEY `id` (`id`),
  ADD KEY `person_id` (`person_id`);

--
-- Indexes for table `cal_event`
--
ALTER TABLE `cal_event`
  ADD PRIMARY KEY (`id`),
  ADD KEY `calendar_id` (`calendar_id`),
  ADD KEY `activity_info_id` (`activity_info_id`);

--
-- Indexes for table `label`
--
ALTER TABLE `label`
  ADD PRIMARY KEY (`id`),
  ADD KEY `person_id` (`person_id`);

--
-- Indexes for table `label_person`
--
ALTER TABLE `label_person`
  ADD PRIMARY KEY (`label_id`,`person_id`),
  ADD UNIQUE KEY `id` (`id`),
  ADD KEY `person_id` (`person_id`);

--
-- Indexes for table `person`
--
ALTER TABLE `person`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `recurrence`
--
ALTER TABLE `recurrence`
  ADD PRIMARY KEY (`id`),
  ADD KEY `activity_info_id` (`activity_info_id`);

--
-- Indexes for table `session`
--
ALTER TABLE `session`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `task`
--
ALTER TABLE `task`
  ADD PRIMARY KEY (`id`),
  ADD KEY `label_id` (`label_id`),
  ADD KEY `activity_info_id` (`activity_info_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `activity_info`
--
ALTER TABLE `activity_info`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=309;
--
-- AUTO_INCREMENT for table `calendar`
--
ALTER TABLE `calendar`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;
--
-- AUTO_INCREMENT for table `calendar_person`
--
ALTER TABLE `calendar_person`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `cal_event`
--
ALTER TABLE `cal_event`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=137;
--
-- AUTO_INCREMENT for table `label`
--
ALTER TABLE `label`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;
--
-- AUTO_INCREMENT for table `label_person`
--
ALTER TABLE `label_person`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT for table `person`
--
ALTER TABLE `person`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=124;
--
-- AUTO_INCREMENT for table `recurrence`
--
ALTER TABLE `recurrence`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=175;
--
-- AUTO_INCREMENT for table `task`
--
ALTER TABLE `task`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=138;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `calendar`
--
ALTER TABLE `calendar`
  ADD CONSTRAINT `calendar_ibfk_1` FOREIGN KEY (`person_id`) REFERENCES `person` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `calendar_person`
--
ALTER TABLE `calendar_person`
  ADD CONSTRAINT `calendar_person_ibfk_1` FOREIGN KEY (`calendar_id`) REFERENCES `calendar` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `calendar_person_ibfk_2` FOREIGN KEY (`person_id`) REFERENCES `person` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `cal_event`
--
ALTER TABLE `cal_event`
  ADD CONSTRAINT `cal_event_ibfk_1` FOREIGN KEY (`calendar_id`) REFERENCES `calendar` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `cal_event_ibfk_2` FOREIGN KEY (`activity_info_id`) REFERENCES `activity_info` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `label`
--
ALTER TABLE `label`
  ADD CONSTRAINT `label_ibfk_1` FOREIGN KEY (`person_id`) REFERENCES `person` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `label_person`
--
ALTER TABLE `label_person`
  ADD CONSTRAINT `label_person_ibfk_1` FOREIGN KEY (`label_id`) REFERENCES `label` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `label_person_ibfk_2` FOREIGN KEY (`person_id`) REFERENCES `person` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `recurrence`
--
ALTER TABLE `recurrence`
  ADD CONSTRAINT `recurrence_ibfk_1` FOREIGN KEY (`activity_info_id`) REFERENCES `activity_info` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `task`
--
ALTER TABLE `task`
  ADD CONSTRAINT `task_ibfk_1` FOREIGN KEY (`label_id`) REFERENCES `label` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `task_ibfk_2` FOREIGN KEY (`activity_info_id`) REFERENCES `activity_info` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
