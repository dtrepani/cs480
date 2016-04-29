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

    /**
    * @return bool Success or failure.
    */
    public function beginTransaction()
    {
        return $this->conn->beginTransaction();
    }

    /**
    * Sanitize input using given bindings.
    *
    * @param mixed[] $bindings Parameters of statement that need to be bound.
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

    /**
    * @return mixed[] See $this->query() for details on returned promise.
    */
    public function commit()
    {
        $result = $this->conn->commit();

        if ($result === false) {
            return array(
                'success'=>false,
                'title'=>'DB: An error occurred when finishing queries.',
                'message'=>"Commit returned: $result"
            );
        }

        return array(
            'success'=>true,
            'data'=>$result
        );
    }

    /**
    * @return void|false False on error.
    */
    private function connect()
    {
        try {
            $this->conn = new \PDO(
                'mysql:host=localhost;dbname=djt_sp;charset=utf8mb4',
                // 'mysql:host=localhost;dbname=cs480;charset=utf8mb4',
                '',
                // 'root',
                '',
                array(
                    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                    PDO::ATTR_PERSISTENT => false
                )
            );
        } catch (\PDOException $e) {
            error_log($e->getMessage());
            return array(
                'success'=>false,
                'title'=>'DB: Could not connect to database.',
                'message'=>$e->getMessage()
            );
        }
    }

    /**
    * @return string ID of the last inserted row.
    */
    public function lastInsertId()
    {
        return $this->conn->lastInsertId();
    }

    /**
    * Get the result of a query based on the given command and parameters.
    *
    * @param    string      $query      Query statement.
    * @param    int         $fetchStyle Fetch style.
    * @param    int         $fetchArgs  Arguments to fetch style.
    *
    * @return   mixed|false             Results of query or false on failure.
    */
    private function getResult(
        $query,
        $fetchStyle = PDO::FETCH_ASSOC,
        $fetchArgs = null
    ) {
        $cmd = strtoupper(strstr($query, ' ', true));

        if ($cmd === 'DELETE' || $cmd === 'INSERT' || $cmd === 'UPDATE') {
            return $this->statement->rowCount();
        }

        if ($fetchArgs) {
            return $this->statement->fetchAll($fetchStyle, $fetchArgs);
        }

        return $this->statement->fetchAll($fetchStyle);
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
    * @param    int         $fetchStyle Fetch style.
    * @param    int         $fetchArgs  Arguments to fetch style.
    *
    * @return   mixed[]     Promise with 'success' of query, 'data' with results
    *                       of query or 'title' with general error message, and
    *                       'message' of an error if one occurred.
    */
    public function query(
        $query,
        $bindings = array(),
        $fetchStyle = PDO::FETCH_ASSOC,
        $fetchArgs = null
    ) {
        try {
            $this->statement = $this->conn->prepare($query);

            if (!empty($bindings)) {
                $this->bindValues($bindings);
            }

            $this->statement->execute();

            $result = $this->getResult(
                $query,
                $fetchStyle,
                $fetchArgs
            );

            if ($result === false) {
                return array(
                    'success'=>false,
                    'title'=>'DB: Query could not be completed successfully.',
                    'message'=>$result
                );
            }

            return array(
                'success'=>true,
                'data'=>$result
            );
        } catch (\PDOException $e) {
            error_log($e->getMessage());
            return array(
                'success'=>false,
                'title'=>'DB: An error occurred while executing the query.',
                'message'=>$e->getMessage(),
                'details'=>$query
            );
        }
    }

    /**
    * @return bool Success or failure.
    */
    public function rollBack()
    {
        return $this->conn->rollBack();
    }
}
