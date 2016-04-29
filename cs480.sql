-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Apr 29, 2016 at 06:41 AM
-- Server version: 10.1.9-MariaDB
-- PHP Version: 7.0.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `cs480`
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
(277, 'another cool test', '2016-04-29 06:36:24', NULL, NULL, NULL, 'normal', '', 0);

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
(5, 17, 'Calendar', 1),
(6, 18, 'Calendar', 1),
(18, 55, 'Calendar', 1),
(19, 56, 'Calendar', 1),
(32, 17, 'Test', 1);

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
(18, 17, 1);

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
(63, 5, 208, '2016-04-16 04:00:00', '2016-04-16 06:59:59', '', 0),
(64, 5, 209, '2016-04-08 04:00:00', '2016-04-08 06:59:59', 'AWW YE B)', 0),
(67, 5, 212, '2016-04-08 03:00:00', '2016-04-09 03:59:59', NULL, 0),
(68, 5, 213, '2016-04-08 00:00:00', '2016-04-08 23:59:59', NULL, 1),
(69, 5, 214, '2016-04-15 00:20:00', '2016-04-15 13:59:59', NULL, 0),
(70, 5, 216, '2016-05-05 00:00:00', '2016-05-05 23:59:59', NULL, 1),
(88, 5, 244, '2016-03-27 00:00:00', '2016-03-27 23:59:00', NULL, 1),
(89, 18, 247, '2016-04-29 00:00:00', '2016-04-29 23:59:00', NULL, 1),
(90, 18, 248, '2016-04-30 00:00:00', '2016-04-30 23:59:00', 'the future', 1),
(119, 5, 277, '2016-04-08 00:00:00', '2016-04-08 23:59:00', NULL, 1);

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
(5, 17, 'Inbox'),
(6, 17, 'Test'),
(7, 18, 'Inbox'),
(19, 55, 'Inbox'),
(20, 56, 'Inbox');

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
(19, 17, 1);

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
(17, 'test', '$2y$10$TR9IMfRo/K9MwHQumkDPgeHePwwdXbLVizm2siR9TFvQQ2IoJYmfi', 1, 'light', 'api/upload/files/1461696484571fb7e4a9033.jpg', 'test@test.com', NULL, NULL, NULL),
(18, 'testtest', '$2y$10$8EohPuz92vcQU.quMqacWO.m.n21t9vevYKa5wKvXhSatdWtBmCGS', 0, 'light', NULL, 'test@test.com', NULL, NULL, NULL),
(55, 'itme', '$2y$10$sBbpaMttnckfaM/yabc9JOJRIOCGQ7ARpc2lThxEx9r8RxXry.BZm', 0, 'light', 'api/upload/files/146186215957223f0f24e4e.jpg', 'it@me.com', NULL, NULL, NULL),
(56, 'someuser', '$2y$10$5Rr4ErEMPv./h6oA.jTXr.ITBa6vB.EHLTVNlRWW9VYvH1GsWpmAa', 0, 'light', NULL, 't@t.com', NULL, NULL, NULL);

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
(143, 277, 'daily', NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);

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
('p8q8i9mks84iuv90vf00juevf3', '2016-04-29 06:40:11', 'id|s:2:"17";name|s:4:"test";admin|s:1:"1";theme|s:5:"light";avatar|s:44:"api/upload/files/1461696484571fb7e4a9033.jpg";email|s:13:"test@test.com";phone_number|N;notify_email|N;notify_text|N;');

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
(101, 5, 133, '2016-05-02 05:20:00', 0, 'czowOiIiOw=='),
(102, 6, 134, '2016-04-18 00:00:00', 0, 'YToyOntzOjk6ImN1cnJlbnRJZCI7aToyO3M6NDoibGlzdCI7YToxOntpOjA7YTozOntzOjc6InN1bW1hcnkiO3M6MTk6ImxvdmUgeW91IGdyYW5kcGEgPDMiO3M6MjoiaWQiO2k6MTtzOjk6ImNvbXBsZXRlZCI7YjowO319fQ=='),
(109, 5, 198, NULL, 1, 'YToyOntzOjk6ImN1cnJlbnRJZCI7aToyO3M6NDoibGlzdCI7YToxOntpOjA7YTozOntzOjc6InN1bW1hcnkiO3M6MzoieWVzIjtzOjI6ImlkIjtpOjE7czo5OiJjb21wbGV0ZWQiO2I6MDt9fX0='),
(113, 5, 202, NULL, 0, 'YToyOntzOjk6ImN1cnJlbnRJZCI7aTozO3M6NDoibGlzdCI7YToyOntpOjA7YTozOntzOjc6InN1bW1hcnkiO3M6NDoidGVzdCI7czoyOiJpZCI7aToxO3M6OToiY29tcGxldGVkIjtiOjA7fWk6MTthOjM6e3M6Nzoic3VtbWFyeSI7czo1OiJ0ZXN0MiI7czoyOiJpZCI7aToyO3M6OToiY29tcGxldGVkIjtiOjE7fX19'),
(114, 5, 215, '2016-05-30 00:00:00', 0, NULL),
(122, 6, 242, NULL, 0, NULL),
(124, 19, 245, NULL, 1, NULL),
(125, 19, 246, NULL, 0, NULL);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=278;
--
-- AUTO_INCREMENT for table `calendar`
--
ALTER TABLE `calendar`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;
--
-- AUTO_INCREMENT for table `calendar_person`
--
ALTER TABLE `calendar_person`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `cal_event`
--
ALTER TABLE `cal_event`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=120;
--
-- AUTO_INCREMENT for table `label`
--
ALTER TABLE `label`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;
--
-- AUTO_INCREMENT for table `label_person`
--
ALTER TABLE `label_person`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `person`
--
ALTER TABLE `person`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=113;
--
-- AUTO_INCREMENT for table `recurrence`
--
ALTER TABLE `recurrence`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=144;
--
-- AUTO_INCREMENT for table `task`
--
ALTER TABLE `task`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=126;
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
