<?php
namespace App\Test\Unit;

require_once realpath(dirname(dirname(dirname(__FILE__)))).'\api\ArrayManipulation.php';

use \App\Api as Api;

class ArrayToStringListTest extends \PHPUnit_Framework_TestCase
{
    protected $testArray;

    protected function setUp()
    {
        $this->testArray = array('a'=>'1', 'b'=>'2', 'c'=>'3');
    }

    public function testToStringList()
    {
        $this->assertEquals(Api\toStringList($this->testArray), 'a, b, c');
    }

    public function testAddPrefixToKeys()
    {
        $this->assertEquals(Api\addPrefixToKeys($this->testArray), array(':a'=>'1', ':b'=>'2', ':c'=>'3'));
    }
}
