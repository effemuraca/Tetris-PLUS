-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema Muraca
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `Muraca` ;

-- -----------------------------------------------------
-- Schema Muraca
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `Muraca` DEFAULT CHARACTER SET utf8 ;
USE `Muraca` ;

-- -----------------------------------------------------
-- Table `Muraca`.`Utente`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Muraca`.`Utente` ;

CREATE TABLE IF NOT EXISTS `Muraca`.`Utente` (
  `Username` VARCHAR(20) NOT NULL,
  `Mail` VARCHAR(30) NOT NULL,
  `Password` VARCHAR(20) NOT NULL,
  `Salt` VARCHAR(64) NOT NULL,
  `Domanda` INT NOT NULL,
  `Risposta` VARCHAR(30) NOT NULL,
  PRIMARY KEY (`Username`),
  UNIQUE INDEX `Username_UNIQUE` (`Username` ASC),
  UNIQUE INDEX `Mail_UNIQUE` (`Mail` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Muraca`.`Salvate`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Muraca`.`Salvate` ;

CREATE TABLE IF NOT EXISTS `Muraca`.`Salvate` (
  `idSalvate` INT NOT NULL AUTO_INCREMENT,
  `Username` VARCHAR(20) NOT NULL,
  `StringaPartita` VARCHAR(2000) NOT NULL,
  PRIMARY KEY (`idSalvate`),
  UNIQUE INDEX `idSalvate_UNIQUE` (`idSalvate` ASC),
  INDEX `fk_Salvate_Utente1_idx` (`Username` ASC),
  CONSTRAINT `fk_Salvate_Utente1`
    FOREIGN KEY (`Username`)
    REFERENCES `Muraca`.`Utente` (`Username`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Muraca`.`ProssimoTetromino`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Muraca`.`ProssimoTetromino` ;

CREATE TABLE IF NOT EXISTS `Muraca`.`ProssimoTetromino` (
)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
