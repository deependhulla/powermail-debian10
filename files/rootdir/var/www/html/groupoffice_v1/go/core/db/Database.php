<?php
namespace go\core\db;

use go\core\App;
use PDO;

class Database {
		
	private $tableNames;	

	private $conn;

	/**
	 *
	 * MariaDB:
	 * 10.5.8-MariaDB-1:10.5.8+maria~focal
	 *
	 * Mysql:
	 * 8.0.22
	 *
	 * @var string
	 */
	private $version;

	public function __construct(Connection $conn = null) {
		$this->conn = $conn ?? go()->getDbConnection();
	}
	
	/**
	 * Check if the current database has a table
	 * 
	 * @param string $name
	 * @return bool
	 */
	public function hasTable($name) {
		return in_array($name, $this->getTableNames());
	}

	private function queryVersion() {
		if(!isset($this->version)) {
			$this->version = go()->getDbConnection()->query("SELECT VERSION()")->fetchColumn(0);
		}

		return $this->version;
	}

	public function isMariaDB() {
		return stristr($this->queryVersion(), 'mariadb');
	}

	/**
	 *
	 * @return string eg. 10.0.2
	 */
	public function getVersion() {
		if($this->isMariaDB()) {
			return explode('-', $this->queryVersion())[0];
		} else{
			return $this->queryVersion();
		}
	}
	
	
	private function getTableNames() {
		if(!isset($this->tableNames)) {
			$stmt = $this->conn->query('SHOW TABLES');
			$stmt->setFetchMode(PDO::FETCH_COLUMN, 0);
			$this->tableNames = $stmt->fetchAll();
		}
		
		return $this->tableNames;
	}
	
	/**
	 * Get all tables
	 * 
	 * @return Table[]
	 */
	public function getTables() {
		$t = [];
		
		foreach($this->getTableNames() as $tableName) {
			$t[] = Table::getInstance($tableName, $this->conn);
		}
		
		return $t;
	}

	/**
	 * Get a database table
	 * 
	 * @param string $name
	 * @return Table
	 */
	public function getTable($name) {
		return Table::getInstance($name, $this->conn);
	}	
	
	/**
	 * Get database name
	 * 
	 * @return string eg. "user@localhost"
	 */
	public function getUser() {
		$sql = "SELECT USER();";
		$stmt = App::get()->getDbConnection()->query($sql);
		$stmt->setFetchMode(PDO::FETCH_COLUMN, 0);
		return  $stmt->fetch();		
	}
	
	/**
	 * Get database name
	 * 
	 * @return string
	 */
	public function getName() {
		$sql = "SELECT DATABASE();";
		$stmt = App::get()->getDbConnection()->query($sql);
		$stmt->setFetchMode(PDO::FETCH_COLUMN, 0);
		return $stmt->fetch();				
	}
	
	/**
	 * Set UTF8 collation
	 * 
	 * @return bool
	 */
	public function setUtf8() {
		//Set utf8 as collation default
		$sql = "ALTER DATABASE `" .$this->getName() . "` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;";		
		return App::get()->getDbConnection()->exec($sql) !== false;
	}
}

