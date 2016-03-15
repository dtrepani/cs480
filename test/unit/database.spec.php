<?php
namespace App\Test\Unit\DatabaseSpec;

require_once "api/database.class.php";

class DatabaseTest extends PHPUnit_Extensions_Database_TestCase
{
    private $conn = null;

    public function getConnection()
    {
        $conn = new PDO(
            'mysql:host=127.0.0.1;dbname=test;charset=utf8mb4',
            'root',
            ''
        );
        return $this->createDefaultDBConnection($conn, 'test');
    }

    public function getDataSet()
    {
        return $this->createMySQLXMLDataSet('dbTest.xml');
    }
}
