<?php
namespace SP\Test\Unit;

require_once __DIR__.'/../../app/api/arrayManipulation.php';

use SP\App\Api as Api;

class ArrayToStringListTest extends \PHPUnit_Framework_TestCase
{
    protected $testArray;

    protected function setUp()
    {
        $this->testArray = array('a'=>'1', 'b'=>'2', 'c'=>'3');
    }

    public function testAddPrefixToKeys()
    {
        $this->assertEquals(Api\addPrefixToKeys($this->testArray), array(':a'=>'1', ':b'=>'2', ':c'=>'3'));
    }

    public function testToBindingSetList()
    {
        $this->assertEquals(
            Api\toBindingSetList($this->testArray),
            'a = :a, b = :b, c = :c'
        );
    }

    public function testToQueryLists()
    {
        $lists = Api\toQueryLists($this->testArray);
        $this->assertEquals($lists['columns'], 'a, b, c');
        $this->assertEquals($lists['bindings'], ':a, :b, :c');
    }
}
