-- Progettazione Web 
DROP DATABASE if exists Muraca_635455; 
CREATE DATABASE Muraca_635455; 
USE Muraca_635455; 
-- MySQL dump 10.13  Distrib 5.7.28, for Win64 (x86_64)
--
-- Host: localhost    Database: Muraca_635455
-- ------------------------------------------------------
-- Server version	5.7.28

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `partitesalvate`
--

DROP TABLE IF EXISTS `partitesalvate`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `partitesalvate` (
  `idSalvate` int(11) NOT NULL AUTO_INCREMENT,
  `Username` varchar(20) NOT NULL,
  `StringaPartita` varchar(2000) DEFAULT NULL,
  `PartitaDoppia` varchar(2000) DEFAULT NULL,
  `Data` varchar(20) NOT NULL,
  `TipoSalvataggio` tinyint(1) DEFAULT NULL,
  `Punteggio` int(11) DEFAULT NULL,
  PRIMARY KEY (`idSalvate`),
  UNIQUE KEY `idSalvate_UNIQUE` (`idSalvate`),
  KEY `fk_Salvate_Utente1_idx` (`Username`),
  CONSTRAINT `fk_Salvate_Utente1` FOREIGN KEY (`Username`) REFERENCES `utente` (`Username`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `partitesalvate`
--

LOCK TABLES `partitesalvate` WRITE;
/*!40000 ALTER TABLE `partitesalvate` DISABLE KEYS */;
INSERT INTO `partitesalvate` VALUES (1,'prova11','{\"username\":\"prova11\",\"punteggio\":8100,\"tabellone\":{\"tabelloneAttuale\":[[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,\"green\",0,0,0,0,0],[0,0,0,\"green\",\"green\",\"green\",0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,\"blue\",0,0,0,0,0],[0,0,0,\"blue\",\"blue\",\"green\",\"green\",0,0,0],[\"purple\",\"purple\",\"purple\",\"purple\",\"blue\",0,\"green\",\"cyan\",0,0],[\"coral\",\"coral\",\"coral\",\"coral\",\"coral\",\"coral\",\"green\",\"cyan\",\"cyan\",0],[\"green\",\"green\",\"red\",\"coral\",\"coral\",\"HoneyDew\",\"HoneyDew\",\"green\",\"cyan\",0],[\"green\",\"green\",\"red\",\"red\",\"red\",\"HoneyDew\",\"HoneyDew\",\"green\",\"green\",0],[\"blue\",\"cyan\",\"cyan\",\"cyan\",\"red\",\"red\",\"blue\",\"green\",\"green\",0],[\"blue\",\"blue\",\"red\",\"red\",\"red\",\"red\",\"green\",\"green\",\"red\",0]],\"punteggio\":8100,\"statoPartita\":-1,\"statoGravita\":0.4099999999999995,\"qualeGiocatore\":0,\"righeCancellate\":true},\"tetromino\":{\"colore\":\"green\",\"rotazione\":0,\"tetMatrice\":[[0,1,0],[1,1,1]],\"x\":3,\"y\":3,\"attivo\":true,\"tipoT\":\"T\",\"polo\":[1,1]},\"prosTetromino\":{\"colore\":\"yellow\",\"rotazione\":0,\"tetMatrice\":[[0,1,1],[1,1,0]],\"x\":3,\"y\":0,\"attivo\":true,\"tipoT\":\"S\",\"polo\":[1,1]}}','false','2024-01-06',0,8100),(2,'prova11','{\"username\":\"prova11\",\"punteggio\":2460,\"tabellone\":{\"tabelloneAttuale\":[[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,\"coral\",\"coral\",0,0,0,0,0],[0,0,0,\"coral\",\"coral\",0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[\"green\",\"purple\",0,0,0,0,0,\"coral\",0,0],[\"green\",\"purple\",\"coral\",\"coral\",\"coral\",\"coral\",\"cyan\",\"coral\",\"coral\",0]],\"punteggio\":2460,\"statoPartita\":-1,\"statoGravita\":0.6999999999999997,\"qualeGiocatore\":0,\"righeCancellate\":true},\"tetromino\":{\"colore\":\"coral\",\"rotazione\":0,\"tetMatrice\":[[1,1],[1,1]],\"x\":3,\"y\":3,\"attivo\":true,\"tipoT\":\"O\"},\"prosTetromino\":{\"colore\":\"blue\",\"rotazione\":0,\"tetMatrice\":[[1,1,1,1]],\"x\":3,\"y\":0,\"attivo\":true,\"tipoT\":\"I\",\"polo\":[0,0]}}','{\"username\":\"Giocatore ospite\",\"punteggio\":1710,\"tabellone\":{\"tabelloneAttuale\":[[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,\"yellow\",0,0,0,0,0],[0,0,0,\"yellow\",\"yellow\",\"yellow\",0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,\"coral\",\"coral\",0,0],[\"yellow\",0,0,0,\"cyan\",\"coral\",\"coral\",\"blue\",0,\"red\"],[\"yellow\",\"yellow\",\"yellow\",\"cyan\",\"cyan\",\"cyan\",\"blue\",\"blue\",0,\"red\"],[\"yellow\",\"purple\",\"yellow\",\"yellow\",0,\"yellow\",\"blue\",\"blue\",\"blue\",\"red\"]],\"punteggio\":1710,\"statoPartita\":-1,\"statoGravita\":0.7749999999999998,\"qualeGiocatore\":1,\"righeCancellate\":true},\"tetromino\":{\"colore\":\"yellow\",\"rotazione\":0,\"tetMatrice\":[[0,1,0],[1,1,1]],\"x\":3,\"y\":10,\"attivo\":true,\"tipoT\":\"T\",\"polo\":[1,1]},\"prosTetromino\":{\"colore\":\"coral\",\"rotazione\":0,\"tetMatrice\":[[0,0,1],[1,1,1]],\"x\":3,\"y\":0,\"attivo\":true,\"tipoT\":\"L\",\"polo\":[1,1]}}','2024-01-06',1,2460),(3,'prova11',NULL,NULL,'2024-01-06',NULL,4550),(4,'prova11','{\"username\":\"prova11\",\"punteggio\":5790,\"tabellone\":{\"tabelloneAttuale\":[[0,0,0,\"yellow\",\"yellow\",0,0,0,0,0],[0,0,0,0,\"yellow\",\"yellow\",0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,\"red\",0,0,0,0,0,0],[0,0,0,\"red\",0,\"blue\",0,0,0,0],[0,\"green\",\"green\",\"red\",\"red\",\"blue\",0,0,0,0],[\"green\",\"green\",\"cyan\",\"cyan\",\"cyan\",\"blue\",\"blue\",\"red\",\"red\",0],[\"green\",\"green\",\"cyan\",0,0,\"LavenderBlush\",\"LavenderBlush\",0,\"red\",\"red\"],[\"green\",\"green\",\"cyan\",0,0,\"LavenderBlush\",\"LavenderBlush\",\"coral\",\"coral\",0],[\"yellow\",\"yellow\",\"cyan\",0,\"blue\",0,\"blue\",\"coral\",\"yellow\",\"yellow\"],[\"blue\",\"blue\",\"cyan\",\"yellow\",\"yellow\",\"blue\",\"blue\",0,\"yellow\",0],[\"blue\",\"blue\",\"purple\",\"purple\",\"yellow\",\"blue\",\"blue\",\"purple\",\"yellow\",0],[\"coral\",\"coral\",0,\"purple\",\"purple\",\"purple\",0,\"cyan\",\"purple\",\"purple\"],[\"blue\",\"red\",0,\"cyan\",\"cyan\",0,0,\"cyan\",\"blue\",\"blue\"],[\"blue\",\"red\",0,0,\"cyan\",\"cyan\",0,\"cyan\",\"blue\",\"blue\"],[\"blue\",\"red\",\"green\",\"cyan\",\"cyan\",0,0,\"LightSlateGrey\",\"LightSlateGrey\",0],[\"blue\",\"red\",\"green\",\"cyan\",0,\"coral\",\"red\",\"red\",0,0],[\"coral\",\"green\",\"green\",\"cyan\",0,\"coral\",\"red\",0,\"purple\",\"purple\"]],\"punteggio\":5790,\"statoPartita\":-1,\"statoGravita\":0.8499999999999999,\"qualeGiocatore\":0,\"righeCancellate\":true},\"tetromino\":{\"colore\":\"yellow\",\"rotazione\":0,\"tetMatrice\":[[1,1,0],[0,1,1]],\"x\":3,\"y\":0,\"attivo\":true,\"tipoT\":\"Z\",\"polo\":[1,1]},\"prosTetromino\":{\"colore\":\"blue\",\"rotazione\":0,\"tetMatrice\":[[0,0,1],[1,1,1]],\"x\":3,\"y\":0,\"attivo\":true,\"tipoT\":\"L\",\"polo\":[1,1]}}','false','2024-01-06',1,5790),(5,'prova11',NULL,NULL,'2024-01-06',NULL,6100),(6,'effemuraca','{\"username\":\"effemuraca\",\"punteggio\":6730,\"tabellone\":{\"tabelloneAttuale\":[[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,\"blue\",\"blue\",0,0,0,0],[0,0,0,\"blue\",\"blue\",0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,\"coral\",0,0,0,0,0,\"purple\",0],[0,\"coral\",\"coral\",0,\"blue\",\"blue\",\"blue\",0,\"purple\",\"purple\"],[0,\"coral\",\"purple\",\"red\",\"blue\",\"blue\",\"blue\",0,\"purple\",0],[\"yellow\",\"purple\",\"purple\",\"red\",\"red\",\"blue\",\"blue\",\"blue\",\"red\",0],[\"yellow\",\"purple\",\"red\",\"red\",\"blue\",\"blue\",\"blue\",\"blue\",\"red\",0],[\"yellow\",\"red\",\"yellow\",\"yellow\",\"cyan\",0,\"coral\",\"blue\",\"yellow\",\"yellow\"],[\"cyan\",\"cyan\",\"cyan\",\"yellow\",\"cyan\",0,\"coral\",\"coral\",\"yellow\",\"yellow\"],[\"cyan\",\"green\",\"yellow\",\"purple\",\"purple\",\"purple\",\"coral\",\"cyan\",\"purple\",0],[0,\"green\",\"yellow\",0,\"purple\",\"green\",0,\"cyan\",\"purple\",\"purple\"],[0,\"green\",\"yellow\",\"yellow\",0,\"green\",\"cyan\",\"cyan\",\"cyan\",\"purple\"],[0,\"green\",0,\"green\",\"green\",\"green\",\"green\",\"cyan\",\"cyan\",\"cyan\"]],\"punteggio\":6730,\"statoPartita\":-1,\"statoGravita\":0.2,\"qualeGiocatore\":0,\"righeCancellate\":true},\"tetromino\":{\"colore\":\"blue\",\"rotazione\":0,\"tetMatrice\":[[0,1,1],[1,1,0]],\"x\":3,\"y\":2,\"attivo\":true,\"tipoT\":\"S\",\"polo\":[1,1]},\"prosTetromino\":{\"colore\":\"red\",\"rotazione\":0,\"tetMatrice\":[[0,1,0],[1,1,1]],\"x\":3,\"y\":0,\"attivo\":true,\"tipoT\":\"T\",\"polo\":[1,1]}}','false','2024-01-06',0,6730),(7,'effemuraca',NULL,NULL,'2024-01-06',NULL,7560);
/*!40000 ALTER TABLE `partitesalvate` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `utente`
--

DROP TABLE IF EXISTS `utente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `utente` (
  `Username` varchar(20) NOT NULL,
  `Mail` varchar(30) NOT NULL,
  `Password` varchar(255) NOT NULL,
  `Domanda` int(11) NOT NULL,
  `Risposta` varchar(255) NOT NULL,
  PRIMARY KEY (`Username`),
  UNIQUE KEY `Username_UNIQUE` (`Username`),
  UNIQUE KEY `Mail_UNIQUE` (`Mail`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `utente`
--

LOCK TABLES `utente` WRITE;
/*!40000 ALTER TABLE `utente` DISABLE KEYS */;
INSERT INTO `utente` VALUES ('effemuraca','f.muraca2@studenti.unipi.it','$2y$10$qA.Ljp4jc4K/cgVXbgM51OXDcGcvpT0PFtsq6FnEpUjfj.AlyPR2a',0,'$2y$10$ta0GyuuNQV/CHQv2VQUCAeglf//5nfWWgu7VvjR1PWiG5caJxjzea'),('prova11','prova@prova.com','$2y$10$lNcPy.v2P6LEejK7f5q7q.IcPCe3Cu7ueRZYZukwkUitLH8n6Aime',0,'$2y$10$sReELywG2UswPGuJGm4pDOrbN.WoyjJ8MWuvD6IVHOc9IIZTi.1t6');
/*!40000 ALTER TABLE `utente` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-01-06 16:54:03
