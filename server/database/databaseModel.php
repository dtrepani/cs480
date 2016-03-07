<?php
namespace App\Server;

class DatabaseModel
{
	private $connection = null;

    public function connect()
    {
        try {
            $connection = new PDO(
                'mysql:host=127.0.0.1;dbname=test;charset=utf8mb4',
                'root',
                '',
                array(
                    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                    PDO::ATTR_PERSISTENT => false
                )
            );
        } catch (PDOException $e) {
            echo 'ERROR: ' . $e->getMessage();
            die();
        }
    }

    public function delete($table, $data)
    {

    }

    public function insert($table, $data)
    {

    }

    /**
    * Assumes parameters have already been sanitized.
    *
    * @param string $table			Table to select from.
    * @param string $selection		Criteria to select from table.
    *
    * @return PDOStatement|false	The database items asked for or false on failure.
    */
    public function select($table, $selection)
    {
    	return $connection->query("SELECT $selection FROM $table");
    }

    public function update($table, $data)
    {

    }
}
