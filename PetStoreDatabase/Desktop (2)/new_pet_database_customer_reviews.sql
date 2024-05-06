CREATE DATABASE  IF NOT EXISTS `new_pet_database` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `new_pet_database`;
-- MySQL dump 10.13  Distrib 8.0.36, for macos14 (x86_64)
--
-- Host: 127.0.0.1    Database: new_pet_database
-- ------------------------------------------------------
-- Server version	8.3.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `customer_reviews`
--

DROP TABLE IF EXISTS `customer_reviews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customer_reviews` (
  `ReviewID` int NOT NULL AUTO_INCREMENT,
  `ProductID` int NOT NULL,
  `Custusername` varchar(255) NOT NULL,
  `Rating` int NOT NULL,
  `ReviewText` text,
  `ReviewDate` datetime NOT NULL,
  PRIMARY KEY (`ReviewID`),
  KEY `ProductID` (`ProductID`),
  KEY `Custusername` (`Custusername`),
  CONSTRAINT `customer_reviews_ibfk_1` FOREIGN KEY (`ProductID`) REFERENCES `products` (`ProductID`) ON DELETE CASCADE,
  CONSTRAINT `customer_reviews_ibfk_2` FOREIGN KEY (`Custusername`) REFERENCES `users` (`Custusername`),
  CONSTRAINT `customer_reviews_chk_1` CHECK (((`Rating` >= 1) and (`Rating` <= 5)))
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customer_reviews`
--

LOCK TABLES `customer_reviews` WRITE;
/*!40000 ALTER TABLE `customer_reviews` DISABLE KEYS */;
INSERT INTO `customer_reviews` VALUES (1,29,'Jeremy',5,'The Dog Chew Toy has lasted much longer than any other toy we have tried. Highly recommended for aggressive chewers!','2024-04-15 15:00:00'),(2,30,'Nkinnas',4,'My cat loves the new climbing tower, but it wobbles a little. Still a great addition to our living room.','2024-04-15 16:30:00'),(3,31,'Welden',5,'This bird feeder is perfect for our garden. Easy to fill and clean, and attracts a wide variety of birds.','2024-04-15 17:00:00'),(4,32,'Khoi',5,'Quiet and effective, the aquarium filter keeps the water crystal clear for my tropical fish.','2024-04-15 18:45:00'),(5,33,'Jeremy',5,'The Premium Dog Food is excellent for my older dog who has digestion issues. No more upset stomach.','2024-04-15 19:20:00'),(6,34,'Nkinnas',3,'The Cat Kibble is good, but my cat prefers wet food. Will try to mix it next time.','2024-04-15 20:00:00'),(7,35,'Welden',4,'The fish food is great, but the flakes are a bit large for my smaller fish. I need to break them up before feeding.','2024-04-15 21:00:00'),(8,38,'Jeremy',5,'The Squeaky Rubber Duck is my dogs favorite toy now. He carries it everywhere he goes.','2024-04-15 22:10:00'),(9,41,'Khoi',5,'The Large Parrot Food is perfect for my macaw. He enjoys the variety of seeds and fruits.','2024-04-16 08:15:00'),(10,45,'Nkinnas',4,'The leather dog leash is stylish and feels very strong. Just wish it was a bit longer.','2024-04-16 09:00:00'),(11,50,'Welden',5,'These Dog Biscuits are fantastic! My dog has food sensitivities and these don not upset his stomach at all.','2024-04-16 10:20:00'),(12,54,'Jeremy',5,'The Small Dog Premium Food has been great for my energetic terrier. It keeps him active and healthy.','2024-04-16 11:30:00'),(13,57,'Khoi',5,'The Aquarium LED Light adds a beautiful ambiance to our fish tank. The colors are very bright and vivid.','2024-04-16 12:45:00'),(14,59,'Nkinnas',2,'The Wet Cat Food seemed to be liked at first, but my cat lost interest quickly. Not buying again.','2024-04-16 13:50:00'),(15,66,'Welden',5,'The Stainless Steel Dog Bowl is just the right size and easy to clean. No rust and no fuss.','2024-04-16 14:05:00'),(19,29,'Khoi',4,'Great toy, my dog hasn’t managed to destroy it yet, which is impressive!','2024-04-16 15:00:00'),(20,29,'Nkinnas',2,'The chew toy is too hard for my small dog, he does not seem interested in it at all.','2024-04-16 16:00:00'),(21,29,'Welden',5,'Perfect! The toy is durable and keeps my dog occupied for hours. Worth every penny!','2024-04-16 17:00:00'),(22,57,'Alice',5,'The LED light makes my aquarium look like a piece of living art. Absolutely love the glow!','2024-04-18 09:00:00'),(23,57,'Bob',4,'Nice light, easy to install, but I wish there were more color options.','2024-04-18 09:30:00'),(24,57,'Charlie',5,'Best purchase for my fish tank so far. The light is bright and doesn’t heat up too much.','2024-04-18 10:00:00'),(25,57,'Diana',3,'It’s decent for the price, but I had some issues with the remote control not working properly.','2024-04-18 10:30:00'),(26,57,'Evan',2,'The light stopped working after a month, and customer service was slow to respond.','2024-04-18 11:00:00');
/*!40000 ALTER TABLE `customer_reviews` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-04-24 11:55:23
