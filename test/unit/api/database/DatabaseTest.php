<?php
namespace SP\Test\Unit\Database;

use SP\App\Api\Database;

// class DatabaseTest extends \PHPUnit_Extensions_Database_TestCase
// {
//     private $conn = null;

//     public function getConnection()
//     {
//         $this->conn = new PDO(
//             'mysql:host=127.0.0.1;dbname=test;charset=utf8mb4',
//             'root',
//             ''
//         );
//         return $this->createDefaultDBConnection($this->conn, 'test');
//     }

//     public function getDataSet()
//     {
//         return $this->createMySQLXMLDataSet('dbTest.xml');
//     }

//     public function testDatabaseStub()
//     {
//         $stub = $this->getMockBuilder('Database')
//             ->setMethods(array('query'))
//             ->getMock();

//         // TODO: redefine query to use php db test, pass into crud types
//         // $stub->expects($this->once())
//         //     ->method('query')
//         //     ->withAnyParameters()
//         //     ->will($this->returnCallback(/*function name*/));
//     }
// }
