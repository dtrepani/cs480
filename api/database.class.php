<?php
namespace App\Api\DatabaseClass;

class Database
{
    protected $conn = null;

    public function __construct()
    {
        $this->connect();
    }

    /** @return bool Success or failure. */
    public function beginTransaction()
    {
        return $this->$conn->beginTransaction();
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
            echo 'ERROR: ' . $e->getMessage();
            die();
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
    * @param    string      $aQuery     Query statement.
    * @param    string[][]  $bindings   Parameters of statement that need to be bound.
    * @param    bool        $singleRow  Get a single row.
    * @param    int         $fetchStyle Fetch style.
    * @param    int         $fetchArgs  Arguments to fetch style.
    *
    * @return   mixed[]|false           Results of query or false on failure.
    */
    public function query(
        $aQuery,
        $bindings,
        $singleRow = false,
        $fetchStyle = PDO::FETCH_ASSOC,
        $fetchArgs = null
    ) {
        $statement = $this->$conn->prepare($aQuery);

        if ($bindings) {
            foreach ($bindings as $bindingParam => $bindingValue) {
                $statement->bindValue(
                    $bindingParam,
                    $bindingValue,
                    getValueType($bindingValue)
                );
            }
        }

        $statement->execute();

        if ($singleRow) {
            return $statement->fetch();
        }

        return $statement->fetchAll($fetchStyle, $fetchArgs);
    }
}
