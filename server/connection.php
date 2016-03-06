<?php
namespace App\Server;

class Connection
{
    public function connect()
    {
        try {
            $connection = new pdo(
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
        }
    }
}
