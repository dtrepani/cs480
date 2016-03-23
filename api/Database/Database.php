<?php
namespace App\Api\Database;

require_once('../../vendor/autoload.php');

class Database
{
    private $conn = null;
    private $statement = null;

    public function __construct()
    {
        var_dump('PDO: ' . extension_loaded('pdo')); // TODO: Remove
        $this->connect();
    }

    /** @return bool Success or failure. */
    public function beginTransaction()
    {
        return $this->$conn->beginTransaction();
    }

    /**
    * Sanitize input using given bindings.
    *
    * @param string[][] $bindings Parameters of statement that need to be bound.
    */
    private function bindValues($bindings)
    {
        if ($bindings) {
            foreach ($bindings as $bindingParam => $bindingValue) {
                $statement->bindValue(
                    $bindingParam,
                    $bindingValue,
                    getValueType($bindingValue)
                );
            }
        }
    }

    /** @return bool Success or failure. */
    public function cancelTransaction()
    {
        return $this->$conn->rollBack();
    }

    public function connect()
    {
        try {
            $conn = new PDO(
                'mysql:host=127.0.0.1;dbname=test;charset=utf8mb4',
                'root',
                '',
                array(
                    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                    PDO::ATTR_PERSISTENT => false
                )
            );
        } catch (PDOException $e) {
            echo 'Error: ' . $e->getMessage();
        }
    }

    /** @return bool Success or failure. */
    public function endTransaction()
    {
        return $this->$conn->commit();
    }

    /**
    * Used to bind parameters in a prepared statement.
    *
    * @param  mixed   $bindingValue Type is checked to get return value.
    *
    * @return int                   PDO Constant of the param's type.
    */
    private function getValueType($bindingValue)
    {
        if (is_null($bindingValue)) {
            return PDO::PARAM_NULL;
        }
        if (is_int($bindingValue)) {
            return PDO::PARAM_INT;
        }
        if (is_bool($bindingValue)) {
            return PDO::PARAM_BOOL;
        }
        return PDO::PARAM_STR;
    }

    /**
    * Query the database and sanitize any given input.
    *
    * @param    string      $query      Query statement.
    * @param    string[][]  $bindings   Parameters of statement that need to be bound.
    * @param    bool        $singleRow  Get a single row.
    * @param    int         $fetchStyle Fetch style.
    * @param    int         $fetchArgs  Arguments to fetch style.
    *
    * @return   mixed[]|false           Results of query or false on failure.
    */
    public function query(
        $query,
        $bindings,
        $singleRow = false,
        $fetchStyle = PDO::FETCH_ASSOC,
        $fetchArgs = null
    ) {
        $statement = $this->$conn->prepare($query);

        if ($bindings->password) {
            $bindings->password = password_hash($bindings->password, PASSWORD_DEFAULT);
        }

        bindValues($bindings);

        $statement->execute();

        if ($singleRow) {
            return $statement->fetch();
        }

        return $statement->fetchAll($fetchStyle, $fetchArgs);
    }
}
