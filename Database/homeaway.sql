-- phpMyAdmin SQL Dump
-- version 4.8.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 08, 2018 at 08:06 AM
-- Server version: 10.1.34-MariaDB
-- PHP Version: 5.6.37

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `homeaway`
--

-- --------------------------------------------------------

--
-- Table structure for table `booking`
--

CREATE TABLE `booking` (
  `booking_id` int(255) NOT NULL,
  `travel_id` int(255) NOT NULL,
  `owner_id` int(255) NOT NULL,
  `place_id` int(255) NOT NULL,
  `booking_from` date NOT NULL,
  `booking_to` date NOT NULL,
  `guests` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `booking`
--

INSERT INTO `booking` (`booking_id`, `travel_id`, `owner_id`, `place_id`, `booking_from`, `booking_to`, `guests`) VALUES
(3, 2, 2, 7, '2018-10-03', '2018-10-04', 3),
(4, 2, 1, 4, '2018-09-11', '2018-09-13', 3),
(5, 2, 2, 15, '2018-10-03', '2018-10-04', 3),
(6, 2, 2, 14, '2018-10-10', '2018-10-11', 12),
(7, 5, 3, 20, '2018-10-09', '2018-10-11', 3),
(8, 5, 3, 22, '2018-10-10', '2018-10-12', 1),
(9, 2, 3, 21, '2018-10-17', '2018-10-19', 3);

-- --------------------------------------------------------

--
-- Table structure for table `owneruser`
--

CREATE TABLE `owneruser` (
  `owner_id` int(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `owneruser`
--

INSERT INTO `owneruser` (`owner_id`, `email`, `password`) VALUES
(1, 'd@k', '$2a$10$pMmZjq7ivjS0Gz95IxkmgubZq5j9RYl4.4b7u/CjZ3B/qsumn6ezu'),
(2, 'd@t', '$2a$10$dvyKdZKeKhVBBD/5.8rvLeDjFsnGyLchJz0u0FTnWlBRl.eATpkh6'),
(3, 'paresh@gmail.com', '$2a$10$FlR7Yb/Wig0Px/vzSaafKOmsKfNajw6t2iPjilj7ETjHjec/1MdhS');

-- --------------------------------------------------------

--
-- Table structure for table `owneruserinfo`
--

CREATE TABLE `owneruserinfo` (
  `owner_id` int(255) NOT NULL,
  `firstname` varchar(255) NOT NULL,
  `lastname` varchar(255) NOT NULL,
  `billing_address` varchar(255) NOT NULL,
  `city` varchar(255) NOT NULL,
  `state` varchar(255) NOT NULL,
  `zipcode` int(6) NOT NULL,
  `country` varchar(255) NOT NULL,
  `company` varchar(255) NOT NULL,
  `number` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `owneruserinfo`
--

INSERT INTO `owneruserinfo` (`owner_id`, `firstname`, `lastname`, `billing_address`, `city`, `state`, `zipcode`, `country`, `company`, `number`) VALUES
(1, 'Darshil ', 'Kapadia', '33 South 3rd St, #418', 'San Jose', 'CA', 95113, 'United States', 'Google', 1234567890),
(2, 'Dhruvil', 'Tashu', '', '', '', 0, '', '', 0),
(3, 'Paresh', 'Kapadia', '33 South 3rd St,, #418', 'San Jose', 'CA', 95113, 'United States', 'Suraksha', 1234567890);

-- --------------------------------------------------------

--
-- Table structure for table `place`
--

CREATE TABLE `place` (
  `place_id` int(255) NOT NULL,
  `owner_id` int(255) NOT NULL,
  `place_name` varchar(255) NOT NULL,
  `location_city` varchar(255) NOT NULL,
  `available_from` date NOT NULL,
  `available_to` date NOT NULL,
  `bedrooms` int(10) NOT NULL,
  `bathrooms` int(10) NOT NULL,
  `accomodates` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `place`
--

INSERT INTO `place` (`place_id`, `owner_id`, `place_name`, `location_city`, `available_from`, `available_to`, `bedrooms`, `bathrooms`, `accomodates`) VALUES
(4, 1, '33 South Third Apartments', 'San Jose', '2018-10-09', '2018-10-31', 2, 6, 6),
(5, 1, 'Colonnade', 'San Jose', '2018-11-01', '2018-12-07', 4, 4, 10),
(6, 1, 'Boston', 'New York', '2018-09-01', '2018-12-31', 2, 4, 8),
(7, 2, 'Santa Clara Mansion', 'Santa Clara', '2018-10-01', '2018-10-09', 3, 3, 6),
(8, 2, 'Central Park', 'New York', '2018-07-01', '2019-07-31', 5, 5, 15),
(9, 1, 'Metropolitan Museum of Art', 'New York', '2018-10-01', '2018-12-31', 1, 1, 4),
(10, 1, 'Universal Studios Hollywood', 'Los Angeles', '2018-06-01', '2018-12-31', 2, 2, 8),
(11, 1, 'Santa Monica Pier', 'Los Angeles', '2018-09-01', '2019-02-28', 3, 3, 6),
(12, 1, 'Griffith Park', 'Los Angeles', '2018-09-01', '2018-11-30', 4, 4, 12),
(13, 1, 'J. Paul Getty Museum', 'Los Angeles', '2018-10-01', '2018-10-15', 4, 1, 4),
(14, 2, 'Grauman\'s Chinese Theatre', 'Los Angeles', '2018-08-01', '2019-02-28', 6, 6, 18),
(15, 2, 'Los Angeles County Museum of Art Knowledge Result', 'Los Angeles', '2018-09-18', '2018-10-31', 3, 2, 10),
(16, 1, 'Gokuldham Society', 'San Jose', '2018-07-01', '2019-11-24', 2, 2, 4),
(17, 1, 'Winchester Mystery House', 'San Jose,', '2018-10-08', '2019-02-28', 1, 1, 1),
(18, 3, 'The Champaklal Gopaldas House for the Old', 'Surat', '2018-10-09', '2019-01-01', 2, 3, 6),
(19, 3, 'The Champaklal Gopaldas House for the Old', 'Surat', '2018-10-09', '2019-01-01', 2, 3, 6),
(20, 3, 'The Champaklal Gopaldas House for the Old', 'Surat', '2018-10-09', '2019-01-01', 2, 3, 6),
(21, 3, 'Nilkanth Apartments', 'Surat', '2018-10-09', '2019-04-30', 3, 3, 12),
(22, 3, 'Ashirwad Palace', 'surat', '2018-10-10', '2018-10-31', 1, 1, 2);

-- --------------------------------------------------------

--
-- Table structure for table `place_info`
--

CREATE TABLE `place_info` (
  `place_id` int(255) NOT NULL,
  `headline` varchar(255) NOT NULL,
  `description` varchar(1000) NOT NULL,
  `amenities` varchar(1000) NOT NULL,
  `property_images` mediumtext NOT NULL,
  `price` int(10) NOT NULL DEFAULT '219',
  `street` varchar(50) NOT NULL,
  `apt` varchar(50) NOT NULL,
  `state` varchar(50) NOT NULL,
  `zipcode` varchar(50) NOT NULL,
  `country` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `place_info`
--

INSERT INTO `place_info` (`place_id`, `headline`, `description`, `amenities`, `property_images`, `price`, `street`, `apt`, `state`, `zipcode`, `country`) VALUES
(4, 'New Property', 'Heaven', 'Swimming Pool', ',/public/uploads/property-4-25737.jpg,/public/uploads/property-4-25749.jpg,/public/uploads/property-4-25783.jpg', 199, '33 South 3rd St,', '#418', 'CA', '95113', 'United States'),
(5, 'New Property 2', 'IDK', 'Swmming pool, jacuzzi, parking area, pets allowed, in unit washer dryer', '', 219, '', '', '', '', ''),
(6, 'New Property 3', 'Nice place', 'none', '', 219, '', '', '', '', ''),
(7, 'Old Property', 'Still feels like new', 'basic ones', '', 219, '', '', '', '', ''),
(12, 'Park in Los Angeles, California', 'Griffith Park is a large municipal park at the eastern end of the Santa Monica Mountains, in the Los', 'Swimming Pool', ',/public/uploads/property-12-gp1.jpg,/public/uploads/property-12-gp3.jpg,/public/uploads/property-12-gp2.jpg', 219, '', '', '', '', ''),
(15, 'Museum in Los Angeles, California', 'The Los Angeles County Museum of Art is an art museum located on Wilshire Boulevard in the Miracle Mile vicinity of Los Angeles. LACMA is on Museum Row, adjacent to the La Brea Tar Pits. LACMA is the largest art museum in the western United States. It attracts nearly a million visitors annually.', 'Air Conditioning', '', 219, '', '', '', '', ''),
(13, 'Museum in Los Angeles, California', 'The J. Paul Getty Museum, commonly referred to as the Getty, is an art museum in California housed on two campuses: the Getty Center and Getty Villa. The two locations received over two million visitors in 2016.', 'Free Wifi', '', 219, '', '', '', '', ''),
(11, 'Visitor center in Santa Monica, California', 'The Santa Monica Pier is a large double-jointed pier at the foot of Colorado Avenue in Santa Monica, California. With an iconic entrance, the pier is popular with residents and visitors as a landmark that is over 100 years old.', 'None', '', 219, '', '', '', '', ''),
(10, 'Theme park in Universal City, California', 'Universal Studios Hollywood is a film studio and theme park in the San Fernando Valley area of Los Angeles County, California. About 70% of the studio lies within the unincorporated county island known as Universal City while the rest lies within the city limits of Los Angeles, California. ', 'Free Rides', '', 219, '', '', '', '', ''),
(14, 'Theatre in Los Angeles, California', '', 'Free Tickets', '', 219, '', '', '', '', ''),
(16, 'Mad Society', 'Jethalal is best', '', '', 99, '33 South 3rd St,', '#418', 'CA', '95113', 'United States'),
(17, 'Mansion in San Jose, California', 'The Winchester Mystery House is a mansion in San Jose, California, that was once the personal residence of Sarah Winchester, the widow of firearm magnate William Wirt Winchester.', '', '', 19, '525 S Winchester Blvd, ', '', 'CA', '95128', 'USA'),
(20, 'Old Age Home', 'One of the best properties to be in for the old. Many parents who dont have their children or are abadoned b their children live over here. We will take care of you and we will make your holiday sweeter than any other.', '', ',/public/uploads/property-20-oh1.jpg,/public/uploads/property-20-oh3.jpg,/public/uploads/property-20-oh2.jpg', 139, 'Salabatpura-Vachli Sheri', '3/2085', 'Gujarat', '395003', 'India'),
(21, 'New Property', 'Built by White Wings', '', ',/public/uploads/property-21-na1.jpg,/public/uploads/property-21-na2.jpg,/public/uploads/property-21-na1.jpg,/public/uploads/property-21-na2.jpg,/public/uploads/property-21-na3.jpg', 189, 'Xyz', '123', 'Gujarat', '395007', 'India'),
(22, 'Old Property', 'Luxurious living', '', ',/public/uploads/property-22-xy1.jpg,/public/uploads/property-22-xy2.jpg,/public/uploads/property-22-xy3.jpg', 999, 'abc', '789', 'Gujarat', '395999', 'India');

-- --------------------------------------------------------

--
-- Table structure for table `traveluser`
--

CREATE TABLE `traveluser` (
  `travel_id` int(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `traveluser`
--

INSERT INTO `traveluser` (`travel_id`, `email`, `password`) VALUES
(2, 'd@k', '$2a$10$KwNdnEqJJ3UEXYDxuZuWjOqKW2i239iRFZ5U0EnPGTUNtZviZnqSa'),
(5, 'rupal@gmail.com', '$2a$10$kcwfWTCoM0dA./etdSPVcuQPjBNfPgbTiBnmjPxQsAEgbmLAzllnC');

-- --------------------------------------------------------

--
-- Table structure for table `traveluserinfo`
--

CREATE TABLE `traveluserinfo` (
  `travel_id` int(255) NOT NULL,
  `firstname` varchar(255) DEFAULT NULL,
  `lastname` varchar(255) DEFAULT NULL,
  `school` varchar(255) DEFAULT NULL,
  `company` varchar(255) DEFAULT NULL,
  `number` int(10) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `aboutme` varchar(1000) NOT NULL,
  `languages` varchar(1000) NOT NULL,
  `gender` varchar(10) NOT NULL,
  `profilepic` varchar(1000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `traveluserinfo`
--

INSERT INTO `traveluserinfo` (`travel_id`, `firstname`, `lastname`, `school`, `company`, `number`, `address`, `aboutme`, `languages`, `gender`, `profilepic`) VALUES
(2, 'Tash', 'Tashakori', 'San Jose North', 'Google', 1234567899, 'San Jose', 'Google', 'English and Gujarati', 'Male', '/public/uploads/userprofile-5.jpg'),
(5, 'Rupal', 'Kapadia', NULL, NULL, NULL, NULL, '', '', '', '/public/uploads/userprofile-5.jpg');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `booking`
--
ALTER TABLE `booking`
  ADD PRIMARY KEY (`booking_id`),
  ADD KEY `travelid_const3` (`travel_id`),
  ADD KEY `placeid_const3` (`place_id`),
  ADD KEY `ownerid_const3` (`owner_id`);

--
-- Indexes for table `owneruser`
--
ALTER TABLE `owneruser`
  ADD PRIMARY KEY (`owner_id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `owneruserinfo`
--
ALTER TABLE `owneruserinfo`
  ADD KEY `owner_const` (`owner_id`);

--
-- Indexes for table `place`
--
ALTER TABLE `place`
  ADD PRIMARY KEY (`place_id`),
  ADD KEY `owner_const1` (`owner_id`);

--
-- Indexes for table `place_info`
--
ALTER TABLE `place_info`
  ADD KEY `placeid_const4` (`place_id`);

--
-- Indexes for table `traveluser`
--
ALTER TABLE `traveluser`
  ADD PRIMARY KEY (`travel_id`),
  ADD UNIQUE KEY `travel_email` (`email`);

--
-- Indexes for table `traveluserinfo`
--
ALTER TABLE `traveluserinfo`
  ADD KEY `travelid_fk` (`travel_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `booking`
--
ALTER TABLE `booking`
  MODIFY `booking_id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `owneruser`
--
ALTER TABLE `owneruser`
  MODIFY `owner_id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `place`
--
ALTER TABLE `place`
  MODIFY `place_id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `traveluser`
--
ALTER TABLE `traveluser`
  MODIFY `travel_id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `booking`
--
ALTER TABLE `booking`
  ADD CONSTRAINT `ownerid_const3` FOREIGN KEY (`owner_id`) REFERENCES `owneruser` (`owner_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `placeid_const3` FOREIGN KEY (`place_id`) REFERENCES `place` (`place_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `travelid_const3` FOREIGN KEY (`travel_id`) REFERENCES `traveluser` (`travel_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `owneruserinfo`
--
ALTER TABLE `owneruserinfo`
  ADD CONSTRAINT `owner_const` FOREIGN KEY (`owner_id`) REFERENCES `owneruser` (`owner_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `place`
--
ALTER TABLE `place`
  ADD CONSTRAINT `owner_const1` FOREIGN KEY (`owner_id`) REFERENCES `owneruser` (`owner_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `place_info`
--
ALTER TABLE `place_info`
  ADD CONSTRAINT `placeid_const4` FOREIGN KEY (`place_id`) REFERENCES `place` (`place_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `traveluserinfo`
--
ALTER TABLE `traveluserinfo`
  ADD CONSTRAINT `travelid_const` FOREIGN KEY (`travel_id`) REFERENCES `traveluser` (`travel_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
