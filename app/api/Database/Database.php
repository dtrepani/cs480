<?php
namespace SP\App\Api\Database;

use PDO;

class Database
{
    private $conn;
    private $statement;

    public function __construct()
    {
        $this->connect();
    }

    /** @return bool Success or failure. */
    public function beginTransaction()
    {
        return $this->conn->beginTransaction();
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
                $this->statement->bindValue(
                    $bindingParam,
                    $bindingValue,
                    $this->getValueType($bindingValue)
                );
            }
        }
    }

    /** @return bool Success or failure. */
    public function commit()
    {
        return $this->conn->commit();
    }

    private function connect()
    {
        try {
            $this->conn = new \PDO(
                'mysql:host=localhost;dbname=test;charset=utf8mb4',
                'root',
                '',
                array(
                    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                    PDO::ATTR_PERSISTENT => false
                )
            );
        } catch (\PDOException $e) {
            return array('success' => false, 'result' => $e->getMessage());
        }
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
    * Get the result of a query based on the given command and parameters.
    *
    * @param    string      $query      Query statement.
    * @param    bool        $singleRow  Get a single row.
    * @param    int         $fetchStyle Fetch style.
    * @param    int         $fetchArgs  Arguments to fetch style.
    *
    * @return   mixed[]|false           Results of query or false on failure.
    */
    private function getResult(
        $query,
        $singleRow = false,
        $fetchStyle = PDO::FETCH_ASSOC,
        $fetchArgs = null
    ) {
        $cmd = strtoupper(strstr($query, ' ', true));

        if ($cmd === 'DELETE' || $cmd === 'INSERT' || $cmd === 'UPDATE') {
            return $this->statement->rowCount();
        }

        if ($singleRow) {
            return $this->statement->fetch();
        }

        if ($fetchArgs) {
            return $this->statement->fetchAll($fetchStyle, $fetchArgs);
        }

        return $this->statement->fetchAll($fetchStyle);
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
        $bindings = array(),
        $singleRow = false,
        $fetchStyle = PDO::FETCH_ASSOC,
        $fetchArgs = null
    ) {
        try {
            $this->statement = $this->conn->prepare($query);

            if (!empty($bindings)) {
                $this->bindValues($bindings);
            }

            $this->statement->execute();

            return array(
                'success' => true,
                'result' => $this->getResult(
                    $query,
                    $singleRow,
                    $fetchStyle,
                    $fetchArgs
                )
            );
        } catch (\PDOException $e) {
            return array(
                'success' => false,
                'result' => $e->getMessage()
            );
        }
    }

    /** @return bool Success or failure. */
    public function rollBack()
    {
        return $this->conn->rollBack();
    }
}
