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
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `ProductID` int NOT NULL AUTO_INCREMENT,
  `Name` varchar(255) DEFAULT NULL,
  `Category` varchar(100) DEFAULT NULL,
  `Description` text,
  `Price` decimal(10,2) DEFAULT NULL,
  `StockQuantity` int DEFAULT NULL,
  `Brand` varchar(100) DEFAULT NULL,
  `AnimalType` varchar(50) DEFAULT NULL,
  `ImageURL` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`ProductID`)
) ENGINE=InnoDB AUTO_INCREMENT=73 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (29,'Dog Chew Toy','Toys','A durable chew toy suitable for dogs of all sizes.',14.99,100,'PetSafe','Dog','https://gooddogpro.com/wp-content/uploads/2016/08/kong.jpg'),(30,'Cat Climbing Tower','Accessories','A tall tower for cats to climb, scratch, and relax.',49.99,50,'CatHaven','Cat','https://assets.wfcdn.com/im/79060305/resize-h500-w500%5Ecompr-r85/1318/131871803/65%27%27+H+Cat+Tree.jpg'),(31,'Bird Feeder','Accessories','An outdoor bird feeder to attract various birds.',19.99,75,'NatureWatch','Bird','https://www.whiteflowerfarm.com/mas_assets/cache/image/8/c/d/9/36057.Jpg'),(32,'Aquarium Filter','Accessories','A quiet, efficient filter for freshwater and saltwater aquariums.',29.99,100,'AquaTech','Fish','https://m.media-amazon.com/images/I/710nBOmsk0L.__AC_SX300_SY300_QL70_FMwebp_.jpg'),(33,'Premium Dog Food','Food','Nutrient-rich food for dogs with sensitive stomachs.',59.99,200,'Pedigree','Dog','https://m.media-amazon.com/images/I/81xyE8OZBqL.__AC_SX300_SY300_QL70_FMwebp_.jpg'),(34,'Cat Kibble','Food','High-protein, low-carb cat food for indoor cats.',34.99,150,'MeowFeast','Cat','https://m.media-amazon.com/images/I/61Jcy2pp7EL._AC_SX466_.jpg'),(35,'Fish Food','Food','Specially formulated flakes for all types of tropical fish.',9.99,200,'AquaBites','Fish','https://m.media-amazon.com/images/I/71vJcOyqTzL.__AC_SX300_SY300_QL70_FMwebp_.jpg'),(36,'Reptile Food Mix','Food','A variety of foods to meet the dietary needs of most reptiles.',22.99,75,'ReptoFeast','Reptile','https://m.media-amazon.com/images/I/81r4yfo9xrL._AC_SX466_.jpg'),(37,'Crunchy Cat Treats','Food','Delicious chicken-flavored treats for cats.',5.99,150,'9Lives','Cat','https://m.media-amazon.com/images/I/71ZmSUFLjYL.__AC_SX300_SY300_QL70_FMwebp_.jpg'),(38,'Squeaky Rubber Duck','Toys','A durable rubber duck toy for all size dogs that squeaks.',7.99,100,'ToyJoy','Dog','https://i5.walmartimages.com/seo/Lil-Pals-Latex-Duck-Dog-Toy_8b2a7ba5-b227-433e-bfb2-001f863085b4.80b7649f75daae2c932cce11f75da571.jpeg?odnHeight=117&odnWidth=117&odnBg=FFFFFF'),(39,'Reflective Dog Collar','Accessories','A reflective collar to keep your dog safe at night. Many different colors to choose from!',12.99,200,'NightGuard','Dog','https://m.media-amazon.com/images/I/81nuvGuNXwL._AC_SX425_.jpg'),(40,'Hamster Wheel','Accessories','An exercise wheel for hamsters and small rodents.',9.99,100,'Kaytee','Small Pet','https://m.media-amazon.com/images/I/71jZMZ9h4pL.__AC_SX300_SY300_QL70_FMwebp_.jpg'),(41,'Large Parrot Food','Food','A blend of organic seeds and fruits for parrots.',19.99,150,'Hari','Bird','https://m.media-amazon.com/images/I/71St-5hfDeL.__AC_SX300_SY300_QL70_FMwebp_.jpg'),(42,'Knotted Rope Toy','Toys','A durable cotton rope toy for chewing and tug-of-war. Meant for Dogs',8.99,100,'ChewStrong','Dog','https://m.media-amazon.com/images/I/71dF6OJ8+US._AC_SY300_SX300_.jpg'),(43,'Interactive Cat Laser','Toys','An automatic laser toy to keep your cat entertained.',20.99,100,'LightChase','Cat','https://m.media-amazon.com/images/I/71UTcjAyxaL._AC_SX425_.jpg'),(44,'Plush Squirrel Toy','Toys','A soft plush toy for dogs, with a squeaker inside.',10.99,100,'SnugglePals','Dog','https://m.media-amazon.com/images/I/712+C83QhYL._AC_SY300_SX300_.jpg'),(45,'Leather Dog Leash','Accessories','A durable leather leash for walking your dog.',22.99,100,'LeashLux','Dog','https://m.media-amazon.com/images/I/71ZqqLa5ERL.__AC_SX300_SY300_QL70_FMwebp_.jpg'),(46,'Dog Cooling Mat','Accessories','A cooling mat to keep your dog comfortable in hot weather.',25.99,100,'CoolPet','Dog','https://m.media-amazon.com/images/I/71qrTazVuhL.__AC_SX300_SY300_QL70_FMwebp_.jpg'),(47,'Bouncy Ball','Toys','A high-bounce ball for dogs, great for fetch.',4.99,200,'ChuckIt','Dog','https://m.media-amazon.com/images/I/61qO2eqsJoL.__AC_SX300_SY300_QL70_FMwebp_.jpg'),(48,'Dental Chew Sticks','Food','Chew sticks for dogs to promote dental health.',9.99,150,'Pedrigree','Dog','https://m.media-amazon.com/images/I/81LhJgXOnBL.__AC_SX300_SY300_QL70_FMwebp_.jpg'),(49,'Reflective Dog Vest','Accessories','A reflective vest to keep your pet safe during night walks.',21.99,100,'NightSafety','Dog','https://m.media-amazon.com/images/I/61WHfXR7fQL.__AC_SX300_SY300_QL70_FMwebp_.jpg'),(50,'Dog Biscuits','Food','Healthy, grain-free treats for dogs with food sensitivities.',6.99,200,'HealthyPaws','Dog','https://m.media-amazon.com/images/I/91MIYPd26AS.__AC_SX300_SY300_QL70_FMwebp_.jpg'),(51,'Dog puzzle toy','Toys','A puzzle toy for dogs to stimulate their mind.',14.99,150,'BrainyBuddy','Dog','https://m.media-amazon.com/images/I/81Fyb8B0YtL.__AC_SX300_SY300_QL70_FMwebp_.jpg'),(52,'Dog Crate','Accessories','A durable crate for dogsl.',59.99,100,'TravelPaws','Dog','https://m.media-amazon.com/images/I/91tkTeZyTWL.__AC_SY300_SX300_QL70_FMwebp_.jpg'),(53,'Cat Crate','Accessories','A comfortable and secure crate for cats, with a soft interior.',49.99,100,'CozyNest','Cat','https://m.media-amazon.com/images/I/71KLUcxRWML.__AC_SY300_SX300_QL70_FMwebp_.jpg'),(54,'Small Dog Premium Food','Food','Specially formulated food for small dogs, supporting their energy needs.',24.99,200,'Pedigree','Dog','https://m.media-amazon.com/images/I/815VNCC4+SL._AC_SX425_.jpg'),(55,'Medium Dog Premium Food','Food','Nutrient-rich food designed for the unique needs of medium-sized dogs.',29.99,200,'Royale Canine','Dog','https://m.media-amazon.com/images/I/71Zx5ZZ7x7L.__AC_SX300_SY300_QL70_FMwebp_.jpg'),(56,'Large Dog Premium Food','Food','High-quality ingredients to support the health and strength of large dogs.',34.99,200,'Iams','Dog','https://m.media-amazon.com/images/I/81TdNfI0xjL.__AC_SX300_SY300_QL70_FMwebp_.jpg'),(57,'Aquarium LED Light','Accessories','LED light to enhance the appearance of your aquarium.',29.99,100,'AquaGlow','Fish','https://m.media-amazon.com/images/I/61UcsXNJKkL.__AC_SY445_SX342_QL70_FMwebp_.jpg'),(58,'Complete Aquarium Setup','Accessories','A comprehensive aquarium kit including tank, filter, lighting, and decorative items. Perfect for beginners and experienced aquarists alike.',99.99,50,'AquaWorld','Fish','https://m.media-amazon.com/images/I/81rOh-zLoQL.__AC_SX300_SY300_QL70_FMwebp_.jpg'),(59,'Wet Cat Food','Food','Premium wet cat food .',1.99,200,'OceanBites','Cat','https://m.media-amazon.com/images/I/81fTqbIlN0L.__AC_SX300_SY300_QL70_FMwebp_.jpg'),(60,'Dry Cat Food','Food','Specially formulated dry food to help reduce hairballs in cats.',19.99,150,'FurFree','Cat','https://m.media-amazon.com/images/I/81q97u2dc0L.__AC_SX300_SY300_QL70_FMwebp_.jpg'),(61,'Eco-Friendly Dog Poop Bags','Accessories','Biodegradable poop bags for eco-conscious dog owners.',9.99,300,'Earth Rotated','Dog','https://m.media-amazon.com/images/I/81nPdHkq4YL._AC_SX425_.jpg'),(62,'Gentle Oatmeal Dog Shampoo','Health','Soothing oatmeal shampoo for dogs with sensitive skin.',13.99,100,'GentleCare','Dog','https://m.media-amazon.com/images/I/71Npnm2RvjL.__AC_SX300_SY300_QL70_FMwebp_.jpg'),(63,'Hypoallergenic Cat Shampoo','Health','Fragrance-free, hypoallergenic shampoo for cats with allergies.',14.99,100,'PureClean','Cat','https://m.media-amazon.com/images/I/71f7Z5yHUOL.__AC_SX300_SY300_QL70_FMwebp_.jpg'),(64,'Dog Bed','Accessories','Orthopedic memory foam bed for ultimate dog comfort.',49.99,80,'DreamRest','Dog','https://m.media-amazon.com/images/I/71zFRMjAsiL.__AC_SX300_SY300_QL70_FMwebp_.jpg'),(65,'Cat Window Bed','Accessories','A cozy window bed for cats to bask in the sun.',39.99,100,'SunSpot','Cat','https://m.media-amazon.com/images/I/71fIDIyxppL.__AC_SX300_SY300_QL70_FMwebp_.jpg'),(66,'Stainless Steel Dog Bowl','Accessories','Durable stainless steel feeding bowl for dogs.',19.99,150,'FeedWell','Dog','https://m.media-amazon.com/images/I/51LBza345SL.__AC_SY300_SX300_QL70_FMwebp_.jpg'),(67,'Ceramic Cat Bowls','Accessories','Elegant ceramic bowl for cats, with a non-slip base.',16.99,150,'MeowFeast','Cat','https://m.media-amazon.com/images/I/51UrbEfSUoL._AC_SX425_.jpg'),(68,'Enzymatic Pet Stain & Odor Remover','Health','Powerful enzymatic cleaner that removes pet stains and odors from carpets and upholstery.',18.99,100,'OxiClean','All Pets','https://m.media-amazon.com/images/I/51G9NmyT9rL.__AC_SX300_SY300_QL70_FMwebp_.jpg'),(69,'Disinfectant Spray for Pet Homes','Health','A strong disinfectant spray designed for cleaning pet cages, bedding, and toys.',12.99,100,'Lysol','All Pets','https://m.media-amazon.com/images/I/51IyrgcRFXL.__AC_SX300_SY300_QL70_FMwebp_.jpg'),(70,'Multi-Surface Pet Hair Remover','Health','An effective solution for removing pet hair from furniture, clothing, and car interiors.',9.99,200,'ChomChom','All Pets','https://m.media-amazon.com/images/I/71ST8KBjOgL.__AC_SX300_SY300_QL70_FMwebp_.jpg'),(71,'Pet Paw Cleaner Foam','Health','Gentle and natural paw cleaning solution for pets after outdoor activities.',11.99,100,'Gentle Creatures','All Pets','https://m.media-amazon.com/images/I/71t+tQIlH+L._AC_SY300_SX300_.jpg'),(72,'Pet Nail Clippers Set','Health','A comfortable, ergonomic nail clippers set designed for safe and easy pet grooming. Includes a safety stop to prevent over-cutting.',12.99,100,'GroomEase','All Pets','https://m.media-amazon.com/images/I/51iiP1EhLZL.__AC_SX300_SY300_QL70_FMwebp_.jpg');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-04-24 11:55:22
